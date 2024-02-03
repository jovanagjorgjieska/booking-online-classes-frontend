import { useState, useEffect } from "react";
import {useParams} from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "./useFetch";
import StarRatingDisplay from "./StarRatingDisplay";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const CourseDetails = () => {
    const token = localStorage.getItem('jwtToken');
    const isTeacher = localStorage.getItem('isTeacher');
    const isStudent = localStorage.getItem('isStudent');
    const {id} = useParams();
    const {data: course, error, isPending} = useFetch('http://localhost:8080/api/courses/' + id, token);
    const loggedEmail = localStorage.getItem('user');
    const {data: enrollments, errorEnrollments, isPendingEnrollments} = useFetch('http://localhost:8080/api/enrollments/course/' + id, token);
    const {data: profile, loggedUserError, isPendingLoggedUser} = useFetch('http://localhost:8080/api/auth/' + loggedEmail, token);
    const [isPendingEnroll, setIsPendingEnroll] = useState(false);
    const [courseId, setCourseId] = useState('');
    const [teacherId, setTeacherId] = useState('');
    const [studentId, setStudentId] = useState('');
    const [isEnrollmentSuccessful, setIsEnrollmentSuccessful] = useState(false);
    const [isStudentAlreadyEnrolled, setIsStudentAlreadyEnrolled] = useState(false);
    const [areAllPositionsFilled, setAreAllPositionsFilled] = useState(false);
    const [disabledMessage, setDissabledMessage] = useState('');
    const [isTooltipVisible, setTooltipVisible] = useState(false);

    useEffect(() => {
        if (course && profile && enrollments) {
          const isStudentAlreadyEnrolled = enrollments.some(
            (enrollment) =>
              enrollment.student.userId === profile.userId &&
              enrollment.course.courseId === course.courseId
          );
    
          setIsStudentAlreadyEnrolled(isStudentAlreadyEnrolled);
    
          if (course.availablePositions === 0) {
            setAreAllPositionsFilled(true);
            setDissabledMessage(
              'Unfortunately, all positions for this course have been filled.'
            );
          }
        }
      }, [course, profile, enrollments]);

    useEffect(() => {
        if (course) {
            console.log(course);
            setCourseId(course.courseId || '');
            setTeacherId(course.teacher.userId || '');
        }
    }, [course]);

    useEffect(() => {
        if (profile) {
            setStudentId(profile.userId || '');
        }
    }, [profile]);

    const handleEnroll = (e) => {
        e.preventDefault();

        const enrollment = { 
            studentId,
            teacherId,
            courseId
        };

        setIsPendingEnroll(true);

        fetch('http://localhost:8080/api/enrollments', {
            method: 'POST',
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(enrollment)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Enrollment failed");
                }
                setIsEnrollmentSuccessful(true);
                return response.json();
            })
            .then(data => {
                setIsPendingEnroll(false);
            })
            .catch(error => {
                setIsPendingEnroll(false);
            });
    }

    const getStatusClass = (status) => {
        switch (status) {
            case 'APPROVED':
                return 'approved-class';
            case 'DENIED':
                return 'denied-class';
            case 'PENDING':
                return 'pending-class';
            default:
                return '';
        }
    };    

    return (
        <div className="course-details">
            <div className="course-container">
                {isPending && <div>Loading...</div>}
                {error && <div className="error">{error}</div>}
                {course && (
                    <article>
                        <div className="course-header">
                            <h2 className="course-title">{course.courseName}</h2>
                            <div className="course-labels">
                                {isTeacher && <p className={`course-upload-status ${getStatusClass(course.courseUploadStatus)}`}>
                                    {course.courseUploadStatus}
                                </p>}
                                <p className="course-status">ACTIVE</p>
                                <p className="course-type">{course.courseType} COURSE</p>
                            </div>
                        </div>

                        <br />
                        <p id="course-teacher">
                            <Link to={`/teachers/${course.teacher.userId}`} style={{ textDecoration: 'none' }}>
                                <span className="red-text">Teacher:</span> <span className="teacher-link">{course.teacher.firstName} {course.teacher.lastName}</span>
                            </Link>
                        </p>
                        <div className="course-description">{course.description}</div>
                        <p><span className="red-text">Category:</span> {course.courseCategory}</p>
                        {course.courseType === "GROUP" && <p><span className="red-text">Available positions:</span> {course.availablePositions}</p>}
                        <div className="course-content">
                            <p className="red-text">Course details:</p>
                            <p>{course.details}</p>
                        </div>

                        {course.rating && course.rating > 0 && 
                            <p className="course-rating">
                                <StarRatingDisplay rating={course.rating} />
                                <Link to={`/reviews/${course.courseId}`}>
                                    <span className="review-link">See all reviews</span>
                                </Link>
                            </p>
                        }

                        <p className="course-price">Price: {course.price}MKD</p>
                        {isStudent && !isStudentAlreadyEnrolled && !areAllPositionsFilled && !isPendingEnroll && !isEnrollmentSuccessful && (
                            <div className="enroll-button-container">
                                <button className="enroll-button" onClick={handleEnroll}>
                                    Enroll
                                </button>
                            </div>
                        )}
                        {isStudent && isStudentAlreadyEnrolled && (
                            <div className="enroll-button-container">
                                <button disabled={true} className="enrolled-button">
                                    Enrolled
                                    <FontAwesomeIcon icon={faCheck} style={{ color: 'white', marginLeft: '5px' }} />
                                </button>
                            </div>
                        )}
                        {isStudent && areAllPositionsFilled && !isStudentAlreadyEnrolled && (
                            <div className="enroll-button-container">
                                <button
                                    disabled={true}
                                    className="enroll-button-disabled"
                                >
                                    Enroll
                                </button>
                                <p>This course is currently inactive.</p>
                            </div>
                        )}
                        {isTeacher && course.courseUploadStatus === 'APPROVED' &&
                            <Link to={`/courseEnrollments/${course.courseId}`}>
                                <button className="enrolled-students-button">Enrolled students</button>
                            </Link>
                        }
                        {isTeacher && course.courseUploadStatus === 'APPROVED' &&
                            <Link to={`/courses/${course.courseId}/edit`}>
                                <button className="edit-button">Edit course</button>
                            </Link>
                        }
                        {isPendingEnroll && <div className="enroll-button-container"><p>Enrollment loading...</p></div>}
                        {isEnrollmentSuccessful && <div className="success-message">
                            Enrollment successful!
                            <br/>
                            You will soon be contacted by the teacher.
                        </div>}
                    </article>
                )}
            </div>
        </div>
    );
}
 
export default CourseDetails;
import { useState, useEffect } from "react";
import {useParams} from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "./useFetch";

const CourseDetails = () => {
    const token = localStorage.getItem('jwtToken');
    const isTeacher = localStorage.getItem('isTeacher');
    const {id} = useParams();
    const {data: course, error, isPending} = useFetch('http://localhost:8080/api/courses/' + id, token);
    const loggedEmail = localStorage.getItem('user');
    const {data: profile, loggedUserError, isPendingLoggedUser} = useFetch('http://localhost:8080/api/auth/' + loggedEmail, token);
    const [isPendingEnroll, setIsPendingEnroll] = useState(false);
    const [courseId, setCourseId] = useState('');
    const [teacherId, setTeacherId] = useState('');
    const [studentId, setStudentId] = useState('');
    const [isEnrollmentSuccessful, setIsEnrollmentSuccessful] = useState(false);

    useEffect(() => {
        if (course) {
            setCourseId(course.courseId || '');
            setTeacherId(course.teacher.userId || '');
        }
    }, [course]);

    useEffect(() => {
        if (profile) {
            setStudentId(profile.userId || '');
        }
    }, [course]);

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

    return (
        <div className="course-details">
            <div className="course-container">
                {isPending && <div>Loading...</div>}
                {error && <div className="error">{error}</div>}
                {course && (
                    <article>
                        <h2>{course.courseName}</h2>
                        <p className="course-type">{course.courseType} COURSE</p>
                        <br />
                        <p id="course-teacher">
                            <Link to={`/teachers/${course.teacher.userId}`} style={{ textDecoration: 'none' }}>
                                Teacher: <span className="teacher-link">{course.teacher.firstName} {course.teacher.lastName}</span>
                            </Link>
                        </p>
                        <div className="course-description">{course.description}</div>
                        <p>Category: {course.courseCategory}</p>
                        {course.courseType === "GROUP" && <p>Available positions: {course.availablePositions}</p>}
                        <div className="course-content">
                            <p>Course details:</p>
                            <p>{course.details}</p>
                        </div>
                        <p className="course-price">Price: {course.price}MKD</p>
                        {!isTeacher && !isPendingEnroll && !isEnrollmentSuccessful && (
                            <button className="enroll-button" onClick={handleEnroll}>
                                Enroll
                            </button>
                        )}
                        <Link to={`/reviews/${course.courseId}`}>
                            <button className="reviews-button">See reviews</button>
                        </Link>
                        {isTeacher && (
                            <Link to={`/courses/${course.courseId}/edit`}>
                                <button className="edit-button">Edit course</button>
                            </Link>
                        )}
                        {isPendingEnroll && <button className="loading-button" disabled>Enrollment loading...</button>}
                        {isEnrollmentSuccessful && <div className="success-message">Enrollment successful!</div>}
                    </article>
                )}
            </div>
        </div>
    );
}
 
export default CourseDetails;
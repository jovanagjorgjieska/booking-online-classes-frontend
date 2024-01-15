import { useState, useEffect } from "react";
import {useParams} from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "./useFetch";

const CourseDetails = () => {
    const isTeacher = localStorage.getItem('isTeacher');
    console.log(isTeacher);
    const {id} = useParams();
    const {data: course, error, isPending} = useFetch('http://localhost:8080/api/courses/' + id);
    const loggedEmail = localStorage.getItem('user');
    const {data: profile, loggedUserError, isPendingLoggedUser} = useFetch('http://localhost:8080/api/auth/' + loggedEmail);
    const [isPendingBook, setIsPendingBook] = useState(false);
    const [courseId, setCourseId] = useState('');
    const [teacherId, setTeacherId] = useState('');
    const [studentId, setStudentId] = useState('');
    const [isBookingSuccessful, setIsBookingSuccessful] = useState(false);

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

    const handleBook = (e) => {
        e.preventDefault();

        const booking = { 
            studentId,
            teacherId,
            courseId
        };

        setIsPendingBook(true);

        fetch('http://localhost:8080/api/bookings', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(booking)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Booking failed");
                }
                setIsBookingSuccessful(true);
                return response.json();
            })
            .then(data => {
                setIsPendingBook(false);
            })
            .catch(error => {
                setIsPendingBook(false);
            });
    }

    return (  
        <div className="course-details">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {course && (
                <article>
                    <h2>{course.courseName}</h2>
                    <p className>{course.courseType} COURSE</p>
                    <br></br>
                    <p><Link to={`/teachers/${course.teacher.userId}`}>Teacher: {course.teacher.firstName} {course.teacher.lastName}</Link></p>
                    <div>{course.description}</div>
                    {!isPendingBook && !isBookingSuccessful && <button onClick={handleBook}>Book</button>}
                    {isPendingBook && <button disabled>Booking loading...</button>}
                    {isBookingSuccessful && <div>Booking successful!</div>}
                </article>
            )}
        </div>
    );
}
 
export default CourseDetails;
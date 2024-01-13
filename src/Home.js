import { useState, useEffect } from "react";
import CourseList from "./CourseList";
import useFetch from "./useFetch";

const Home = () => {
    const token = localStorage.getItem('jwtToken');
    const loggedUser = localStorage.getItem('user');
    const {data: profile, fetchUserError, fetchUserIsPending} = useFetch('http://localhost:8080/api/auth/' + loggedUser);
    const [isTeacher, setIsTeacher] = useState(false);

    useEffect(() => {
        if (profile?.userRole === 'TEACHER') {
            setIsTeacher(true);
        }
    }, [profile]);

    const apiUrl = isTeacher
            ? 'http://localhost:8080/api/teachers/' + profile.userId + '/courses'
            : 'http://localhost:8080/api/courses';

    const {data: courses, isPending, error} = useFetch(apiUrl);

    return ( 
        <div className="home">
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {courses && isTeacher && <CourseList courses={courses} title="Your Courses"/>}
            {courses && !isTeacher && <CourseList courses={courses} title="All Courses"/>}
        </div>
    );
}
 
export default Home;
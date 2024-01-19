import { useState, useEffect } from "react";
import CourseList from "./CourseList";
import NoCourses from "./NoCourses";
import useFetch from "./useFetch";

const Home = () => {
    const token = localStorage.getItem('jwtToken');
    const loggedUser = localStorage.getItem('user');
    const {data: profile, fetchUserError, fetchUserIsPending} = useFetch(
        'http://localhost:8080/api/auth/' + loggedUser, token);
    const [isTeacher, setIsTeacher] = useState(false); 

    useEffect(() => {
        if (profile?.userRole === "TEACHER") {
            console.log(profile);
            setIsTeacher(true);
            localStorage.setItem('isTeacher', isTeacher);
        }
    }, [profile]);

    const apiUrl = isTeacher
            ? 'http://localhost:8080/api/teachers/' + profile.userId + '/courses'
            : 'http://localhost:8080/api/courses';

    const {data: courses, isPending, error} = useFetch(apiUrl, token);

    return ( 
        <div className="home">
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {courses && courses.length > 0 && isTeacher && <CourseList courses={courses} title="Your Courses"/>}
            {courses && courses.length > 0 && profile && !isTeacher && <CourseList courses={courses} title="All Courses"/>}
            {courses && courses.length === 0 && <NoCourses/>}
        </div>
    );
}
 
export default Home;
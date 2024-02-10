import { useState, useEffect } from "react";
import AdminPanel from "./AdminPanel";
import CourseList from "./CourseList";
import NoCourses from "./NoCourses";
import useFetch from "./useFetch";

const Home = () => {
    const token = localStorage.getItem('jwtToken');
    const loggedUser = localStorage.getItem('user');
    const {data: profile, fetchUserError, fetchUserIsPending} = useFetch(
        'http://localhost:8080/api/auth/' + loggedUser, token);
    const [isTeacher, setIsTeacher] = useState(false); 
    const [isStudent, setIsStudent] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (profile) {
            if (profile.userRole === "TEACHER") {
                setIsTeacher(true);
                localStorage.setItem('isTeacher', true);
            } else if (profile.userRole === "STUDENT") {
                setIsStudent(true);
                localStorage.setItem('isStudent', true);
            } else if (profile.userRole === "ADMIN") {
                setIsAdmin(true);
                localStorage.setItem('isAdmin', true);
            }
        }
    }, [profile]);    

    const apiUrl = isTeacher
            ? 'http://localhost:8080/api/teachers/' + profile.userId + '/courses'
            : 'http://localhost:8080/api/courses';

    const {data: courses, isPending, error} = useFetch(apiUrl, token);

    let filteredCourses;

    if (isStudent && courses) {
        filteredCourses = courses.filter(course => course.courseUploadStatus === "APPROVED");
    } else {
        filteredCourses = courses;
    }

    return ( 
        <div className="home">
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {filteredCourses && filteredCourses.length > 0 && isTeacher && <CourseList courses={filteredCourses} title="Your Courses" />}
            {filteredCourses && filteredCourses.length > 0 && profile && isStudent && <CourseList courses={filteredCourses} title="All Courses" />}
            {courses && courses.length === 0 && <NoCourses/>}
            {!isTeacher && !isStudent && isAdmin && <AdminPanel/>}
        </div>
    );
}
 
export default Home;
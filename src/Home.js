import CourseList from "./CourseList";
import useFetch from "./useFetch";

const Home = () => {
    const {data: courses, isPending, error} = useFetch('http://localhost:8080/api/courses');
    const token = localStorage.getItem('jwtToken');
    const loggedUser = localStorage.getItem('user');

    console.log("TOKEN:");
    console.log(token);
    console.log("LOGGED USER:");
    console.log(loggedUser);

    return ( 
        <div className="home">
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {courses && <CourseList courses={courses} title="All Courses"/>}
        </div>
    );
}
 
export default Home;
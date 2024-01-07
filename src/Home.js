import CourseList from "./CourseList";
import useFetch from "./useFetch";

const Home = () => {
    const {data: courses, isPending, error} = useFetch('http://localhost:8080/api/courses');

    return ( 
        <div className="home">
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {courses && <CourseList courses={courses} title="All Courses"/>}
        </div>
    );
}
 
export default Home;
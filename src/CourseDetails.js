import {useParams} from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "./useFetch";

const CourseDetails = () => {
    const {id} = useParams();
    const {data: course, error, isPending} = useFetch('http://localhost:8080/api/courses/' + id)

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
                    <button>Book</button>
                </article>
            )}
        </div>
    );
}
 
export default CourseDetails;
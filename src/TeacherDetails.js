import {useParams} from "react-router-dom";
import useFetch from "./useFetch";

const TeacherDetails = () => {
    const {id} = useParams();
    const {data: teacher, error, isPending} = useFetch('http://localhost:8080/api/teachers/' + id);

    return (  
        <div className="course-details">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {teacher && (
                <article>
                    <h2>{teacher.firstName} {teacher.lastName}</h2>
                    <br></br>
                    <p>Email: {teacher.email}</p>
                    <p>Phone Number: {teacher.phoneNumber}</p>
                    <p>Education: {teacher.education}</p>
                    <p>Occupation: {teacher.occupation}</p>
                </article>
            )}
        </div>
    );
}
 
export default TeacherDetails;
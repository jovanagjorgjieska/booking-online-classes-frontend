import {useParams} from "react-router-dom";
import useFetch from "./useFetch";

const TeacherDetails = () => {
    const {id} = useParams();
    const token = localStorage.getItem('jwtToken');
    const {data: teacher, error, isPending} = useFetch('http://localhost:8080/api/teachers/' + id, token);

    return (  
        <div className="view-profile">
            <div className="profile-container">
                {isPending && <div>Loading...</div>}
                {error && <div>{error}</div>}
                {teacher && (
                    <div>
                        <h2><span className="profile-label">{teacher.firstName} {teacher.lastName}</span></h2>
                        <p>Email: <span className="profile-label">{teacher.email}</span></p>
                        <p>Phone number: <span className="profile-label">0{teacher.phoneNumber}</span></p>
                        <p>Education: <span className="profile-label">{teacher.education}</span></p>
                        <p>Occupation: <span className="profile-label">{teacher.occupation}</span></p>
                    </div>
                )}
            </div>
        </div>
    );
}
 
export default TeacherDetails;
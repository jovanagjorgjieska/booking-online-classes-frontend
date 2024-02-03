import Enrollments from "./Enrollments";
import NoEnrollments from "./NoEnrollments";
import useFetch from "./useFetch";

const MyEnrollments = () => {
    const token = localStorage.getItem('jwtToken');
    const loggedEmail = localStorage.getItem('user');
    const {data: profile, loggedUserError, isPendingLoggedUser} = useFetch('http://localhost:8080/api/auth/' + loggedEmail, token);

    const apiUrl = `http://localhost:8080/api/enrollments/student/${profile?.userId}`;

    const {data: enrollments, isPending, error} = useFetch(apiUrl, token);

    return (  
        <div className="my-enrollments">
            {enrollments && enrollments.length > 0 && <Enrollments enrollments={enrollments}/>}
            {enrollments && enrollments.length === 0 && <NoEnrollments/>}
        </div>
    );
}
 
export default MyEnrollments;
import useFetch from "./useFetch";
import { useState, useEffect } from "react";
import {Link} from 'react-router-dom';

const ViewProfile = () => {
    const [isTeacher, setIsTeacher] = useState(false);
    const email = localStorage.getItem('user');
    const {data: profile, error, isPending} = useFetch('http://localhost:8080/api/auth/' + email);

    useEffect(() => {
        if (profile?.userRole === 'TEACHER') {
            setIsTeacher(true);
        }
    }, [profile]);

    return (  
        <div className="view-profile">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {profile && (
                <div>
                    <h2>Profile</h2>
                    <p>Email: {profile.email}</p>
                    <p>First name: {profile.firstName}</p>
                    <p>Last name: {profile.lastName}</p>
                    <p>Role: {profile.userRole}</p>
                    <p>Phone number: 0{profile.phoneNumber}</p>
                    {isTeacher && <p>Education: {profile.education}</p>}
                    {isTeacher && <p>Occupation: {profile.occupation}</p>}
                    <Link to="/profile/edit"><button>Edit profile</button></Link>
                </div>
            )}
        </div>
    );
}
 
export default ViewProfile;
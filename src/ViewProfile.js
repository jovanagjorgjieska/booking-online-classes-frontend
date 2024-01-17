import useFetch from "./useFetch";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const ViewProfile = () => {
    const token = localStorage.getItem('jwtToken');
    const [isTeacher, setIsTeacher] = useState(false);
    const email = localStorage.getItem('user');
    const { data: profile, error, isPending } = useFetch('http://localhost:8080/api/auth/' + email, token);

    useEffect(() => {
        if (profile?.userRole === 'TEACHER') {
            setIsTeacher(true);
        }
    }, [profile]);

    return (
        <div className="view-profile">
            <div className="profile-container">
                {isPending && <div>Loading...</div>}
                {error && <div className="error">{error}</div>}
                {profile && (
                    <div>
                        <h2>Profile</h2>
                        <p>Email: <span className="profile-label">{profile.email}</span></p>
                        <p>Name: <span className="profile-label">{profile.firstName} {profile.lastName}</span></p>
                        <p>Role: <span className="profile-label">{profile.userRole}</span></p>
                        <p>Phone number: <span className="profile-label">0{profile.phoneNumber}</span></p>
                        {isTeacher && <p>Education: <span className="profile-label">{profile.education}</span></p>}
                        {isTeacher && <p>Occupation: <span className="profile-label">{profile.occupation}</span></p>}
                        <Link to="/profile/edit"><button>Edit profile</button></Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ViewProfile;

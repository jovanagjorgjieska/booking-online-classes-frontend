import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import useFetch from "./useFetch";
import { useState } from "react";
import { useEffect } from "react";

const Navbar = () => {
    const [token, setToken] = useState(null);
    const [isStudent, setIsStudent] = useState(false);
    const [isTeacher, setIsTeacher] = useState(false);
    const history = useHistory();

    useEffect(() => {
        setToken(localStorage.getItem('jwtToken'));
        setIsStudent(localStorage.getItem('isStudent'));
        setIsTeacher(localStorage.getItem('isTeacher'));
    }, []);
    
    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('user');
        localStorage.removeItem('isTeacher');
        localStorage.removeItem('isStudent');
        localStorage.removeItem('isAdmin');
    
        history.push('/');
    };

    if (!token) {
        return null;
    }

    return ( 
        <nav className="navbar">
            {token && <div style={{ width: '100%'}}>
                <div className="left-navbar">
                    <h1><a href="/home">EduBooking</a></h1>
                </div>
                <div className="right-navbar">
                    {isStudent && <a href="/enrollments">My enrollments</a>}
                    {isStudent && <a href="/profile">Profile</a>}
                    {isTeacher && <a href="/profile">Profile</a>}
                    <a onClick={handleLogout}> <FontAwesomeIcon icon={faSignOutAlt} /></a>
                </div>
            </div>}
        </nav>
    );
}

export default Navbar;
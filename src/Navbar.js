import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const history = useHistory();
    const isStudent = localStorage.getItem('isStudent');
    const isAdmin = localStorage.getItem('isAdmin');
    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('user');
        localStorage.removeItem('isTeacher');
        localStorage.removeItem('isStudent');
        localStorage.removeItem('isAdmin');
    
        history.push('/');
      };

    return ( 
        <nav className="navbar">
            <div className="left-navbar">
                <h1><a href="/home">EduBooking</a></h1>
            </div>
            <div className="right-navbar">
                {isStudent && <a href="/enrollments">My enrollments</a>}
                {!isAdmin && <a href="/profile">Profile</a>}
                <a onClick={handleLogout}> <FontAwesomeIcon icon={faSignOutAlt} /></a>
            </div>
        </nav>
    );
}

export default Navbar;

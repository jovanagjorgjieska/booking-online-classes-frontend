import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const history = useHistory();
    const isTeacher = localStorage.getItem('isTeacher');
    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('user');
        localStorage.removeItem('isTeacher');
    
        history.push('/');
      };

    return ( 
        <nav className="navbar">
            <div className="left-navbar">
                <h1><a href="/home">EduBooking</a></h1>
            </div>
            <div className="right-navbar">
                {!isTeacher && <a href="/myreviews">My reviews</a>}
                <a href="/bookings">My bookings</a>
                <a href="/profile">Profile</a>
                <a onClick={handleLogout}> <FontAwesomeIcon icon={faSignOutAlt} /></a>
            </div>
        </nav>
    );
}

export default Navbar;

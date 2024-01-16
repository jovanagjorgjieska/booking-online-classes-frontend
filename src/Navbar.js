import { useHistory } from "react-router-dom";

const Navbar = () => {
    const history = useHistory();
    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('user');
        localStorage.removeItem('isTeacher');
    
        history.push('/');
      };

    return ( 
        <nav className="navbar">
            <div className="left-navbar">
                <h1><a href="/home">SwiftLearn</a></h1>
            </div>
            <div className="right-navbar">
                <a href="/profile">My reviews</a>
                <a href="/bookings">My bookings</a>
                <a href="/profile">Profile</a>
                <a onClick={handleLogout}>Log out</a>
            </div>
        </nav>
    );
}

export default Navbar;

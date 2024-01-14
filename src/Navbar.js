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
            <h1>SwiftLearn</h1>
            <a href="/home">Home</a>
            <a href="/profile">Profile</a>
            <a onClick={handleLogout}>Log out</a>
        </nav>
    );
}

export default Navbar;

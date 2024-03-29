import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Welcome = () => {
    return (  
        <div className="welcome">
            <h1>Welcome to EduBooking!</h1>
            <p className="welcome-message">Unlock a world of knowledge.</p>
            <Link to="/login"><button className="login-button">Login</button></Link>
            <Link to="/register"><button className="register-button">Register</button></Link>
        </div>
    );
}
 
export default Welcome;
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const NoBookings = () => {
    return (  
        <div className="no-bookings">
            <h2>You haven't book any courses yet!</h2>
            <Link to="/home"><button>Find a course</button></Link>
        </div>
    );
}
 
export default NoBookings;
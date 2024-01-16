import { Link } from "react-router-dom/cjs/react-router-dom.min";

const NoReviews = () => {
    const isTeacher = localStorage.getItem('isTeacher');

    return (  
        <div className="no-reviews">
            <h2>You don't have any reviews yet.</h2>
            {!isTeacher && <Link to="/bookings"><button>Review a course</button></Link>}
        </div>
    );
}
 
export default NoReviews;
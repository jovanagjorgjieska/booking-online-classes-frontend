import { Link } from "react-router-dom/cjs/react-router-dom.min";

const NoEnrollments = () => {
    return (  
        <div className="no-enrollments">
            <h2>You haven't enrolled to any courses yet!</h2>
            <Link to="/home"><button>Find a course</button></Link>
        </div>
    );
}
 
export default NoEnrollments;
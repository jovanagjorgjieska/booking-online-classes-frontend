import { Link } from "react-router-dom/cjs/react-router-dom";

const NoCourses = () => {
    return (  
        <div className="no-courses">
            <h2>You haven't got any courses</h2>
            <Link to="/addCourse"><button>Add new course</button></Link>
        </div>
    );
}
 
export default NoCourses;
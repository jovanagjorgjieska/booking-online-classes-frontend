import { Link } from "react-router-dom/cjs/react-router-dom";

const NoCourses = () => {
    const isTeacher = localStorage.getItem('isTeacher');

    return (  
        <div className="no-courses">
            <h2>You haven't got any courses</h2>
            {isTeacher && <Link to="/addCourse"><button>Add new course</button></Link>}
        </div>
    );
}
 
export default NoCourses;
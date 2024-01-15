import {Link} from 'react-router-dom';

const CourseList = ({courses, title}) => {

    const isTeacher = localStorage.getItem('isTeacher');

    return (
        <div className="course-list">
            <h2>{title}</h2>
            <div className="courses">
            {courses.map((course) => (
                <div className="course-preview" key={course.id}>
                    <Link to={`/courses/${course.courseId}`}>
                        <p className="course-type">{course.courseType} COURSE</p>
                        <h2>{course.courseName}</h2>
                        <p>Teacher: {course.teacher.firstName} {course.teacher.lastName}</p>
                        <p>Price: {course.price}€</p>
                    </Link>
                </div>
            ))}
            </div>
            {isTeacher && <div className="center-button-container">
                <Link to="/addCourse"><button>Add new course</button></Link>
            </div>}
        </div>
    );
}
 
export default CourseList;
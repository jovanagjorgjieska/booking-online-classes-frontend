import {Link} from 'react-router-dom';

const CourseList = ({courses, title}) => {

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
        </div>
    );
}
 
export default CourseList;
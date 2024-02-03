import {useParams} from "react-router-dom";
import useFetch from "./useFetch";

const CourseEnrollments = () => {
    const token = localStorage.getItem('jwtToken');
    const isTeacher = localStorage.getItem('isTeacher');
    const {id} = useParams();
    const {data: course, error, isPending} = useFetch('http://localhost:8080/api/courses/' + id, token);
    const {data: enrollments, errorEnrollments, isPendingEnrollments} = useFetch('http://localhost:8080/api/enrollments/course/' + id, token);
    console.log(course);
    console.log(enrollments);

    return (
        <div className="course-enrollments">
            <h2>{course?.courseName} enrollments</h2>
            {isTeacher && enrollments && enrollments.length && enrollments.map((enrollment) => (
                <div key={enrollment.id}>
                    <table className="enrollments-table">
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>Enrollment date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{enrollment.student.firstName} {enrollment.student.lastName}</td>
                                <td>{enrollment.enrollmentDate}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
}
 
export default CourseEnrollments;
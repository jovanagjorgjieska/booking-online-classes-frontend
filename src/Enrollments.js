import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Enrollments = ({ enrollments }) => {
    const token = localStorage.getItem('jwtToken');
    const isTeacher = localStorage.getItem('isTeacher');

    const handleDelete = (enrollmentId) => {
    
        fetch('http://localhost:8080/api/enrollments/' + enrollmentId, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            })
                .then(response => {
                    if (response.ok) {
                        window.location.reload();
                    } else {
                        throw new Error("Cancellation failed");
                    }
                })
                .catch(error => {
                    console.error("Cancellation error:", error);
                });
    }

    return (  
        <div className="enrollments">
            <h2>My enrollments</h2>
            {!isTeacher && enrollments.map((enrollment) => (
                <div className="enrollment-preview" key={enrollment.id}>
                    <div className="enrollment-left">
                        <h3>{enrollment.course.courseName}</h3>
                        <p>Teacher: {enrollment.teacher.firstName} {enrollment.teacher.lastName}</p>
                        <p>Enrollment Date: {enrollment.enrollmentDate}</p>
                    </div>
                    <div className="enrollment-right">
                        <Link to={`/addReview?courseId=${enrollment.course.courseId}`}>
                            <button id='review-button'>Write a review</button>
                        </Link>
                        <button id='cancel-button' onClick={() => handleDelete(enrollment.enrollmentId)}>Cancel</button>
                    </div>
                </div>
            ))}
            {isTeacher && enrollments.map((enrollment) => (
                <div className="enrollment-preview" key={enrollment.id}>
                    <div className="enrollment-left">
                        <h3>{enrollment.course.courseName}</h3>
                        <p>Student: {enrollment.student.firstName} {enrollment.student.lastName}</p>
                        <p>Enrollment Date: {enrollment.enrollmentDate}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Enrollments;

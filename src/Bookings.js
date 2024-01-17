import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Bookings = ({ bookings }) => {
    const token = localStorage.getItem('jwtToken');
    const isTeacher = localStorage.getItem('isTeacher');

    const handleDelete = (bookingId) => {
    
        fetch('http://localhost:8080/api/bookings/' + bookingId, {
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
        <div className="bookings">
            <h2>My bookings</h2>
            {!isTeacher && bookings.map((booking) => (
                <div className="booking-preview" key={booking.id}>
                    <div className="booking-left">
                        <h3>{booking.course.courseName}</h3>
                        <p>Teacher: {booking.teacher.firstName} {booking.teacher.lastName}</p>
                        <p>Booking Date: {booking.bookingDate}</p>
                    </div>
                    <div className="booking-right">
                        <Link to={`/addReview?courseId=${booking.course.courseId}`}>
                            <button id='review-button'>Write a review</button>
                        </Link>
                        <button id='cancel-button' onClick={() => handleDelete(booking.bookingId)}>Cancel</button>
                    </div>
                </div>
            ))}
            {isTeacher && bookings.map((booking) => (
                <div className="booking-preview" key={booking.id}>
                    <div className="booking-left">
                        <h3>{booking.course.courseName}</h3>
                        <p>Student: {booking.student.firstName} {booking.student.lastName}</p>
                        <p>Booking Date: {booking.bookingDate}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Bookings;

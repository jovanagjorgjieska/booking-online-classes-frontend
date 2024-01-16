import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.css';

const Bookings = ({ bookings }) => {
    const isTeacher = localStorage.getItem('isTeacher');

    return (  
        <div className="bookings">
            <h2>My bookings</h2>
            {!isTeacher && bookings.map((booking) => (
                <div className="booking-preview">
                    <div className="booking-left">
                        <h3>{booking.course.courseName}</h3>
                        <p>Teacher: {booking.teacher.firstName} {booking.teacher.lastName}</p>
                        <p>Booking Date: {booking.bookingDate}</p>
                    </div>
                    <div className="booking-right">
                        <button id='review-button'>Write a review</button>
                        <button id='cancel-button'>Cancel</button>
                    </div>
                </div>
            ))}
            {isTeacher && bookings.map((booking) => (
                <div className="booking-preview">
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

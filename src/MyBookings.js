import { useState } from "react";
import Bookings from "./Bookings";
import NoBookings from "./NoBookings";
import useFetch from "./useFetch";

const MyBookings = () => {
    const isTeacher = localStorage.getItem('isTeacher');
    const loggedEmail = localStorage.getItem('user');
    const {data: profile, loggedUserError, isPendingLoggedUser} = useFetch('http://localhost:8080/api/auth/' + loggedEmail);

    const apiUrl = isTeacher
        ? `http://localhost:8080/api/bookings/teacher/${profile?.userId}`
        : `http://localhost:8080/api/bookings/student/${profile?.userId}`;

    const {data: bookings, isPending, error} = useFetch(apiUrl);

    return (  
        <div className="my-bookings">
            {bookings && bookings.length > 0 && <Bookings bookings={bookings}/>}
            {bookings && bookings.length === 0 && <NoBookings/>}
        </div>
    );
}
 
export default MyBookings;
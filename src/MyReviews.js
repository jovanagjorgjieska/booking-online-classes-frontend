import NoReviews from "./NoReviews";
import Reviews from "./Reviews";
import useFetch from "./useFetch";

const MyReviews = () => {
    const token = localStorage.getItem('jwtToken');
    const isTeacher = localStorage.getItem('isTeacher');
    const loggedEmail = localStorage.getItem('user');
    const {data: profile, loggedUserError, isPendingLoggedUser} = useFetch('http://localhost:8080/api/auth/' + loggedEmail, token);

    const apiUrl = isTeacher
    ? `http://localhost:8080/api/reviews/teacher/${profile?.userId}`
    : `http://localhost:8080/api/reviews/student/${profile?.userId}`;

const {data: reviews, isPending, error} = useFetch(apiUrl, token);

    return (  
        <div className="my-reviews">
            {reviews && reviews.length > 0 && <Reviews reviews={reviews}/>}
            {reviews && reviews.length === 0 && <NoReviews/>}
        </div>
    );
}
 
export default MyReviews;
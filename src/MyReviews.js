import NoReviews from "./NoReviews";
import Reviews from "./Reviews";
import useFetch from "./useFetch";

const MyReviews = () => {
    const isTeacher = localStorage.getItem('isTeacher');
    const loggedEmail = localStorage.getItem('user');
    const {data: profile, loggedUserError, isPendingLoggedUser} = useFetch('http://localhost:8080/api/auth/' + loggedEmail);

    const apiUrl = isTeacher
    ? `http://localhost:8080/api/reviews/teacher/${profile?.userId}`
    : `http://localhost:8080/api/reviews/student/${profile?.userId}`;

const {data: reviews, isPending, error} = useFetch(apiUrl);

    return (  
        <div className="my-reviews">
            {reviews && reviews.length > 0 && <Reviews reviews={reviews}/>}
            {reviews && reviews.length === 0 && <NoReviews/>}
        </div>
    );
}
 
export default MyReviews;
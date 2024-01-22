import { useParams } from "react-router-dom/cjs/react-router-dom";
import useFetch from "./useFetch";
import NoReviews from "./NoReviews";
import Reviews from "./Reviews";
import CourseReviewList from "./CourseReviewList";
import NoReviewsCourse from "./NoReviewsCourse";

const CourseReviews = () => {
    const {id} = useParams();
    console.log(id);
    const token = localStorage.getItem('jwtToken');
    const {data: course, error, isPending} = useFetch('http://localhost:8080/api/courses/' + id, token);
    
    const {data: reviews, isPendingReviews, errorReviews} = useFetch('http://localhost:8080/api/reviews/course/' + id, token);

    if(reviews && reviews.length > 0) {
        console.log(reviews);
    }
    return (  
        <div className="course-reviews">
            {reviews && reviews.length > 0 && <CourseReviewList reviews={reviews} title={course?.courseName}/>}
            {reviews && reviews.length === 0 && <NoReviewsCourse/>}
        </div>
    );
}
 
export default CourseReviews;
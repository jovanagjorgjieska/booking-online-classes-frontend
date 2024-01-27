const CourseReviewList = ({ reviews, title }) => {
    return (  
        <div className="course-review-list">
            <h2 className="reviews-title">{title}'s reviews</h2>
            {reviews.map((review) => (
                <div className="course-review" key={review.id}>
                    <p className="course-review-score">Score: {review.score}</p>
                    <h3>{review.author}:</h3>
                    <p className='review-desc'>"{review.description}"</p>
                </div>
            ))}
        </div>
    );
}
 
export default CourseReviewList;
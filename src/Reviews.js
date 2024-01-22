import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Reviews = ({ reviews }) => {
    const token = localStorage.getItem('jwtToken');

    const handleDelete = (reviewId) => {
    
        fetch('http://localhost:8080/api/reviews/' + reviewId, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            })
                .then(response => {
                    if (response.ok) {
                        window.location.reload();
                    } else {
                        throw new Error("Deletion failed");
                    }
                })
                .catch(error => {
                    console.error("Deletion error:", error);
                });
    }

    return (  
        <div className="reviews-container">
            <h2 className="reviews-title">My Reviews</h2>
            {reviews.map((review) => (
                <div className="review-preview" key={review.id}>
                    <div className="review-left">
                        <h3>{review.course.courseName}</h3>
                        <p className="score">Score: {review.score}</p>
                        <p className="description"><span style={{ fontWeight: 'bold' }}>Description: </span><span className='review-desc'>"{review.description}"</span></p>
                    </div>
                    <div className="review-right">
                        <Link to={`/myreviews/${review.reviewId}/edit`}>
                            <button id='review-button'>Edit</button>
                        </Link>
                        <div>
                            <button id='cancel-button' onClick={() => handleDelete(review.reviewId)}>Delete</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
 
export default Reviews;

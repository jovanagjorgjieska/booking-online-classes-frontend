import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import useFetch from "./useFetch";
import StarRating from './StarRating';

const AddReview = () => {
    const token = localStorage.getItem('jwtToken');
    const [score, setScore] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');
    const loggedEmail = localStorage.getItem('user');
    const {data: profile, loggedUserError, isPendingLoggedUser} = useFetch('http://localhost:8080/api/auth/' + loggedEmail, token);
    const [isPending, setIsPending] = useState(false);

    const location = useLocation();
    const courseId = new URLSearchParams(location.search).get("courseId");

    const history = useHistory();

    const handleSave = (e) => {
        e.preventDefault();

        const newReview = {
            author,
            courseId,
            score,
            description
        }

        setIsPending(true);

        fetch('http://localhost:8080/api/reviews', {
            method: 'POST',
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(newReview)
        })
            .then(() => {
                console.log("New review added");
                setIsPending(false);
                history.push(`/reviews/${courseId}`);
            })
            .catch(error => {
                console.error("Error adding review", error);
                setIsPending(false);
            });
    }

    return (  
        <div className="add-review">
            <h2>Add Review</h2>
            <form onSubmit={handleSave}>
                <label>Review's author:</label>
                <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Enter a name or nickname that will be shown on the review"
                />
                <label>How would you score this course from 1-5?</label>
                <StarRating
                    totalStars={5}
                    onChange={(newValue) => setScore(newValue)}
                />
                <label>How would you describe your experience with this course?</label>
                <textarea
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your experience in a few sentences"
                />
                <button>Save review</button>
            </form>
        </div>
    );
}

export default AddReview;

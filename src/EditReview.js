import { useState, useEffect } from "react";
import {useParams} from "react-router-dom";
import useFetch from "./useFetch";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const EditReview = () => {
    const {id} = useParams();
    const {data: review, error, isPending} = useFetch('http://localhost:8080/api/reviews/' + id);

    const [studentId, setStudentId] = useState('');
    const [score, setScore] = useState('');
    const [description, setDescription] = useState('');

    const history = useHistory();

    useEffect(() => {
        if(review) {
            setStudentId(review.student.userId || null);
            setScore(review.score || '');
            setDescription(review.description || '');
        }
    }, [review]);

    const handleSave = (e) => {
        e.preventDefault();

        const reviewToUpdate = { 
            studentId, 
            id, 
            score, 
            description };

        fetch('http://localhost:8080/api/reviews/' + id, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(reviewToUpdate)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Saving failed");
                }
                return response.json();
            })
            .then(data => {
                history.push("/reviews");
            })
            .catch(error => {
                console.log("Error occured.");
            });
    }

    return (  
        <div className="edit-review">
            <h2>Edit Review</h2>
            <form onSubmit={handleSave}>
                <label>How would you score this course from 1-5?</label>
                <input
                    type="number"
                    required
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                />
                <label>How would you describe your experience with this course?</label>
                <textarea
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button>Save review</button>
            </form>
        </div>
    );
}
 
export default EditReview;
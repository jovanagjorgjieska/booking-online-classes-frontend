import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import useFetch from "./useFetch";

const AddReview = () => {
    const [score, setScore] = useState('');
    const [description, setDescription] = useState('');
    const loggedEmail = localStorage.getItem('user');
    const {data: profile, loggedUserError, isPendingLoggedUser} = useFetch('http://localhost:8080/api/auth/' + loggedEmail);
    const [studentId, setStudentId] = useState('');
    const [isPending, setIsPending] = useState(false);

    const location = useLocation();
    const courseId = new URLSearchParams(location.search).get("courseId");

    const history = useHistory();

    useEffect(() => {
        if (profile) {
            setStudentId(profile.userId || '');
        }
    }, [profile]);

    const handleSave = (e) => {
        e.preventDefault();

        const newReview = {
            studentId,
            courseId,
            score,
            description
        }

        setIsPending(true);

        fetch('http://localhost:8080/api/reviews', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newReview)
        })
            .then(() => {
                console.log("New review added");
                setIsPending(false);
                history.push('/reviews');
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

export default AddReview;

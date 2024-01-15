import { useState, useEffect } from "react";
import useFetch from "./useFetch";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const AddCourse = () => {
    const loggedEmail = localStorage.getItem('user');
    const {data: profile, error, isPending} = useFetch('http://localhost:8080/api/auth/' + loggedEmail);

    const [courseName, setCourseName] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [availablePositions, setAvailablePositions] = useState('');
    const [courseType, setCourseType] = useState('');
    const [courseCategory, setCourseCategory] = useState('');
    const [price, setPrice] = useState('');

    const [isPendingSave, setIsPendingSave] = useState(false);

    const[teacherId, setTeacherId] = useState('');

    const history = useHistory();

    useEffect(() => {
        if (profile) {
            setTeacherId(profile.userId || '');
        }
    }, [profile]);

    const handleSave = (e) => {
        e.preventDefault();

        const courseToSave = { 
            courseName, 
            courseDescription, 
            availablePositions, 
            courseType, 
            courseCategory,
            price };

        setIsPendingSave(true);

        fetch('http://localhost:8080/api/teachers/' + teacherId + '/courses', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(courseToSave)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Saving failed");
                }
                return response.json();
            })
            .then(data => {
                setIsPendingSave(false);

                history.push(`/home`);
            })
            .catch(error => {
                setIsPendingSave(false);
            });
    }

    return (  
        <div className="add-course">
            <h2>Add Course</h2>
            <form onSubmit={handleSave}>
                <label>Course name:</label>
                <input
                    type="text"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                />
                <label>Course description:</label>
                <textarea
                    value={courseDescription}
                    onChange={(e) => setCourseDescription(e.target.value)}
                ></textarea>
                <label>Available positions:</label>
                <input
                    type="number"
                    value={availablePositions}
                    onChange={(e) => setAvailablePositions(e.target.value)}
                />
                <label>Course type:</label>
                <select
                    value={courseType}
                    onChange={(e) => setCourseType(e.target.value)}
                >
                    <option value="INDIVIDUAL">Individual course</option>
                    <option value="GROUP">Group course</option>
                </select>
                <label>Course category:</label>
                <select
                    value={courseCategory}
                    onChange={(e) => setCourseCategory(e.target.value)}
                >
                    <option value="PROGRAMMING_LANGUAGES">Programming languages</option>
                    <option value="WEB_DEVELOPMENT">Web development</option>
                    <option value="DATA_SCIENCE">Data science</option>
                    <option value="SOFTWARE_ENGINEERING">Software engineering</option>
                    <option value="SOFTWARE_TESTING">Software testing</option>
                    <option value="LANGUAGES">Languages</option>
                    <option value="MATHEMATICS">Mathematics</option>
                    <option value="OTHER">Other</option>
                </select>
                <label>Price:</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <button>Save course</button>
            </form>
        </div>
    );
}
 
export default AddCourse;
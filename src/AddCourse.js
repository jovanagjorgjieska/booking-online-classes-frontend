import { useState, useEffect } from "react";
import useFetch from "./useFetch";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const AddCourse = () => {
    const token = localStorage.getItem('jwtToken');
    const loggedEmail = localStorage.getItem('user');
    const {data: profile, error, isPending} = useFetch('http://localhost:8080/api/auth/' + loggedEmail, token);

    const [courseName, setCourseName] = useState('');
    const [description, setDescription] = useState('');
    const [details, setDetails] = useState('');
    const [totalPositions, setTotalPositions] = useState('');
    const [courseType, setCourseType] = useState('');
    const [courseCategory, setCourseCategory] = useState('');
    const [price, setPrice] = useState('');
    const [isTotalPositionsDisabled, setIsTotalPositionsDisabled] = useState(true);

    const [isPendingSave, setIsPendingSave] = useState(false);

    const[teacherId, setTeacherId] = useState('');

    const history = useHistory();

    useEffect(() => {
        if (profile) {
            setTeacherId(profile.userId || '');
        }
    }, [profile]);

    useEffect(() => {
        if (courseType) {
            setIsTotalPositionsDisabled(courseType !== "GROUP");
        }
    }, [courseType]);

    const handleSave = (e) => {
        e.preventDefault();

        const courseToSave = { 
            courseName, 
            description, 
            details,
            totalPositions, 
            courseType, 
            courseCategory,
            price };

        setIsPendingSave(true);

        fetch('http://localhost:8080/api/teachers/' + teacherId + '/courses', {
            method: 'POST',
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
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
                <label>Short description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Write few sentences explaining the purpose of your course"
                ></textarea>
                <label>Details:</label>
                <textarea
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Provide details for your course: what will be covered, organization, timeline etc."
                ></textarea>
                <label>Course type:</label>
                <select
                    value={courseType}
                    onChange={(e) => setCourseType(e.target.value)}
                    required
                >
                    <option value="" disabled hidden>Choose a type</option>
                    <option value="INDIVIDUAL">Individual course</option>
                    <option value="GROUP">Group course</option>
                </select>
                <label>Course category:</label>
                <select
                    value={courseCategory}
                    onChange={(e) => setCourseCategory(e.target.value)}
                    required
                >
                    <option value="" disabled hidden>Choose a category</option>
                    <option value="PROGRAMMING_LANGUAGES">Programming languages</option>
                    <option value="WEB_DEVELOPMENT">Web development</option>
                    <option value="DATA_SCIENCE">Data science</option>
                    <option value="SOFTWARE_ENGINEERING">Software engineering</option>
                    <option value="SOFTWARE_TESTING">Software testing</option>
                    <option value="LANGUAGES">Languages</option>
                    <option value="MATHEMATICS">Mathematics</option>
                    <option value="OTHER">Other</option>
                </select>
                <label>Available positions:</label>
                        <input
                            type="number"
                            value={totalPositions}
                            onChange={(e) => setTotalPositions(e.target.value)}
                            disabled={isTotalPositionsDisabled}
                        />
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
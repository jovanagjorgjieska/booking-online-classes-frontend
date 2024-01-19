import { useEffect } from "react";
import { useState } from "react";
import {useParams} from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import useFetch from "./useFetch";

const EditCourse = () => {
    const {id} = useParams();
    const token = localStorage.getItem('jwtToken');
    const {data: course, error, isPending} = useFetch('http://localhost:8080/api/courses/' + id, token);

    const [courseName, setCourseName] = useState('');
    const [description, setDescription] = useState('');
    const [details, setDetails] = useState('');
    const [availablePositions, setAvailablePositions] = useState('');
    const [courseType, setCourseType] = useState('');
    const [courseCategory, setCourseCategory] = useState('');
    const [price, setPrice] = useState('');

    const[teacherId, setTeacherId] = useState('');
    const[courseId, setCourseId] = useState('');

    const [isPendingEdit, setIsPendingEdit] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if(course) {
            setCourseName(course.courseName || '');
            setDescription(course.description || '');
            setDetails(course.details || '')
            setAvailablePositions(course.availablePositions || 0);
            setCourseType(course.courseType || '');
            setCourseCategory(course.courseCategory || '');
            setPrice(course.price || '');

            setCourseId(course.courseId);
            setTeacherId(course.teacher.userId);
        }
    }, [course]);

    const handleSave = (e) => {
        e.preventDefault();

        const courseToUpdate = { 
            courseName, 
            description, 
            details,
            availablePositions, 
            courseType, 
            courseCategory,
            price };

        setIsPendingEdit(true);

        fetch('http://localhost:8080/api/teachers/' + teacherId + '/courses/' + courseId, {
            method: 'PUT',
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(courseToUpdate)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Saving failed");
                }
                return response.json();
            })
            .then(data => {
                setIsPendingEdit(false);

                history.push(`/courses/${courseId}`);
            })
            .catch(error => {
                setIsPendingEdit(false);
            });
    }

    const handleDelete = (e) => {
        e.preventDefault();
    
        const isConfirmed = window.confirm("Are you sure you want to delete this course?");
    
        if (isConfirmed) {
            fetch('http://localhost:8080/api/teachers/' + teacherId + '/courses/' + courseId, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            })
                .then(response => {
                    if (response.ok) {
                        history.push('/home');
                    } else {
                        throw new Error("Deletion failed");
                    }
                })
                .catch(error => {
                    console.error("Deletion error:", error);
                });
        }
    }

    return (  
        <div className="edit-course">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {course && (
                <div>
                    <h2>Edit Course</h2>
                    <form onSubmit={handleSave}>
                        <label>Course name:</label>
                        <input
                            type="text"
                            value={courseName}
                            onChange={(e) => setCourseName(e.target.value)}
                        />
                        <label>Course description:</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Write few sentences explaining the purpose of your course"
                        ></textarea>
                        <label>Course details:</label>
                        <textarea
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            placeholder="Provide details for your course: what will be covered, organization, timeline etc."
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
                        <button id="saveButton">Save</button>
                    </form>
                    <button id="deleteButton" onClick={handleDelete}>Delete course</button>
                </div>
            )}
        </div>
    );
}
 
export default EditCourse;
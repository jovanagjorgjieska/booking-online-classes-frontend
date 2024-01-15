import { useState, useEffect } from "react";
import useFetch from "./useFetch";
import { useHistory } from "react-router-dom";

const EditProfile = () => {
    const loggedEmail = localStorage.getItem('user');
    const {data: profile, error, isPending} = useFetch('http://localhost:8080/api/auth/' + loggedEmail);

    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [education, setEducation] = useState('');
    const [occupation, setOccupation] = useState('');
    const [isPendingEdit, setIsPendingEdit] = useState(false);
    const [isTeacher, setIsTeacher] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (profile?.userRole === 'TEACHER') {
            setIsTeacher(true);
        }
    }, [profile]);

    useEffect(() => {
        if (profile) {
            setEmail(profile.email || '');
            setFirstName(profile.firstName || '');
            setLastName(profile.lastName || '');
            setPhoneNumber(profile.phoneNumber || '');
            setPassword(null);
            setEducation(profile.education || '');
            setOccupation(profile.occupation || '');
        }
    }, [profile]);

    const handleSave = (e) => {
        e.preventDefault();

        const userToUpdate = { 
            email, 
            password, 
            firstName, 
            lastName, 
            education: isTeacher ? education : '', 
            occupation: isTeacher ? occupation : '',
            phoneNumber };

        setIsPendingEdit(true);

        const apiUrl = isTeacher
            ? 'http://localhost:8080/api/teachers/' + profile.userId
            : 'http://localhost:8080/api/students/' + profile.userId;

        fetch(apiUrl, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userToUpdate)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Saving failed");
                }
                return response.json();
            })
            .then(data => {
                setIsPendingEdit(false);

                history.push('/profile');
            })
            .catch(error => {
                setIsPendingEdit(false);
            });
    }

    const handleDelete = (e) => {
        e.preventDefault();
    
        const isConfirmed = window.confirm("Are you sure you want to delete your profile?");
    
        if (isConfirmed) {
            const apiUrl = isTeacher
                ? 'http://localhost:8080/api/teachers/' + profile.userId
                : 'http://localhost:8080/api/students/' + profile.userId;
    
            fetch(apiUrl, {
                method: 'DELETE',
            })
                .then(response => {
                    if (response.ok) {
                        localStorage.removeItem('jwtToken');
                        localStorage.removeItem('user');
                        localStorage.removeItem('isTeacher');
                        history.push('/'); // Manually navigate to the home route
                    } else {
                        throw new Error("Deletion failed");
                    }
                })
                .catch(error => {
                    // Handle error during deletion
                    console.error("Deletion error:", error);
                });
        }
    }

    return (  
        <div className="edit-profile">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {profile && (
                <div>
                    <h2>Edit Profile</h2>
                    <form onSubmit={handleSave}>
                        <label>Email:</label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label>First Name:</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <label>Last Name:</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <label>Phone number:</label>
                        <input
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        {isTeacher && <label>Education:</label>}
                        {isTeacher && <input
                            type="text"
                            value={education}
                            onChange={(e) => setEducation(e.target.value)}
                        />}
                        {isTeacher && <label>Occupation:</label>}
                        {isTeacher && <input
                            type="text"
                            value={occupation}
                            onChange={(e) => setOccupation(e.target.value)}
                        />}
                        {!isPendingEdit && <button id="saveButton">Save</button>}
                        {isPendingEdit && <button disabled>Save loading...</button>}
                    </form>
                    <button id="deleteButton" onClick={handleDelete}>Delete profile</button>
                </div>
            )}
        </div>
    );
}
 
export default EditProfile;
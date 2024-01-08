import { useState } from "react";
import { useHistory } from "react-router-dom";

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [role, setRole] = useState('STUDENT');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const history = useHistory();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+])/;
        return passwordRegex.test(password);
    };

    const handleRegister = (e) => {
        e.preventDefault();

        const errors = {};

        if (!validatePassword(password)) {
            errors.password = "Password should contain an uppercase letter and a special character.";
        }

        if (!validateEmail(email)) {
            errors.email = "Invalid email format.";
        }

        if (password !== repeatPassword) {
            errors.repeatPassword = "Passwords do not match.";
        }

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        setValidationErrors({});

        const userToRegister = { email, password, firstName, lastName, role, phoneNumber };

        setIsPending(true);

        fetch('http://localhost:8080/api/auth/register', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userToRegister)
        })
            .then(() => {
                console.log("New user added");
                setIsPending(false);
                history.push('/login');
            })
            .catch(error => {
                console.error("Error registering user:", error);
                setIsPending(false);
            });
    }


    return (  
        <div className="register">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <label>First name:</label>
                <input
                    type="text"
                    required
                    value={firstName}
                    onChange = {(e) => setFirstName(e.target.value)}
                />
                <label>Last name:</label>
                <input
                    type="text"
                    required
                    value={lastName}
                    onChange = {(e) => setLastName(e.target.value)}
                />
                <label>Phone number:</label>
                <input
                    type="text"
                    required
                    value={phoneNumber}
                    onChange = {(e) => setPhoneNumber(e.target.value)}
                />
                <label>I want to register as:</label>
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="STUDENT">Student</option>
                    <option value="TEACHER">Teacher</option>
                </select>
                <label>Email:</label>
                <input
                    type="text"
                    required
                    value={email}
                    onChange = {(e) => setEmail(e.target.value)}
                />
                <label>Password:</label>
                <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label>Repeat password:</label>
                <input
                    type="password"
                    required
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                />
                {validationErrors.email && <p>{validationErrors.email}</p>}
                {!validationErrors.repeatPassword && validationErrors.password && <p>{validationErrors.password}</p>}
                {validationErrors.repeatPassword && <p>{validationErrors.repeatPassword}</p>}
                
                {!isPending && <button>Register</button>}
                {isPending && <button disabled>Register loading...</button>}
            </form>
        </div>
    );
}
 
export default Register;
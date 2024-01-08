import { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [validationError, setValidationError] = useState(null);
    const history = useHistory();

    const handleLogin = (e) => {
        e.preventDefault();

        const userCredentials = { email, password };

        setIsPending(true);

        fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userCredentials)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Authentication failed");
                }
                return response.json();
            })
            .then(data => {
                const jwtToken = data.token;

                localStorage.setItem('jwtToken', jwtToken);

                setIsPending(false);

                history.push('/');
            })
            .catch(error => {
                console.error("Error authenticating:", error);
                setValidationError("Invalid email or password");
                setIsPending(false);
            });
    }

    return (
        <div className="login">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <label>Email:</label>
                <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>Password:</label>
                <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {validationError && <p>{validationError}</p>}
                {!isPending && <button>Login</button>}
                {isPending && <button disabled>Login loading...</button>}
            </form>
        </div>
    );
}

export default Login;
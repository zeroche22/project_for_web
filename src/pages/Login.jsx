import React, { useState, useEffect } from 'react';
import users from '../data/users.json';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        const savedUser = sessionStorage.getItem('loggedInUser');
        if (savedUser) {
            setLoggedInUser(JSON.parse(savedUser));
        }
    }, []);

    const sanitizeInput = (input) => {
        const temp = input.trim();
        return temp.replace(/<[^>]*>?/gm, '');
    };

    const handleLogin = (e) => {
        e.preventDefault();

        const sanitizedUsername = sanitizeInput(username);
        const sanitizedPassword = sanitizeInput(password);

        const user = users.find(u => 
            u.username === sanitizedUsername && u.password === sanitizedPassword
        );
        if (user) {
            sessionStorage.setItem('loggedInUser', JSON.stringify(user)); // Save to session
            setLoggedInUser(user);
            setMessage(`Welcome, ${user.username}!`);

            window.location.href = '/home'; 
        } else {
            setMessage('Invalid username or password.');
        }
    };

  return (
        <div className="container d-flex align-items-center justify-content-center min-vh-100 bg-light">
            <div className="card p-4 shadow" style={{ width: '400px' }}>
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Login
                    </button>
                </form>
                {message && (
                    <div className="alert alert-danger mt-3 text-center" role="alert">
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Login;
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const savedUser = sessionStorage.getItem('loggedInUser');
        if (savedUser) {
            setLoggedInUser(JSON.parse(savedUser));
        }
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('loggedInUser');
        setLoggedInUser(null);
        navigate('/'); 
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light p-3">
            <div className="container d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <Link className="btn btn-outline-primary me-2" to="/home">
                        Home
                    </Link>
                    <Link className="btn btn-outline-success me-2" to="/news">
                        News
                    </Link>
                    <Link className="btn btn-outline-info me-2" to="/quizzes">
                        Quizzes
                    </Link>
                </div>

                <div className="d-flex align-items-center">
                    {loggedInUser ? (
                        <>
                            <span className="me-3 fw-bold">
                                Welcome, {loggedInUser.username}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="btn btn-outline-danger"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link className="btn btn-outline-primary" to="/">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
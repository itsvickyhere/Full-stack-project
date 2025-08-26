// //src/components/Header.js
// import React from 'react';
// import { Navbar, Nav, Container } from 'react-bootstrap';
// import { Link, useLocation } from 'react-router-dom';
// import { FaHeart, FaDatabase } from 'react-icons/fa';

// export default function Header() {
//     const location = useLocation();

//     const isActive = (path) => {
//         return location.pathname === path;
//     };

//     return (
//         <Navbar bg="white" expand="lg" className="shadow-sm">
//             <Container>
//                 <Navbar.Brand as={Link} to="/" className="fw-bold text-primary">
//                     <FaHeart className="me-2" />
//                     Donation Platform
//                 </Navbar.Brand>

//                 <Navbar.Toggle aria-controls="basic-navbar-nav" />
//                 <Navbar.Collapse id="basic-navbar-nav">
//                     <Nav className="me-auto">
//                         <Nav.Link 
//                             as={Link} 
//                             to="/" 
//                             className={`fw-semibold ${isActive('/') ? 'text-primary' : 'text-muted'}`}
//                         >
//                             Home
//                         </Nav.Link>
//                         <Nav.Link 
//                             as={Link} 
//                             to="/causes" 
//                             className={`fw-semibold ${isActive('/causes') ? 'text-primary' : 'text-muted'}`}
//                         >
//                             Causes
//                         </Nav.Link>
//                         <Nav.Link 
//                             as={Link} 
//                             to="/about" 
//                             className={`fw-semibold ${isActive('/about') ? 'text-primary' : 'text-muted'}`}
//                         >
//                             About
//                         </Nav.Link>
//                     </Nav>

//                 </Navbar.Collapse>
//             </Container>
//         </Navbar>
//     );
// }

//src/components/Header.js
import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user")); // get logged in user

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        localStorage.removeItem("user"); // clear session
        navigate("/login"); // redirect to login
    };

    return (
        <Navbar bg="white" expand="lg" className="shadow-sm">
            <Container>
                <Navbar.Brand as={Link} to="/" className="fw-bold text-primary">
                    <FaHeart className="me-2" />
                    Donation Platform
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link
                            as={Link}
                            to="/"
                            className={`fw-semibold ${isActive('/') ? 'text-primary' : 'text-muted'}`}
                        >
                            Home
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/causes"
                            className={`fw-semibold ${isActive('/causes') ? 'text-primary' : 'text-muted'}`}
                        >
                            Causes
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/about"
                            className={`fw-semibold ${isActive('/about') ? 'text-primary' : 'text-muted'}`}
                        >
                            About
                        </Nav.Link>

                        {user && (
                            <Nav.Link
                                as={Link}
                                to="/dashboard"
                                className={`fw-semibold ${isActive('/dashboard') ? 'text-primary' : 'text-muted'}`}
                            >
                                Dashboard
                            </Nav.Link>
                        )}

                    </Nav>

                    {/* Show user info + logout when logged in */}
                    {user && (
                        <div className="d-flex align-items-center">
                            <span className="me-3 text-muted fw-semibold">
                                Hi, {user.name}
                            </span>
                            <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </div>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
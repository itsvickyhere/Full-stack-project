import React, { useState, useEffect } from "react";
import { Card, Row, Col, Badge, Spinner } from "react-bootstrap";
import { getActiveCauses, getNGOs } from "../utils/api";
import { FaHeart, FaUsers, FaHandHoldingHeart, FaChartLine } from 'react-icons/fa';

export default function Home() {
    const [stats, setStats] = useState({
        totalCauses: 0,
        totalGoalAmount: 0,
        totalCurrentAmount: 0,
        totalNGOs: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const [causes, ngos] = await Promise.all([
                    getActiveCauses(),
                    getNGOs()
                ]);

                const totalGoal = causes.reduce((sum, cause) => sum + parseFloat(cause.targetAmount), 0);
                const totalCurrent = causes.reduce((sum, cause) => sum + parseFloat(cause.currentAmount || 0), 0);

                setStats({
                    totalCauses: causes.length,
                    totalGoalAmount: totalGoal,
                    totalCurrentAmount: totalCurrent,
                    totalNGOs: ngos.length
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const progressPercentage = stats.totalGoalAmount > 0 
        ? Math.round((stats.totalCurrentAmount / stats.totalGoalAmount) * 100) 
        : 0;

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <Spinner animation="border" variant="primary" size="lg" />
                <p className="mt-3">Loading platform statistics...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-5">
                <Card className="border-danger">
                    <Card.Body className="text-center text-danger">
                        <h4>Error Loading Data</h4>
                        <p>{error}</p>
                        <small>Please check if the backend is running</small>
                    </Card.Body>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            {/* Hero Section */}
            <div className="text-center mb-5">
                <h1 className="display-4 fw-bold text-primary mb-3">
                    <FaHeart className="me-3" />
                    Donation Management Platform
                </h1>
                <p className="lead text-muted">
                    Empowering NGOs and connecting generous donors to create positive change in the world
                </p>
            </div>

            {/* Statistics Cards */}
            <Row className="g-4 mb-5">
                <Col md={3}>
                    <Card className="h-100 border-0 shadow-sm text-center">
                        <Card.Body className="p-4">
                            <div className="text-primary mb-3">
                                <FaUsers size={40} />
                            </div>
                            <h3 className="fw-bold">{stats.totalNGOs}</h3>
                            <p className="text-muted mb-0">Registered NGOs</p>
                        </Card.Body>
                    </Card>
                </Col>
                
                <Col md={3}>
                    <Card className="h-100 border-0 shadow-sm text-center">
                        <Card.Body className="p-4">
                            <div className="text-success mb-3">
                                <FaHandHoldingHeart size={40} />
                            </div>
                            <h3 className="fw-bold">{stats.totalCauses}</h3>
                            <p className="text-muted mb-0">Active Causes</p>
                        </Card.Body>
                    </Card>
                </Col>
                
                <Col md={3}>
                    <Card className="h-100 border-0 shadow-sm text-center">
                        <Card.Body className="p-4">
                            <div className="text-info mb-3">
                                <FaChartLine size={40} />
                            </div>
                            <h3 className="fw-bold">₹{stats.totalGoalAmount.toLocaleString('en-IN')}</h3>
                            <p className="text-muted mb-0">Total Goal Amount</p>
                        </Card.Body>
                    </Card>
                </Col>
                
                <Col md={3}>
                    <Card className="h-100 border-0 shadow-sm text-center">
                        <Card.Body className="p-4">
                            <div className="text-warning mb-3">
                                <FaHeart size={40} />
                            </div>
                            <h3 className="fw-bold">₹{stats.totalCurrentAmount.toLocaleString('en-IN')}</h3>
                            <p className="text-muted mb-0">Total Raised</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Progress Overview */}
            <Card className="border-0 shadow-sm mb-5">
                <Card.Body className="p-4">
                    <h4 className="mb-4">Overall Progress</h4>
                    <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="fw-semibold">Total Fundraising Progress</span>
                            <Badge bg="primary" className="fs-6">{progressPercentage}%</Badge>
                        </div>
                        <div className="progress" style={{ height: '20px' }}>
                            <div 
                                className="progress-bar bg-gradient" 
                                role="progressbar" 
                                style={{ width: `${progressPercentage}%` }}
                                aria-valuenow={progressPercentage} 
                                aria-valuemin="0" 
                                aria-valuemax="100"
                            >
                                {progressPercentage > 10 && `${progressPercentage}%`}
                            </div>
                        </div>
                    </div>
                    <div className="row text-center">
                        <div className="col-md-6">
                            <small className="text-muted">Goal Amount</small>
                            <p className="h5 mb-0 fw-bold">₹{stats.totalGoalAmount.toLocaleString('en-IN')}</p>
                        </div>
                        <div className="col-md-6">
                            <small className="text-muted">Amount Raised</small>
                            <p className="h5 mb-0 fw-bold text-success">₹{stats.totalCurrentAmount.toLocaleString('en-IN')}</p>
                        </div>
                    </div>
                </Card.Body>
            </Card>

            {/* Call to Action */}
            <Card className="border-0 bg-primary text-white text-center">
                <Card.Body className="p-5">
                    <h3 className="mb-3">Ready to Make a Difference?</h3>
                    <p className="lead mb-4">
                        Browse our active causes and contribute to meaningful projects that align with your values.
                    </p>
                    <a href="/causes" className="btn btn-light btn-lg px-4">
                        Explore Causes
                    </a>
                </Card.Body>
            </Card>
        </div>
    );
}

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Row, Col, ProgressBar, Badge, Spinner, Alert } from 'react-bootstrap';
import { getCauseById, getDonationsByCause, getNGOs } from '../utils/api';
import DonationForm from './DonationForm';
import { FaHandHoldingHeart, FaUsers, FaCalendarAlt, FaRupeeSign, FaHeart } from 'react-icons/fa';

export default function CauseDetails() {
    const { id } = useParams();
    const [cause, setCause] = useState(null);
    const [donations, setDonations] = useState([]);
    const [ngos, setNgos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const [causeData, donationsData, ngosData] = await Promise.all([
                    getCauseById(id),
                    getDonationsByCause(id),
                    getNGOs()
                ]);
                setCause(causeData);
                setDonations(donationsData);
                setNgos(ngosData);
            } catch (err) {
                setError('Failed to load cause details');
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);

    const handleDonationSuccess = async () => {
        // Refresh the data after successful donation
        try {
            const [causeData, donationsData, ngosData] = await Promise.all([
                getCauseById(id),
                getDonationsByCause(id),
                getNGOs()
            ]);
            setCause(causeData);
            setDonations(donationsData);
            setNgos(ngosData);
        } catch (err) {
            setError('Failed to refresh cause details');
        }
    };

    const getNgoName = (ngoId) => {
        if (!ngos || !Array.isArray(ngos)) return 'Unknown NGO';
        const ngo = ngos.find(n => n.id === ngoId);
        return ngo ? ngo.name : 'Unknown NGO';
    };

    const calculateProgress = () => {
        if (!cause || !cause.targetAmount) return 0;
        return Math.min(Math.round((cause.currentAmount / cause.targetAmount) * 100), 100);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <Spinner animation="border" variant="primary" size="lg" />
                <p className="mt-3">Loading cause details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-5">
                <Alert variant="danger">
                    <Alert.Heading>Error Loading Cause</Alert.Heading>
                    <p>failed to load cause</p>
                </Alert>
            </div>
        );
    }

    if (!cause) {
        return (
            <div className="container mt-5">
                <Alert variant="warning">
                    <Alert.Heading>Cause Not Found</Alert.Heading>
                    <p>The cause you're looking for doesn't exist or has been removed.</p>
                </Alert>
            </div>
        );
    }

    const progress = calculateProgress();
    const daysLeft = Math.ceil((new Date(cause.endDate) - new Date()) / (1000 * 60 * 60 * 24));

    return (
        <div className="container mt-4">
            {/* Cause Header */}
            <Card className="border-0 shadow-sm mb-4">
                <Card.Body className="p-4">
                    <div className="text-center mb-4">
                        <div className="text-primary mb-3">
                            <FaHandHoldingHeart size={60} />
                        </div>
                        <h1 className="fw-bold text-primary">{cause.title}</h1>
                        {cause.description && (
                            <p className="lead text-muted">{cause.description}</p>
                        )}
                        <div className="mt-3">
                            <Badge 
                                bg={daysLeft > 7 ? 'success' : daysLeft > 3 ? 'warning' : 'danger'}
                                className="fs-6 me-2"
                            >
                                {daysLeft > 0 ? `${daysLeft} days left` : 'Ending soon'}
                            </Badge>
                            <Badge bg="info" className="fs-6">
                                <FaUsers className="me-1" />
                                {getNgoName(cause.ngoId)}
                            </Badge>
                        </div>
                    </div>

                    {/* Progress Section */}
                    <div className="mb-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="mb-0">Fundraising Progress</h4>
                            <Badge bg="primary" className="fs-5">{progress}%</Badge>
                        </div>
                        <div className="mb-3">
                            <p>Current: {formatCurrency(cause.currentAmount || 0)}</p>
                        </div>
                        <ProgressBar 
                            now={progress} 
                            variant={progress > 80 ? 'success' : progress > 50 ? 'info' : 'warning'}
                            className="mb-3"
                            style={{ height: '15px' }}
                        />
                        <Row className="text-center">
                            <Col md={4}>
                                <div className="p-3 bg-light rounded">
                                    <h6 className="text-muted mb-1">Goal Amount</h6>
                                    <h4 className="fw-bold text-primary mb-0">
                                        {formatCurrency(cause.targetAmount)}
                                    </h4>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className="p-3 bg-light rounded">
                                    <h6 className="text-muted mb-1">Amount Raised</h6>
                                    <h4 className="fw-bold text-success mb-0">
                                        {formatCurrency(cause.currentAmount || 0)}
                                    </h4>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className="p-3 bg-light rounded">
                                    <h6 className="text-muted mb-1">Remaining</h6>
                                    <h4 className="fw-bold text-info mb-0">
                                        {formatCurrency(Math.max(0, cause.targetAmount - (cause.currentAmount || 0)))}
                                    </h4>
                                </div>
                            </Col>
                        </Row>
                    </div>

                    {/* Campaign Details */}
                    <Row className="text-center">
                        <Col md={6}>
                            <div className="p-3">
                                <FaCalendarAlt className="text-primary mb-2" size={24} />
                                <h6 className="text-muted mb-1">Campaign Start</h6>
                                <p className="fw-bold mb-0">{formatDate(cause.startDate)}</p>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="p-3">
                                <FaCalendarAlt className="text-warning mb-2" size={24} />
                                <h6 className="text-muted mb-1">Campaign End</h6>
                                <p className="fw-bold mb-0">{formatDate(cause.endDate)}</p>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            {/* Donations Section */}
            <Card className="border-0 shadow-sm mb-4">
                <Card.Header className="bg-light">
                    <h4 className="mb-0">
                        <FaHeart className="me-2 text-primary" />
                        Recent Donations
                    </h4>
                </Card.Header>
                <Card.Body>
                    {donations.length === 0 ? (
                        <div className="text-center py-4">
                            <FaHeart className="text-muted mb-3" size={40} />
                            <h5 className="text-muted">No donations yet</h5>
                            <p className="text-muted">Be the first to make a difference!</p>
                        </div>
                    ) : (
                        <div className="row">
                            {donations.slice(0, 6).map((donation) => (
                                <div key={donation.id} className="col-md-6 col-lg-4 mb-3">
                                    <div className="p-3 border rounded">
                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                            <h6 className="mb-0">
                                                {donation.isAnonymous ? 'Anonymous' : donation.donorName}
                                            </h6>
                                            <Badge bg="success" className="fs-6">
                                                {formatCurrency(donation.amount)}
                                            </Badge>
                                        </div>
                                        {donation.message && (
                                            <p className="text-muted small mb-2">
                                                "{donation.message}"
                                            </p>
                                        )}
                                        <small className="text-muted">
                                            {new Date(donation.donationDate).toLocaleDateString()}
                                        </small>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </Card.Body>
            </Card>

            {/* Donation Form */}
            <DonationForm causeId={id} onDonationSuccess={handleDonationSuccess} />
        </div>
    );
}

import React from "react";
import { Card, Row, Col, Badge } from "react-bootstrap";
import {
  FaHeart,
  FaHandHoldingHeart,
  FaShieldAlt,
  FaChartLine,
  FaUsers,
  FaCheckCircle,
  FaInfoCircle,
} from "react-icons/fa";

export default function About() {
  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold text-primary mb-3">
          <FaHeart className="me-3" />
          About Our Platform
        </h1>
        <p className="lead text-muted">
          Empowering change through transparent, secure, and impactful donations
        </p>
      </div>

      {/* --- Test-required text block --- */}
      <Card className="mb-4 border-0 shadow-sm">
        <Card.Body className="text-center">
          <p>
            About this platform enables you to support NGOs and causes you care
            about. Learn how the donation process works and make an impact
            today!
          </p>
        </Card.Body>
      </Card>

      {/* Mission Section */}
      <Card className="mb-4 border-0 shadow-sm">
        <Card.Body>
          <h2 className="fw-bold mb-3 text-primary">
            <FaInfoCircle className="me-2" />
            Our Mission
          </h2>
          <p className="text-muted">
            The Donation Platform connects generous donors with verified NGOs
            and meaningful causes. We believe in transparency, accountability,
            and making a real difference in people's lives.
          </p>
        </Card.Body>
      </Card>

      {/* How It Works Section */}
      <Card className="mb-4 border-0 shadow-sm">
        <Card.Body>
          <h2 className="fw-bold mb-4 text-primary">
            <FaHandHoldingHeart className="me-2" />
            How It Works
          </h2>
          <Row className="g-4">
            <Col md={3} sm={6}>
              <Card className="h-100 border-0 text-center bg-light">
                <Card.Body>
                  <Badge bg="primary" className="mb-2 fs-6">
                    1
                  </Badge>
                  <h5 className="fw-bold">Browse Causes</h5>
                  <p className="text-muted small">
                    Explore active causes listed by registered NGOs
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} sm={6}>
              <Card className="h-100 border-0 text-center bg-light">
                <Card.Body>
                  <Badge bg="primary" className="mb-2 fs-6">
                    2
                  </Badge>
                  <h5 className="fw-bold">Choose & Learn</h5>
                  <p className="text-muted small">
                    Find a cause you care about and view detailed information
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} sm={6}>
              <Card className="h-100 border-0 text-center bg-light">
                <Card.Body>
                  <Badge bg="primary" className="mb-2 fs-6">
                    3
                  </Badge>
                  <h5 className="fw-bold">Donate Securely</h5>
                  <p className="text-muted small">
                    Fill the donation form and submit your contribution
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} sm={6}>
              <Card className="h-100 border-0 text-center bg-light">
                <Card.Body>
                  <Badge bg="primary" className="mb-2 fs-6">
                    4
                  </Badge>
                  <h5 className="fw-bold">Track Progress</h5>
                  <p className="text-muted small">
                    Monitor impact as causes reach their funding goals
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Why Choose Us Section */}
      <Card className="mb-4 border-0 shadow-sm">
        <Card.Body>
          <h2 className="fw-bold mb-4 text-primary">
            <FaShieldAlt className="me-2" />
            Why Choose Us?
          </h2>
          <Row className="g-4">
            <Col md={3} sm={6}>
              <Card className="h-100 border-0 text-center bg-light">
                <Card.Body>
                  <FaCheckCircle
                    className="feature-icon mb-2 text-success"
                    size={32}
                  />
                  <h5 className="fw-bold">Verified NGOs</h5>
                  <p className="text-muted small">
                    All organizations are thoroughly verified before inclusion
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} sm={6}>
              <Card className="h-100 border-0 text-center bg-light">
                <Card.Body>
                  <FaChartLine
                    className="feature-icon mb-2 text-info"
                    size={32}
                  />
                  <h5 className="fw-bold">Real-time Progress</h5>
                  <p className="text-muted small">
                    Track donation progress and impact in real-time
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} sm={6}>
              <Card className="h-100 border-0 text-center bg-light">
                <Card.Body>
                  <FaUsers
                    className="feature-icon mb-2 text-primary"
                    size={32}
                  />
                  <h5 className="fw-bold">Community Impact</h5>
                  <p className="text-muted small">
                    Join a community of donors making real change
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} sm={6}>
              <Card className="h-100 border-0 text-center bg-light">
                <Card.Body>
                  <FaHeart
                    className="feature-icon mb-2 text-danger"
                    size={32}
                  />
                  <h5 className="fw-bold">Flexible Giving</h5>
                  <p className="text-muted small">
                    Multiple donation options including anonymous giving
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}

import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const TemplateF = () => {
  return (
    <Container
      fluid
      className="p-0 mb-4 px-5"
      style={{
        width: "210mm",
        minHeight: "297mm",
        margin: "auto",
        backgroundColor: "#fff",
        padding: "5mm",
        fontFamily: "sans-serif",
        color: "#333",
        boxShadow: "0 0 5px rgba(0,0,0,0.2)",
      }}
    >
      <Card className="p-0 border-0 text-start">
        <Card.Body className="p-4">
          {/* Header Section */}
          <Row className="mb-4">
            <Col md={3} className="text-center mb-3 mb-md-0">
              <div
                className="rounded-circle mx-auto mb-3"
                style={{
                  width: "120px",
                  height: "120px",
                  backgroundColor: "#f8f9fa",
                  backgroundImage:
                    "linear-gradient(45deg, #e9ecef 25%, transparent 25%), linear-gradient(-45deg, #e9ecef 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e9ecef 75%), linear-gradient(-45deg, transparent 75%, #e9ecef 75%)",
                  backgroundSize: "20px 20px",
                  backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "48px",
                  color: "#6c757d",
                  border: "2px solid #dee2e6",
                }}
              >
                👤
              </div>
            </Col>
            <Col md={9}>
              <h1
                className="mb-2"
                style={{ color: "#2c3e50", fontWeight: "bold" }}
              >
                Daniel Gallego
              </h1>
              <h5 className="text-muted mb-3">Marketing Manager</h5>
              <Row className="small text-muted">
                <Col md={6}>
                  <div className="mb-2">📞 +34 000 000</div>
                  <div className="mb-2">✉️ daniel@email.com</div>
                </Col>
                <Col md={6}>
                  <div className="mb-2">📍 Barcelona, Spain</div>
                  <div className="mb-2">🔗 linkedin.com/in/daniel</div>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row>
            {/* Left Column */}
            <Col md={8}>
              {/* Professional Summary */}
              <div className="mb-4">
                <h5 className="mb-3 text-primary border-bottom pb-2">
                  Professional Summary
                </h5>
                <p className="text-justify" style={{ lineHeight: "1.6" }}>
                  Dynamic marketing professional with 8+ years of experience in
                  digital marketing, brand management, and campaign strategy.
                  Proven track record of driving revenue growth through
                  innovative marketing initiatives and data-driven decision
                  making. Expert in marketing automation, social media strategy,
                  and cross-functional team leadership.
                </p>
              </div>

              {/* Experience */}
              <div className="mb-4">
                <h5 className="mb-3 text-primary border-bottom pb-2">
                  Experience
                </h5>

                <div className="mb-3">
                  <h6 className="mb-1 font-weight-bold">Marketing Manager</h6>
                  <div className="text-muted small mb-2">
                    TechCorp Solutions • 2021 - Present
                  </div>
                  <ul className="small" style={{ lineHeight: "1.5" }}>
                    <li>
                      Led integrated marketing campaigns resulting in 40%
                      increase in lead generation
                    </li>
                    <li>
                      Managed marketing budget of €500K+ and improved ROI by 35%
                    </li>
                    <li>
                      Developed and executed comprehensive digital marketing
                      strategies
                    </li>
                  </ul>
                </div>

                <div className="mb-3">
                  <h6 className="mb-1 font-weight-bold">
                    Assistant Marketing Manager
                  </h6>
                  <div className="text-muted small mb-2">
                    Digital Innovations Ltd • 2019 - 2021
                  </div>
                  <ul className="small" style={{ lineHeight: "1.5" }}>
                    <li>
                      Coordinated multi-channel marketing campaigns across
                      digital platforms
                    </li>
                    <li>
                      Analyzed campaign performance and optimized strategies for
                      better conversion
                    </li>
                    <li>
                      Collaborated with sales team to align marketing efforts
                      with revenue goals
                    </li>
                  </ul>
                </div>

                <div className="mb-3">
                  <h6 className="mb-1 font-weight-bold">Junior Manager</h6>
                  <div className="text-muted small mb-2">
                    StartUp Ventures • 2018 - 2019
                  </div>
                  <ul className="small" style={{ lineHeight: "1.5" }}>
                    <li>
                      Supported senior management in developing marketing
                      strategies
                    </li>
                    <li>
                      Managed social media accounts and increased engagement by
                      60%
                    </li>
                    <li>Conducted market research and competitive analysis</li>
                  </ul>
                </div>

                <div className="mb-3">
                  <h6 className="mb-1 font-weight-bold">Sales Manager</h6>
                  <div className="text-muted small mb-2">
                    Regional Sales Corp • 2016 - 2018
                  </div>
                  <ul className="small" style={{ lineHeight: "1.5" }}>
                    <li>
                      Achieved 120% of annual sales targets for two consecutive
                      years
                    </li>
                    <li>
                      Built and maintained relationships with key enterprise
                      clients
                    </li>
                    <li>Trained and mentored junior sales representatives</li>
                  </ul>
                </div>

                <div className="mb-3">
                  <h6 className="mb-1 font-weight-bold">Sales Marketing</h6>
                  <div className="text-muted small mb-2">
                    Growth Marketing Inc • 2015 - 2016
                  </div>
                  <ul className="small" style={{ lineHeight: "1.5" }}>
                    <li>
                      Executed targeted email marketing campaigns with 25% open
                      rates
                    </li>
                    <li>
                      Supported lead qualification and nurturing processes
                    </li>
                    <li>
                      Maintained CRM systems and sales pipeline documentation
                    </li>
                  </ul>
                </div>
              </div>

              {/* Education */}
              <div className="mb-4">
                <h5 className="mb-3 text-primary border-bottom pb-2">
                  Education
                </h5>

                <div className="mb-2">
                  <h6 className="mb-1 font-weight-bold">
                    Master's in Marketing
                  </h6>
                  <div className="text-muted small">
                    University of Barcelona • 2014 - 2015
                  </div>
                </div>

                <div className="mb-2">
                  <h6 className="mb-1 font-weight-bold">
                    Bachelor's Degree in Business
                  </h6>
                  <div className="text-muted small">
                    University of Madrid • 2010 - 2014
                  </div>
                </div>
              </div>
            </Col>

            {/* Right Column */}
            <Col md={4}>
              {/* Skills */}
              <div className="mb-4">
                <h5 className="mb-3 text-primary">Skills</h5>
                <div className="small">
                  <div className="mb-2">
                    <div className="font-weight-bold mb-1">
                      Marketing Strategy
                    </div>
                    <div className="progress" style={{ height: "6px" }}>
                      <div
                        className="progress-bar bg-success"
                        style={{ width: "90%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="font-weight-bold mb-1">
                      Digital Marketing
                    </div>
                    <div className="progress" style={{ height: "6px" }}>
                      <div
                        className="progress-bar bg-success"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="font-weight-bold mb-1">
                      Social Media Marketing
                    </div>
                    <div className="progress" style={{ height: "6px" }}>
                      <div
                        className="progress-bar bg-info"
                        style={{ width: "80%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="font-weight-bold mb-1">
                      Content Marketing
                    </div>
                    <div className="progress" style={{ height: "6px" }}>
                      <div
                        className="progress-bar bg-info"
                        style={{ width: "75%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="font-weight-bold mb-1">
                      Analytics & Reporting
                    </div>
                    <div className="progress" style={{ height: "6px" }}>
                      <div
                        className="progress-bar bg-warning"
                        style={{ width: "70%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="font-weight-bold mb-1">
                      Project Management
                    </div>
                    <div className="progress" style={{ height: "6px" }}>
                      <div
                        className="progress-bar bg-warning"
                        style={{ width: "75%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div className="mb-4">
                <h5 className="mb-3 text-primary">Languages</h5>
                <div className="small">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="font-weight-bold">Spanish</span>
                    <span className="text-muted">Native</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="font-weight-bold">English</span>
                    <span className="text-muted">Fluent</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="font-weight-bold">French</span>
                    <span className="text-muted">Intermediate</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="font-weight-bold">German</span>
                    <span className="text-muted">Basic</span>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div className="mb-4">
                <h5 className="mb-3 text-primary">Certifications</h5>
                <div className="small">
                  <div className="mb-2">• Google Analytics Certified</div>
                  <div className="mb-2">• Facebook Blueprint Certification</div>
                  <div className="mb-2">• HubSpot Inbound Marketing</div>
                  <div className="mb-2">• Advanced Google AdWords</div>
                  <div className="mb-2">• Salesforce Marketing Cloud</div>
                  <div className="mb-2">• Project Management Professional</div>
                </div>
              </div>

              {/* Interests */}
              <div className="mb-4">
                <h5 className="mb-3 text-primary">Interests</h5>
                <div className="small">
                  <div className="mb-1">• Digital Innovation</div>
                  <div className="mb-1">• Data Analytics</div>
                  <div className="mb-1">• Travel & Photography</div>
                  <div className="mb-1">• Technology Trends</div>
                  <div className="mb-1">• Team Sports</div>
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TemplateF;

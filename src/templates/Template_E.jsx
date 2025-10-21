import React from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const TemplateE = () => {
  const skills = [
    "Cash register operation",
    "POS system operation",
    "Sales expertise",
    "Teamwork",
    "Inventory management",
    "Account money handling",
    "Documentation and recordkeeping",
    "Strong marketing experience",
  ];

  const experiences = [
    {
      title: "Retail Sales Associate",
      company: "Ministries of Zanzibar",
      location: "Zanzibar, Tanzania",
      period: "02/2007 - Current",
      responsibilities: [
        "Increased monthly sales 50% by effective upselling and cross-selling products to maximized profitability",
        "Maintained detailed knowledge about product lines, promotions and pricing policies to identify and communicate options",
        "Managed payments and minimized account drawers to meet financial targets",
      ],
    },
    {
      title: "Barista",
      company: "Stone Town Cafe & Barista",
      location: "Tanzania",
      period: "03/2005 - 01/2007",
      responsibilities: [
        "Gained extensive drinks and expertise, boosting average ticket sales by 9.50M TZS weekly",
        "Managed ordering card all front-line customers daily, providing fresh experience service",
        "Developed brewing skill sets to prepare diverse set of coffee, tea and specialty beverage items",
        "Developed creative and appealing drink art techniques and enhanced experience in methods",
      ],
    },
    {
      title: "Cashier/Attendant",
      company: "Magomeni Fuel Point",
      location: "Zanzibar, Tanzania",
      period: "04/2003 - 02/2005",
      responsibilities: [
        "Processed fuel point transactions accurately and promptly to prevent long customer wait times",
        "Completed daily maintenance items, including restocking, mopping and daily cleaning of equipment and",
        "Efficiently made change for cash transactions",
        "Maintained clean and professional environment",
        "Completed opening, closing and shift change tasks to promote more efficiency",
        "Monitored and ensured cleanliness daily stock and supplies to identify and order needed purchases",
        "Used knowledge and Sales preparation skills combined with organized training",
      ],
    },
  ];

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
      <Container>
        <Row>
          <Col>
            <Card className="border-0 p-0 text-start">
              {/* Header */}
              <Card.Header
                className="bg-success text-white text-center p-4 border-0"
                style={{ borderRadius: "0.375rem 0.375rem 0 0" }}
              >
                <h1 className="display-6 fw-bold mb-2">Mariam Mussa</h1>
                <div className="d-flex flex-wrap justify-content-center gap-3 small">
                  <span>📞 +255 757 456</span>
                  <span>✉️ m.mussa@gmail.tz</span>
                  <span>📍 Zanzibar, Tanzania</span>
                </div>
              </Card.Header>

              <Card.Body className="p-4">
                {/* Summary */}
                <section className="mb-4">
                  <h5 className="text-success border-bottom border-success pb-2 mb-3">
                    Summary
                  </h5>
                  <p className="text-muted">
                    Current financial Sales professional with solid
                    understanding of retail dynamics, marketing and customer
                    service. A graduate of marketing experience demonstrating
                    analytical problem solving, strong mathematical competence,
                    dialing systems along with commercial management and
                    operational retail customer minds and robust expectations.
                    Demonstrated record of exceeding revenue targets by
                    leveraging communication skills and sales expertise.
                  </p>
                </section>

                {/* Skills */}
                <section className="mb-4">
                  <h5 className="text-success border-bottom border-success pb-2 mb-3">
                    Skills
                  </h5>
                  <Row className="g-3">
                    <Col md={6}>
                      <ul className="list-unstyled">
                        {skills.slice(0, 3).map((skill, index) => (
                          <li key={index} className="mb-2">
                            <Badge bg="light" text="dark" className="me-2">
                              •
                            </Badge>
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </Col>
                    <Col md={6}>
                      <ul className="list-unstyled">
                        {skills.slice(3).map((skill, index) => (
                          <li key={index + 3} className="mb-2">
                            <Badge bg="light" text="dark" className="me-2">
                              •
                            </Badge>
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </Col>
                  </Row>
                </section>

                {/* Experience */}
                <section className="mb-4">
                  <h5 className="text-success border-bottom border-success pb-2 mb-3">
                    Experience
                  </h5>

                  {experiences.map((exp, index) => (
                    <div key={index} className="mb-4">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                          <h5 className="mb-1 text-dark">{exp.title}</h5>
                          <p className="text-muted mb-1">
                            {exp.company}, {exp.location}
                          </p>
                        </div>
                        <Badge bg="success" className="fs-6 fw-normal">
                          {exp.period}
                        </Badge>
                      </div>
                      <ul className="text-muted small">
                        {exp.responsibilities.map((resp, respIndex) => (
                          <li key={respIndex}>{resp}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>

                {/* Education */}
                <section className="mb-3">
                  <h5 className="text-success border-bottom border-success pb-2 mb-3">
                    Education
                  </h5>
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h5 className="mb-1 text-dark">
                        B.A. in Sociology and Anthropology
                      </h5>
                      <p className="text-muted mb-0">
                        Zanzibar University, Zanzibar, Tanzania
                      </p>
                    </div>
                    <Badge bg="success" className="fs-6 fw-normal">
                      05/2010
                    </Badge>
                  </div>
                </section>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default TemplateE;

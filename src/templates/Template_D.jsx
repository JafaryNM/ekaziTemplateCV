import React from "react";
import { Container, Row, Col, Card, Badge, ListGroup } from "react-bootstrap";

const TemplateD = () => {
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
      <Row>
        <Col className="pb-5">
          <Card className=" border-0 p-0">
            {/* Header */}
            <Card.Header
              className="text-white text-center py-4"
              style={{ backgroundColor: "#2c3e50" }}
            >
              <h1 className="display-5 fw-bold mb-3">Mariam Mussa</h1>
              <div className="d-flex flex-wrap justify-content-center gap-4">
                <span>📞 +255 123 456</span>
                <span>✉️ m.mussa@gmail.tz</span>
                <span>📍 Zanzibar, Tanzania</span>
              </div>
            </Card.Header>

            <Card.Body className="p-0">
              {/* Summary */}
              <Card className="mb-2 border-0 p-0">
                <Card.Body className="d-flex text-start gap-5">
                  <h4 className="text-primary mb-3">
                    <strong>Summary</strong>
                  </h4>
                  <p className="text-muted mb-0">
                    Customer-focused Retail Sales professional with solid
                    understanding of retail dynamics, marketing and customer
                    service. Offering 5 years of marketing experience
                    demonstrating analytical problem solving, strong
                    mathematical competence, critical thinking, and commercial
                    management skills. Demonstrated record of exceeding revenue
                    targets by leveraging communication skills and sales
                    expertise.
                  </p>
                </Card.Body>
              </Card>

              {/* Skills */}
              <Card className="mb-2 border-0 p-0">
                <Card.Body className="d-flex gap-5 text-start">
                  <h4 className="text-primary mb-3">
                    <strong>Skills</strong>
                  </h4>
                  <ListGroup variant="flush" className="d-flex flex-wrap">
                    <ListGroup.Item className="border-0 px-0">
                      <Badge bg="primary" className="me-2">
                        ✓
                      </Badge>
                      Cash register operation
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 px-0">
                      <Badge bg="primary" className="me-2">
                        ✓
                      </Badge>
                      Inventory management
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 px-0">
                      <Badge bg="primary" className="me-2">
                        ✓
                      </Badge>
                      Account money handling
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 px-0">
                      <Badge bg="primary" className="me-2">
                        ✓
                      </Badge>
                      Documentation and recordkeeping
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 px-0">
                      <Badge bg="primary" className="me-2">
                        ✓
                      </Badge>
                      Retail merchandising expertise
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 px-0">
                      <Badge bg="primary" className="me-2">
                        ✓
                      </Badge>
                      POS system operation
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 px-0">
                      <Badge bg="primary" className="me-2">
                        ✓
                      </Badge>
                      Sales expertise
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 px-0">
                      <Badge bg="primary" className="me-2">
                        ✓
                      </Badge>
                      Teamwork
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>

              {/* Experience */}
              <Card className="mb-4 border-0 p-0 text-start">
                <Card.Body className="d-flex gap-5">
                  <h4 className="text-primary mb-4">
                    <strong>Experience</strong>
                  </h4>

                  <div>
                    {/* Job 1 */}
                    <div
                      className="mb-4 pb-3"
                      style={{ borderBottom: "1px solid #e9ecef" }}
                    >
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                          <h5 className="fw-bold mb-1">
                            Retail Sales Associate
                          </h5>
                          <p className="text-muted mb-1">
                            Ministries of Zanzibar, Zanzibar, Tanzania
                          </p>
                        </div>
                        <Badge bg="success" className="fs-6">
                          02/2017 - Current
                        </Badge>
                      </div>
                      <ul className="text-muted">
                        <li>
                          Increased monthly sales 50% by effectively upselling
                          and cross-selling products to maximize profitability
                        </li>
                        <li>
                          Maintained detailed knowledge about product lines,
                          promotions, attention to detail and pricing by
                          identify and communicate options
                        </li>
                        <li>
                          Managed payments and minimized account drawers to meet
                          financial targets
                        </li>
                      </ul>
                    </div>

                    {/* Job 2 */}
                    <div
                      className="mb-4 pb-3"
                      style={{ borderBottom: "1px solid #e9ecef" }}
                    >
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                          <h5 className="fw-bold mb-1">Barista</h5>
                          <p className="text-muted mb-1">
                            Stone Town Cafe, Zanzibar, Tanzania
                          </p>
                        </div>
                        <Badge bg="success" className="fs-6">
                          03/2015 - 01/2017
                        </Badge>
                      </div>
                      <ul className="text-muted">
                        <li>
                          Gained extensive drinks and expertise, boosting
                          average order value by 2,500 TZS (7% weekly)
                        </li>
                        <li>
                          Managed morning rush of over 200 customers daily while
                          ensuring fresh beverages and excellent customer
                          service
                        </li>
                        <li>
                          Trained within 6moff at five team in new smoothie
                          program offerings and promotions
                        </li>
                        <li>
                          Developed creative and appealing drink art techniques
                          that result in personal customers to methods
                        </li>
                      </ul>
                    </div>

                    {/* Job 3 */}
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                          <h5 className="fw-bold mb-1">Cashier/Attendant</h5>
                          <p className="text-muted mb-1">
                            Magomeni Fuel Point, Zanzibar, Tanzania
                          </p>
                        </div>
                        <Badge bg="success" className="fs-6">
                          01/2014 - 02/2015
                        </Badge>
                      </div>
                      <ul className="text-muted">
                        <li>
                          Processed fuel point transactions accurately and
                          promptly to prevent long customer wait times
                        </li>
                        <li>
                          Efficiently processed menu items total 750 terminal,
                          modifying with substitutions and add-ons as requested
                        </li>
                        <li>Accurately made change for cash transactions</li>
                        <li>
                          Verified orders and liaised them for easy transport
                        </li>
                        <li>
                          Completed opening, closing and shift change task to
                          promote place efficiency
                        </li>
                        <li>
                          Monitored and ensured food stock and supplies to
                          reorder on time
                        </li>
                        <li>
                          Used extensive and food preparation areas sales and
                          old environment for maximum efficiency
                        </li>
                      </ul>
                    </div>
                  </div>
                </Card.Body>
              </Card>

              {/* Education */}
              <Card className="border-0 bg-light p-0 text-start">
                <Card.Body className="d-flex gap-5">
                  <h4 className="text-primary mb-3">
                    <strong>Education</strong>
                  </h4>
                  <div className="d-flex justify-content-between align-items-center gap-5">
                    <div>
                      <h5 className="fw-bold mb-1">
                        B.A. In Sociology And Anthropology
                      </h5>
                      <p className="text-muted mb-0">
                        Zanzibar University, Zanzibar, Tanzania
                      </p>
                    </div>
                    <Badge bg="info" className="fs-6">
                      08/2018
                    </Badge>
                  </div>
                </Card.Body>
              </Card>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TemplateD;

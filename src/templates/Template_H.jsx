import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";

const TemplateH = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://ekazi.co.tz/api/cv/cv_builder/28100")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const profile = data.applicant_profile || {};
  const experiences = data.experience || [];
  const education = data.education || [];
  const skills = data.knowledge || [];
  const contact = {
    phone: data.phone?.number,
    email: data.email?.email,
    address: data.address?.street,
  };

  return (
    <Container
      fluid
      style={{
        width: "210mm",
        margin: "auto",
        backgroundColor: "#000",
        padding: "5mm",
        fontFamily: "sans-serif",
        color: "#333",
        boxShadow: "0 0 5px rgba(0,0,0,0.2)",
      }}
    >
      <Row className="text-start">
        {/* LEFT SECTION */}
        <Col md={8} className="bg-white shadow-sm p-4">
          <h2 className="fw-bold">{profile.fullname}</h2>
          <p className="text-muted">{profile.title || "Professional"}</p>

          {/* Career Objective */}
          <div className="text-start mb-4">
            <h4>Career Objective</h4>
            <p>{data.objective || "No objective provided."}</p>
          </div>

          {/* Contact Info */}
          <Card className="mb-4 border-0 p-0">
            <Card.Body>
              <Card.Title className="fw-semibold text-uppercase mb-2">
                Contact Me
              </Card.Title>
              <ListGroup variant="flush" className="text-start">
                {contact.phone && (
                  <ListGroup.Item>📞 {contact.phone}</ListGroup.Item>
                )}
                <ListGroup.Item>🌐 {profile.website || "N/A"}</ListGroup.Item>
                {contact.email && (
                  <ListGroup.Item>✉️ {contact.email}</ListGroup.Item>
                )}
                {contact.address && (
                  <ListGroup.Item>🏠 {contact.address}</ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>

          {/* Job Experience */}
          <Card className="border-0 p-0">
            <Card.Body>
              <Card.Title className="fw-semibold text-uppercase mb-4">
                Job Experience
              </Card.Title>

              {experiences.length > 0 ? (
                experiences.map((exp, index) => (
                  <div key={index} className="mb-4 text-start">
                    <h6 className="fw-bold d-flex justify-content-between">
                      {exp.position?.position || "Job Title"}{" "}
                      <span className="text-muted">
                        {exp.start_date} - {exp.end_date || "Present"}
                      </span>
                    </h6>
                    <p className="mb-1 text-muted">
                      <em>
                        {exp.employer?.name} / {exp.industry?.industry}
                      </em>
                    </p>
                    <p className="small">{exp.description}</p>
                  </div>
                ))
              ) : (
                <p>No job experience added.</p>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* RIGHT SECTION */}
        <Col md={4} className="bg-dark text-light p-4">
          <div className="text-center mb-4">
            <img
              src={profile.avatar || "/profile.jpg"}
              alt="profile"
              className="rounded-circle border border-3 border-white"
              width="100"
              height="100"
            />
          </div>

          {/* About */}
          <div className="mb-4">
            <h5 className="border-bottom pb-1 text-uppercase">About Me</h5>
            <p className="small text-start">
              {profile.about ||
                "A motivated professional ready to contribute skills and experience."}
            </p>
          </div>

          {/* Education */}
          <div className="mb-4">
            <h5 className="border-bottom pb-1 text-uppercase">Education</h5>
            {education.length > 0 ? (
              <ul className="small ps-3 text-start">
                {education.map((edu, i) => (
                  <li key={i} className="mt-2">
                    <strong>
                      {edu.qualification?.qualification || "Degree"}
                    </strong>{" "}
                    <br />
                    {edu.institution} ({edu.start_date} - {edu.end_date})
                  </li>
                ))}
              </ul>
            ) : (
              <p>No education records available.</p>
            )}
          </div>

          {/* Skills */}
          <div>
            <h5 className="border-bottom pb-1 text-uppercase">Skills</h5>
            {skills.length > 0 ? (
              <ul className="small ps-3 text-start">
                {skills.map((skill, i) => (
                  <li key={i}>{skill.knowledge}</li>
                ))}
              </ul>
            ) : (
              <p>No skills listed.</p>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default TemplateH;

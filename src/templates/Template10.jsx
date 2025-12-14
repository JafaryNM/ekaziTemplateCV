// Template12.jsx — CV Template with Exo 2 font + Modern Timeline UI
import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Badge,
} from "react-bootstrap";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";

const API = "https://api.ekazi.co.tz/api/cv/cv_builder/30750";
const BRAND = "#e38720";

export default function Template12() {
  const [payload, setPayload] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(API)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((json) => {
        setPayload(json?.data || {});
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load profile");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        <Spinner animation="border" style={{ color: BRAND }} />
        <span className="ms-3">Loading CV…</span>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="py-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  const profiles = payload?.applicant_profile ?? [];
  const profile = profiles[0] ?? {};
  const experiences = payload?.experience ?? [];
  const referees = payload?.referees ?? [];
  const addresses = payload?.address ?? [];
  const education = payload?.education ?? [];
  const languages = payload?.language ?? [];
  const knowledge = payload?.knowledge ?? [];
  const software = payload?.software ?? [];
  const culture = payload?.culture ?? [];
  const personalities = payload?.applicant_personality ?? [];

  const phone =
    payload?.phone?.phone_number ||
    payload?.phone?.number ||
    payload?.user?.[0]?.phone ||
    "—";
  const email = payload?.user?.[0]?.email || payload?.email?.email || "—";
  const location = addresses?.[0]
    ? `${addresses[0]?.region_name || ""}${
        addresses[0]?.name ? ", " + addresses[0].name : ""
      }`
    : "—";

  const intro =
    payload?.careers?.[0]?.career ||
    payload?.objective?.objective ||
    "Professional summary not provided.";

  const currentPosition =
    payload?.current_position ||
    payload?.experience?.[0]?.position?.position_name ||
    "—";

  const formatMY = (d) => {
    const m = moment(d);
    return m.isValid() ? m.format("MMM YYYY") : "—";
  };

  const formatY = (d) => {
    const m = moment(d);
    return m.isValid() ? m.format("YYYY") : "";
  };

  return (
    <Container fluid className="my-4">
      <link
        href="https://fonts.googleapis.com/css2?family=Exo+2:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <Card
        className="shadow-lg border-0 overflow-hidden"
        style={{ fontFamily: "Exo 2, sans-serif" }}
      >
        {/* Banner */}
        <Card.Header
          className="text-white py-4"
          style={{ backgroundColor: BRAND }}
        >
          <Row className="align-items-center text-center text-md-start">
            <Col md={8}>
              <h2 className="fw-bold mb-1">
                {`${profile.first_name || ""} ${profile.middle_name || ""} ${
                  profile.last_name || ""
                }`.trim() || "—"}
              </h2>
              <h5 className="fw-light mb-0">{currentPosition}</h5>
            </Col>
            <Col md={4} className="mt-3 mt-md-0">
              <div className="d-flex flex-column flex-md-row gap-3 justify-content-md-end">
                <div className="d-flex align-items-center gap-2">
                  <FiPhone /> <span>{phone}</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <FiMail /> <span>{email}</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <FiMapPin /> <span>{location}</span>
                </div>
              </div>
            </Col>
          </Row>
        </Card.Header>

        {/* Body */}
        <Card.Body className="p-4">
          <Row>
            {/* Left column */}
            <Col md={4}>
              <Card className="mb-4 shadow-sm border-0">
                <Card.Body>
                  <h5 className="fw-bold mb-3" style={{ color: BRAND }}>
                    About Me
                  </h5>
                  <p style={{ textAlign: "justify" }}>{intro}</p>
                </Card.Body>
              </Card>

              <Card className="mb-4 shadow-sm border-0">
                <Card.Body>
                  <h5 className="fw-bold mb-3" style={{ color: BRAND }}>
                    Languages
                  </h5>
                  <div className="d-flex flex-wrap gap-2">
                    {languages.map((l, i) => (
                      <Badge
                        key={i}
                        pill
                        style={{ backgroundColor: BRAND, color: "#fff" }}
                      >
                        {l?.language?.language_name || "Language"}
                      </Badge>
                    ))}
                  </div>
                </Card.Body>
              </Card>

              <Card className="mb-4 shadow-sm border-0">
                <Card.Body>
                  <h5 className="fw-bold mb-3" style={{ color: BRAND }}>
                    Skills & Tools
                  </h5>
                  <div className="d-flex flex-wrap gap-2">
                    {knowledge.map((k, i) => (
                      <Badge key={i} pill bg="secondary">
                        {k?.knowledge?.knowledge_name}
                      </Badge>
                    ))}
                    {software.map((s, i) => (
                      <Badge key={i} pill bg="dark">
                        {s?.software?.software_name}
                      </Badge>
                    ))}
                    {culture.map((c, i) => (
                      <Badge
                        key={i}
                        pill
                        style={{ backgroundColor: BRAND, color: "#fff" }}
                      >
                        {c?.culture?.culture_name}
                      </Badge>
                    ))}
                    {personalities.map((p, i) => (
                      <Badge key={i} pill bg="info" text="dark">
                        {p?.personality?.personality_name}
                      </Badge>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Right column */}
            <Col md={8}>
              <SectionCard title="Experience">
                {experiences.length ? (
                  experiences.map((exp, i) => (
                    <Card
                      key={i}
                      body
                      className="mb-3 shadow-sm border-0"
                      style={{ borderLeft: `5px solid ${BRAND}` }}
                    >
                      <div className="fw-semibold">
                        {exp?.position?.position_name || "Job Title"}
                        {exp?.employer?.employer_name && (
                          <span className="text-muted">
                            {" "}
                            @ {exp.employer.employer_name}
                          </span>
                        )}
                      </div>
                      <div className="text-muted small mb-2">
                        {formatY(exp?.start_date)} –{" "}
                        {formatY(exp?.end_date) || "Present"}
                      </div>
                      {exp?.responsibility && (
                        <ul className="mb-0 small">
                          {exp.responsibility
                            .split("\n")
                            .map((t) => t.trim())
                            .filter(Boolean)
                            .map((t, k) => (
                              <li key={k}>{t.replace(/^•\s*/, "")}</li>
                            ))}
                        </ul>
                      )}
                    </Card>
                  ))
                ) : (
                  <div className="text-secondary">No job experience added.</div>
                )}
              </SectionCard>

              <SectionCard title="Education">
                {education.length ? (
                  education.map((edu, i) => (
                    <Card
                      key={i}
                      body
                      className="mb-3 shadow-sm border-0"
                      style={{ borderLeft: `5px solid ${BRAND}` }}
                    >
                      <div className="fw-semibold">
                        {edu?.level?.education_level || edu?.degree || "—"}
                      </div>
                      <div>
                        {edu?.college?.college_name || edu?.institution || "—"}
                      </div>
                      <div className="text-muted small">
                        {formatMY(edu?.started)} – {formatMY(edu?.ended)}
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-secondary">
                    No education records available.
                  </div>
                )}
              </SectionCard>

              {referees.length > 0 && (
                <SectionCard title="Referees">
                  {referees.map((r, i) => {
                    const fullName = [r.first_name, r.middle_name, r.last_name]
                      .filter(Boolean)
                      .join(" ");
                    return (
                      <Card
                        key={r.id ?? i}
                        body
                        className="mb-3 shadow-sm border-0"
                        style={{ borderLeft: `5px solid ${BRAND}` }}
                      >
                        <div className="fw-semibold">{fullName || "—"}</div>
                        <div className="text-muted">
                          {r?.referee_position || "—"}
                        </div>
                        <div>{r?.employer || "—"}</div>
                        <div className="small">{r?.phone || "—"}</div>
                        <div className="small">{r?.email || "—"}</div>
                      </Card>
                    );
                  })}
                </SectionCard>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

function SectionCard({ title, children }) {
  return (
    <div className="mb-4">
      <h4 className="fw-bold mb-3" style={{ color: BRAND }}>
        {title}
      </h4>
      {children}
    </div>
  );
}

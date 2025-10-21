// Template20.jsx — Premium Responsive CV (Brand #ff511a | Font: Space Grotesk)
import { useEffect, useState, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Badge,
} from "react-bootstrap";
import { FiPhone, FiMail, FiMapPin, FiGlobe } from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";

const cvUrl = "https://ekazi.co.tz";
const API = "https://ekazi.co.tz/api/cv/cv_builder/30750";

const BRAND = "#ff511a";
const INK = "#1b1b1b";

function formatMY(d) {
  const m = moment(d);
  return m.isValid() ? m.format("MMM YYYY") : "—";
}

export default function Template20() {
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

  const profile = payload?.applicant_profile?.[0] ?? {};
  const experiences = payload?.experience ?? [];
  const referees = payload?.referees ?? [];
  const education = payload?.education ?? [];
  const addresses = payload?.address ?? [];
  const languages = payload?.language ?? [];
  const knowledge = payload?.knowledge ?? [];
  const software = payload?.software ?? [];
  const culture = payload?.culture ?? [];
  const personalities = payload?.applicant_personality ?? [];

  const phone =
    payload?.phone?.phone_number || payload?.user?.[0]?.phone || "—";
  const email = payload?.user?.[0]?.email || "—";
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
    experiences?.[0]?.position?.position_name ||
    "—";

  const fullName = useMemo(
    () =>
      `${profile.first_name || ""} ${profile.middle_name || ""} ${
        profile.last_name || ""
      }`
        .replace(/\s+/g, " ")
        .trim() || "—",
    [profile]
  );

  if (loading)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        <Spinner animation="border" style={{ color: BRAND }} />
        <span className="ms-3">Loading CV…</span>
      </div>
    );

  if (error)
    return (
      <Container className="py-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );

  return (
    <Container fluid className="my-4 px-2 px-md-4">
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        .t20-root { font-family: 'Space Grotesk', sans-serif; color: ${INK}; }

        /* HERO */
        .t20-hero {
          background: ${BRAND};
          color: #fff;
          padding: 3rem 2rem 2.2rem;
          border-radius: 12px 12px 0 0;
          text-align: center;
        }
        .t20-photo {
          width: 130px;
          height: 140px;
          border-radius: 12px;
          overflow: hidden;
          border: 4px solid #fff;
          margin: 0 auto 1rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
        }
        .t20-photo img { width: 100%; height: 100%; object-fit: cover; }
        .t20-name { font-size: 1.9rem; font-weight: 700; color: #fff; }
        .t20-sub { font-size: 1rem; opacity: 0.9; }

        /* SECTIONS */
        .t20-section-title {
          color: ${BRAND};
          font-weight: 700;
          font-size: 1rem;
          text-transform: uppercase;
          border-bottom: 2px solid ${BRAND};
          padding-bottom: .25rem;
          margin-bottom: 1rem;
        }
        .t20-card {
          border: 0;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0,0,0,.06);
          margin-bottom: 1.2rem;
          padding: 1.2rem;
        }

        .t20-exp-card {
          border-left: 4px solid ${BRAND};
          background: #fff;
          padding-left: 1rem;
          margin-bottom: 1.2rem;
        }

        /* BADGES / SKILLS */
        .t20-badge {
          background: ${BRAND};
          color: #fff;
          border-radius: 50px;
          font-size: 0.8rem;
          padding: 0.4rem 0.7rem;
          white-space: nowrap;
        }
        .t20-skill-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          justify-content: flex-start;
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .t20-hero { padding: 2rem 1.4rem; }
          .t20-name { font-size: 1.6rem; }
          .t20-sub { font-size: 0.95rem; }
        }
        @media (max-width: 576px) {
          .t20-hero { padding: 1.5rem 1rem; }
          .t20-photo { width: 110px; height: 120px; }
          .t20-name { font-size: 1.4rem; }
          .t20-sub { font-size: 0.9rem; }
        }
      `}</style>

      <div className="t20-root">
        {/* HERO */}
        <div className="t20-hero">
          <div className="t20-photo">
            <img
              src={
                profile?.picture
                  ? `${cvUrl}/${profile.picture}`
                  : "https://placehold.co/130x140?text=Photo"
              }
              alt="profile"
            />
          </div>
          <div className="t20-name">{fullName}</div>
          <div className="t20-sub">{currentPosition}</div>
          <p className="mt-3 mb-0 text-light" style={{ opacity: 0.95 }}>
            {intro}
          </p>
        </div>

        {/* BODY */}
        <Row className="g-4 mt-4 px-2 px-md-4">
          {/* SIDEBAR */}
          <Col xs={12} md={4}>
            <Card className="t20-card">
              <Section title="Contact">
                <p>
                  <FiPhone className="me-2" /> {phone}
                </p>
                <p>
                  <FiMail className="me-2" /> {email}
                </p>
                <p>
                  <FiMapPin className="me-2" /> {location}
                </p>
                {payload?.user?.[0]?.website && (
                  <p>
                    <FiGlobe className="me-2" /> {payload?.user?.[0]?.website}
                  </p>
                )}
              </Section>
            </Card>

            <Card className="t20-card">
              <Section title="Skills">
                <div className="t20-skill-wrap">
                  {knowledge.map((k, i) => (
                    <span key={i} className="t20-badge">
                      {k?.knowledge?.knowledge_name}
                    </span>
                  ))}
                  {software.map((s, i) => (
                    <span
                      key={i}
                      className="t20-badge"
                      style={{ background: "#333" }}
                    >
                      {s?.software?.software_name}
                    </span>
                  ))}
                </div>
              </Section>
            </Card>

            {languages.length > 0 && (
              <Card className="t20-card">
                <Section title="Languages">
                  <div className="t20-skill-wrap">
                    {languages.map((l, i) => (
                      <span key={i} className="t20-badge">
                        {l?.language?.language_name}
                      </span>
                    ))}
                  </div>
                </Section>
              </Card>
            )}
          </Col>

          {/* MAIN CONTENT */}
          <Col xs={12} md={8}>
            <Card className="t20-card">
              <Section title="Experience">
                {experiences.length ? (
                  experiences.map((exp, i) => (
                    <div key={i} className="t20-exp-card">
                      <div className="fw-semibold" style={{ color: BRAND }}>
                        {exp?.position?.position_name || "—"}
                      </div>
                      <div className="text-muted small">
                        {exp?.employer?.employer_name || ""}
                      </div>
                      <div className="text-muted small mb-2">
                        {formatMY(exp?.start_date)} –{" "}
                        {formatMY(exp?.end_date) || "Present"}
                      </div>
                      {exp?.responsibility && (
                        <ul className="small mb-0 ps-3">
                          {exp.responsibility
                            .split("\n")
                            .map((t) => t.trim())
                            .filter(Boolean)
                            .map((t, k) => (
                              <li key={k}>{t.replace(/^•\s*/, "")}</li>
                            ))}
                        </ul>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-muted">No job experience available.</p>
                )}
              </Section>
            </Card>

            <Card className="t20-card">
              <Section title="Education">
                {education.length ? (
                  education.map((edu, i) => (
                    <div key={i} className="t20-exp-card">
                      <div className="fw-semibold" style={{ color: BRAND }}>
                        {edu?.level?.education_level || edu?.degree || "—"}
                      </div>
                      <div className="text-muted small">
                        {edu?.college?.college_name || edu?.institution || ""}
                      </div>
                      <div className="text-muted small">
                        {formatMY(edu?.started)} –{" "}
                        {formatMY(edu?.ended) || "Present"}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted">No education records available.</p>
                )}
              </Section>
            </Card>

            {referees.length > 0 && (
              <Card className="t20-card">
                <Section title="Referees">
                  <Row>
                    {referees.map((r, i) => {
                      const rname = [
                        r?.first_name,
                        r?.middle_name,
                        r?.last_name,
                      ]
                        .filter(Boolean)
                        .join(" ");
                      return (
                        <Col sm={12} md={6} key={i} className="mb-3">
                          <Card body className="border-0 shadow-sm">
                            <strong style={{ color: BRAND }}>
                              {rname || "—"}
                            </strong>
                            <div className="text-muted small">
                              {r?.referee_position || "—"}
                            </div>
                            <div>{r?.employer || "—"}</div>
                            <div className="small">{r?.phone || "—"}</div>
                            <div className="small">{r?.email || "—"}</div>
                          </Card>
                        </Col>
                      );
                    })}
                  </Row>
                </Section>
              </Card>
            )}
          </Col>
        </Row>
      </div>
    </Container>
  );
}

/* Section Component */
function Section({ title, children }) {
  return (
    <div className="mb-3">
      <h5 className="t20-section-title">{title}</h5>
      {children}
    </div>
  );
}

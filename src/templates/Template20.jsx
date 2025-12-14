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

const cvUrl = "https://api.ekazi.co.tz";
const API = "https://api.ekazi.co.tz/api/cv/cv_builder/30750";

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
  const tools = payload?.tools ?? [];

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

  // ===== Flattened & Capitalized “chips” data =====
  const chipsLanguages = languages
    .map((l) =>
      (l?.language?.language_name || l?.language_name || "")
        .replace(/^,+/, "")
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase())
    )
    .filter(Boolean);

  const chipsSkills = knowledge
    .map((k) =>
      (k?.knowledge?.knowledge_name || k?.knowledge_name || "")
        .replace(/^,+/, "")
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase())
    )
    .filter(Boolean);

  const chipsSoftware = software
    .map((s) =>
      (s?.software?.software_name || s?.software_name || "")
        .replace(/^,+/, "")
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase())
    )
    .filter(Boolean);

  // (kept for consistency / future use)
  const chipsCulture = culture
    .map((c) =>
      (c?.culture?.culture_name || c?.culture_name || c?.name || "")
        .replace(/^,+/, "")
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase())
    )
    .filter(Boolean);

  const chipsPersonality = personalities
    .map((p) =>
      (p?.personality?.personality_name || "")
        .replace(/^,+/, "")
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase())
    )
    .filter(Boolean);

  const chipsTools = tools
    .map((t) =>
      (t?.tool?.tool_name || t?.tool_name || "")
        .replace(/^,+/, "")
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase())
    )
    .filter(Boolean);

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
    <Container
      fluid
      className="p-0"
      style={{
        width: "210mm",
        minHeight: "297mm",
        margin: "auto",
        backgroundColor: "#000",
        padding: "5mm",
        fontFamily:
          '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        boxShadow: "0 0 5px rgba(0,0,0,0.2)",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        .t20-root { font-family: 'Space Grotesk', sans-serif; color: ${INK}; }
        .a4-card { width: 100%; min-height: calc(297mm - 10mm); background: #fff; }

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
          white-space: normal !important;
          overflow-wrap: anywhere;
          word-break: break-word;
          text-align: left;
          max-width: 100%;
          display: inline-block;
          line-height: 1.2;
        }
        .t20-skill-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          justify-content: flex-start;
        }

        /* CONTACT: icon on top, value below (slightly smaller so email fits) */
        .t20-contact-stack {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .t20-contact-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .t20-contact-icon {
          width: 26px;
          height: 26px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          border: 1px solid rgba(255, 81, 26, 0.25);
          background: rgba(255, 81, 26, 0.08);
          color: ${BRAND};
        }
        .t20-contact-text {
          font-size: 0.9rem; /* ✅ reduced a little bit */
          line-height: 1.25;
          word-break: break-word;
          overflow-wrap: anywhere;
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

      <div className="t20-root a4-card rounded-3 overflow-hidden">
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
                <div className="t20-contact-stack">
                  <div className="t20-contact-item">
                    <span className="t20-contact-icon">
                      <FiPhone />
                    </span>
                    <div className="t20-contact-text">{phone}</div>
                  </div>

                  <div className="t20-contact-item">
                    <span className="t20-contact-icon">
                      <FiMail />
                    </span>
                    <div className="t20-contact-text">{email}</div>
                  </div>

                  <div className="t20-contact-item">
                    <span className="t20-contact-icon">
                      <FiMapPin />
                    </span>
                    <div className="t20-contact-text">{location}</div>
                  </div>

                  {payload?.user?.[0]?.website && (
                    <div className="t20-contact-item">
                      <span className="t20-contact-icon">
                        <FiGlobe />
                      </span>
                      <div className="t20-contact-text">
                        {payload?.user?.[0]?.website}
                      </div>
                    </div>
                  )}
                </div>
              </Section>
            </Card>

            <Card className="t20-card">
              <Section title="Skills">
                <div className="t20-skill-wrap">
                  {chipsSkills.map((txt, i) => (
                    <span key={i} className="t20-badge">
                      {txt}
                    </span>
                  ))}
                  {chipsSoftware.map((txt, i) => (
                    <span
                      key={i}
                      className="t20-badge"
                      style={{ background: "#333" }}
                    >
                      {txt}
                    </span>
                  ))}
                </div>
              </Section>
            </Card>

            {chipsLanguages.length > 0 && (
              <Card className="t20-card">
                <Section title="Languages">
                  <div className="t20-skill-wrap">
                    {chipsLanguages.map((txt, i) => (
                      <span key={i} className="t20-badge">
                        {txt}
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

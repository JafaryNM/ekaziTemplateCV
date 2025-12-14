// Template13.jsx — Final Polished Bitter CV Template (Consistent Layout, Brand #242a64)
import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Badge,
  Image,
} from "react-bootstrap";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiCpu,
  FiStar,
  FiGlobe,
  FiUser,
} from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";

const cvUrl = "https://api.ekazi.co.tz";
const API = "https://api.ekazi.co.tz/api/cv/cv_builder/30750";
const BRAND = "#242a64";

export default function Template13() {
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

  // --- Extract data ---
  const profile = payload?.applicant_profile?.[0] ?? {};
  const experiences = payload?.experience ?? [];
  const referees = payload?.referees ?? [];
  const education = payload?.education ?? [];
  const languages = payload?.language ?? [];
  const knowledge = payload?.knowledge ?? [];
  const software = payload?.software ?? [];
  const culture = payload?.culture ?? [];
  const personalities = payload?.applicant_personality ?? [];
  const addresses = payload?.address ?? [];
  const tools = payload?.tools ?? [];

  // --- Contact ---
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

  // --- Text ---
  const intro =
    payload?.careers?.[0]?.career ||
    payload?.objective?.objective ||
    "Professional summary not provided.";

  const currentPosition =
    payload?.current_position ||
    payload?.experience?.[0]?.position?.position_name ||
    "—";

  // --- Date format helpers ---
  const formatMY = (d) => {
    const m = moment(d);
    return m.isValid() ? m.format("MMM YYYY") : "—";
  };
  const formatY = (d) => {
    const m = moment(d);
    return m.isValid() ? m.format("YYYY") : "";
  };

  // ===== Flattened & Capitalized “chips” data =====
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

  const chipsSoftware = software
    .map((s) =>
      (s?.software?.software_name || s?.software_name || "")
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

  const chipsTools = tools
    .map((t) =>
      (t?.tool?.tool_name || t?.tool_name || "")
        .replace(/^,+/, "")
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase())
    )
    .filter(Boolean);

  const chipsLanguages = languages
    .map((l) =>
      (l?.language?.language_name || l?.language_name || "")
        .replace(/^,+/, "")
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase())
    )
    .filter(Boolean);

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
        href="https://fonts.googleapis.com/css2?family=Bitter:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        * { font-family: "Bitter", serif; }
        .header-bar {
          background-color: ${BRAND};
          color: #fff;
          padding: 2.5rem 2rem;
          border-radius: 12px 12px 0 0;
        }
        .header-name {
          font-weight: 700;
          font-size: 2.2rem;
        }
        .header-sub {
          font-weight: 400;
          opacity: 0.9;
        }
        .badge-light {
          background: rgba(255,255,255,0.9);
          color: ${BRAND};
          font-weight: 600;
        }
        .section-heading {
          color: ${BRAND};
          font-weight: 700;
          border-bottom: 2px solid ${BRAND};
          padding-bottom: .3rem;
          margin-bottom: 1.3rem;
        }
        .timeline-dot {
          width: 12px;
          height: 12px;
          background-color: ${BRAND};
          border-radius: 50%;
          margin-top: 6px;
          margin-right: 15px;
        }
        .shadow-soft {
          box-shadow: 0 3px 10px rgba(36,42,100,0.12);
        }
        .skill-badge {
          background-color: ${BRAND};
          color: #fff;
          font-size: 0.85rem;
          padding: 0.35em 0.8em;

          /* ✅ keep inside + left aligned + wrap */
          max-width: 100%;
          white-space: normal !important;
          overflow-wrap: anywhere;
          word-break: break-word;
          text-align: left;
          line-height: 1.2;
          display: inline-block;
          vertical-align: top;
        }
        .skill-card h6 {
          font-weight: 700;
          color: ${BRAND};
        }
        .section-spacing {
          margin-bottom: 2.5rem;
        }

        /* ✅ fill A4 height inside 5mm padding */
        .a4-card { width: 100%; min-height: calc(297mm - 10mm); }
      `}</style>

      <Card className="border-0 shadow-soft overflow-hidden a4-card">
        {/* --- Header --- */}
        <div className="header-bar d-flex flex-column flex-md-row align-items-center gap-4">
          <Image
            src={
              profile?.picture
                ? `${cvUrl}/${profile.picture}`
                : "https://placehold.co/200x200?text=Photo"
            }
            alt="profile"
            roundedCircle
            className="shadow-lg"
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              border: "4px solid #fff",
            }}
            onError={(e) =>
              (e.currentTarget.src = "https://placehold.co/200x200?text=Photo")
            }
          />
          <div className="text-center text-md-start">
            <h1 className="header-name mb-1">
              {`${profile.first_name || ""} ${profile.middle_name || ""} ${
                profile.last_name || ""
              }`.trim() || "—"}
            </h1>
            <h4 className="header-sub mb-3">{currentPosition}</h4>
            <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-md-start">
              <Badge className="badge-light">
                <FiPhone className="me-1" /> {phone}
              </Badge>
              <Badge className="badge-light">
                <FiMail className="me-1" /> {email}
              </Badge>
              <Badge className="badge-light">
                <FiMapPin className="me-1" /> {location}
              </Badge>
            </div>
          </div>
        </div>

        {/* --- Body --- */}
        <Card.Body className="p-4 p-md-5">
          <SectionCard title="About Me">
            <p style={{ textAlign: "justify" }}>{intro}</p>
          </SectionCard>

          <Row className="gy-4 gx-md-5">
            {/* Left - Skills */}
            <Col md={4}>
              <SectionCard title="Skills & Traits">
                <div className="d-grid gap-3">
                  <SkillBlock icon={<FiStar />} title="Knowledge">
                    {knowledge.length ? (
                      chipsSkills.map((txt, i) => (
                        <Badge key={i} pill className="skill-badge me-1 mb-1">
                          {txt || "Skill"}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-secondary">—</span>
                    )}
                  </SkillBlock>

                  <SkillBlock icon={<FiCpu />} title="Software">
                    {software.length ? (
                      chipsSoftware.map((txt, i) => (
                        <Badge key={i} pill className="skill-badge me-1 mb-1">
                          {txt || "Software"}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-secondary">—</span>
                    )}
                  </SkillBlock>

                  <SkillBlock icon={<FiGlobe />} title="Culture">
                    {culture.length ? (
                      chipsCulture.map((txt, i) => (
                        <Badge key={i} pill className="skill-badge me-1 mb-1">
                          {txt || "Culture"}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-secondary">—</span>
                    )}
                  </SkillBlock>

                  <SkillBlock icon={<FiUser />} title="Personality">
                    {personalities.length ? (
                      chipsPersonality.map((txt, i) => (
                        <Badge key={i} pill className="skill-badge me-1 mb-1">
                          {txt || "Personality"}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-secondary">—</span>
                    )}
                  </SkillBlock>

                  <SkillBlock icon={<FiGlobe />} title="Languages">
                    {languages.length ? (
                      chipsLanguages.map((txt, i) => (
                        <Badge key={i} pill className="skill-badge me-1 mb-1">
                          {txt || "Language"}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-secondary">—</span>
                    )}
                  </SkillBlock>
                </div>
              </SectionCard>
            </Col>

            {/* Right - Experience / Education / Referees */}
            <Col md={8}>
              <SectionCard title="Experience">
                {experiences.length ? (
                  experiences.map((exp, i) => (
                    <div key={i} className="d-flex mb-4">
                      <div className="timeline-dot"></div>
                      <div>
                        <div className="fw-semibold" style={{ color: BRAND }}>
                          {exp?.position?.position_name || "Job Title"}{" "}
                          {exp?.employer?.employer_name && (
                            <span className="text-muted">
                              @ {exp.employer.employer_name}
                            </span>
                          )}
                        </div>
                        <div className="text-muted small mb-2">
                          {formatY(exp?.start_date)} –{" "}
                          {formatY(exp?.end_date) || "Present"}
                        </div>
                        {exp?.responsibility && (
                          <ul className="mb-0 small text-muted">
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
                    </div>
                  ))
                ) : (
                  <div className="text-secondary">No job experience added.</div>
                )}
              </SectionCard>

              <SectionCard title="Education">
                {education.length ? (
                  education.map((edu, i) => (
                    <div key={i} className="d-flex mb-4">
                      <div className="timeline-dot"></div>
                      <div>
                        <div className="fw-semibold" style={{ color: BRAND }}>
                          {edu?.level?.education_level || edu?.degree || "—"}
                        </div>
                        <div>
                          {edu?.college?.college_name ||
                            edu?.institution ||
                            "—"}
                        </div>
                        <div className="text-muted small">
                          {formatMY(edu?.started)} – {formatMY(edu?.ended)}
                        </div>
                      </div>
                    </div>
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
                        className="border-0 shadow-sm mb-3"
                        style={{ borderLeft: `5px solid ${BRAND}` }}
                      >
                        <div className="fw-semibold" style={{ color: BRAND }}>
                          {fullName || "—"}
                        </div>
                        <div className="text-muted small">
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

// --- Reusable Blocks ---
function SectionCard({ title, children }) {
  return (
    <div className="section-spacing">
      <h3 className="section-heading">{title}</h3>
      {children}
    </div>
  );
}

function SkillBlock({ icon, title, children }) {
  return (
    <Card className="border-0 shadow-soft skill-card">
      <Card.Body>
        <h6 className="d-flex align-items-center mb-3">
          {icon} <span className="ms-2">{title}</span>
        </h6>
        <div>{children}</div>
      </Card.Body>
    </Card>
  );
}

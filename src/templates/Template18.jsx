// Template18.jsx — Hero Header CV | Brand #ad5715 + Smooch Sans
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

const BRAND = "#ad5715";
const LIGHT = "#faf9f7";
const INK = "#2b2b2b";

/* Helpers */
function formatMY(d) {
  const m = moment(d);
  return m.isValid() ? m.format("MMM YYYY") : "—";
}

export default function Template18() {
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
      {/* Font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Smooch+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        .a4-card { width: 100%; min-height: calc(297mm - 10mm); background: #fff; }

        .t18-root { font-family: 'Smooch Sans', sans-serif; color: ${INK}; }
        .t18-hero { background: ${BRAND}; height: 160px; position: relative; }
        .t18-photo { width: 160px; height: 160px; border-radius: 50%; overflow: hidden;
          border: 5px solid #fff; box-shadow: 0 6px 16px rgba(0,0,0,.3); position: absolute; bottom: -80px; left: 50%; transform: translateX(-50%); }
        .t18-name { margin-top: 100px; text-align: center; }
        .t18-name h1 { font-weight: 700; margin-bottom: 0; color: ${BRAND}; }
        .t18-name h4 { font-weight: 400; opacity: 0.85; }
        .t18-title { color: ${BRAND}; border-left: 4px solid ${BRAND}; padding-left: .5rem; margin-bottom: .75rem; text-transform: uppercase; font-weight: 600; }
        .t18-badge { background: ${BRAND}; color: #fff; }

        .t18-card { border: 0; box-shadow: 0 4px 14px rgba(0,0,0,.06); margin-bottom: 1.5rem; }

        /* ✅ keep chips inside width + left aligned */
        .chip-badge{
          max-width: 100%;
          white-space: normal !important;
          overflow-wrap: anywhere;
          word-break: break-word;
          text-align: left;
          line-height: 1.2;
          display: inline-block;
          vertical-align: top;
        }

        /* ✅ Reduce font ONLY inside Contact so it fits perfectly */
        .contact-section p{
          font-size: 0.85rem;
          margin-bottom: .45rem;
          line-height: 1.25;
          word-break: break-word;
          overflow-wrap: anywhere;
        }
        .contact-section svg{ flex-shrink: 0; }
      `}</style>

      <Card className="a4-card border-0 shadow-lg overflow-hidden">
        <div className="t18-root">
          {/* Hero Section */}
          <div className="t18-hero">
            <div className="t18-photo">
              <img
                src={
                  profile?.picture
                    ? `${cvUrl}/${profile.picture}`
                    : "https://placehold.co/160x160?text=Photo"
                }
                alt="profile"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
          <div className="t18-name">
            <h1>{fullName}</h1>
            <h4>{currentPosition}</h4>
          </div>

          {/* Content */}
          <Row className="g-4 mt-4 px-3 px-md-5">
            {/* Sidebar */}
            <Col md={4}>
              <Card body className="t18-card">
                <Section title="Contact" className="contact-section">
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

              {chipsLanguages.length > 0 && (
                <Card body className="t18-card">
                  <Section title="Languages">
                    <div className="d-flex flex-wrap gap-2">
                      {chipsLanguages.map((txt, i) => (
                        <Badge key={i} className="t18-badge chip-badge" pill>
                          {txt}
                        </Badge>
                      ))}
                    </div>
                  </Section>
                </Card>
              )}

              {(chipsSkills.length > 0 || chipsSoftware.length > 0) && (
                <Card body className="t18-card">
                  <Section title="Skills">
                    <div className="d-flex flex-wrap gap-2">
                      {chipsSkills.map((txt, i) => (
                        <Badge key={i} bg="secondary" pill className="chip-badge">
                          {txt}
                        </Badge>
                      ))}
                      {chipsSoftware.map((txt, i) => (
                        <Badge key={i} bg="dark" pill className="chip-badge">
                          {txt}
                        </Badge>
                      ))}
                    </div>
                  </Section>
                </Card>
              )}

              {(chipsCulture.length > 0 || chipsPersonality.length > 0) && (
                <Card body className="t18-card">
                  <Section title="Culture & Personality">
                    <div className="d-flex flex-wrap gap-2">
                      {chipsCulture.map((txt, i) => (
                        <Badge
                          key={i}
                          bg="info"
                          text="dark"
                          pill
                          className="chip-badge"
                        >
                          {txt}
                        </Badge>
                      ))}
                      {chipsPersonality.map((txt, i) => (
                        <Badge
                          key={i}
                          bg="warning"
                          text="dark"
                          pill
                          className="chip-badge"
                        >
                          {txt}
                        </Badge>
                      ))}
                    </div>
                  </Section>
                </Card>
              )}
            </Col>

            {/* Main */}
            <Col md={8}>
              <Card body className="t18-card">
                <Section title="Profile">
                  <p>{intro}</p>
                </Section>
              </Card>

              <Card body className="t18-card">
                <Section title="Experience">
                  {experiences.length ? (
                    <Timeline items={experiences} isExperience />
                  ) : (
                    <p className="text-muted">No job experience available.</p>
                  )}
                </Section>
              </Card>

              <Card body className="t18-card">
                <Section title="Education">
                  {education.length ? (
                    <Timeline items={education} isExperience={false} />
                  ) : (
                    <p className="text-muted">
                      No education records available.
                    </p>
                  )}
                </Section>
              </Card>

              {referees.length > 0 && (
                <Card body className="t18-card">
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
                          <Col md={6} key={i} className="mb-3">
                            <Card body className="shadow-sm border-0">
                              <strong>{rname || "—"}</strong>
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
      </Card>
    </Container>
  );
}

function Section({ title, children, className = "" }) {
  return (
    <div className={`mb-3 ${className}`}>
      <h5 className="t18-title">{title}</h5>
      {children}
    </div>
  );
}

function Timeline({ items, isExperience }) {
  return (
    <div>
      {items.map((item, i) => (
        <Card key={i} body className="mb-3 shadow-sm border-0">
          <div className="fw-semibold" style={{ color: BRAND }}>
            {isExperience
              ? item?.position?.position_name || "—"
              : item?.level?.education_level || item?.degree || "—"}
          </div>
          <div className="text-muted small mb-1">
            {isExperience
              ? item?.employer?.employer_name || ""
              : item?.college?.college_name || item?.institution || ""}
          </div>
          <div className="text-muted small">
            {formatMY(item?.start_date || item?.started)} –{" "}
            {formatMY(item?.end_date || item?.ended) || "Present"}
          </div>
          {item?.responsibility && (
            <ul className="small mt-2 mb-0 ps-3">
              {item.responsibility
                .split("\n")
                .map((t) => t.trim())
                .filter(Boolean)
                .map((t, k) => (
                  <li key={k}>{t.replace(/^•\s*/, "")}</li>
                ))}
            </ul>
          )}
        </Card>
      ))}
    </div>
  );
}

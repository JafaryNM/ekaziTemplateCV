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

const BRAND = "#670023cc";
const INK = "#222";

function formatMY(d) {
  const m = moment(d);
  return m.isValid() ? m.format("MMM YYYY") : "—";
}

export default function Template22() {
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
  const website = payload?.user?.[0]?.website || "";

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
      className="p-0 t24-root"
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
        href="https://fonts.googleapis.com/css2?family=Saira+Condensed:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        .t24-root { font-family: 'Saira Condensed', sans-serif; color: ${INK}; }
        .a4-card { width: 100%; min-height: calc(297mm - 10mm); background: #fff; border-radius: 14px; overflow: hidden; }

        .t24-hero {
          background: linear-gradient(90deg, ${BRAND} 0%, #3a0015 100%);
          color: #fff;
          padding: 2rem;
        }
        .t24-photo {
          width: 140px; height: 140px; border-radius: 50%;
          border: 5px solid #fff; object-fit: cover;
          box-shadow: 0 4px 12px rgba(0,0,0,.3);
        }
        .t24-name { font-size: 2.4rem; font-weight: 700; margin-top: -0.6rem; }
        .t24-sub { font-size: 1.2rem; opacity: .9; }
        .t24-right { padding-top: 0; }

        .t24-section-title {
          font-weight: 700; color: ${BRAND}; margin-bottom: 1rem;
          border-bottom: 2px solid ${BRAND}; padding-bottom: .25rem;
          text-transform: uppercase; letter-spacing: 1px;
        }
        .t24-timeline {
          position: relative; margin-left: 1.5rem; padding-left: 1rem;
          border-left: 3px solid ${BRAND};
        }
        .t24-timeline::before {
          content: ""; position: absolute; left: -9px; top: 0;
          width: 16px; height: 16px; background: ${BRAND};
          border-radius: 50%;
        }
        .t24-item { margin-bottom: 1.5rem; }
        .t24-badge { background: ${BRAND}; color: #fff; }

        .t24-ref-card {
          border: 1px solid #eee; border-left: 4px solid ${BRAND};
          padding: .75rem; margin-bottom: 1rem; background: #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,.05);
        }

        /* Skills chips: wrap + left aligned */
        .t24-chip {
          background: #f1f1f1;
          border-radius: 20px;
          padding: .3rem .8rem;
          margin: .25rem;
          display: inline-block;
          font-size: .85rem;
          max-width: 100%;
          white-space: normal;
          overflow-wrap: anywhere;
          word-break: break-word;
          text-align: left;
          line-height: 1.2;
        }
        .t24-chip:hover { background: ${BRAND}; color: #fff; cursor: default; }

        /* Contact arrangement */
        .t24-contact-box {
          margin-top: .75rem;
          display: flex;
          flex-direction: column;
          gap: .65rem;
          align-items: center;
        }
        .t24-contact-item {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: .6rem;
          font-size: .95rem;
          line-height: 1.15;
          word-break: break-word;
          overflow-wrap: anywhere;
        }
        .t24-contact-icon {
          width: 30px;
          height: 30px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          background: rgba(255,255,255,0.14);
          border: 1px solid rgba(255,255,255,0.25);
          flex: 0 0 30px;
        }
        .t24-contact-text {
          flex: 1 1 auto;
          min-width: 0;
          text-align: left;
          font-size: .92rem;
          line-height: 1.15;
          word-break: break-word;
          overflow-wrap: anywhere;
        }

        @media (max-width: 768px) {
          .t24-contact-item { justify-content: flex-start; }
          .t24-contact-box { align-items: stretch; }
          .t24-contact-text { text-align: left; }
          .t24-name { margin-top: 0; }
        }
      `}</style>

      <div className="a4-card">
        {/* Hero */}
        <div className="t24-hero">
          <Row className="align-items-start">
            <Col md={3} className="text-center">
              <img
                src={
                  profile?.picture
                    ? `${cvUrl}/${profile.picture}`
                    : "https://placehold.co/140x140?text=Photo"
                }
                alt="profile"
                className="t24-photo mb-3"
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://placehold.co/140x140?text=Photo")
                }
              />

              <div className="t24-contact-box">
                <div className="t24-contact-item">
                  <span className="t24-contact-icon">
                    <FiPhone />
                  </span>
                  <span className="t24-contact-text">{phone}</span>
                </div>

                <div className="t24-contact-item">
                  <span className="t24-contact-icon">
                    <FiMail />
                  </span>
                  <span className="t24-contact-text">{email}</span>
                </div>

                <div className="t24-contact-item">
                  <span className="t24-contact-icon">
                    <FiMapPin />
                  </span>
                  <span className="t24-contact-text">{location}</span>
                </div>

                {website ? (
                  <div className="t24-contact-item">
                    <span className="t24-contact-icon">
                      <FiGlobe />
                    </span>
                    <span className="t24-contact-text">{website}</span>
                  </div>
                ) : null}
              </div>
            </Col>

            <Col md={9} className="t24-right">
              <div className="t24-name">{fullName}</div>
              <div className="t24-sub">{currentPosition}</div>
              <p className="mt-3 mb-0">{intro}</p>
            </Col>
          </Row>
        </div>

        {/* Body */}
        <Container className="py-4">
          <Row className="g-4">
            {/* Left Column */}
            <Col md={8}>
              <Section title="Experience">
                {experiences.length ? (
                  <div className="t24-timeline">
                    {experiences.map((exp, i) => (
                      <div key={i} className="t24-item">
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
                    ))}
                  </div>
                ) : (
                  <p className="text-muted">No job experience available.</p>
                )}
              </Section>

              <Section title="Education">
                {education.length ? (
                  <div className="t24-timeline">
                    {education.map((edu, i) => (
                      <div key={i} className="t24-item">
                        <div className="fw-semibold" style={{ color: BRAND }}>
                          {edu?.level?.education_level || edu?.degree || "—"}
                        </div>
                        <div className="text-muted small">
                          {edu?.college?.college_name ||
                            edu?.institution ||
                            ""}
                        </div>
                        <div className="text-muted small">
                          {formatMY(edu?.started)} –{" "}
                          {formatMY(edu?.ended) || "Present"}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted">No education records available.</p>
                )}
              </Section>
            </Col>

            {/* Right Column */}
            <Col md={4}>
              <Section title="Skills">
                <div>
                  {chipsSkills.map((txt, i) => (
                    <span key={`k-${i}`} className="t24-chip">
                      {txt}
                    </span>
                  ))}
                  {chipsSoftware.map((txt, i) => (
                    <span key={`s-${i}`} className="t24-chip">
                      {txt}
                    </span>
                  ))}
                </div>
              </Section>

              {chipsLanguages.length > 0 && (
                <Section title="Languages">
                  <div className="d-flex flex-wrap gap-2">
                    {chipsLanguages.map((txt, i) => (
                      <Badge key={i} className="t24-badge" pill>
                        {txt}
                      </Badge>
                    ))}
                  </div>
                </Section>
              )}

              {(chipsCulture.length > 0 || chipsPersonality.length > 0) && (
                <Section title="Culture & Personality">
                  <div className="d-flex flex-wrap gap-2">
                    {chipsCulture.map((txt, i) => (
                      <Badge key={`c-${i}`} bg="info" text="dark" pill>
                        {txt}
                      </Badge>
                    ))}
                    {chipsPersonality.map((txt, i) => (
                      <Badge key={`p-${i}`} bg="warning" text="dark" pill>
                        {txt}
                      </Badge>
                    ))}
                  </div>
                </Section>
              )}

              {referees.length > 0 && (
                <Section title="Referees">
                  {referees.map((r, i) => {
                    const rname = [r?.first_name, r?.middle_name, r?.last_name]
                      .filter(Boolean)
                      .join(" ");
                    return (
                      <div key={i} className="t24-ref-card">
                        <strong>{rname || "—"}</strong>
                        <div className="text-muted small">
                          {r?.referee_position || "—"}
                        </div>
                        <div>{r?.employer || "—"}</div>
                        <div className="small">{r?.phone || "—"}</div>
                        <div className="small">{r?.email || "—"}</div>
                      </div>
                    );
                  })}
                </Section>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </Container>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-4">
      <h5 className="t24-section-title">{title}</h5>
      {children}
    </div>
  );
}

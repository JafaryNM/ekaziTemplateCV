// Template27.jsx — Premium Executive CV Layout (Rubik + Brand #224559)
import { useEffect, useState, useMemo } from "react";
import { Container, Row, Col, Spinner, Alert, Badge } from "react-bootstrap";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiGlobe,
  FiBriefcase,
  FiBookOpen,
} from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";

const cvUrl = "https://api.ekazi.co.tz";
const API = "https://api.ekazi.co.tz/api/cv/cv_builder/30750";
const BRAND = "#224559";
const INK = "#222";

function formatMY(d) {
  const m = moment(d);
  return m.isValid() ? m.format("MMM YYYY") : "—";
}

export default function Template27() {
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
        href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        .t27-root { font-family: 'Rubik', sans-serif; color: ${INK}; background: #f5f7fa; }
        .a4-card { width: 100%; min-height: calc(297mm - 10mm); }

        /* Header */
        .t27-header {
          background: linear-gradient(135deg, ${BRAND}, #1b3340);
          color: #fff; text-align: center; padding: 4rem 2rem 6rem;
          position: relative; margin-bottom: 5rem;
        }
        .t27-photo {
          width: 150px; height: 150px; border-radius: 50%;
          object-fit: cover; border: 5px solid #fff;
          position: absolute; bottom: -75px; left: 50%; transform: translateX(-50%);
          box-shadow: 0 4px 20px rgba(0,0,0,.4);
        }
        .t27-name { font-size: 2.6rem; font-weight: 700; margin-bottom: .5rem; }
        .t27-role { font-size: 1.2rem; opacity: .9; margin-bottom: 1rem; }
        .t27-intro { max-width: 700px; margin: 0 auto; font-size: 1rem; opacity: .95; }

        /* Body */
        .t27-body { padding: 2rem; }
        .t27-section { margin-bottom: 2.5rem; }
        .t27-section h4 {
          font-size: 1.15rem; font-weight: 600; color: ${BRAND};
          text-transform: uppercase; border-bottom: 2px solid ${BRAND};
          margin-bottom: 1rem; padding-bottom: .3rem;
        }

        /* Sidebar cards */
        .t27-side-card {
          background: #fff; padding: 1rem 1.2rem; border-radius: 8px;
          margin-bottom: 1.2rem; box-shadow: 0 2px 8px rgba(0,0,0,.05);
        }

        /* >>> CONTACT ONLY: icon on top, value below <<< */
        .t27-contact-card { }
        .t27-contact-stack {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .t27-contact-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .t27-contact-icon {
          width: 26px;
          height: 26px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          border: 1px solid rgba(34, 69, 89, 0.25);
          background: rgba(34, 69, 89, 0.08);
          color: ${BRAND};
        }
        .t27-contact-text {
          font-size: 0.9rem;
          line-height: 1.25;
          word-break: break-word;
          overflow-wrap: anywhere;
        }

        /* Timeline */
        .t27-timeline { position: relative; margin-left: 1rem; }
        .t27-timeline::before {
          content: ""; position: absolute; left: 0; top: 0; bottom: 0;
          width: 2px; background: ${BRAND};
        }
        .t27-item { position: relative; padding-left: 2rem; margin-bottom: 2rem; }
        .t27-dot {
          position: absolute; left: -7px; top: 6px; width: 14px; height: 14px;
          background: ${BRAND}; border-radius: 50%; border: 2px solid #fff;
        }
        .t27-item .date { font-size: .85rem; font-weight: 500; color: ${BRAND}; margin-bottom: .2rem; }
        .t27-item .title { font-size: 1rem; font-weight: 600; color: ${BRAND}; }
        .t27-item .sub { font-size: .9rem; color: #666; font-style: italic; margin-bottom: .4rem; }

        /* Badges */
        .t27-badge {
          background: ${BRAND}; color: #fff; margin: .2rem;
          padding: .3rem .7rem; border-radius: 20px; font-size: .8rem;
          font-weight: 500;
          white-space: normal !important;
          overflow-wrap: anywhere;
          word-break: break-word;
          text-align: left;
          max-width: 100%;
          display: inline-block;
          line-height: 1.2;
        }
      `}</style>

      <div className="t27-root a4-card rounded-3 overflow-hidden">
        {/* Header */}
        <div className="t27-header">
          <div className="t27-name">{fullName}</div>
          <div className="t27-role">{currentPosition}</div>
          <p className="t27-intro">{intro}</p>
          <img
            src={
              profile?.picture
                ? `${cvUrl}/${profile.picture}`
                : "https://placehold.co/150x150?text=Photo"
            }
            alt="profile"
            className="t27-photo"
          />
        </div>

        {/* Body */}
        <Container className="t27-body">
          <Row className="g-4">
            {/* Sidebar */}
            <Col md={4}>
              <div className="t27-side-card t27-contact-card">
                <h4>Contact</h4>

                <div className="t27-contact-stack">
                  <div className="t27-contact-item">
                    <span className="t27-contact-icon">
                      <FiPhone />
                    </span>
                    <div className="t27-contact-text">{phone}</div>
                  </div>

                  <div className="t27-contact-item">
                    <span className="t27-contact-icon">
                      <FiMail />
                    </span>
                    <div className="t27-contact-text">{email}</div>
                  </div>

                  <div className="t27-contact-item">
                    <span className="t27-contact-icon">
                      <FiMapPin />
                    </span>
                    <div className="t27-contact-text">{location}</div>
                  </div>

                  {payload?.user?.[0]?.website && (
                    <div className="t27-contact-item">
                      <span className="t27-contact-icon">
                        <FiGlobe />
                      </span>
                      <div className="t27-contact-text">
                        {payload?.user?.[0]?.website}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="t27-side-card">
                <h4>Skills</h4>
                <div className="d-flex flex-wrap">
                  {chipsSkills.map((txt, i) => (
                    <Badge key={i} className="t27-badge">
                      {txt}
                    </Badge>
                  ))}
                  {chipsSoftware.map((txt, i) => (
                    <Badge key={i} className="t27-badge">
                      {txt}
                    </Badge>
                  ))}
                </div>
              </div>

              {chipsLanguages.length > 0 && (
                <div className="t27-side-card">
                  <h4>Languages</h4>
                  <div className="d-flex flex-wrap">
                    {chipsLanguages.map((txt, i) => (
                      <Badge key={i} className="t27-badge">
                        {txt}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {(chipsCulture.length > 0 || chipsPersonality.length > 0) && (
                <div className="t27-side-card">
                  <h4>Culture & Personality</h4>
                  <div className="d-flex flex-wrap">
                    {chipsCulture.map((txt, i) => (
                      <Badge key={i} className="t27-badge">
                        {txt}
                      </Badge>
                    ))}
                    {chipsPersonality.map((txt, i) => (
                      <Badge key={i} className="t27-badge">
                        {txt}
                      </Badge>
                    ))}
                    {chipsTools.map((txt, i) => (
                      <Badge key={i} className="t27-badge">
                        {txt}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </Col>

            {/* Main Content */}
            <Col md={8}>
              <div className="t27-section">
                <h4>
                  <FiBriefcase className="me-2" /> Experience
                </h4>
                <div className="t27-timeline">
                  {experiences.length ? (
                    experiences.map((exp, i) => (
                      <div key={i} className="t27-item">
                        <div className="t27-dot"></div>
                        <div className="date">
                          {formatMY(exp?.start_date)} –{" "}
                          {exp?.end_date ? formatMY(exp?.end_date) : "Present"}
                        </div>
                        <div className="title">
                          {exp?.position?.position_name || "—"}
                        </div>
                        <div className="sub">
                          {exp?.employer?.employer_name || ""}
                        </div>
                        {exp?.responsibility && (
                          <ul className="small">
                            {exp.responsibility
                              .split("\n")
                              .map(
                                (t, k) =>
                                  t.trim() && (
                                    <li key={k}>{t.replace(/^•\s*/, "")}</li>
                                  )
                              )}
                          </ul>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-muted">No job experience available.</p>
                  )}
                </div>
              </div>

              <div className="t27-section">
                <h4>
                  <FiBookOpen className="me-2" /> Education
                </h4>
                <div className="t27-timeline">
                  {education.length ? (
                    education.map((edu, i) => (
                      <div key={i} className="t27-item">
                        <div className="t27-dot"></div>
                        <div className="date">
                          {formatMY(edu?.started)} –{" "}
                          {edu?.ended ? formatMY(edu?.ended) : "Present"}
                        </div>
                        <div className="title">
                          {edu?.level?.education_level || edu?.degree || "—"}
                        </div>
                        <div className="sub">
                          {edu?.college?.college_name ||
                            edu?.institution ||
                            ""}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted">No education records available.</p>
                  )}
                </div>
              </div>

              {referees.length > 0 && (
                <div className="t27-section">
                  <h4>Referees</h4>
                  {referees.map((r, i) => {
                    const rname = [r?.first_name, r?.middle_name, r?.last_name]
                      .filter(Boolean)
                      .join(" ");
                    return (
                      <div key={i} className="t27-item">
                        <div className="t27-dot"></div>
                        <div>
                          <strong>{rname || "—"}</strong>
                        </div>
                        <div className="text-muted small">
                          {r?.referee_position || "—"}
                        </div>
                        <div>{r?.employer || "—"}</div>
                        <div className="small">{r?.phone || "—"}</div>
                        <div className="small">{r?.email || "—"}</div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </Container>
  );
}

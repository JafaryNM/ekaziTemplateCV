// Template26.jsx — Modern CV with Rubik font + Brand #cf470c (Improved Polish)
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

const BRAND = "#cf470c";
const INK = "#222";

function formatMY(d) {
  const m = moment(d);
  return m.isValid() ? m.format("MMM YYYY") : "—";
}

export default function Template26() {
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
        .t26-root { font-family: 'Rubik', sans-serif; color: ${INK}; line-height: 1.65; background: #fff; }
        .a4-card { width: 100%; min-height: calc(297mm - 10mm); background: #fff; }

        /* Hero */
        .t26-hero {
          display: flex; align-items: center; padding: 2.5rem 2rem;
          background: linear-gradient(90deg, ${BRAND}15, #fdfdfd);
          border-bottom: 4px solid ${BRAND};
        }
        .t26-photo {
          width: 140px; height: 140px; border-radius: 12px;
          object-fit: cover; margin-right: 2rem;
          border: 3px solid ${BRAND};
          box-shadow: 0 4px 12px rgba(0,0,0,.2);
        }
        .t26-name { font-size: 2.5rem; font-weight: 700; margin-bottom: .3rem; }
        .t26-sub { font-size: 1.2rem; font-weight: 500; color: ${BRAND}; }
        .t26-intro { margin-top: .75rem; font-size: 1rem; max-width: 600px; color: #444; }

        /* Sections */
        .t26-section-title {
          font-size: 1.25rem; font-weight: 600; color: ${BRAND};
          border-left: 5px solid ${BRAND}; padding-left: .6rem;
          margin-bottom: 1rem;
        }
        .t26-section { margin-bottom: 2.5rem; }
        .t26-divider { border-top: 1px solid #eee; margin: 2rem 0; }

        /* CONTACT ONLY (reduced + balanced) */
        .t26-contact { font-size: 0.92rem; line-height: 1.35; }
        .t26-contact p { margin-bottom: 0.6rem; }
        .t26-contact svg { flex: 0 0 auto; }
        .t26-contact p { word-break: break-word; overflow-wrap: anywhere; }

        /* Badges */
        .t26-badge {
          background: ${BRAND}; color: #fff; margin: .25rem;
          padding: .35rem .8rem; font-size: 0.85rem;
          border-radius: 20px; font-weight: 500;

          /* Fit + wrap */
          white-space: normal !important;
          overflow-wrap: anywhere;
          word-break: break-word;
          text-align: left;
          max-width: 100%;
          display: inline-block;
          line-height: 1.2;
        }

        /* Timeline */
        .t26-timeline { position: relative; border-left: 2px solid ${BRAND}33; padding-left: 1rem; }
        .t26-card-timeline { margin-bottom: 1.75rem; position: relative; }
        .t26-card-timeline::before {
          content: ""; position: absolute; left: -1.1rem; top: 5px;
          width: 12px; height: 12px; border-radius: 50%; background: ${BRAND};
        }
        .t26-date { font-size: .85rem; font-weight: 500; color: ${BRAND}; margin-bottom: .3rem; }
        .t26-entry-title { font-weight: 600; font-size: 1rem; }
        .t26-entry-sub { font-size: .9rem; color: #666; font-style: italic; }

        /* Referees */
        .t26-ref { border-left: 3px solid ${BRAND}; padding-left: .75rem; margin-bottom: 1rem; }
      `}</style>

      <div className="t26-root a4-card rounded-3 overflow-hidden">
        {/* Hero */}
        <div className="t26-hero">
          <img
            src={
              profile?.picture
                ? `${cvUrl}/${profile.picture}`
                : "https://placehold.co/140x140?text=Photo"
            }
            alt="profile"
            className="t26-photo"
          />
          <div>
            <div className="t26-name">{fullName}</div>
            <div className="t26-sub">{currentPosition}</div>
            <p className="t26-intro">{intro}</p>
          </div>
        </div>

        {/* Body */}
        <Container className="py-5">
          <Row className="g-5">
            {/* Main left */}
            <Col md={8}>
              <Section
                title={
                  <>
                    <FiBriefcase className="me-2" /> Experience
                  </>
                }
              >
                <div className="t26-timeline">
                  {experiences.length ? (
                    experiences.map((exp, i) => (
                      <div key={i} className="t26-card-timeline">
                        <div className="t26-date">
                          {formatMY(exp?.start_date)} –{" "}
                          {exp?.end_date ? formatMY(exp?.end_date) : "Present"}
                        </div>
                        <div className="t26-entry-title">
                          {exp?.position?.position_name || "—"}
                        </div>
                        <div className="t26-entry-sub">
                          {exp?.employer?.employer_name || ""}
                        </div>
                        {exp?.responsibility && (
                          <ul className="small mt-2">
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
              </Section>

              <div className="t26-divider"></div>

              <Section
                title={
                  <>
                    <FiBookOpen className="me-2" /> Education
                  </>
                }
              >
                <div className="t26-timeline">
                  {education.length ? (
                    education.map((edu, i) => (
                      <div key={i} className="t26-card-timeline">
                        <div className="t26-date">
                          {formatMY(edu?.started)} –{" "}
                          {edu?.ended ? formatMY(edu?.ended) : "Present"}
                        </div>
                        <div className="t26-entry-title">
                          {edu?.level?.education_level || edu?.degree || "—"}
                        </div>
                        <div className="t26-entry-sub">
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
              </Section>

              {referees.length > 0 && (
                <>
                  <div className="t26-divider"></div>
                  <Section title="Referees">
                    {referees.map((r, i) => {
                      const rname = [
                        r?.first_name,
                        r?.middle_name,
                        r?.last_name,
                      ]
                        .filter(Boolean)
                        .join(" ");
                      return (
                        <div key={i} className="t26-ref">
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
                </>
              )}
            </Col>

            {/* Sidebar right */}
            <Col md={4}>
              <Section title="Contact">
                <div className="t26-contact">
                  <p className="d-flex align-items-start gap-2">
                    <FiPhone className="mt-1" /> <span>{phone}</span>
                  </p>
                  <p className="d-flex align-items-start gap-2">
                    <FiMail className="mt-1" /> <span>{email}</span>
                  </p>
                  <p className="d-flex align-items-start gap-2">
                    <FiMapPin className="mt-1" /> <span>{location}</span>
                  </p>
                  {payload?.user?.[0]?.website && (
                    <p className="d-flex align-items-start gap-2">
                      <FiGlobe className="mt-1" />{" "}
                      <span>{payload?.user?.[0]?.website}</span>
                    </p>
                  )}
                </div>
              </Section>

              <div className="t26-divider"></div>

              <Section title="Skills">
                <div className="d-flex flex-wrap justify-content-start">
                  {chipsSkills.map((txt, i) => (
                    <Badge key={i} className="t26-badge">
                      {txt}
                    </Badge>
                  ))}
                  {chipsSoftware.map((txt, i) => (
                    <Badge key={i} className="t26-badge">
                      {txt}
                    </Badge>
                  ))}
                </div>
              </Section>

              {chipsLanguages.length > 0 && (
                <>
                  <div className="t26-divider"></div>
                  <Section title="Languages">
                    <div className="d-flex flex-wrap justify-content-start">
                      {chipsLanguages.map((txt, i) => (
                        <Badge key={i} className="t26-badge">
                          {txt}
                        </Badge>
                      ))}
                    </div>
                  </Section>
                </>
              )}

              {(chipsCulture.length > 0 || chipsPersonality.length > 0) && (
                <>
                  <div className="t26-divider"></div>
                  <Section title="Culture & Personality">
                    <div className="d-flex flex-wrap justify-content-start">
                      {chipsCulture.map((txt, i) => (
                        <Badge key={i} bg="info" text="dark">
                          {txt}
                        </Badge>
                      ))}
                      {chipsPersonality.map((txt, i) => (
                        <Badge key={i} bg="warning" text="dark">
                          {txt}
                        </Badge>
                      ))}
                    </div>
                  </Section>
                </>
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
    <div className="t26-section">
      <h5 className="t26-section-title">{title}</h5>
      {children}
    </div>
  );
}

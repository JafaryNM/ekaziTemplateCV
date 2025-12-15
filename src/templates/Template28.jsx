// Template28.jsx — Creative Premium CV (Zilla Slab + Inter, Brand #146990 + Gold Accents)

import { useEffect, useState, useMemo } from "react";
import { Container, Row, Col, Spinner, Alert, Badge } from "react-bootstrap";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiGlobe,
  FiBriefcase,
  FiBookOpen,
  FiUsers,
} from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";

const cvUrl = "https://api.ekazi.co.tz";
const API = "https://api.ekazi.co.tz/api/cv/cv_builder/30750";

const BRAND = "#146990";
const GOLD = "#d4af37";
const INK = "#1f2a33";
const INK_SOFT = "#6c7a84";

function formatMY(d) {
  const m = moment(d);
  return m.isValid() ? m.format("MMM YYYY") : "—";
}

export default function Template28() {
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
      (p?.personality?.personality_name || p?.personality_name || "")
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
      {/* Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@600;700&family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <style>{`
        .a4-card { width: 100%; min-height: calc(297mm - 10mm); }
        .t28-root { font-family: 'Inter', sans-serif; color:${INK}; background:#f6f8f9; }

        /* Hero */
        .t28-hero{
          background:linear-gradient(135deg, ${BRAND}, #0f4d5d);
          text-align:center; padding:4rem 2rem 6rem;
          border-bottom-left-radius:80px; border-bottom-right-radius:80px;
          color:#fff;
          position: relative;
          z-index: 1;
        }
        .t28-photo{
          width:160px; height:160px; border-radius:50%; object-fit:cover;
          border:6px solid ${GOLD}; box-shadow:0 6px 20px rgba(0,0,0,.3);
          margin-bottom:1rem; background:#eee;
        }
        .t28-name{ font-family:'Zilla Slab',serif; font-size:2.8rem; font-weight:700; }
        .t28-role{ font-size:1.2rem; opacity:.9; margin-bottom:1rem; }
        .t28-intro{ max-width:650px; margin:0 auto; font-size:1rem; opacity:.95; }

        /* Body */
        .t28-body{
          margin-top: -1rem;
          padding-top: 1.75rem;
          position: relative;
          z-index: 2;
        }

        /* Sidebar */
        .t28-sidebar{
          background:#fff; padding:2rem; border-radius:20px;
          box-shadow:0 8px 20px rgba(0,0,0,.05);
          margin-top: .75rem;
        }
        .t28-section{ margin-bottom:2rem; }
        .t28-section h4{
          font-family:'Zilla Slab',serif; font-size:1rem; font-weight:700;
          color:${BRAND}; margin-bottom:1rem;
          border-bottom:2px solid ${GOLD}; padding-bottom:.3rem;
        }

        /* ✅ Contact: icon on top, value below + smaller font */
        .t28-contact-stack{ display:flex; flex-direction:column; gap: 12px; margin-top: 2px; }
        .t28-contact-item{ display:flex; flex-direction:column; gap: 6px; }
        .t28-contact-icon{
          width: 28px; height: 28px;
          display:inline-flex; align-items:center; justify-content:center;
          border-radius: 10px;
          border: 1px solid rgba(20,105,144,.25);
          background: rgba(20,105,144,.08);
          color: ${BRAND};
        }
        .t28-contact-text{
          font-size: 0.85rem;   /* ✅ reduced */
          line-height: 1.2;     /* ✅ tighter */
          color: ${INK};
          overflow-wrap:anywhere;
          word-break: break-word;
        }

        /* Badges (wrap) */
        .t28-badge{
          background:${BRAND}; color:#fff; margin:.25rem;
          padding:.35rem .8rem; border-radius:20px;
          font-size:.8rem; font-weight:500;

          white-space: normal !important;
          overflow-wrap: anywhere;
          word-break: break-word;
          text-align: left;
          max-width: 100%;
          display: inline-block;
          line-height: 1.2;
        }

        /* Main column */
        .t28-main-col{ margin-top: 1.35rem; } /* ✅ bring header down near cards */

        /* ✅ Experience/Education/Referees headings NOT in a tile */
        .t28-main-head{
          display:flex;
          align-items:center;
          gap:.5rem;
          font-family:'Zilla Slab',serif;
          font-size:1rem;
          font-weight:700;
          color:${BRAND};
          margin: 0 0 .9rem 0;
          padding-bottom:.35rem;
          border-bottom:2px solid ${GOLD};
        }

        /* Cards */
        .t28-card{
          background:#fff; border-radius:20px;
          padding:1.5rem; margin-bottom:1.5rem;
          box-shadow:0 6px 20px rgba(0,0,0,.06);
          border-left:5px solid ${BRAND};
        }
        .t28-card .date{ font-size:.85rem; font-weight:600; color:${BRAND}; margin-bottom:4px; }
        .t28-card .title{ font-weight:700; font-size:1rem; color:${BRAND}; }
        .t28-card .sub{ font-size:.9rem; color:${INK_SOFT}; font-style:italic; margin-bottom:6px; }
      `}</style>

      <div className="t28-root a4-card rounded-3 overflow-hidden">
        {/* Hero */}
        <div className="t28-hero">
          <img
            src={
              profile?.picture
                ? `${cvUrl}/${profile.picture}`
                : "https://placehold.co/160x160?text=Photo"
            }
            alt="profile"
            className="t28-photo"
          />
          <div className="t28-name">{fullName}</div>
          <div className="t28-role">{currentPosition}</div>
          <p className="t28-intro">{intro}</p>
        </div>

        {/* Body */}
        <Container className="t28-body">
          <Row className="g-4">
            {/* Sidebar */}
            <Col md={4}>
              <div className="t28-sidebar">
                <div className="t28-section">
                  <h4>Contact</h4>

                  <div className="t28-contact-stack">
                    <div className="t28-contact-item">
                      <span className="t28-contact-icon">
                        <FiPhone />
                      </span>
                      <div className="t28-contact-text">{phone}</div>
                    </div>

                    <div className="t28-contact-item">
                      <span className="t28-contact-icon">
                        <FiMail />
                      </span>
                      <div className="t28-contact-text">{email}</div>
                    </div>

                    <div className="t28-contact-item">
                      <span className="t28-contact-icon">
                        <FiMapPin />
                      </span>
                      <div className="t28-contact-text">{location}</div>
                    </div>

                    {payload?.user?.[0]?.website && (
                      <div className="t28-contact-item">
                        <span className="t28-contact-icon">
                          <FiGlobe />
                        </span>
                        <div className="t28-contact-text">
                          {payload?.user?.[0]?.website}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="t28-section">
                  <h4>Skills</h4>
                  <div className="d-flex flex-wrap">
                    {chipsSkills.map((txt, i) => (
                      <Badge key={i} className="t28-badge">
                        {txt}
                      </Badge>
                    ))}
                    {chipsSoftware.map((txt, i) => (
                      <Badge key={i} className="t28-badge">
                        {txt}
                      </Badge>
                    ))}
                  </div>
                </div>

                {chipsLanguages.length > 0 && (
                  <div className="t28-section">
                    <h4>Languages</h4>
                    <div className="d-flex flex-wrap">
                      {chipsLanguages.map((txt, i) => (
                        <Badge key={i} className="t28-badge">
                          {txt}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {(chipsCulture.length > 0 ||
                  chipsPersonality.length > 0 ||
                  chipsTools.length > 0) && (
                  <div className="t28-section">
                    <h4>Culture & Personality</h4>
                    <div className="d-flex flex-wrap">
                      {chipsCulture.map((txt, i) => (
                        <Badge key={i} className="t28-badge">
                          {txt}
                        </Badge>
                      ))}
                      {chipsPersonality.map((txt, i) => (
                        <Badge key={i} className="t28-badge">
                          {txt}
                        </Badge>
                      ))}
                      {chipsTools.map((txt, i) => (
                        <Badge key={i} className="t28-badge">
                          {txt}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Col>

            {/* Main */}
            <Col md={8} className="t28-main-col">
              <div className="t28-main-head">
                <FiBriefcase /> Experience
              </div>

              {experiences.length ? (
                experiences.map((exp, i) => (
                  <div key={i} className="t28-card">
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
                          .map((t, k) =>
                            t.trim() ? (
                              <li key={k}>{t.replace(/^•\s*/, "")}</li>
                            ) : null
                          )}
                      </ul>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-muted">No job experience available.</p>
              )}

              <div className="t28-main-head" style={{ marginTop: "1.25rem" }}>
                <FiBookOpen /> Education
              </div>

              {education.length ? (
                education.map((edu, i) => (
                  <div key={i} className="t28-card">
                    <div className="date">
                      {formatMY(edu?.started)} –{" "}
                      {edu?.ended ? formatMY(edu?.ended) : "Present"}
                    </div>
                    <div className="title">
                      {edu?.level?.education_level || edu?.degree || "—"}
                    </div>
                    <div className="sub">
                      {edu?.college?.college_name || edu?.institution || ""}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted">No education records available.</p>
              )}

              {referees.length > 0 && (
                <>
                  <div
                    className="t28-main-head"
                    style={{ marginTop: "1.25rem" }}
                  >
                    <FiUsers /> Referees
                  </div>

                  {referees.map((r, i) => {
                    const rname = [r?.first_name, r?.middle_name, r?.last_name]
                      .filter(Boolean)
                      .join(" ");
                    return (
                      <div key={i} className="t28-card">
                        <div className="title">{rname || "—"}</div>
                        <div className="sub">{r?.referee_position || "—"}</div>
                        <div className="mb-1">{r?.employer || "—"}</div>
                        <div className="small">{r?.phone || "—"}</div>
                        <div className="small">{r?.email || "—"}</div>
                      </div>
                    );
                  })}
                </>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </Container>
  );
}

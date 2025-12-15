// Template32.jsx — Clean Creative A4 CV (Ubuntu + Fresh Layout + Clear Contact Tiles)

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
  FiTool,
  FiSmile,
} from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";

const cvUrl = "https://api.ekazi.co.tz";
const API = "https://api.ekazi.co.tz/api/cv/cv_builder/30750";

const BRAND = "#0EA5E9"; // new color (clean + modern)
const INK = "#0F172A";
const BG = "#F6F7FB";
const SOFT = "#64748B";

function formatMY(d) {
  const m = moment(d);
  return m.isValid() ? m.format("MMM YYYY") : "—";
}

export default function Template32() {
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
          '"Ubuntu", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        boxShadow: "0 0 5px rgba(0,0,0,0.2)",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap"
        rel="stylesheet"
      />

      <style>{`
        .t32-root { font-family: 'Ubuntu', sans-serif; color: ${INK}; background: ${BG}; }
        .a4-card { width: 100%; min-height: calc(297mm - 10mm); background: ${BG}; }
        .t32-inner { padding: 16px; }

        /* Header (no tiles) */
        .t32-hero {
          position: relative;
          background: #fff;
          border-radius: 22px;
          border: 1px solid rgba(15, 23, 42, 0.06);
          box-shadow: 0 10px 26px rgba(15, 23, 42, 0.06);
          padding: 18px 18px 18px 18px;
          overflow: hidden;
        }
        .t32-hero::before{
          content:"";
          position:absolute;
          left:0; top:0; bottom:0;
          width:10px;
          background: linear-gradient(180deg, ${BRAND}, rgba(14,165,233,0.35));
        }
        .t32-hero-grid{
          display:grid;
          grid-template-columns: 1fr 170px;
          gap: 16px;
          align-items:center;
        }
        .t32-name { font-size: 1.75rem; font-weight: 700; margin: 0; }
        .t32-role { margin-top: 4px; font-size: 1rem; color: ${SOFT}; font-weight: 500; }
        .t32-intro { margin-top: 10px; font-size: .95rem; line-height: 1.55; color: #334155; }

        /* Image moved + clean */
        .t32-photo-wrap{
          justify-self:end;
          width: 160px;
          height: 160px;
          border-radius: 26px;
          padding: 6px;
          background: linear-gradient(135deg, rgba(14,165,233,0.25), rgba(14,165,233,0.05));
          border: 1px solid rgba(14,165,233,0.25);
        }
        .t32-photo{
          width:100%;
          height:100%;
          border-radius: 20px;
          object-fit: cover;
          background:#e5e7eb;
          box-shadow: 0 10px 25px rgba(15,23,42,0.12);
        }

        /* Body layout */
        .t32-body { margin-top: 14px; }
        .t32-left, .t32-right { }

        /* Sidebar cards */
        .t32-side-card{
          background:#fff;
          border-radius: 18px;
          border: 1px solid rgba(15, 23, 42, 0.06);
          box-shadow: 0 10px 24px rgba(15, 23, 42, 0.05);
          padding: 14px 14px;
          margin-bottom: 12px;
        }

        /* Section header */
        .t32-h{
          display:flex;
          align-items:center;
          gap:10px;
          font-size: .9rem;
          font-weight: 700;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: ${BRAND};
          margin: 0 0 10px 0;
        }
        .t32-h .line{
          height:2px;
          flex:1;
          background: rgba(14,165,233,0.25);
          border-radius: 999px;
        }

        /* CONTACT — 3 rows, icon above text, single-line */
        .t32-contact-grid{
          display:grid;
          grid-template-columns: 1fr;
          gap: 10px;
        }
        .t32-contact-item{
          display:flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align:center;
          gap: 8px;
          padding: 12px 10px;
          border-radius: 16px;
          background: linear-gradient(180deg, rgba(14,165,233,0.08), rgba(14,165,233,0.03));
          border: 1px solid rgba(14,165,233,0.16);
          min-height: 76px;
        }
        .t32-contact-icon{
          width: 34px; height: 34px;
          border-radius: 12px;
          display:flex;
          align-items:center;
          justify-content:center;
          background: rgba(14,165,233,0.12);
          border: 1px solid rgba(14,165,233,0.18);
          color: ${BRAND};
        }
        .t32-contact-text{
          font-size: .78rem;            /* reduced ONLY here */
          line-height: 1.1;
          width: 100%;
          white-space: nowrap;          /* single line */
          overflow: hidden;
          text-overflow: ellipsis;
          color: #0F172A;
        }

        /* Chips */
        .t32-chip{
          background: rgba(14,165,233,0.10);
          color: #0B3B52;
          border: 1px solid rgba(14,165,233,0.16);
          border-radius: 999px;
          padding: .28rem .6rem;
          font-size: .78rem;
          font-weight: 500;
          margin: .18rem;
          white-space: normal !important;
          overflow-wrap: anywhere;
          word-break: break-word;
          text-align: left;
          max-width: 100%;
          display: inline-block;
          line-height: 1.2;
        }
        .t32-chip.dark{
          background: rgba(15,23,42,0.06);
          border-color: rgba(15,23,42,0.10);
          color:#0F172A;
        }

        /* Main cards */
        .t32-main-card{
          background:#fff;
          border-radius: 18px;
          border: 1px solid rgba(15, 23, 42, 0.06);
          box-shadow: 0 10px 24px rgba(15, 23, 42, 0.05);
          padding: 14px 14px;
          margin-bottom: 12px;
          position: relative;
          overflow: hidden;
        }
        .t32-main-card::before{
          content:"";
          position:absolute;
          left:0; top:0; bottom:0;
          width:4px;
          background:${BRAND};
          opacity:.9;
        }
        .t32-date{ font-size:.8rem; font-weight:700; color:${BRAND}; margin-bottom:4px; }
        .t32-title{ font-size:1rem; font-weight:700; color:#0F172A; }
        .t32-sub{ font-size:.9rem; color:${SOFT}; font-style:italic; margin-bottom:6px; }

        .t32-ref{ border-left: 3px solid ${BRAND}; padding-left: 10px; }

        @media (max-width: 768px){
          .t32-hero-grid{ grid-template-columns: 1fr; }
          .t32-photo-wrap{ justify-self: start; }
        }
      `}</style>

      <div className="t32-root a4-card rounded-3 overflow-hidden">
        <div className="t32-inner">
          {/* HERO */}
          <div className="t32-hero">
            <div className="t32-hero-grid">
              <div>
                <h1 className="t32-name">{fullName}</h1>
                <div className="t32-role">{currentPosition}</div>
                <p className="t32-intro mb-0">{intro}</p>
              </div>

              <div className="t32-photo-wrap">
                <img
                  src={
                    profile?.picture
                      ? `${cvUrl}/${profile.picture}`
                      : "https://placehold.co/160x160?text=Photo"
                  }
                  alt="profile"
                  className="t32-photo"
                />
              </div>
            </div>
          </div>

          {/* BODY */}
          <div className="t32-body">
            <Row className="g-3">
              {/* LEFT SIDEBAR */}
              <Col md={4} className="t32-left">
                <div className="t32-side-card">
                  <div className="t32-h">
                    <FiUsers /> Contact <span className="line" />
                  </div>

                  {/* 3 rows */}
                  <div className="t32-contact-grid">
                    <div className="t32-contact-item" title={phone}>
                      <div className="t32-contact-icon">
                        <FiPhone />
                      </div>
                      <div className="t32-contact-text">{phone}</div>
                    </div>

                    <div className="t32-contact-item" title={email}>
                      <div className="t32-contact-icon">
                        <FiMail />
                      </div>
                      <div className="t32-contact-text">{email}</div>
                    </div>

                    <div className="t32-contact-item" title={location}>
                      <div className="t32-contact-icon">
                        <FiMapPin />
                      </div>
                      <div className="t32-contact-text">{location}</div>
                    </div>

                    {payload?.user?.[0]?.website && (
                      <div
                        className="t32-contact-item"
                        title={payload?.user?.[0]?.website}
                      >
                        <div className="t32-contact-icon">
                          <FiGlobe />
                        </div>
                        <div className="t32-contact-text">
                          {payload?.user?.[0]?.website}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="t32-side-card">
                  <div className="t32-h">
                    <FiBriefcase /> Skills <span className="line" />
                  </div>
                  <div>
                    {chipsSkills.map((txt, i) => (
                      <Badge key={i} className="t32-chip">
                        {txt}
                      </Badge>
                    ))}
                    {chipsSoftware.map((txt, i) => (
                      <Badge key={i} className="t32-chip dark">
                        {txt}
                      </Badge>
                    ))}
                  </div>
                </div>

                {chipsLanguages.length > 0 && (
                  <div className="t32-side-card">
                    <div className="t32-h">
                      <FiGlobe /> Languages <span className="line" />
                    </div>
                    <div>
                      {chipsLanguages.map((txt, i) => (
                        <Badge key={i} className="t32-chip">
                          {txt}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {chipsTools.length > 0 && (
                  <div className="t32-side-card">
                    <div className="t32-h">
                      <FiTool /> Tools <span className="line" />
                    </div>
                    <div>
                      {chipsTools.map((txt, i) => (
                        <Badge key={i} className="t32-chip dark">
                          {txt}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {(chipsCulture.length > 0 || chipsPersonality.length > 0) && (
                  <div className="t32-side-card">
                    <div className="t32-h">
                      <FiSmile /> Culture & Personality <span className="line" />
                    </div>
                    <div>
                      {chipsCulture.map((txt, i) => (
                        <Badge key={i} className="t32-chip">
                          {txt}
                        </Badge>
                      ))}
                      {chipsPersonality.map((txt, i) => (
                        <Badge key={i} className="t32-chip dark">
                          {txt}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </Col>

              {/* RIGHT MAIN */}
              <Col md={8} className="t32-right">
                <div className="t32-side-card">
                  <div className="t32-h">
                    <FiBriefcase /> Experience <span className="line" />
                  </div>

                  {experiences.length ? (
                    experiences.map((exp, i) => (
                      <div key={i} className="t32-main-card">
                        <div className="t32-date">
                          {formatMY(exp?.start_date)} –{" "}
                          {exp?.end_date ? formatMY(exp?.end_date) : "Present"}
                        </div>
                        <div className="t32-title">
                          {exp?.position?.position_name || "—"}
                        </div>
                        <div className="t32-sub">
                          {exp?.employer?.employer_name || ""}
                        </div>

                        {exp?.responsibility && (
                          <ul className="small mb-0">
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
                </div>

                <div className="t32-side-card">
                  <div className="t32-h">
                    <FiBookOpen /> Education <span className="line" />
                  </div>

                  {education.length ? (
                    education.map((edu, i) => (
                      <div key={i} className="t32-main-card">
                        <div className="t32-date">
                          {formatMY(edu?.started)} –{" "}
                          {edu?.ended ? formatMY(edu?.ended) : "Present"}
                        </div>
                        <div className="t32-title">
                          {edu?.level?.education_level || edu?.degree || "—"}
                        </div>
                        <div className="t32-sub">
                          {edu?.college?.college_name || edu?.institution || ""}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted">No education records available.</p>
                  )}
                </div>

                {referees.length > 0 && (
                  <div className="t32-side-card">
                    <div className="t32-h">
                      <FiUsers /> Referees <span className="line" />
                    </div>

                    {referees.map((r, i) => {
                      const rname = [r?.first_name, r?.middle_name, r?.last_name]
                        .filter(Boolean)
                        .join(" ");
                      return (
                        <div key={i} className="t32-main-card">
                          <div className="t32-ref">
                            <div className="t32-title">{rname || "—"}</div>
                            <div className="t32-sub">
                              {r?.referee_position || "—"}
                            </div>
                            <div>{r?.employer || "—"}</div>
                            <div className="small">{r?.phone || "—"}</div>
                            <div className="small">{r?.email || "—"}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </Container>
  );
}

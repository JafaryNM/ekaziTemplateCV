// Template31.jsx — Modern Header CV (Euclid Circular B + Brand #2a9c64)

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

const cvUrl = "https://ekazi.co.tz";
const API = "https://ekazi.co.tz/api/cv/cv_builder/30750";

const BRAND = "#2a9c64";
const INK = "#222";
const SOFT = "#666";
const BG = "#fafafa";

function formatMY(d) {
  const m = moment(d);
  return m.isValid() ? m.format("MMM YYYY") : "—";
}

export default function Template31() {
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
    <Container fluid className="t31-root p-0">
      <style>{`
        .t31-root { 
          font-family:'Euclid Circular B',ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,
          'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,
          'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'; 
          background:${BG}; color:${INK};
        }

        /* Header */
        .t31-header {
          background:${BRAND}; color:#fff;
          padding:2rem; display:flex; align-items:center; gap:2rem;
          flex-wrap:wrap; text-align:left;
        }
        .t31-photo {
          width:130px; height:130px; border-radius:50%; object-fit:cover;
          border:4px solid #fff; box-shadow:0 4px 12px rgba(0,0,0,.2);
        }
        .t31-name { font-size:2rem; font-weight:700; }
        .t31-role { font-size:1.1rem; margin:.4rem 0; }
        .t31-intro { font-size:.95rem; max-width:600px; color:#f1f1f1; }

        .t31-contact { margin-top:1rem; font-size:.9rem; color:#e2e2e2; }
        .t31-contact p { margin:0.2rem 0; display:flex; align-items:center; gap:.4rem; }

        /* Body */
        .t31-body { padding:2.5rem; }
        .t31-section { margin-bottom:2rem; }
        .t31-section h4 {
          font-size:1rem; font-weight:600; color:${BRAND};
          border-bottom:2px solid ${BRAND}; display:inline-block;
          margin-bottom:1rem; text-transform:uppercase;
        }

        .t31-entry { margin-bottom:1.5rem; }
        .t31-entry .date { font-size:.8rem; font-weight:600; color:${BRAND}; }
        .t31-entry .title { font-size:1rem; font-weight:600; }
        .t31-entry .sub { font-size:.9rem; color:${SOFT}; font-style:italic; margin-bottom:.3rem; }

        .t31-badge {
          background:${BRAND}; color:#fff; margin:.25rem;
          padding:.3rem .8rem; font-size:.8rem; border-radius:20px;
        }

        .t31-ref {
          background:#fff; border-left:4px solid ${BRAND};
          padding:1rem; margin-bottom:1rem; box-shadow:0 2px 6px rgba(0,0,0,.06);
        }
      `}</style>

      {/* Header */}
      <div className="t31-header">
        <img
          src={
            profile?.picture
              ? `${cvUrl}/${profile.picture}`
              : "https://placehold.co/130x130?text=Photo"
          }
          alt="profile"
          className="t31-photo"
        />
        <div>
          <div className="t31-name">{fullName}</div>
          <div className="t31-role">{currentPosition}</div>
          <p className="t31-intro">{intro}</p>

          <div className="t31-contact">
            <p>
              <FiPhone /> {phone}
            </p>
            <p>
              <FiMail /> {email}
            </p>
            <p>
              <FiMapPin /> {location}
            </p>
            {payload?.user?.[0]?.website && (
              <p>
                <FiGlobe /> {payload?.user?.[0]?.website}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <Container className="t31-body">
        <Row className="g-4">
          {/* Left: Experience + Education */}
          <Col md={8}>
            <div className="t31-section">
              <h4>
                <FiBriefcase /> Experience
              </h4>
              {experiences.length ? (
                experiences.map((exp, i) => (
                  <div key={i} className="t31-entry">
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
            </div>

            <div className="t31-section">
              <h4>
                <FiBookOpen /> Education
              </h4>
              {education.length ? (
                education.map((edu, i) => (
                  <div key={i} className="t31-entry">
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
            </div>
          </Col>

          {/* Right: Skills, Languages, Referees */}
          <Col md={4}>
            <div className="t31-section">
              <h4>Skills</h4>
              <div className="d-flex flex-wrap">
                {knowledge.map((k, i) => (
                  <Badge key={i} className="t31-badge">
                    {k?.knowledge?.knowledge_name}
                  </Badge>
                ))}
                {software.map((s, i) => (
                  <Badge key={i} className="t31-badge">
                    {s?.software?.software_name}
                  </Badge>
                ))}
              </div>
            </div>

            {languages.length > 0 && (
              <div className="t31-section">
                <h4>Languages</h4>
                <div className="d-flex flex-wrap">
                  {languages.map((l, i) => (
                    <Badge key={i} className="t31-badge">
                      {l?.language?.language_name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {referees.length > 0 && (
              <div className="t31-section">
                <h4>
                  <FiUsers /> Referees
                </h4>
                {referees.map((r, i) => {
                  const rname = [r?.first_name, r?.middle_name, r?.last_name]
                    .filter(Boolean)
                    .join(" ");
                  return (
                    <div key={i} className="t31-ref">
                      <strong>{rname || "—"}</strong>
                      <div className="sub">{r?.referee_position || "—"}</div>
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
    </Container>
  );
}

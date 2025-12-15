// Template12.jsx — CV Template with Exo 2 font + Modern Timeline UI
// Header updated: avatar bigger + moved closer to the left (reduced gap + fixed right padding)
import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Badge,
} from "react-bootstrap";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";

const API = "https://api.ekazi.co.tz/api/cv/cv_builder/30750";
const cvUrl = "https://api.ekazi.co.tz";
const BRAND = "#e38720";

function toTitleChip(v) {
  return (v || "")
    .toString()
    .replace(/^,+/, "")
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (ch) => ch.toUpperCase());
}

export default function Template12() {
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

  const profiles = payload?.applicant_profile ?? [];
  const profile = profiles[0] ?? {};
  const experiences = payload?.experience ?? [];
  const referees = payload?.referees ?? [];
  const addresses = payload?.address ?? [];
  const education = payload?.education ?? [];
  const languages = payload?.language ?? [];
  const knowledge = payload?.knowledge ?? [];
  const software = payload?.software ?? [];
  const culture = payload?.culture ?? [];
  const personalities = payload?.applicant_personality ?? [];

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

  const intro =
    payload?.careers?.[0]?.career ||
    payload?.objective?.objective ||
    "Professional summary not provided.";

  const currentPosition =
    payload?.current_position ||
    payload?.experience?.[0]?.position?.position_name ||
    "—";

  const fullName =
    `${profile.first_name || ""} ${profile.middle_name || ""} ${
      profile.last_name || ""
    }`.replace(/\s+/g, " ").trim() || "—";

  const chipsLanguages = languages
    .map((l) => toTitleChip(l?.language?.language_name || l?.language_name))
    .filter(Boolean);

  const chipsSkills = knowledge
    .map((k) => toTitleChip(k?.knowledge?.knowledge_name || k?.knowledge_name))
    .filter(Boolean);

  const chipsSoftware = software
    .map((s) => toTitleChip(s?.software?.software_name || s?.software_name))
    .filter(Boolean);

  const chipsCulture = culture
    .map((c) =>
      toTitleChip(c?.culture?.culture_name || c?.culture_name || c?.name)
    )
    .filter(Boolean);

  const chipsPersonality = personalities
    .map((p) =>
      toTitleChip(
        p?.personality?.personality_name || p?.personality_name || p?.name
      )
    )
    .filter(Boolean);

  const formatMY = (d) => {
    const m = moment(d);
    return m.isValid() ? m.format("MMM YYYY") : "—";
  };

  const formatY = (d) => {
    const m = moment(d);
    return m.isValid() ? m.format("YYYY") : "";
  };

  return (
    <Container
      fluid
      className="p-0"
      style={{
        width: "210mm",
        minHeight: "297mm",
        margin: "0 auto",
        backgroundColor: "#fff",
        padding: "5mm",
        boxSizing: "border-box",
        fontFamily: "Exo 2, sans-serif",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Exo+2:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <style>{`
        .a4-card { width: 100%; min-height: calc(297mm - 10mm); }

        .chip-badge {
          white-space: normal !important;
          overflow-wrap: anywhere;
          word-break: break-word;
          text-align: left;
          max-width: 100%;
          display: inline-block;
          line-height: 1.2;
        }

        /* Header contact (no overlap) */
        .t12-contact-row{
          display:flex;
          flex-wrap:wrap;
          gap:14px;
          margin-top:.65rem;
          font-size:.86rem;
          line-height:1.2;
          opacity:.92;
        }
        .t12-contact-item{
          display:inline-flex;
          align-items:center;
          gap:6px;
          min-width:0;
          max-width:100%;
          white-space:nowrap;
        }
        .t12-contact-item span{
          display:inline-block;
          min-width:0;
          overflow:hidden;
          text-overflow:ellipsis;
          vertical-align:bottom;
        }
        .t12-contact-email span{ max-width: 260px; }

        /* Header image: bigger + closer (smaller gap + less right padding) */
        .t12-header-row{
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:12px;              /* was 16px */
          flex-wrap:wrap;
        }
        .t12-header-left{
          min-width:0;
          flex: 1 1 540px;
        }
        .t12-header-right{
          flex: 0 0 auto;
          display:flex;
          justify-content:flex-end;
          padding-right: 4px;    /* pulls avatar closer to left compared to edge */
        }
        .t12-avatar{
          width: 108px;          /* was 92px */
          height: 108px;         /* was 92px */
          border-radius:50%;
          object-fit:cover;
          border:3px solid rgba(255,255,255,.95);
          box-shadow: 0 4px 14px rgba(0,0,0,.18);
          background: rgba(255,255,255,.15);
        }
      `}</style>

      <Card className="shadow-lg border-0 overflow-hidden a4-card">
        {/* Banner */}
        <Card.Header
          className="text-white py-4"
          style={{ backgroundColor: BRAND }}
        >
          <div className="t12-header-row">
            <div className="t12-header-left">
              <h2 className="fw-bold mb-1">{fullName}</h2>
              <h5 className="fw-light mb-0">{currentPosition}</h5>

              <div className="t12-contact-row">
                <div className="t12-contact-item">
                  <FiPhone /> <span>{phone}</span>
                </div>
                <div className="t12-contact-item t12-contact-email">
                  <FiMail /> <span>{email}</span>
                </div>
                <div className="t12-contact-item">
                  <FiMapPin /> <span>{location}</span>
                </div>
              </div>
            </div>

            <div className="t12-header-right">
              <img
                className="t12-avatar"
                src={
                  profile?.picture
                    ? `${cvUrl}/${profile.picture}`
                    : "https://placehold.co/200x200?text=Photo"
                }
                alt="profile"
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://placehold.co/200x200?text=Photo")
                }
              />
            </div>
          </div>
        </Card.Header>

        {/* Body */}
        <Card.Body className="p-4">
          <Row>
            {/* Left column */}
            <Col md={4}>
              <Card className="mb-4 shadow-sm border-0">
                <Card.Body>
                  <h5 className="fw-bold mb-3" style={{ color: BRAND }}>
                    About Me
                  </h5>
                  <p style={{ textAlign: "justify" }}>{intro}</p>
                </Card.Body>
              </Card>

              <Card className="mb-4 shadow-sm border-0">
                <Card.Body>
                  <h5 className="fw-bold mb-3" style={{ color: BRAND }}>
                    Languages
                  </h5>
                  <div className="d-flex flex-wrap gap-2">
                    {chipsLanguages.map((txt, i) => (
                      <Badge
                        key={i}
                        pill
                        className="chip-badge"
                        style={{ backgroundColor: BRAND, color: "#fff" }}
                      >
                        {txt}
                      </Badge>
                    ))}
                    {!chipsLanguages.length && <span>—</span>}
                  </div>
                </Card.Body>
              </Card>

              <Card className="mb-4 shadow-sm border-0">
                <Card.Body>
                  <h5 className="fw-bold mb-3" style={{ color: BRAND }}>
                    Skills & Tools
                  </h5>
                  <div className="d-flex flex-wrap gap-2">
                    {chipsSkills.map((txt, i) => (
                      <Badge key={i} pill bg="secondary" className="chip-badge">
                        {txt}
                      </Badge>
                    ))}
                    {chipsSoftware.map((txt, i) => (
                      <Badge key={i} pill bg="dark" className="chip-badge">
                        {txt}
                      </Badge>
                    ))}
                    {chipsCulture.map((txt, i) => (
                      <Badge
                        key={i}
                        pill
                        className="chip-badge"
                        style={{ backgroundColor: BRAND, color: "#fff" }}
                      >
                        {txt}
                      </Badge>
                    ))}
                    {chipsPersonality.map((txt, i) => (
                      <Badge
                        key={i}
                        pill
                        bg="info"
                        text="dark"
                        className="chip-badge"
                      >
                        {txt}
                      </Badge>
                    ))}
                    {!chipsSkills.length &&
                      !chipsSoftware.length &&
                      !chipsCulture.length &&
                      !chipsPersonality.length && <span>—</span>}
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Right column */}
            <Col md={8}>
              <SectionCard title="Experience" brand={BRAND}>
                {experiences.length ? (
                  experiences.map((exp, i) => (
                    <Card
                      key={i}
                      body
                      className="mb-3 shadow-sm border-0"
                      style={{ borderLeft: `5px solid ${BRAND}` }}
                    >
                      <div className="fw-semibold">
                        {exp?.position?.position_name || "Job Title"}
                        {exp?.employer?.employer_name && (
                          <span className="text-muted">
                            {" "}
                            @ {exp.employer.employer_name}
                          </span>
                        )}
                      </div>
                      <div className="text-muted small mb-2">
                        {formatY(exp?.start_date)} –{" "}
                        {formatY(exp?.end_date) || "Present"}
                      </div>
                      {exp?.responsibility && (
                        <ul className="mb-0 small">
                          {exp.responsibility
                            .split("\n")
                            .map((t) => t.trim())
                            .filter(Boolean)
                            .map((t, k) => (
                              <li key={k}>{t.replace(/^•\s*/, "")}</li>
                            ))}
                        </ul>
                      )}
                    </Card>
                  ))
                ) : (
                  <div className="text-secondary">No job experience added.</div>
                )}
              </SectionCard>

              <SectionCard title="Education" brand={BRAND}>
                {education.length ? (
                  education.map((edu, i) => (
                    <Card
                      key={i}
                      body
                      className="mb-3 shadow-sm border-0"
                      style={{ borderLeft: `5px solid ${BRAND}` }}
                    >
                      <div className="fw-semibold">
                        {edu?.level?.education_level || edu?.degree || "—"}
                      </div>
                      <div>
                        {edu?.college?.college_name || edu?.institution || "—"}
                      </div>
                      <div className="text-muted small">
                        {formatMY(edu?.started)} – {formatMY(edu?.ended)}
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-secondary">
                    No education records available.
                  </div>
                )}
              </SectionCard>

              {referees.length > 0 && (
                <SectionCard title="Referees" brand={BRAND}>
                  {referees.map((r, i) => {
                    const full = [r.first_name, r.middle_name, r.last_name]
                      .filter(Boolean)
                      .join(" ");
                    return (
                      <Card
                        key={r.id ?? i}
                        body
                        className="mb-3 shadow-sm border-0"
                        style={{ borderLeft: `5px solid ${BRAND}` }}
                      >
                        <div className="fw-semibold">{full || "—"}</div>
                        <div className="text-muted">
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

function SectionCard({ title, children, brand }) {
  return (
    <div className="mb-4">
      <h4 className="fw-bold mb-3" style={{ color: brand }}>
        {title}
      </h4>
      {children}
    </div>
  );
}

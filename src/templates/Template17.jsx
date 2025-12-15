// Template17.jsx — Modern CV with Josefin Sans + Brand #223a83 + Compact Skills Layout + Profile Image
// FIXES:
// 1) loading never stopped (setLoading(false) on success) ✅
// 2) A4 sizing wrapper + full-height inner card ✅
// 3) Flattened + Title Case capitalization for chips/badges (skills/software/languages/culture/personality) ✅
// 4) Chip wrapping/overflow safety ✅
// (Nothing else changed)

import { useEffect, useState, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Badge,
  Table,
} from "react-bootstrap";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiCpu,
  FiStar,
} from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";

const cvUrl = "https://api.ekazi.co.tz";
const API = "https://api.ekazi.co.tz/api/cv/cv_builder/30750";
const BRAND = "#223a83";

/* Helpers */
function formatMY(d) {
  const m = moment(d);
  return m.isValid() ? m.format("MMM YYYY") : "—";
}

const toTitleChip = (v) =>
  (v || "")
    .toString()
    .replace(/^,+/, "")
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (ch) => ch.toUpperCase());

export default function Template17() {
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
        setLoading(false); // ✅ FIX: stop loading on success
      })
      .catch((err) => {
        setError(err.message || "Failed to load profile");
        setLoading(false);
      });
  }, []);

  const profile = payload?.applicant_profile?.[0] ?? {};
  const experiences = payload?.experience ?? [];
  const education = payload?.education ?? [];
  const referees = payload?.referees ?? [];
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

  // ===== Flattened + Title Case chips =====
  const chipsLanguages = languages
    .map((l) => toTitleChip(l?.language?.language_name || l?.language_name))
    .filter(Boolean);

  const chipsKnowledge = knowledge
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
        margin: "0 auto",
        backgroundColor: "#fff",
        padding: "5mm",
        boxSizing: "border-box",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;600;700&display=swap"
        rel="stylesheet"
      />

      <style>{`
        .a4-card { width: 100%; min-height: calc(297mm - 10mm); background:#fff; }
        .chip-badge{
          white-space: normal !important;
          overflow-wrap: anywhere;
          word-break: break-word;
          text-align: left;
          max-width: 100%;
          display: inline-block;
          line-height: 1.2;
        }
      `}</style>

      <Card
        className="border-0 shadow-lg a4-card"
        style={{ fontFamily: "'Josefin Sans', sans-serif" }}
      >
        {/* Banner with Profile Image */}
        <div
          className="p-5 text-white text-center position-relative"
          style={{ backgroundColor: BRAND }}
        >
          <div
            style={{
              width: "160px",
              height: "160px",
              borderRadius: "50%",
              overflow: "hidden",
              border: "5px solid #fff",
              margin: "0 auto 20px",
              boxShadow: "0 4px 15px rgba(0,0,0,.3)",
            }}
          >
            <img
              src={
                profile?.picture
                  ? `${cvUrl}/${profile.picture}`
                  : "https://placehold.co/200x200?text=Photo"
              }
              alt="profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) =>
                (e.currentTarget.src =
                  "https://placehold.co/200x200?text=Photo")
              }
            />
          </div>
          <h1 className="fw-bold mb-1">{fullName}</h1>
          <h4 className="fw-light">{currentPosition}</h4>
          <p className="mt-3 w-75 mx-auto">{intro}</p>
        </div>

        <Row className="g-0">
          {/* Sidebar */}
          <Col md={4} className="bg-light p-4">
            <SidebarSection title="Contact">
              <p>
                <FiPhone className="me-2" /> {phone}
              </p>
              <p style={{ overflowWrap: "anywhere", wordBreak: "break-word" }}>
                <FiMail className="me-2" /> {email}
              </p>
              <p>
                <FiMapPin className="me-2" /> {location}
              </p>
            </SidebarSection>

            {chipsLanguages.length > 0 && (
              <SidebarSection title="Languages">
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
                </div>
              </SidebarSection>
            )}

            {/* Improved Compact Skills */}
            <SidebarSection title="Skills">
              {chipsKnowledge.length > 0 && (
                <SkillGroup
                  title="Knowledge"
                  icon={<FiStar />}
                  items={chipsKnowledge}
                />
              )}
              {chipsSoftware.length > 0 && (
                <SkillGroup
                  title="Software"
                  icon={<FiCpu />}
                  items={chipsSoftware}
                />
              )}
            </SidebarSection>

            {(chipsCulture.length > 0 || chipsPersonality.length > 0) && (
              <SidebarSection title="Culture & Personality">
                <div className="d-flex flex-wrap gap-2">
                  {chipsCulture.map((txt, i) => (
                    <Badge key={i} pill bg="info" text="dark" className="chip-badge">
                      {txt}
                    </Badge>
                  ))}
                  {chipsPersonality.map((txt, i) => (
                    <Badge key={i} pill bg="warning" text="dark" className="chip-badge">
                      {txt}
                    </Badge>
                  ))}
                </div>
              </SidebarSection>
            )}
          </Col>

          {/* Main Content */}
          <Col md={8} className="p-4">
            <MainSection title="Experience">
              {experiences.length ? (
                experiences.map((exp, i) => (
                  <Card
                    key={i}
                    body
                    className="mb-3 border-0 shadow-sm"
                    style={{ borderLeft: `4px solid ${BRAND}` }}
                  >
                    <div className="fw-semibold" style={{ color: BRAND }}>
                      {exp?.position?.position_name || "Job Title"}
                    </div>
                    <div className="text-muted small mb-1">
                      {exp?.employer?.employer_name || ""}
                    </div>
                    <div className="text-muted small mb-2">
                      {formatMY(exp?.start_date)} –{" "}
                      {exp?.end_date ? formatMY(exp?.end_date) : "Present"}
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
                  </Card>
                ))
              ) : (
                <p className="text-muted">No job experience available.</p>
              )}
            </MainSection>

            <MainSection title="Education">
              {education.length ? (
                <Table striped bordered hover responsive>
                  <thead style={{ backgroundColor: BRAND, color: "#fff" }}>
                    <tr>
                      <th>Level</th>
                      <th>Institution</th>
                      <th>Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {education.map((edu, i) => (
                      <tr key={i}>
                        <td>{edu?.level?.education_level || edu?.degree || "—"}</td>
                        <td>
                          {edu?.college?.college_name || edu?.institution || "—"}
                        </td>
                        <td>
                          {formatMY(edu?.started)} –{" "}
                          {edu?.ended ? formatMY(edu?.ended) : "Present"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p className="text-muted">No education records available.</p>
              )}
            </MainSection>

            {referees.length > 0 && (
              <MainSection title="Referees">
                <Row>
                  {referees.map((r, i) => {
                    const rname = [r.first_name, r.middle_name, r.last_name]
                      .filter(Boolean)
                      .join(" ");
                    return (
                      <Col md={6} key={i} className="mb-3">
                        <Card body className="border-0 shadow-sm">
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
              </MainSection>
            )}
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

/* Sidebar Section */
function SidebarSection({ title, children }) {
  return (
    <div className="mb-4">
      <h6 className="fw-bold mb-2" style={{ color: BRAND }}>
        {title}
      </h6>
      {children}
    </div>
  );
}

/* Main Section */
function MainSection({ title, children }) {
  return (
    <div className="mb-5">
      <h4
        className="fw-bold mb-3"
        style={{
          color: BRAND,
          borderBottom: `2px solid ${BRAND}`,
          display: "inline-block",
          paddingBottom: "4px",
        }}
      >
        {title}
      </h4>
      {children}
    </div>
  );
}

/* Compact Skill Group */
function SkillGroup({ title, icon, items }) {
  return (
    <div className="mb-3">
      <div
        className="fw-semibold d-flex align-items-center mb-2"
        style={{ color: BRAND }}
      >
        {icon} <span className="ms-2">{title}</span>
      </div>
      <div className="d-flex flex-wrap gap-2">
        {items.map((skill, i) => (
          <Badge
            key={i}
            pill
            className="chip-badge"
            style={{
              backgroundColor: i % 2 === 0 ? BRAND : "#6c757d",
              color: "#fff",
              fontSize: "0.8rem",
            }}
          >
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  );
}

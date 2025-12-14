// Template19.jsx — Premium Split CV | Refined Design (Brand #0c2b3b + Red Hat Display)
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
import { FiPhone, FiMail, FiMapPin, FiGlobe, FiUser } from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";

const cvUrl = "https://api.ekazi.co.tz";
const API = "https://api.ekazi.co.tz/api/cv/cv_builder/30750";

const BRAND = "#0c2b3b";
const INK = "#222";

/* Helpers */
function formatMY(d) {
  const m = moment(d);
  return m.isValid() ? m.format("MMM YYYY") : "—";
}

export default function Template19() {
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

  if (loading)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "70vh" }}
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
      <div
        className="t19-root w-100 shadow-lg rounded-4 overflow-hidden a4-card"
        style={{ background: "#fff" }}
      >
        {/* Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Styles */}
        <style>{`
          .a4-card { width: 100%; min-height: calc(297mm - 10mm); }

          .t19-root { font-family: 'Red Hat Display', sans-serif; color: ${INK}; }
          .t19-hero {
            background: ${BRAND};
            color: #fff;
            padding: 3rem 2.5rem;
            border-radius: 0 0 40px 40px;
          }
          .t19-photo {
            width: 180px; height: 210px; border-radius: 16px;
            overflow: hidden; border: 5px solid #fff;
            box-shadow: 0 8px 20px rgba(0,0,0,.25);
          }
          .t19-name { font-size: 2.4rem; font-weight: 700; margin-bottom: .3rem; }
          .t19-sub { font-size: 1.2rem; opacity: 0.9; margin-bottom: 1rem; }
          .t19-title {
            color: ${BRAND};
            font-weight: 700;
            text-transform: uppercase;
            font-size: 1rem;
            border-bottom: 2px solid ${BRAND};
            padding-bottom: .25rem;
            display: flex;
            align-items: center;
            gap: .5rem;
            margin-bottom: 1rem;
          }
          .t19-card {
            border: 0;
            border-radius: 12px;
            box-shadow: 0 4px 18px rgba(0,0,0,.06);
            margin-bottom: 1.5rem;
          }
          .t19-timeline {
            border-left: 3px solid ${BRAND};
            margin-left: .75rem;
            padding-left: 1rem;
          }
          .t19-timeline-item {
            position: relative;
            margin-bottom: 1.25rem;
          }
          .t19-timeline-item::before {
            content: '';
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: ${BRAND};
            position: absolute;
            left: -23px;
            top: 4px;
          }
          .t19-badge { background: ${BRAND}; color: #fff; }

          /* keep chips inside width + left aligned */
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

          /* ✅ Contact: icon on top, value below (same font size as before) */
          .contact-stack{
            display: flex;
            flex-wrap: wrap;
            gap: 14px;
          }
          .contact-item{
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 6px;
          }
          .contact-icon{
            width: 26px;
            height: 26px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            border: 1px solid rgba(12,43,59,.15);
            background: rgba(12,43,59,.04);
            color: ${BRAND};
            flex-shrink: 0;
          }
          .contact-text{
            font-size: 0.95rem;
            line-height: 1.25;
            word-break: break-word;
            overflow-wrap: anywhere;
          }

          @media (max-width: 768px) {
            .t19-hero { text-align: center; padding: 2.2rem 1.5rem; border-radius: 0 0 24px 24px; }
            .t19-name { font-size: 1.8rem; }
            .t19-photo { width: 150px; height: 180px; margin: 1.5rem auto 0 auto; }
          }
        `}</style>

        {/* ===== HERO ===== */}
        <div className="t19-hero">
          <Row className="align-items-center g-4">
            <Col md={8}>
              <div className="t19-name">{fullName}</div>
              <div className="t19-sub">{currentPosition}</div>
              <p className="mb-0" style={{ maxWidth: "600px" }}>
                {intro}
              </p>
            </Col>
            <Col md={4} className="text-md-end text-center">
              <div className="t19-photo mx-auto mx-md-0">
                <img
                  src={
                    profile?.picture
                      ? `${cvUrl}/${profile.picture}`
                      : "https://placehold.co/170x200?text=Photo"
                  }
                  alt="profile"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </Col>
          </Row>
        </div>

        {/* ===== CONTENT ===== */}
        <Row className="g-4 mt-4 px-3 px-md-5 pb-5">
          {/* Sidebar */}
          <Col md={4}>
            <Card body className="t19-card">
              <Section title="Contact" icon={<FiPhone />}>
                <div className="contact-stack">
                  <div className="contact-item">
                    <span className="contact-icon">
                      <FiPhone />
                    </span>
                    <div className="contact-text">{phone}</div>
                  </div>

                  <div className="contact-item">
                    <span className="contact-icon">
                      <FiMail />
                    </span>
                    <div className="contact-text">{email}</div>
                  </div>

                  <div className="contact-item">
                    <span className="contact-icon">
                      <FiMapPin />
                    </span>
                    <div className="contact-text">{location}</div>
                  </div>

                  {payload?.user?.[0]?.website && (
                    <div className="contact-item">
                      <span className="contact-icon">
                        <FiGlobe />
                      </span>
                      <div className="contact-text">
                        {payload?.user?.[0]?.website}
                      </div>
                    </div>
                  )}
                </div>
              </Section>
            </Card>

            <Card body className="t19-card">
              <Section title="Skills" icon={<FiUser />}>
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
                  {chipsTools.map((txt, i) => (
                    <Badge key={i} bg="secondary" pill className="chip-badge">
                      {txt}
                    </Badge>
                  ))}
                </div>
              </Section>
            </Card>

            {chipsLanguages.length > 0 && (
              <Card body className="t19-card">
                <Section title="Languages">
                  <div className="d-flex flex-wrap gap-2">
                    {chipsLanguages.map((txt, i) => (
                      <Badge key={i} className="t19-badge chip-badge" pill>
                        {txt}
                      </Badge>
                    ))}
                  </div>
                </Section>
              </Card>
            )}

            {(chipsCulture.length > 0 || chipsPersonality.length > 0) && (
              <Card body className="t19-card">
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
            <Card body className="t19-card">
              <Section title="Profile">
                <p>{intro}</p>
              </Section>
            </Card>

            <Card body className="t19-card">
              <Section title="Experience">
                {experiences.length ? (
                  <Timeline items={experiences} isExperience />
                ) : (
                  <p className="text-muted">No job experience available.</p>
                )}
              </Section>
            </Card>

            <Card body className="t19-card">
              <Section title="Education">
                {education.length ? (
                  <Timeline items={education} isExperience={false} />
                ) : (
                  <p className="text-muted">No education records available.</p>
                )}
              </Section>
            </Card>

            {referees.length > 0 && (
              <Card body className="t19-card">
                <Section title="Referees">
                  <Row>
                    {referees.map((r, i) => {
                      const rname = [r?.first_name, r?.middle_name, r?.last_name]
                        .filter(Boolean)
                        .join(" ");
                      return (
                        <Col md={6} key={i} className="mb-3">
                          <Card body className="shadow-sm border-0 rounded-3">
                            <strong style={{ color: BRAND }}>
                              {rname || "—"}
                            </strong>
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
    </Container>
  );
}

/* --- Components --- */
function Section({ title, children, icon }) {
  return (
    <div className="mb-3">
      <h5 className="t19-title">
        {icon} {title}
      </h5>
      {children}
    </div>
  );
}

function Timeline({ items, isExperience }) {
  return (
    <div className="t19-timeline">
      {items.map((item, i) => (
        <div key={i} className="t19-timeline-item">
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
        </div>
      ))}
    </div>
  );
}

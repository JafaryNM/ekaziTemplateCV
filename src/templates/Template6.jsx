// Template6.jsx — Final Improved Full Version (A4 full height + cleaner contact + bullet skills)
// NOTE: Only updated (1) outer A4 wrapper to remove dark area, (2) contact layout + no-wrap email,
// (3) Skills/Profile lists to bullets (Software/Skills/Tools). Everything else kept the same.

import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Image,
  Spinner,
  Alert,
  Badge,
} from "react-bootstrap";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiGlobe,
  FiUser,
  FiBriefcase,
  FiBookOpen,
} from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";

const API = "https://api.ekazi.co.tz/api/cv/cv_builder/30750";
const CV_BASE = "https://api.ekazi.co.tz";
const BRAND = "#d36314";
const BRAND_DARK = "#8B3A0F";

// ------- Small UI helpers -------
const SectionTitle = ({ icon: Icon, children }) => (
  <div className="d-flex align-items-center gap-2 mb-3">
    <Icon size={16} color={BRAND} />
    <h5 className="fw-bold mb-0 text-dark">{children}</h5>
    <div
      style={{
        height: 3,
        background: BRAND,
        width: 50,
        marginLeft: 4,
        borderRadius: 2,
      }}
    />
  </div>
);

const TimelineItem = ({ title, right, subtitle, children }) => (
  <div className="pb-3 mb-3 position-relative">
    <div className="d-flex justify-content-between align-items-start flex-wrap">
      <div className="pe-3">
        <div className="fw-semibold">{title}</div>
        {subtitle && <div className="text-muted small">{subtitle}</div>}
      </div>
      {right && (
        <Badge bg="light" text="dark" className="border mt-1">
          {right}
        </Badge>
      )}
    </div>

    {children && <div className="mb-0 mt-2 text-muted small">{children}</div>}

    <span
      style={{
        position: "absolute",
        left: -13,
        top: 8,
        width: 10,
        height: 10,
        background: BRAND,
        borderRadius: "50%",
      }}
    />
  </div>
);

// ================== COMPONENT ==================
const Template6 = () => {
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
        style={{ height: "60vh" }}
      >
        <Spinner animation="border" role="status" />
        <span className="ms-3">Loading CV…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-4">
        <Alert variant="danger" className="mb-0">
          {error}
        </Alert>
      </div>
    );
  }

  // ------- Parse Data -------
  const profiles = Array.isArray(payload?.applicant_profile)
    ? payload.applicant_profile
    : [];
  const personalities = Array.isArray(payload?.applicant_personality)
    ? payload.applicant_personality
    : [];
  const experiences = Array.isArray(payload?.experience)
    ? payload.experience
    : [];
  const referees = Array.isArray(payload?.referees) ? payload.referees : [];
  const languages = Array.isArray(payload?.language) ? payload.language : [];
  const users = Array.isArray(payload?.user) ? payload.user : [];
  const addresses = Array.isArray(payload?.address) ? payload.address : [];
  const education = Array.isArray(payload?.education) ? payload.education : [];
  const skills = Array.isArray(payload?.knowledge) ? payload.knowledge : [];
  const software = Array.isArray(payload?.software) ? payload.software : [];
  const tools = Array.isArray(payload?.tools) ? payload.tools : [];
  const culture = Array.isArray(payload?.culture) ? payload.culture : [];

  const fullName = (() => {
    const p = profiles[0] || {};
    const name = `${p?.first_name || ""} ${p?.middle_name || ""} ${
      p?.last_name || ""
    }`
      .replace(/\s+/g, " ")
      .trim();
    return name || "—";
  })();

  const currentTitle =
    payload?.current_position ||
    payload?.experience?.[0]?.position?.position_name ||
    "—";

  const summary =
    payload?.careers?.[0]?.career ||
    payload?.objective?.objective ||
    "Professional summary not provided.";

  const primaryEmail = users?.[0]?.email || payload?.email?.email || "—";
  const primaryPhone =
    payload?.phone?.phone_number ||
    payload?.phone?.number ||
    users?.[0]?.phone ||
    "—";
  const primaryAddress = addresses?.[0]
    ? `${addresses[0]?.region_name || ""}${
        addresses[0]?.name ? ", " + addresses[0]?.name : ""
      }`.replace(/^,\s*/, "")
    : "—";

  const website = users?.[0]?.website || payload?.user?.[0]?.website || "";

  const toTitleCase = (v) =>
    (v || "")
      .replace(/^,+/, "")
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase())
      .trim();

  const work = experiences
    .slice()
    .sort((a, b) => {
      const bEnd = moment(b?.end_date);
      const bStart = moment(b?.start_date);
      const aEnd = moment(a?.end_date);
      const aStart = moment(a?.start_date);
      const bKey = (bEnd.isValid() ? bEnd : bStart).valueOf() || 0;
      const aKey = (aEnd.isValid() ? aEnd : aStart).valueOf() || 0;
      return bKey - aKey;
    })
    .map((e) => {
      const start = moment(e?.start_date);
      const end = moment(e?.end_date);
      const period =
        (start.isValid() ? start.format("MMM YYYY") : "") +
        " – " +
        (end.isValid() ? end.format("MMM YYYY") : "Present");
      return {
        title: e?.position?.position_name || e?.title || "—",
        company:
          e?.employer?.employer_name || e?.company || e?.organization || "—",
        industry: e?.industry?.industry_name || "",
        location: `${e?.employer?.region?.region_name || ""}${
          e?.employer?.sub_location ? ", " + e?.employer?.sub_location : ""
        }`.replace(/^,\s*/, ""),
        period,
        bullets: (e?.responsibility || "")
          .split("\n")
          .map((t) => t.trim().replace(/^•\s*/, ""))
          .filter(Boolean),
      };
    });

  const eduVM = education
    .slice()
    .sort((a, b) => {
      const bEnd = moment(b?.ended || b?.end_date);
      const bStart = moment(b?.started || b?.start_date);
      const aEnd = moment(a?.ended || a?.end_date);
      const aStart = moment(a?.started || a?.start_date);
      const bKey = (bEnd.isValid() ? bEnd : bStart).valueOf() || 0;
      const aKey = (aEnd.isValid() ? aEnd : aStart).valueOf() || 0;
      return bKey - aKey;
    })
    .map((ed) => {
      const start = moment(ed?.started || ed?.start_date);
      const end = moment(ed?.ended || ed?.end_date);
      return {
        school:
          ed?.college?.college_name || ed?.institution || ed?.school || "—",
        course:
          ed?.course?.course_name ||
          ed?.qualification?.qualification ||
          ed?.degree ||
          "—",
        start: start.isValid() ? start.format("MMM YYYY") : "—",
        end: end.isValid() ? end.format("MMM YYYY") : "Present",
      };
    });

  const softwareList = software
    .map(
      (s) =>
        s?.software?.software_name || s?.software_name || s?.name || ""
    )
    .map(toTitleCase)
    .filter(Boolean);

  const skillsList = skills
    .map(
      (k) =>
        k?.knowledge?.knowledge_name || k?.knowledge_name || k?.name || ""
    )
    .map(toTitleCase)
    .filter(Boolean);

  const toolsList = tools
    .map((t) => t?.tool?.tool_name || t?.tool_name || t?.name || "")
    .map(toTitleCase)
    .filter(Boolean);

  const cultureText = culture.length
    ? culture
        .map((c) => c?.culture?.culture_name || c?.culture_name || c?.name || "")
        .map(toTitleCase)
        .filter(Boolean)
        .join(", ")
    : "—";

  const personalityText = personalities.length
    ? personalities
        .map(
          (p) =>
            p?.personality?.personality_name ||
            p?.personality_name ||
            p?.name ||
            ""
        )
        .map(toTitleCase)
        .filter(Boolean)
        .join(", ")
    : "—";

  // ================== RENDER ==================
  return (
    <Container
      fluid
      className="p-0"
      style={{
        width: "210mm",
        minHeight: "297mm",
        margin: "0 auto",
        backgroundColor: "#fff", // removed dark surround
        padding: "5mm",
        fontFamily:
          '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      <div
        className="a4-card"
        style={{
          width: "100%",
          minHeight: "calc(297mm - 10mm)",
          background: "#f8fafc",
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        <Row
          className="mx-auto g-4"
          style={{
            maxWidth: "100%",
            margin: 0,
            padding: "14px",
            alignItems: "stretch",
          }}
        >
          {/* HEADER */}
          <Col xs={12}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <div className="d-flex align-items-center gap-4 flex-wrap">
                  <Image
                    src={
                      profiles?.[0]?.picture
                        ? `${CV_BASE}/${profiles[0].picture}`
                        : "https://placehold.co/140x140?text=Photo"
                    }
                    onError={(e) =>
                      (e.currentTarget.src =
                        "https://placehold.co/140x140?text=Photo")
                    }
                    alt="Profile"
                    roundedCircle
                    style={{
                      border: `6px solid ${BRAND}`,
                      width: 140,
                      height: 140,
                      objectFit: "cover",
                    }}
                  />

                  <div className="flex-grow-1" style={{ minWidth: 240 }}>
                    <div className="text-uppercase small text-muted">
                      {currentTitle}
                    </div>
                    <h2 className="fw-bold mb-1" style={{ color: BRAND }}>
                      {fullName}
                    </h2>
                    <div
                      style={{
                        height: 6,
                        width: 140,
                        background: BRAND,
                        borderRadius: 6,
                      }}
                    />
                  </div>
                </div>

                {/* CONTACT TILES (clean + single-line email) */}
                <div className="t6-contactTiles mt-3">
                  <div className="t6-contactTile">
                    <div className="t6-contactIcon">
                      <FiPhone />
                    </div>
                    <div className="t6-contactValue">{primaryPhone}</div>
                  </div>

                  <div className="t6-contactTile">
                    <div className="t6-contactIcon">
                      <FiMail />
                    </div>
                    <div className="t6-contactValue t6-noWrap">
                      {primaryEmail}
                    </div>
                  </div>

                  <div className="t6-contactTile">
                    <div className="t6-contactIcon">
                      <FiMapPin />
                    </div>
                    <div className="t6-contactValue">{primaryAddress}</div>
                  </div>

                  {website ? (
                    <div className="t6-contactTile">
                      <div className="t6-contactIcon">
                        <FiGlobe />
                      </div>
                      <div className="t6-contactValue t6-noWrap">{website}</div>
                    </div>
                  ) : null}
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* LEFT COLUMN */}
          <Col md={4}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-4">
                <SectionTitle icon={FiUser}>About Me</SectionTitle>
                <p className="text-muted small text-justify">{summary}</p>
                <hr className="my-3" style={{ opacity: 0.15 }} />

                <SectionTitle icon={FiBookOpen}>Skills & Profile</SectionTitle>

                {/* Culture Fit */}
                <div className="mb-2 small">
                  <div className="fw-bold">Culture Fit</div>
                  <div className="text-muted">{cultureText}</div>
                </div>

                {/* Personality */}
                <div className="mb-2 small">
                  <div className="fw-bold">Personality</div>
                  <div className="text-muted">{personalityText}</div>
                </div>

                {/* Software (bullets) */}
                <div className="mb-2 small">
                  <div className="fw-bold">Software</div>
                  {softwareList.length ? (
                    <ul className="t6-bullets text-muted mb-0">
                      {softwareList.map((x, i) => (
                        <li key={i}>{x}</li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-muted">—</div>
                  )}
                </div>

                {/* Skills (bullets) */}
                <div className="mb-2 small">
                  <div className="fw-bold">Skills</div>
                  {skillsList.length ? (
                    <ul className="t6-bullets text-muted mb-0">
                      {skillsList.map((x, i) => (
                        <li key={i}>{x}</li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-muted">—</div>
                  )}
                </div>

                {/* Tools (bullets) */}
                <div className="small">
                  <div className="fw-bold">Tools</div>
                  {toolsList.length ? (
                    <ul className="t6-bullets text-muted mb-0">
                      {toolsList.map((x, i) => (
                        <li key={i}>{x}</li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-muted">—</div>
                  )}
                </div>

                <hr className="my-3" style={{ opacity: 0.15 }} />

                {/* Languages */}
                <SectionTitle icon={FiGlobe}>Languages</SectionTitle>
                <ul className="mb-0 small ps-3">
                  {languages.length ? (
                    languages.map((language, i) => (
                      <li key={i}>{language?.language?.language_name || "—"}</li>
                    ))
                  ) : (
                    <li>—</li>
                  )}
                </ul>
              </Card.Body>
            </Card>
          </Col>

          {/* RIGHT COLUMN */}
          <Col md={8}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-4">
                <SectionTitle icon={FiBriefcase}>Job Experience</SectionTitle>
                <div
                  className="ps-3 border-start"
                  style={{ borderColor: "#eee" }}
                >
                  {work.length > 0 ? (
                    work.map((exp, i) => (
                      <TimelineItem
                        key={i}
                        title={`${exp.title} — ${exp.company}`}
                        subtitle={
                          [exp.industry, exp.location && exp.location.trim()]
                            .filter(Boolean)
                            .join(" / ") || undefined
                        }
                        right={exp.period}
                      >
                        {exp.bullets.length > 0 ? (
                          <ul className="small mb-0 ps-3">
                            {exp.bullets.map((b, k) => (
                              <li key={k} className="lh-base">
                                {b}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </TimelineItem>
                    ))
                  ) : (
                    <p className="text-muted small mb-0">No job experience added.</p>
                  )}
                </div>

                {/* EDUCATION */}
                <div className="mt-4">
                  <SectionTitle icon={FiBookOpen}>Education</SectionTitle>
                  <div className="table-responsive">
                    <table className="table table-bordered align-middle mb-0 small">
                      <thead
                        style={{
                          backgroundColor: BRAND,
                          color: "#fff",
                        }}
                      >
                        <tr>
                          <th>Institution</th>
                          <th>Course</th>
                          <th style={{ textAlign: "center" }}>Start</th>
                          <th style={{ textAlign: "center" }}>End</th>
                        </tr>
                      </thead>
                      <tbody>
                        {eduVM.length ? (
                          eduVM.map((ed, i) => (
                            <tr key={i}>
                              <td>{ed.school}</td>
                              <td>{ed.course}</td>
                              <td className="text-center">{ed.start}</td>
                              <td className="text-center">{ed.end}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="4" className="text-center text-muted">
                              No education records available.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* REFEREES */}
                <div className="mt-4">
                  <SectionTitle icon={FiUser}>Referees</SectionTitle>
                  <ul className="p-0 list-unstyled mb-0 small">
                    {referees.length > 0 ? (
                      referees.map((r, index) => {
                        const name = [r?.first_name, r?.middle_name, r?.last_name]
                          .filter(Boolean)
                          .join(" ");
                        return (
                          <li key={index} className="mb-2 text-start">
                            <div className="fw-semibold">{name || "—"}</div>
                            <div className="text-muted">
                              {r?.referee_position || "—"} • {r?.employer || "—"}
                            </div>
                            <div>{r?.email || "—"}</div>
                            <div>{r?.phone || "—"}</div>
                          </li>
                        );
                      })
                    ) : (
                      <p className="text-muted small mb-0">No referees added.</p>
                    )}
                  </ul>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Footer stripe */}
        <div className="mx-auto mt-3" style={{ maxWidth: 1100 }}>
          <div
            style={{
              height: 8,
              width: 180,
              background: BRAND,
              borderRadius: 8,
              margin: "0 auto",
            }}
          />
        </div>
      </div>

      {/* INLINE STYLE IMPROVEMENTS */}
      <style>{`
        body { font-family: "Inter", sans-serif; background: #fff; }
        .card { border-radius: 14px; }
        .table th, .table td { padding: 0.6rem 0.75rem; vertical-align: middle; }
        .table thead th { font-weight: 600; letter-spacing: .02em; }
        .table tbody tr:nth-of-type(odd) { background-color: #f9fbfd; }
        .table tbody tr:hover { background-color: #f3f6fb; }
        .text-justify { text-align: justify; }

        /* Contact tiles */
        .t6-contactTiles{
          display:flex;
          gap:12px;
          flex-wrap:wrap;
          align-items:stretch;
        }
        .t6-contactTile{
          flex:1 1 180px;
          min-width:180px;
          background: #fff7f1;
          border: 1px solid rgba(211,99,20,.25);
          border-radius: 12px;
          padding: 10px 12px;
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
          text-align:center;
        }
        .t6-contactIcon{
          width: 34px;
          height: 34px;
          border-radius: 10px;
          display:flex;
          align-items:center;
          justify-content:center;
          border: 1px solid rgba(211,99,20,.25);
          color: ${BRAND};
          background: rgba(211,99,20,.06);
          margin-bottom: 6px;
        }
        .t6-contactValue{
          font-size: .9rem;
          color: #1f2937;
          line-height: 1.2;
          max-width: 100%;
        }
        .t6-noWrap{
          white-space: nowrap;
        }

        /* Bullets in Skills/Profile */
        .t6-bullets{
          padding-left: 1rem;
          margin-top: .35rem;
        }
        .t6-bullets li{
          margin-bottom: .15rem;
          line-height: 1.3;
        }
      `}</style>
    </Container>
  );
};

export default Template6;

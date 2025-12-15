import { useEffect, useState, useMemo } from "react";
import { Container, Row, Col, Card, Spinner, Alert, Table } from "react-bootstrap";
import { FiPhone, FiMail, FiMapPin, FiGlobe } from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";

const cvUrl = "https://api.ekazi.co.tz";
const API = "https://api.ekazi.co.tz/api/cv/cv_builder/30750";

const BRAND = "#2a3c7f";
const INK = "#222";

/* Helpers */
function formatMY(d) {
  const m = moment(d);
  return m.isValid() ? m.format("MMM YYYY") : "—";
}

export default function Template21() {
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
  const education = payload?.education ?? [];
  const referees = payload?.referees ?? [];
  const languages = payload?.language ?? [];
  const knowledge = payload?.knowledge ?? [];
  const software = payload?.software ?? [];
  const culture = payload?.culture ?? [];
  const addresses = payload?.address ?? [];

  const phone = payload?.phone?.phone_number || payload?.user?.[0]?.phone || "—";
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

  const fullName = useMemo(
    () =>
      `${profile.first_name || ""} ${profile.middle_name || ""} ${
        profile.last_name || ""
      }`
        .replace(/\s+/g, " ")
        .trim() || "—",
    [profile]
  );

  // ✅ Use a real position title, and if missing, render nothing (no "—" dash)
  const headerTitle = (
    payload?.current_position ||
    experiences?.[0]?.position?.position_name ||
    ""
  ).trim();

  // ===== Flattened & Capitalized “chips” data =====
  const chipsCulture = culture
    .map((c) =>
      (c?.culture?.culture_name || c?.culture_name || c?.name || "")
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

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
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
      <link
        href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <style>{`
        .t23-root { font-family: 'Comfortaa', cursive; color: ${INK}; }

        .a4-card{
          width: 100%;
          min-height: calc(297mm - 10mm);
          background: #fff;
        }

        .t23-header {
          background: radial-gradient(900px 260px at 10% 0%, rgba(255,255,255,.18), transparent 55%), ${BRAND};
          color: #fff;
          padding: 1.25rem 1.25rem 1rem 1.25rem;
          border-radius: 0 0 18px 18px;
          position: relative;
          overflow: hidden;
        }
        .t23-header::after{
          content:"";
          position:absolute; inset:-60px -120px auto auto;
          width: 260px; height: 260px;
          background: rgba(255,255,255,.10);
          border-radius: 50%;
          transform: rotate(12deg);
        }
        .t23-header-grid{
          display:flex;
          gap: 1.1rem;
          align-items: center;
          position: relative;
          z-index: 1;
        }
        .t23-photo-wrap{
          flex: 0 0 auto;
          width: 120px; height: 120px;
          border-radius: 18px;
          background: rgba(255,255,255,.10);
          padding: 8px;
          box-shadow: 0 10px 24px rgba(0,0,0,.18);
        }
        .t23-photo{
          width: 100%; height: 100%;
          border-radius: 14px;
          overflow: hidden;
          border: 3px solid rgba(255,255,255,.85);
        }
        .t23-photo img{ width:100%; height:100%; object-fit:cover; display:block; }

        .t23-headtext{ flex: 1 1 auto; min-width: 0; }
        .t23-name{
          font-size: 1.55rem;
          font-weight: 700;
          margin: 0;
          line-height: 1.15;
          letter-spacing: .2px;
        }
        .t23-sub{
          font-size: .95rem;
          opacity: .92;
          margin-top: .35rem;
          margin-bottom: .75rem;
        }

        .t23-contact-row{
          display:grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: .6rem;
        }
        .t23-contact-tile{
          background: rgba(255,255,255,.12);
          border: 1px solid rgba(255,255,255,.22);
          border-radius: 14px;
          padding: .55rem .6rem;
          text-align: center;
        }
        .t23-contact-icon { display:block; line-height:1; margin-bottom:.22rem; }
        .t23-contact-icon svg { width: 1em; height: 1em; }
        .t23-contact-text{
          font-size: 0.70rem;
          line-height: 1.15;
          word-break: break-word;
          overflow-wrap: anywhere;
        }
        .t23-email-one-line{
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display:block;
          max-width: 100%;
        }

        .t23-body{
          padding: 1.1rem 1.1rem 1.2rem;
        }
        .t23-panel{
          border: 0;
          border-radius: 16px;
          background: #fff;
          box-shadow: 0 6px 16px rgba(0,0,0,.08);
          overflow: hidden;
        }
        .t23-panel-header{
          padding: .75rem .95rem;
          background: linear-gradient(90deg, rgba(42,60,127,.10), rgba(42,60,127,0));
          border-bottom: 1px solid rgba(0,0,0,.06);
          font-weight: 700;
          color: ${BRAND};
        }
        .t23-panel-body{
          padding: .85rem .95rem;
        }

        .t23-list { margin: 0; padding-left: 1.05rem; }
        .t23-list li { margin-bottom: .3rem; font-size: .82rem; line-height: 1.35; }

        /* ✅ Timeline alignment fix: same CENTER X for line and dots */
        .t23-timeline{
          --tl-x: 10px;     /* center of the timeline */
          --tl-w: 4px;      /* line width */
          position: relative;
          padding-left: 26px;
        }
        .t23-timeline::before{
          content:"";
          position:absolute;
          left: var(--tl-x);
          top: 4px; bottom: 4px;
          width: var(--tl-w);
          background: ${BRAND};
          border-radius: 99px;
          opacity: .9;
          transform: translateX(-50%);
        }

        .t23-exp{
          position: relative;
          margin-bottom: .85rem;
        }
        .t23-exp::before{
          content:"";
          position:absolute;
          left: var(--tl-x);
          top: 14px;
          transform: translateX(-50%);
          width: 12px; height: 12px;
          background: #fff;
          border: 4px solid ${BRAND};
          border-radius: 50%;
          box-shadow: 0 6px 14px rgba(0,0,0,.12);
        }

        .t23-exp-card{
          border: 0;
          border-radius: 16px;
          background: #fff;
          box-shadow: 0 6px 16px rgba(0,0,0,.08);
          padding: .85rem .95rem;
          margin-left: 6px;
        }

        .t23-date-pill{
          display:inline-block;
          background: ${BRAND};
          color:#fff;
          font-size: .72rem;
          font-weight: 600;
          padding: 2px 10px;
          border-radius: 999px;
          margin-bottom: .45rem;
        }
        .t23-role{
          font-weight: 700;
          color: ${BRAND};
          margin: 0 0 .15rem 0;
          font-size: .95rem;
          line-height: 1.25;
        }
        .t23-org{
          margin: 0 0 .5rem 0;
          font-size: .78rem;
          color: rgba(0,0,0,.60);
        }
        .t23-duties{
          margin: .35rem 0 0 0;
          padding-left: 1.05rem;
        }
        .t23-duties li{
          margin-bottom: .28rem;
          font-size: .80rem;
          line-height: 1.35;
          color: rgba(0,0,0,.70);
        }

        .t23-ref-grid .t23-ref-card{
          border: 0;
          border-radius: 16px;
          background: #fff;
          box-shadow: 0 6px 16px rgba(0,0,0,.08);
          padding: .9rem .95rem;
          height: 100%;
          text-align: left;
        }
        .t23-ref-card strong{ display:block; margin-bottom:.2rem; }
        .t23-ref-meta{ font-size:.78rem; color: rgba(0,0,0,.60); margin-bottom:.35rem; }

        .t23-table thead th{
          background: ${BRAND} !important;
          color: #fff !important;
          border-color: rgba(255,255,255,.22) !important;
          font-weight: 700;
        }
        /* Remove timeline dots under Experience */
.t23-exp::before {
  display: none !important;
  content: none !important;
}

        .t23-table td, .t23-table th{ font-size: .82rem; }
      `}</style>

      <Card className="a4-card">
        <div className="t23-root">
          {/* Header */}
          <div className="t23-header">
            <div className="t23-header-grid">
              <div className="t23-photo-wrap">
                <div className="t23-photo">
                  <img
                    src={
                      profile?.picture
                        ? `${cvUrl}/${profile.picture}`
                        : "https://placehold.co/140x140?text=Photo"
                    }
                    alt="profile"
                    onError={(e) =>
                      (e.currentTarget.src =
                        "https://placehold.co/140x140?text=Photo")
                    }
                  />
                </div>
              </div>

              <div className="t23-headtext">
                <h1 className="t23-name">{fullName}</h1>

                {/* ✅ No dash fallback: only render if we actually have a title */}
                {headerTitle ? <div className="t23-sub">{headerTitle}</div> : null}

                <div className="t23-contact-row">
                  <div className="t23-contact-tile">
                    <span className="t23-contact-icon">
                      <FiPhone />
                    </span>
                    <div className="t23-contact-text">{phone}</div>
                  </div>

                  <div className="t23-contact-tile">
                    <span className="t23-contact-icon">
                      <FiMail />
                    </span>
                    <div className="t23-contact-text t23-email-one-line" title={email}>
                      {email}
                    </div>
                  </div>

                  <div className="t23-contact-tile">
                    <span className="t23-contact-icon">
                      <FiMapPin />
                    </span>
                    <div className="t23-contact-text">{location}</div>
                  </div>
                </div>

                {website ? (
                  <div className="mt-2" style={{ fontSize: ".72rem", opacity: 0.95 }}>
                    <FiGlobe style={{ marginRight: 6 }} />
                    <span style={{ overflowWrap: "anywhere" }}>{website}</span>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="t23-body">
            <Row className="g-3">
              <Col md={4}>
                <Card className="t23-panel mb-3">
                  <div className="t23-panel-header">Biography</div>
                  <div className="t23-panel-body">
                    <p className="mb-0" style={{ fontSize: ".82rem", lineHeight: 1.5 }}>
                      {intro}
                    </p>
                  </div>
                </Card>

                {languages.length > 0 && (
                  <Card className="t23-panel mb-3">
                    <div className="t23-panel-header">Languages</div>
                    <div className="t23-panel-body">
                      <ul className="t23-list">
                        {languages.map((l, i) => (
                          <li key={i}>{l?.language?.language_name}</li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                )}

                {(knowledge.length > 0 || software.length > 0) && (
                  <Card className="t23-panel mb-3">
                    <div className="t23-panel-header">Skills</div>
                    <div className="t23-panel-body">
                      <ul className="t23-list">
                        {chipsSkills.map((name, i) => (
                          <li key={`k-${i}`}>{name}</li>
                        ))}
                        {chipsSoftware.map((name, i) => (
                          <li key={`s-${i}`}>{name}</li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                )}

                {culture.length > 0 && (
                  <Card className="t23-panel">
                    <div className="t23-panel-header">Culture</div>
                    <div className="t23-panel-body">
                      <ul className="t23-list">
                        {chipsCulture.map((name, i) => (
                          <li key={i}>{name}</li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                )}
              </Col>

              <Col md={8}>
                <Card className="t23-panel mb-3">
                  <div className="t23-panel-header">Experience</div>
                  <div className="t23-panel-body">
                    {experiences.length ? (
                      <div className="t23-timeline">
                        {experiences.map((exp, i) => (
                          <div key={i} className="t23-exp">
                            <div className="t23-exp-card">
                              <div className="t23-date-pill">
                                {formatMY(exp?.start_date)} –{" "}
                                {formatMY(exp?.end_date) || "Present"}
                              </div>
                              <h6 className="t23-role">
                                {exp?.position?.position_name || "—"}
                              </h6>
                              <p className="t23-org">
                                {exp?.employer?.employer_name || ""}
                              </p>

                              {exp?.responsibility && (
                                <ul className="t23-duties">
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
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted text-center mb-0">
                        No job experience available.
                      </p>
                    )}
                  </div>
                </Card>

                <Card className="t23-panel mb-3">
                  <div className="t23-panel-header">Education</div>
                  <div className="t23-panel-body">
                    {education.length ? (
                      <Table striped bordered hover responsive className="mb-0 t23-table">
                        <thead>
                          <tr>
                            <th>Level / Degree</th>
                            <th>Institution</th>
                            <th>Start</th>
                            <th>End</th>
                          </tr>
                        </thead>
                        <tbody>
                          {education.map((edu, i) => (
                            <tr key={i}>
                              <td>{edu?.level?.education_level || edu?.degree || "—"}</td>
                              <td>{edu?.college?.college_name || edu?.institution || "—"}</td>
                              <td>{formatMY(edu?.started)}</td>
                              <td>{formatMY(edu?.ended) || "Present"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    ) : (
                      <p className="text-muted text-center mb-0">
                        No education records available.
                      </p>
                    )}
                  </div>
                </Card>

                {referees.length > 0 && (
                  <Card className="t23-panel">
                    <div className="t23-panel-header">Referees</div>
                    <div className="t23-panel-body">
                      <Row className="g-3 t23-ref-grid">
                        {referees.map((r, i) => {
                          const rname = [r?.first_name, r?.middle_name, r?.last_name]
                            .filter(Boolean)
                            .join(" ");
                          return (
                            <Col md={4} key={i}>
                              <div className="t23-ref-card">
                                <strong>{rname || "—"}</strong>
                                <div className="t23-ref-meta">
                                  {r?.referee_position || "—"} • {r?.employer || "—"}
                                </div>
                                <div style={{ fontSize: ".80rem" }}>{r?.phone || "—"}</div>
                                <div style={{ fontSize: ".80rem", overflowWrap: "anywhere" }}>
                                  {r?.email || "—"}
                                </div>
                              </div>
                            </Col>
                          );
                        })}
                      </Row>
                    </div>
                  </Card>
                )}
              </Col>
            </Row>
          </div>
        </div>
      </Card>
    </Container>
  );
}

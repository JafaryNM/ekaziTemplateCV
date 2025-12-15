// Template25.jsx — Premium Editorial CV Layout (NEW UI + New Colors)
// Size + capitalization logic kept. Circular image restored.
// Brand: (new) #0B7285 (teal) + #845EF7 (purple) | Font: Noto Sans
import { useEffect, useState, useMemo } from "react";
import { Container, Row, Col, Spinner, Alert, Card } from "react-bootstrap";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiGlobe,
  FiBriefcase,
  FiBook,
  FiUser,
} from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";

const cvUrl = "https://api.ekazi.co.tz";
const API = "https://api.ekazi.co.tz/api/cv/cv_builder/30750";

// NEW colors (not previously used here)
const BRAND = "#0B7285"; // teal
const ACCENT = "#845EF7"; // purple
const INK = "#111827";
const SOFT = "#6B7280";
const BG = "#F7FAFC";

function formatMY(d) {
  const m = moment(d);
  return m.isValid() ? m.format("MMM YYYY") : "—";
}

export default function Template25() {
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

  // ===== Flattened & Capitalized “chips” data (UNCHANGED) =====
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
      className="t25-root p-0"
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
        href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;700&display=swap"
        rel="stylesheet"
      />

      <style>{`
        .t25-root { font-family: 'Noto Sans', sans-serif; color: ${INK}; }
        .a4-card { width: 100%; min-height: calc(297mm - 10mm); background: ${BG}; }

        /* NEW layout: split header (left identity + right photo), with subtle diagonal */
        .t25-hero{
          position: relative;
          background:
            radial-gradient(900px 260px at 10% 0%, rgba(11,114,133,.20), transparent 55%),
            radial-gradient(850px 260px at 95% 10%, rgba(132,94,247,.16), transparent 60%),
            linear-gradient(135deg, rgba(255,255,255,1), rgba(255,255,255,1));
          border-bottom: 1px solid rgba(17,24,39,.08);
          padding: 1.6rem 1.8rem 1.2rem;
        }
        .t25-heroGrid{
          display: grid;
          grid-template-columns: 1.6fr .9fr;
          gap: 1rem;
          align-items: center;
        }

        .t25-name{
          font-size: 2.25rem;
          font-weight: 800;
          margin: 0;
          line-height: 1.05;
          letter-spacing: .2px;
        }
        .t25-role{
          margin-top: .35rem;
          font-weight: 700;
          color: ${SOFT};
        }
        .t25-accentLine{
          height: 6px;
          width: 150px;
          border-radius: 999px;
          background: linear-gradient(90deg, ${BRAND}, ${ACCENT});
          margin-top: .75rem;
        }

        /* circular photo (as usual) */
        .t25-photoWrap{
          display:flex;
          justify-content: flex-end;
          align-items: center;
        }
        .t25-photoRing{
          width: 150px;
          height: 150px;
          border-radius: 50%;
          padding: 5px;
          background: linear-gradient(135deg, ${BRAND}, ${ACCENT});
          box-shadow: 0 14px 28px rgba(17,24,39,.14);
        }
        .t25-photo{
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 5px solid #fff;
          background:#fff;
          display:block;
        }

        /* Contact strip (clean, no wrapping issues) */
        .t25-contact{
          margin-top: 1.1rem;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: .75rem;
        }
        .t25-contactCard{
          background: #fff;
          border: 1px solid rgba(17,24,39,.08);
          border-radius: 14px;
          padding: .7rem .8rem;
          box-shadow: 0 8px 18px rgba(17,24,39,.06);
          min-width: 0;
        }
        .t25-contactTop{
          display:flex;
          align-items:center;
          gap:.5rem;
          font-weight: 800;
          font-size: .85rem;
          color: ${INK};
          letter-spacing: .04em;
          text-transform: uppercase;
        }
        .t25-contactTop svg{ color:${BRAND}; }
        .t25-contactVal{
          margin-top: .35rem;
          font-size: .92rem;
          color: ${INK};
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Body: NEW asymmetric layout with “cards row” + “stacked right” */
        .t25-body{
          padding: 1.15rem 1.2rem 1.25rem;
        }
        .t25-layout{
          display:grid;
          grid-template-columns: 1fr 1.55fr;
          gap: 1rem;
          align-items:start;
        }

        .t25-panel{
          background:#fff;
          border: 1px solid rgba(17,24,39,.08);
          border-radius: 16px;
          box-shadow: 0 10px 22px rgba(17,24,39,.06);
          overflow:hidden;
        }
        .t25-panelHead{
          padding: .8rem 1rem;
          background:
            linear-gradient(90deg, rgba(11,114,133,.10), rgba(132,94,247,.08));
          border-bottom: 1px solid rgba(17,24,39,.06);
          display:flex;
          align-items:center;
          justify-content: space-between;
        }
        .t25-title{
          margin:0;
          display:flex;
          align-items:center;
          gap:.55rem;
          font-weight: 900;
          letter-spacing: .12em;
          font-size: .92rem;
          text-transform: uppercase;
          color:${INK};
        }
        .t25-title svg{ color:${BRAND}; }

        .t25-panelBody{ padding: .95rem 1rem 1rem; }

        .t25-intro{
          margin:0;
          font-size: .94rem;
          line-height: 1.6;
          color:${INK};
          text-align: justify;
        }

        /* Badges (wrap + left aligned, keep content) */
        .t25-badge{
          background: rgba(11,114,133,.10);
          color: ${BRAND};
          padding: .38rem .78rem;
          border-radius: 999px;
          font-size: .82rem;
          font-weight: 800;
          margin: .22rem .22rem 0 0;
          display:inline-block;
          border: 1px solid rgba(11,114,133,.22);
          max-width:100%;
          white-space:normal;
          overflow-wrap:anywhere;
          word-break:break-word;
          text-align:left;
          line-height:1.2;
        }
        .t25-badge.alt{
          background: rgba(132,94,247,.10);
          color: ${ACCENT};
          border: 1px solid rgba(132,94,247,.22);
        }

        /* Experience/Education: NEW “editorial blocks” (no previous look) */
        .t25-entry{
          position: relative;
          padding: .95rem 1rem;
          border: 1px solid rgba(17,24,39,.08);
          border-radius: 14px;
          background: #fff;
          box-shadow: 0 8px 18px rgba(17,24,39,.05);
        }
        .t25-entry + .t25-entry{ margin-top: .75rem; }
        .t25-entryBar{
          position:absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 6px;
          border-radius: 14px 0 0 14px;
          background: linear-gradient(180deg, ${BRAND}, ${ACCENT});
        }
        .t25-entryInner{ padding-left: .55rem; }
        .t25-entryTop{
          display:flex;
          justify-content: space-between;
          align-items:flex-start;
          gap: .8rem;
          flex-wrap: wrap;
        }
        .t25-entryTitle{
          font-weight: 900;
          color:${INK};
          margin:0;
        }
        .t25-entrySub{
          margin-top: .15rem;
          font-size: .88rem;
          color:${SOFT};
          font-style: italic;
        }
        .t25-date{
          font-weight: 900;
          font-size: .78rem;
          padding: .28rem .6rem;
          border-radius: 999px;
          color:#fff;
          white-space: nowrap;
          background: linear-gradient(90deg, ${BRAND}, ${ACCENT});
        }
        .t25-bullets{
          margin: .55rem 0 0;
          padding-left: 1.05rem;
          font-size: .9rem;
          color:${INK};
        }
        .t25-bullets li{ margin-bottom: .25rem; }

        /* Referees */
        .t25-refGrid{
          display:grid;
          grid-template-columns: 1fr 1fr;
          gap: .75rem;
        }
        .t25-refCard{
          border: 1px solid rgba(17,24,39,.10);
          border-radius: 14px;
          padding: .85rem .9rem;
          background:#fff;
          box-shadow: 0 6px 16px rgba(17,24,39,.05);
        }
        .t25-refCard strong{ color:${INK}; }
        .t25-refMuted{ color:${SOFT}; font-size: .86rem; }
        .t25-refSmall{ font-size: .86rem; }

        /* Responsive inside A4 width */
        @media (max-width: 992px){
          .t25-heroGrid{ grid-template-columns: 1fr; }
          .t25-photoWrap{ justify-content: flex-start; margin-top: .8rem; }
          .t25-contact{ grid-template-columns: 1fr; }
          .t25-layout{ grid-template-columns: 1fr; }
          .t25-refGrid{ grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="a4-card rounded-3 overflow-hidden">
        {/* HERO (new) */}
        <div className="t25-hero">
          <div className="t25-heroGrid">
            <div style={{ minWidth: 0 }}>
              <h1 className="t25-name">{fullName}</h1>
              <div className="t25-role">{currentPosition}</div>
              <div className="t25-accentLine" />
            </div>

            <div className="t25-photoWrap">
              <div className="t25-photoRing">
                <img
                  src={
                    profile?.picture
                      ? `${cvUrl}/${profile.picture}`
                      : "https://placehold.co/160x160?text=Photo"
                  }
                  alt="profile"
                  className="t25-photo"
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://placehold.co/160x160?text=Photo")
                  }
                />
              </div>
            </div>
          </div>

          {/* Contact cards */}
          <div className="t25-contact">
            <div className="t25-contactCard" title={phone}>
              <div className="t25-contactTop">
                <FiPhone /> Phone
              </div>
              <div className="t25-contactVal">{phone}</div>
            </div>
            <div className="t25-contactCard" title={email}>
              <div className="t25-contactTop">
                <FiMail /> Email
              </div>
              <div className="t25-contactVal">{email}</div>
            </div>
            <div className="t25-contactCard" title={location}>
              <div className="t25-contactTop">
                <FiMapPin /> Location
              </div>
              <div className="t25-contactVal">{location}</div>
            </div>
          </div>
        </div>

        {/* BODY (new) */}
        <div className="t25-body">
          <div className="t25-layout">
            {/* LEFT */}
            <div style={{ display: "grid", gap: "1rem" }}>
              <div className="t25-panel">
                <div className="t25-panelHead">
                  <h5 className="t25-title">
                    <FiUser /> Profile
                  </h5>
                </div>
                <div className="t25-panelBody">
                  <p className="t25-intro">{intro}</p>
                </div>
              </div>

              <div className="t25-panel">
                <div className="t25-panelHead">
                  <h5 className="t25-title">
                    <FiBriefcase /> Skills
                  </h5>
                </div>
                <div className="t25-panelBody">
                  {chipsSkills.map((txt, i) => (
                    <span key={`k-${i}`} className="t25-badge">
                      {txt}
                    </span>
                  ))}
                  {chipsSoftware.map((txt, i) => (
                    <span key={`s-${i}`} className="t25-badge alt">
                      {txt}
                    </span>
                  ))}
                </div>
              </div>

              {chipsLanguages.length > 0 && (
                <div className="t25-panel">
                  <div className="t25-panelHead">
                    <h5 className="t25-title">
                      <FiGlobe /> Languages
                    </h5>
                  </div>
                  <div className="t25-panelBody">
                    {chipsLanguages.map((txt, i) => (
                      <span key={i} className="t25-badge alt">
                        {txt}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {(chipsCulture.length > 0 || chipsPersonality.length > 0) && (
                <div className="t25-panel">
                  <div className="t25-panelHead">
                    <h5 className="t25-title">Culture & Personality</h5>
                  </div>
                  <div className="t25-panelBody">
                    {chipsCulture.map((txt, i) => (
                      <span key={`c-${i}`} className="t25-badge">
                        {txt}
                      </span>
                    ))}
                    {chipsPersonality.map((txt, i) => (
                      <span key={`p-${i}`} className="t25-badge alt">
                        {txt}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT */}
            <div style={{ display: "grid", gap: "1rem" }}>
              <div className="t25-panel">
                <div className="t25-panelHead">
                  <h5 className="t25-title">
                    <FiBriefcase /> Experience
                  </h5>
                </div>
                <div className="t25-panelBody">
                  {experiences.length ? (
                    experiences.map((exp, i) => (
                      <div key={i} className="t25-entry">
                        <div className="t25-entryBar" />
                        <div className="t25-entryInner">
                          <div className="t25-entryTop">
                            <div style={{ minWidth: 0 }}>
                              <div className="t25-entryTitle">
                                {exp?.position?.position_name || "—"}
                              </div>
                              <div className="t25-entrySub">
                                {exp?.employer?.employer_name || ""}
                              </div>
                            </div>
                            <div className="t25-date">
                              {formatMY(exp?.start_date)} –{" "}
                              {formatMY(exp?.end_date) || "Present"}
                            </div>
                          </div>

                          {exp?.responsibility && (
                            <ul className="t25-bullets">
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
                    ))
                  ) : (
                    <p className="text-muted mb-0">No job experience available.</p>
                  )}
                </div>
              </div>

              <div className="t25-panel">
                <div className="t25-panelHead">
                  <h5 className="t25-title">
                    <FiBook /> Education
                  </h5>
                </div>
                <div className="t25-panelBody">
                  {education.length ? (
                    education.map((edu, i) => (
                      <div key={i} className="t25-entry">
                        <div className="t25-entryBar" />
                        <div className="t25-entryInner">
                          <div className="t25-entryTop">
                            <div style={{ minWidth: 0 }}>
                              <div className="t25-entryTitle">
                                {edu?.level?.education_level || edu?.degree || "—"}
                              </div>
                              <div className="t25-entrySub">
                                {edu?.college?.college_name ||
                                  edu?.institution ||
                                  ""}
                              </div>
                            </div>
                            <div className="t25-date">
                              {formatMY(edu?.started)} –{" "}
                              {formatMY(edu?.ended) || "Present"}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted mb-0">No education records available.</p>
                  )}
                </div>
              </div>

              {referees.length > 0 && (
                <div className="t25-panel">
                  <div className="t25-panelHead">
                    <h5 className="t25-title">Referees</h5>
                  </div>
                  <div className="t25-panelBody">
                    <div className="t25-refGrid">
                      {referees.map((r, i) => {
                        const rname = [r?.first_name, r?.middle_name, r?.last_name]
                          .filter(Boolean)
                          .join(" ");
                        return (
                          <div key={i} className="t25-refCard">
                            <strong>{rname || "—"}</strong>
                            <div className="t25-refMuted">
                              {r?.referee_position || "—"}
                            </div>
                            <div className="t25-refSmall">{r?.employer || "—"}</div>
                            <div className="t25-refSmall mt-2">{r?.phone || "—"}</div>
                            <div className="t25-refSmall">{r?.email || "—"}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

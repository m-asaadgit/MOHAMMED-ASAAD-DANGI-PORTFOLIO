import { useState } from "react";
import ChatComp from "../src/assets/RAG/ChatComp";

// ✅ Place your resume PDF inside the /public folder
// and update the filename below:
const RESUME_PDF_PATH = "/MOHAMMED_ASAAD_DANGI_RESUME.pdf";

const data = {
  name: "Mohammed Asaad Dangi",
  roles: ["Software Engineer", "Frontend Engineer", "Entry Level", "Full Stack Development"],
  contact: {
    phone: "+91-7022909765",
    email: "asaaddangi20@gmail.com",
    portfolio: "https://portfolio-asaad.onrender.com/",
    linkedin: "https://www.linkedin.com/in/asaad-dangi-061785261",
    github: "https://github.com/m-asaadgit",
    location: "Bengaluru, Karnataka",
  },

  summary:
    "Full Stack Developer with 3 years of freelance experience designing, developing, and deploying scalable web applications. Proficient in React.js, JavaScript (ES6+), Node.js, and Express.js. Experienced with MySQL, PostgreSQL, and MongoDB for relational and NoSQL data management. Skilled in Java, Spring and Hibernate ORM for backend services. Hands-on experience with Docker for containerisation and AWS (EC2, S3) for cloud deployment. Focused on delivering clean, production-ready code with REST API development and agile best practices.",
  skills: {
    Languages: "JavaScript, Java, SQL",
    Frameworks: "React.js, Spring, Node.js, Express.js",
    "Cloud & DevOps": "AWS (EC2, S3, Lambda), Docker, Docker Compose, GitHub Actions",
    Databases: "MySQL, PostgreSQL, MongoDB, Redis",
    Tools: "Git, JIRA, Postman, IntelliJ IDEA, VS Code, Wireshark",
    Networking: "CCNA Basics, TCP/IP, OSI Model, Routing & Switching, VLANs, DNS, DHCP",
    "Messaging & Real-time": "RabbitMQ, Apache Kafka, WebSocket",
  },
  experience: [
    {
      title: "Freelance Full Stack Developer",
      company: "Self-Employed (Remote)",
      period: "Jan 2022 – Present",
      bullets: [
        "Designed and developed a full-stack e-commerce web application with React.js frontend, Node.js/Express.js REST APIs, and MongoDB for product catalogue and order management — integrated Razorpay payment gateway.",
        "Developed a full-fledged Cricket Scoring Application with real-time score updates using Socket.io and Node.js, featuring live ball-by-ball commentary, scoreboard management, over tracking, and wicket logs.",
        "Built an event management platform enabling end-to-end event creation, attendee registration, ticketing, and real-time seat availability tracking using React.js, Express.js, and PostgreSQL.",
        "Developed a restaurant table booking and menu management system with JWT-based authentication, role-based access control (RBAC), and MySQL database — deployed on AWS EC2 with Docker containerisation.",
        "Developed a React.js-based web application for exploring movies, TV shows, and personalities using TMDB REST API integration, featuring trending content discovery and fully responsive UI.",
        "Implemented CI/CD workflows using GitHub Actions and Dockerised deployments on AWS, reducing manual deployment effort by 40%.",
        "Optimised PostgreSQL and MySQL queries and introduced database indexing strategies, improving application response time by 40%.",
        "Collaborated directly with 50+ clients to gather requirements, deliver iterative releases, and provide post-launch technical support.",
      ],
    },
  ],
  education: [
    { degree: "M.C.A in Computer Science", institution: "Amity University, Noida", cgpa: "8.02 / 10", period: "2024 – 2026" },
    { degree: "B.C.A in Computer Science", institution: "Karnataka University Dharwad (KUD)", cgpa: "8.2 / 10", period: "2021 – 2024" },
  ],
  languages: "English (Professional), Kannada (Native), Hindi (Conversational)",
  authorization: "Indian Citizen — open to global opportunities and international collaboration",
};

const Section = ({ title, children }) => (
  <section style={{ marginBottom: "32px" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
      <span style={{ fontSize: "10px", fontFamily: "'DM Mono', monospace", color: "#00a8ff", letterSpacing: "0.18em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
        {title}
      </span>
      <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, rgba(0,168,255,0.4) 0%, transparent 100%)" }} />
    </div>
    {children}
  </section>
);

const Tag = ({ children }) => (
  <span style={{
    display: "inline-block", background: "rgba(0,168,255,0.1)", color: "#00a8ff",
    border: "1px solid rgba(0,168,255,0.25)", borderRadius: "4px", fontSize: "11px",
    fontFamily: "'DM Mono', monospace", padding: "2px 8px", marginRight: "6px", marginBottom: "4px",
  }}>{children}</span>
);

export default function ResumePage() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Sora:wght@300;400;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0d12; -webkit-font-smoothing: antialiased; }
        ::selection { background: rgba(0,168,255,0.3); }
        a { color: #00a8ff; text-decoration: none; transition: opacity 0.2s; }
        a:hover { opacity: 0.7; }

        .resume-wrap { animation: fadeUp 0.6s ease both; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }

        .resume-card {
          max-width: 860px; margin: 0 auto;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          box-shadow: 0 24px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06);
          padding: 48px 52px;
          color: #c9d6e3;
        }

        .resume-header { text-align: center; margin-bottom: 24px; }
        .resume-name { font-weight: 700; font-size: clamp(22px, 4vw, 36px); letter-spacing: 0.06em; color: #eaf2ff; text-transform: uppercase; margin-bottom: 10px; }
        .roles-row { display: flex; justify-content: center; flex-wrap: wrap; gap: 4px 0; margin-bottom: 14px; }
        .role-sep { color: #00a8ff; margin: 0 8px; font-size: 10px; }
        .contact-row { display: flex; justify-content: center; flex-wrap: wrap; gap: 4px 14px; font-size: 12px; color: #7a9bbf; font-family: 'DM Mono', monospace; }
        .contact-dot { color: #1e3a5f; }

        /* ── Buttons centered ── */
        .btn-bar {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px;
          margin: 22px 0 30px;
        }
        .download-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: 1px solid rgba(0,168,255,0.5);
          color: #00a8ff;
          border-radius: 8px;
          padding: 10px 28px;
          font-size: 13px;
          font-family: 'DM Mono', monospace;
          font-weight: 500;
          letter-spacing: 0.07em;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .download-btn:hover {
          background: #00a8ff;
          color: #000;
          opacity: 1;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,168,255,0.35);
        }
        .download-btn:active { transform: translateY(0); }

        /* ── Skills ── */
        .skills-table { width: 100%; border-collapse: collapse; }
        .skill-row { border-bottom: 1px solid rgba(255,255,255,0.04); }
        .skill-row:hover td { color: #e0f0ff !important; }
        .skill-key { padding: 7px 14px 7px 0; font-family: 'DM Mono', monospace; font-size: 11.5px; color: #00a8ff; font-weight: 500; white-space: nowrap; vertical-align: top; min-width: 150px; }
        .skill-val { padding: 7px 0; font-size: 13px; color: #94aec4; line-height: 1.6; }

        /* ── Bullets ── */
        .bullet-item { display: flex; gap: 10px; font-size: 13px; color: #8baabf; line-height: 1.75; margin-bottom: 10px; transition: transform 0.15s, color 0.15s; cursor: default; }
        .bullet-item:hover { transform: translateX(3px); color: #e8f4ff !important; }
        .bullet-dot { color: #00a8ff; margin-top: 6px; flex-shrink: 0; font-size: 7px; }

        .period-badge { font-family: 'DM Mono', monospace; font-size: 11px; color: #00a8ff; background: rgba(0,168,255,0.08); border: 1px solid rgba(0,168,255,0.2); border-radius: 4px; padding: 2px 9px; white-space: nowrap; }
        .edu-card { display: flex; justify-content: space-between; align-items: flex-start; padding: 12px 16px; margin-bottom: 10px; background: rgba(255,255,255,0.025); border-radius: 8px; border: 1px solid rgba(255,255,255,0.06); flex-wrap: wrap; gap: 6px; }

        /* ══ TABLET ≤ 768px ══ */
        @media (max-width: 768px) {
          .resume-card { padding: 32px 28px; border-radius: 12px; }
          .contact-row { gap: 4px 10px; font-size: 11px; }
          .skill-key { min-width: 120px; font-size: 11px; }
          .skill-val { font-size: 12px; }
          .bullet-item { font-size: 12.5px; }
        }

        /* ══ MOBILE ≤ 480px ══ */
        @media (max-width: 480px) {
          .resume-card { padding: 22px 16px; border-radius: 10px; margin: 0 4px; }
          .resume-name { letter-spacing: 0.03em; }
          .contact-row { flex-direction: column; align-items: center; gap: 4px; }
          .contact-dot { display: none; }
          .download-btn { width: 100%; justify-content: center; }
          .skills-table, .skills-table tbody, .skill-row, .skill-key, .skill-val { display: block; width: 100%; }
          .skill-row { padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
          .skill-key { min-width: unset; padding: 0 0 3px 0; white-space: normal; }
          .skill-val { padding: 0; font-size: 12px; }
          .edu-card { flex-direction: column; }
          .period-badge { align-self: flex-start; }
          .bullet-item { font-size: 12px; gap: 8px; }
        }

        /* ══ LARGE ≥ 1200px ══ */
        @media (min-width: 1200px) {
          .resume-card { padding: 56px 64px; }
          .bullet-item { font-size: 13.5px; }
        }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: "#0a0d12",
        backgroundImage: "radial-gradient(ellipse at 20% 0%, rgba(0,80,160,0.18) 0%, transparent 55%), radial-gradient(ellipse at 80% 100%, rgba(0,40,100,0.12) 0%, transparent 50%)",
        padding: "clamp(16px, 3vw, 40px) clamp(8px, 3vw, 20px) 60px",
        fontFamily: "'Sora', sans-serif",
      }}>
        <div className="resume-wrap resume-card">

          {/* ── HEADER ── */}
          <div className="resume-header">
            <h1 className="resume-name" style={{ fontFamily: "'Sora', sans-serif" }}>{data.name}</h1>
            <div className="roles-row">
              {data.roles.map((r, i) => (
                <span key={r} style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ color: "#7a9bbf", fontSize: "clamp(11px, 1.8vw, 13px)", fontWeight: 300 }}>{r}</span>
                  {i < data.roles.length - 1 && <span className="role-sep">|</span>}
                </span>
              ))}
            </div>
            <div className="contact-row">
              <span>{data.contact.phone}</span>
              <span className="contact-dot">·</span>
              <a href={`mailto:${data.contact.email}`}>{data.contact.email}</a>
              <span className="contact-dot">·</span>
              <a href={data.contact.portfolio}>Portfolio</a>
              <a href={data.contact.linkedin}>LinkedIn</a>
              <a href={data.contact.github}>GitHub</a>
              <span className="contact-dot">·</span>
              <span>{data.contact.location}</span>
            </div>
          </div>

          {/* ── DOWNLOAD + CHAT BUTTONS ── */}
          <div className="btn-bar">
            <a className="download-btn" href={RESUME_PDF_PATH} download="Mohammed_Asaad_Dangi_Resume.pdf">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Resume
            </a>

            <button className="download-btn" onClick={() => setChatOpen(true)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              Chat with Bot
            </button>
          </div>

          {/* ── DIVIDER ── */}
          <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "32px" }} />

          {/* SUMMARY */}
          <Section title="Professional Summary">
            <p style={{ fontSize: "clamp(12px, 1.6vw, 13.5px)", lineHeight: "1.85", color: "#94aec4", fontWeight: 300 }}>{data.summary}</p>
          </Section>

          {/* SKILLS */}
          <Section title="Technical Skills">
            <table className="skills-table">
              <tbody>
                {Object.entries(data.skills).map(([key, val]) => (
                  <tr key={key} className="skill-row">
                    <td className="skill-key">{key}</td>
                    <td className="skill-val">{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>

          {/* EXPERIENCE */}
          <Section title="Work Experience">
            {data.experience.map((job) => (
              <div key={job.title}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "6px", marginBottom: "12px" }}>
                  <div style={{ flex: 1, minWidth: "200px" }}>
                    <span style={{ fontSize: "clamp(13px, 2vw, 15px)", fontWeight: 600, color: "#d4e8ff" }}>{job.title}</span>
                    <span style={{ fontSize: "12px", color: "#7a9bbf", marginLeft: "10px", fontStyle: "italic" }}>{job.company}</span>
                  </div>
                  <span className="period-badge">{job.period}</span>
                </div>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {job.bullets.map((b, i) => (
                    <li key={i} className="bullet-item">
                      <span className="bullet-dot">▸</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Section>

          {/* EDUCATION */}
          <Section title="Education">
            {data.education.map((edu) => (
              <div key={edu.degree} className="edu-card">
                <div>
                  <div style={{ fontSize: "clamp(13px, 1.8vw, 14px)", fontWeight: 600, color: "#d4e8ff", marginBottom: "3px" }}>{edu.degree}</div>
                  <div style={{ fontSize: "12px", color: "#7a9bbf", fontStyle: "italic", marginBottom: "6px" }}>{edu.institution}</div>
                  <Tag>CGPA: {edu.cgpa}</Tag>
                </div>
                <span className="period-badge">{edu.period}</span>
              </div>
            ))}
          </Section>

          {/* ADDITIONAL */}
          <Section title="Additional Information">
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "8px 16px", fontSize: "clamp(12px, 1.5vw, 13px)" }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#00a8ff", paddingTop: "2px", whiteSpace: "nowrap" }}>Languages Known</span>
              <span style={{ color: "#94aec4" }}>{data.languages}</span>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#00a8ff", paddingTop: "2px", whiteSpace: "nowrap" }}>Work Authorization</span>
              <span style={{ color: "#94aec4" }}>{data.authorization}</span>
            </div>
          </Section>

          {/* DECLARATION */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "20px", fontSize: "clamp(11px, 1.4vw, 12px)", color: "#5a7a96", lineHeight: "1.7", fontStyle: "italic", fontFamily: "'DM Mono', monospace" }}>
            I hereby declare that the information provided above is true and correct to the best of my knowledge and belief. I confirm that I possess the technical skills and experience mentioned in this resume and can demonstrate them during interviews or assessments.
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "20px", fontSize: "11px", fontFamily: "'DM Mono', monospace", color: "#2a4060", letterSpacing: "0.1em" }}>
          asaaddangi20@gmail.com · Bengaluru, Karnataka
        </div>
      </div>

      {/* ── CHATBOT ── */}
      <ChatComp open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
}
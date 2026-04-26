import { C, S } from "./Styles";
import { calcCGPA } from "./Calaccgpa";
import { GRADE_POINTS } from "./Constants";
import GradeColor from "./Gradecolor";

export default function Dashboard({ user, setPage }) {
  const cgpa = calcCGPA(user.subjects);

  const stats = [
    ["📚", "CGPA",     cgpa],
    ["📖", "Subjects", user.subjects.length],
    ["🎓", "Year",     user.year],
    ["💳", "Fees",     user.feesPaid ? "Paid ✓" : "Pending"],
  ];

  const quickActions = [
    ["📄", "My Details",       "View your complete student profile", "details",     C.primaryLight, C.primary],
    ["🏅", "Apply Scholarship", "Check eligibility and apply",        "scholarship", "#F3E5F5",      "#6A1B9A"],
    ["💳", "Pay Fees",          "Pay tuition & exam fees online",     "payment",     C.successBg,    C.success],
    ["📊", "CGPA Calculator",   "Calculate your semester CGPA",       "cgpa",        "#FFF3E0",      C.warn],
  ];

  return (
    <div style={S.pageBody}>
      {/* Welcome banner */}
      <div style={{ background: `linear-gradient(135deg, ${C.primary}, ${C.accent})`, borderRadius: "16px", padding: "28px 32px", marginBottom: "24px", color: "#fff" }}>
        <div style={{ fontSize: "14px", opacity: 0.85, marginBottom: "6px" }}>Welcome back,</div>
        <div style={{ fontSize: "28px", fontWeight: "900", marginBottom: "4px" }}>{user.name} 👋</div>
        <div style={{ opacity: 0.8, fontSize: "14px" }}>{user.rollNo} • {user.branch} • {user.year}</div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "14px", marginBottom: "24px" }}>
        {stats.map(([icon, label, val]) => (
          <div key={label} style={S.stat}>
            <div style={{ fontSize: "26px", marginBottom: "4px" }}>{icon}</div>
            <div style={S.statNum}>{val}</div>
            <div style={S.statLabel}>{label}</div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <h3 style={S.sectionTitle}>Quick Actions</h3>
      <div style={S.grid3}>
        {quickActions.map(([icon, title, desc, target, bg, color]) => (
          <div
            key={title}
            style={{ background: bg, border: `1px solid ${color}33`, borderRadius: "14px", padding: "20px", cursor: "pointer" }}
            onClick={() => setPage(target)}
          >
            <div style={{ fontSize: "30px", marginBottom: "10px" }}>{icon}</div>
            <div style={{ fontWeight: "700", color, fontSize: "15px", marginBottom: "4px" }}>{title}</div>
            <div style={{ fontSize: "13px", color: C.textSec }}>{desc}</div>
          </div>
        ))}
      </div>

      {/* Recent grades */}
      {user.subjects.length > 0 && (
        <>
          <h3 style={{ ...S.sectionTitle, marginTop: "28px" }}>Recent Grades</h3>
          <div style={S.card}>
            <table style={S.table}>
              <thead>
                <tr>
                  {["Subject", "Credits", "Grade", "Grade Points"].map(h => (
                    <th key={h} style={S.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {user.subjects.map((s, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#FAFAFA" }}>
                    <td style={S.td}>{s.name}</td>
                    <td style={S.td}>{s.credits}</td>
                    <td style={S.td}><GradeColor grade={s.grade} /></td>
                    <td style={S.td}>{GRADE_POINTS[s.grade] || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
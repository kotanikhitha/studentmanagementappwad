import { C, S } from "./Styles";
import { calcCGPA } from "./Calaccgpa";
import { GRADE_POINTS } from "./Constants";
import GradeColor from "./Gradecolor";

export default function StudentDetails({ user }) {
  const cgpa = calcCGPA(user.subjects);

  const infoItems = [
    ["Student ID",   user.id],
    ["Full Name",    user.name],
    ["Roll Number",  user.rollNo],
    ["Email",        user.email],
    ["Phone",        user.phone],
    ["Date of Birth",user.dob],
    ["Gender",       user.gender],
    ["Branch",       user.branch],
    ["Year",         user.year],
    ["CGPA",         cgpa],
    ["Scholarship",  user.scholarshipApplied ? "Applied ✓" : "Not Applied"],
    ["Fees Status",  user.feesPaid ? "Paid ✓" : "Pending"],
  ];

  const initials = user.name.split(" ").map(n => n[0]).join("");

  return (
    <div style={S.pageBody}>
      <h2 style={S.pageTitle}>Student Details</h2>
      <p style={S.pageSub}>Your complete academic profile</p>

      <div style={S.grid2}>
        {/* Profile card */}
        <div style={S.card}>
          <div style={{ textAlign: "center", padding: "16px 0 24px" }}>
            <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: C.primaryLight, border: `3px solid ${C.primary}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", fontWeight: "800", color: C.primary, margin: "0 auto 14px" }}>
              {initials}
            </div>
            <div style={{ fontSize: "20px", fontWeight: "800", color: C.text }}>{user.name}</div>
            <div style={{ fontSize: "13px", color: C.textSec, marginTop: "4px" }}>{user.rollNo}</div>
            <div style={{ marginTop: "10px" }}>
              <span style={S.badge(C.primary, C.primaryLight)}>{user.branch}</span>{" "}
              <span style={S.badge(C.success, C.successBg)}>{user.year}</span>
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-around", textAlign: "center" }}>
              {[["CGPA", cgpa], ["Subjects", user.subjects.length], ["Status", "Active"]].map(([l, v]) => (
                <div key={l}>
                  <div style={{ fontSize: "22px", fontWeight: "800", color: C.primary }}>{v}</div>
                  <div style={{ fontSize: "12px", color: C.textSec }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Info table */}
        <div style={S.card}>
          <h3 style={S.sectionTitle}>Personal Information</h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              {infoItems.map(([label, val]) => (
                <tr key={label} style={{ borderBottom: `1px solid ${C.border}` }}>
                  <td style={{ padding: "10px 0", fontSize: "12px", color: C.textSec, fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.4px", width: "44%" }}>{label}</td>
                  <td style={{ padding: "10px 0", fontSize: "14px", fontWeight: val.includes?.("✓") ? "700" : "400", color: val.includes?.("✓") ? C.success : "#1a1a2e" }}>{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Subjects table */}
      {user.subjects.length > 0 && (
        <div style={S.card}>
          <h3 style={S.sectionTitle}>Academic Performance</h3>
          <table style={S.table}>
            <thead>
              <tr>{["Subject Name", "Credits", "Grade", "Grade Points", "Weighted Points"].map(h => <th key={h} style={S.th}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {user.subjects.map((s, i) => {
                const gp = GRADE_POINTS[s.grade] || 0;
                return (
                  <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#F8FAFC" }}>
                    <td style={S.td}>{s.name}</td>
                    <td style={S.td}>{s.credits}</td>
                    <td style={S.td}><GradeColor grade={s.grade} /></td>
                    <td style={S.td}>{gp}</td>
                    <td style={S.td}>{gp * s.credits}</td>
                  </tr>
                );
              })}
              <tr style={{ background: C.primaryLight }}>
                <td style={{ ...S.td, fontWeight: "700", color: C.primary }} colSpan={4}>CGPA</td>
                <td style={{ ...S.td, fontWeight: "900", color: C.primary, fontSize: "16px" }}>{cgpa}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
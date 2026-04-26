import { useState } from "react";
import { C, S } from "./Styles";

const SCHOLARSHIPS = [
  { id: 1, name: "Merit Scholarship", amount: 50000, criteria: "CGPA ≥ 8.5", deadline: "2025-12-31" },
  { id: 2, name: "Need-based Aid", amount: 75000, criteria: "Family income < ₹5L", deadline: "2025-11-30" },
  { id: 3, name: "Sports Scholarship", amount: 100000, criteria: "National/State level", deadline: "2025-10-15" },
];

export default function Scholarship({ user, updateUser }) {
  const [applied, setApplied] = useState(user.scholarshipApplied);
  const [msg, setMsg] = useState("");

  const handleApply = (schId) => {
    updateUser({ ...user, scholarshipApplied: true });
    setApplied(true);
    setMsg("✅ Scholarship application submitted! We'll review and notify you soon.");
    setTimeout(() => setMsg(""), 3000);
  };

  return (
    <div style={S.pageBody}>
      <h2 style={S.pageTitle}>Scholarship Programs</h2>
      <p style={S.pageSub}>Explore and apply for available scholarships</p>

      {msg && <div style={S.suc}>{msg}</div>}

      <div style={S.grid2}>
        {SCHOLARSHIPS.map(sch => (
          <div key={sch.id} style={S.card}>
            <h3 style={S.sectionTitle}>{sch.name}</h3>
            <div style={{ marginBottom: "16px" }}>
              <div style={{ fontSize: "24px", fontWeight: "900", color: C.success }}>₹{sch.amount.toLocaleString()}</div>
            </div>
            <table style={{ width: "100%", fontSize: "13px", marginBottom: "16px" }}>
              <tbody>
                <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                  <td style={{ padding: "8px 0", color: C.textSec }}>Eligibility:</td>
                  <td style={{ padding: "8px 0", fontWeight: "600" }}>{sch.criteria}</td>
                </tr>
                <tr>
                  <td style={{ padding: "8px 0", color: C.textSec }}>Deadline:</td>
                  <td style={{ padding: "8px 0", fontWeight: "600" }}>{sch.deadline}</td>
                </tr>
              </tbody>
            </table>
            <button
              style={applied ? { ...S.btnPrimary, opacity: 0.5 } : S.btnPrimary}
              onClick={() => handleApply(sch.id)}
              disabled={applied}
            >
              {applied ? "✓ Already Applied" : "Apply Now"}
            </button>
          </div>
        ))}
      </div>

      {user.scholarshipApplied && (
        <div style={{ ...S.card, marginTop: "24px", background: C.successBg, border: `1px solid #A5D6A7` }}>
          <h3 style={{ color: C.success }}>Application Status</h3>
          <p style={{ color: C.success }}>Your scholarship application is being reviewed. We'll notify you within 2-3 weeks.</p>
        </div>
      )}
    </div>
  );
}

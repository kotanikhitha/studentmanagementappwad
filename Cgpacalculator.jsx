import { useState } from "react";
import { C, S } from "./Styles";
import { calcCGPA } from "./Calaccgpa";
import { GRADE_POINTS } from "./Constants";
import GradeColor from "./Gradecolor";

const GRADE_LABELS = [
  ["O",  10, "Outstanding"],
  ["A+",  9, "Excellent"],
  ["A",   8, "Very Good"],
  ["B+",  7, "Good"],
  ["B",   6, "Above Average"],
  ["C",   5, "Average"],
  ["F",   0, "Fail"],
];

function getPerformanceLabel(cgpaNum) {
  if (cgpaNum >= 9) return { label: "Outstanding", color: C.success,  bg: C.successBg };
  if (cgpaNum >= 8) return { label: "Excellent",   color: C.primary,  bg: C.primaryLight };
  if (cgpaNum >= 7) return { label: "Very Good",   color: "#00838F",  bg: "#E0F7FA" };
  if (cgpaNum >= 6) return { label: "Good",        color: "#E65100",  bg: "#FFF3E0" };
  return               { label: "Average",         color: C.danger,   bg: C.dangerBg };
}

export default function CGPACalculator({ user }) {
  const [rows, setRows] = useState([
    { id: 1, subject: "", credits: 4, grade: "O" },
    { id: 2, subject: "", credits: 3, grade: "A+" },
    { id: 3, subject: "", credits: 3, grade: "A" },
  ]);

  const addRow    = () => setRows([...rows, { id: Date.now(), subject: "", credits: 3, grade: "A" }]);
  const removeRow = id => rows.length > 1 && setRows(rows.filter(r => r.id !== id));
  const updateRow = (id, key, val) => setRows(rows.map(r => r.id === id ? { ...r, [key]: val } : r));

  const totalCredits = rows.reduce((a, r) => a + Number(r.credits), 0);
  const weightedSum  = rows.reduce((a, r) => a + (GRADE_POINTS[r.grade] || 0) * Number(r.credits), 0);
  const cgpa         = totalCredits > 0 ? (weightedSum / totalCredits).toFixed(2) : "0.00";
  const percentage   = (parseFloat(cgpa) * 9.5).toFixed(1);
  const grade        = getPerformanceLabel(parseFloat(cgpa));

  return (
    <div style={S.pageBody}>
      <h2 style={S.pageTitle}>CGPA Calculator</h2>
      <p style={S.pageSub}>Add your subjects and grades to calculate your CGPA</p>

      <div style={S.grid2}>
        {/* Input table */}
        <div style={S.card}>
          <h3 style={S.sectionTitle}>Enter Subject Grades</h3>
          <table style={{ ...S.table, marginBottom: "14px" }}>
            <thead>
              <tr>
                <th style={S.th}>Subject</th>
                <th style={S.th}>Credits</th>
                <th style={S.th}>Grade</th>
                <th style={S.th}></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.id}>
                  <td style={{ padding: "6px 8px 6px 0" }}>
                    <input style={{ ...S.input, padding: "8px 10px", fontSize: "13px" }} type="text" value={r.subject} onChange={e => updateRow(r.id, "subject", e.target.value)} placeholder={`Subject ${i + 1}`} />
                  </td>
                  <td style={{ padding: "6px 6px" }}>
                    <select style={{ ...S.select, padding: "8px", fontSize: "13px", width: "70px" }} value={r.credits} onChange={e => updateRow(r.id, "credits", e.target.value)}>
                      {[1, 2, 3, 4, 5].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </td>
                  <td style={{ padding: "6px 6px" }}>
                    <select style={{ ...S.select, padding: "8px", fontSize: "13px", width: "76px" }} value={r.grade} onChange={e => updateRow(r.id, "grade", e.target.value)}>
                      {Object.keys(GRADE_POINTS).map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </td>
                  <td style={{ padding: "6px 0 6px 6px" }}>
                    <button style={{ background: C.dangerBg, color: C.danger, border: `1px solid #FFCDD2`, width: "30px", height: "30px", borderRadius: "6px", cursor: "pointer", fontSize: "14px" }} onClick={() => removeRow(r.id)}>×</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button style={{ ...S.btnOutline, fontSize: "13px", padding: "9px 18px" }} onClick={addRow}>
            + Add Subject
          </button>
        </div>

        {/* Result panel */}
        <div>
          <div style={{ ...S.card, textAlign: "center", marginBottom: "16px" }}>
            <div style={{ fontSize: "13px", color: C.textSec, marginBottom: "8px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>Your CGPA</div>
            <div style={{ fontSize: "64px", fontWeight: "900", color: C.primary, lineHeight: 1 }}>{cgpa}</div>
            <div style={{ marginTop: "12px" }}>
              <span style={S.badge(grade.color, grade.bg)}>{grade.label}</span>
            </div>
            <div style={{ marginTop: "16px", fontSize: "15px", color: C.textSec }}>
              Equivalent Percentage: <strong style={{ color: "#1a1a2e" }}>{percentage}%</strong>
            </div>
          </div>

          {/* Grade reference table */}
          <div style={S.card}>
            <h3 style={S.sectionTitle}>Grade Point Reference</h3>
            <table style={S.table}>
              <thead>
                <tr>
                  <th style={S.th}>Grade</th>
                  <th style={S.th}>Points</th>
                  <th style={S.th}>Performance</th>
                </tr>
              </thead>
              <tbody>
                {GRADE_LABELS.map(([g, p, perf], i) => (
                  <tr key={g} style={{ background: i % 2 === 0 ? "#fff" : "#F8FAFC" }}>
                    <td style={S.td}><GradeColor grade={g} /></td>
                    <td style={S.td}>{p}</td>
                    <td style={S.td}>{perf}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Calculation breakdown */}
          <div style={{ ...S.card, background: C.primaryLight, border: `1px solid #90CAF9` }}>
            <h3 style={{ ...S.sectionTitle, color: C.primary }}>Calculation</h3>
            <div style={{ fontSize: "13px", color: C.primary, lineHeight: "2" }}>
              <div>Total Credits: <strong>{totalCredits}</strong></div>
              <div>Weighted Sum: <strong>{weightedSum}</strong></div>
              <div>CGPA = {weightedSum} ÷ {totalCredits} = <strong>{cgpa}</strong></div>
              <div>Percentage = {cgpa} × 9.5 = <strong>{percentage}%</strong></div>
            </div>
          </div>
        </div>
      </div>

      {/* Recorded CGPA from profile */}
      {user.subjects.length > 0 && (
        <div style={{ ...S.card, marginTop: "8px" }}>
          <h3 style={S.sectionTitle}>Your Recorded Academic CGPA: {calcCGPA(user.subjects)}</h3>
          <p style={{ fontSize: "13px", color: C.textSec }}>Based on {user.subjects.length} subjects from your academic record.</p>
        </div>
      )}
    </div>
  );
}
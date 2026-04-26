import { useState } from "react";
import { C, S } from "./Styles";

export default function Register({ setPage, addStudent }) {
  const [form, setForm] = useState({
    name: "", email: "", password: "", confirm: "",
    phone: "", rollNo: "", branch: "", year: "", gender: "", dob: "",
  });
  const [err, setErr] = useState("");
  const [suc, setSuc] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    setErr(""); setSuc("");
    if (Object.values(form).some(v => !v)) { setErr("All fields are required."); return; }
    if (form.password !== form.confirm) { setErr("Passwords do not match."); return; }
    if (form.password.length < 6) { setErr("Password must be at least 6 characters."); return; }
    addStudent({
      id: "STU" + Date.now().toString().slice(-3),
      ...form,
      subjects: [],
      scholarshipApplied: false,
      feesPaid: false,
    });
    setSuc("Registration successful! You can now login.");
    setTimeout(() => setPage("login"), 1800);
  };

  const fields = [
    ["name",    "text",     "Full Name",        "Ravi Kumar"],
    ["rollNo",  "text",     "Roll Number",      "21CS101"],
    ["email",   "email",    "Email Address",    "ravi@student.com"],
    ["phone",   "text",     "Phone Number",     "9876543210"],
    ["dob",     "date",     "Date of Birth",    ""],
    ["password","password", "Password",         "Min 6 characters"],
    ["confirm", "password", "Confirm Password", "Re-enter password"],
  ];

  return (
    <div style={{ ...S.formWrap, alignItems: "flex-start", paddingTop: "30px" }}>
      <div style={{ ...S.formCard, maxWidth: "520px" }}>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <div style={{ fontSize: "40px", marginBottom: "8px" }}>📋</div>
          <h2 style={{ fontSize: "22px", fontWeight: "800", color: C.text, marginBottom: "4px" }}>Student Registration</h2>
          <p style={{ fontSize: "13px", color: C.textSec }}>Create your EduPortal account</p>
        </div>

        {err && <div style={S.err}>{err}</div>}
        {suc && <div style={S.suc}>{suc}</div>}

        <form onSubmit={handleSubmit}>
          <div style={S.grid2}>
            {fields.map(([name, type, label, ph]) => (
              <div key={name} style={S.inputGroup}>
                <label style={S.label}>{label}</label>
                <input style={S.input} type={type} name={name} value={form[name]} onChange={handleChange} placeholder={ph} required />
              </div>
            ))}

            <div style={S.inputGroup}>
              <label style={S.label}>Branch</label>
              <select name="branch" style={S.select} value={form.branch} onChange={handleChange} required>
                <option value="">Select Branch</option>
                {["Computer Science", "Electronics", "Mechanical", "Civil", "Electrical"].map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div style={S.inputGroup}>
              <label style={S.label}>Year</label>
              <select name="year" style={S.select} value={form.year} onChange={handleChange} required>
                <option value="">Select Year</option>
                {["1st Year", "2nd Year", "3rd Year", "4th Year"].map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            <div style={S.inputGroup}>
              <label style={S.label}>Gender</label>
              <select name="gender" style={S.select} value={form.gender} onChange={handleChange} required>
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <button type="submit" style={{ ...S.btnPrimary, marginTop: "8px", marginBottom: "14px" }}>
            Register Now →
          </button>
        </form>

        <div style={{ textAlign: "center", fontSize: "13px", color: C.textSec }}>
          Already registered?{" "}
          <span style={S.link} onClick={() => setPage("login")}>Login here</span>
        </div>
      </div>
    </div>
  );
}
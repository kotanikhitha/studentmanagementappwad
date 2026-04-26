import { useState } from "react";
import { C, S } from "./Styles";

export default function Login({ setPage, setUser, students }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    setErr("");
    if (!form.email || !form.password) { setErr("Please fill all fields."); return; }
    const found = students.find(s => s.email === form.email && s.password === form.password);
    if (found) { setUser(found); setPage("dashboard"); }
    else setErr("Invalid email or password. Check demo credentials below.");
  };

  return (
    <div style={S.formWrap}>
      <div style={S.formCard}>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <div style={{ fontSize: "48px", marginBottom: "8px" }}>🎓</div>
          <h2 style={{ fontSize: "24px", fontWeight: "800", color: C.text, marginBottom: "4px" }}>Student Login</h2>
          <p style={{ fontSize: "13px", color: C.textSec }}>Access your EduPortal account</p>
        </div>

        {err && <div style={S.err}>{err}</div>}

        <form onSubmit={handleSubmit}>
          {[
            ["email", "email", "Email Address", "ravi@student.com"],
            ["password", "password", "Password", "Enter your password"],
          ].map(([name, type, label, ph]) => (
            <div key={name} style={S.inputGroup}>
              <label style={S.label}>{label}</label>
              <input style={S.input} type={type} name={name} value={form[name]} onChange={handleChange} placeholder={ph} required />
            </div>
          ))}
          <button type="submit" style={{ ...S.btnPrimary, marginBottom: "14px" }}>
            Login to Portal →
          </button>
        </form>

        <div style={{ textAlign: "center", fontSize: "13px", color: C.textSec }}>
          New student?{" "}
          <span style={S.link} onClick={() => setPage("register")}>Register here</span>
        </div>

        <div style={{ marginTop: "16px", background: C.primaryLight, borderRadius: "10px", padding: "12px 14px", fontSize: "12px", color: C.primary }}>
          <div style={{ fontWeight: "700", marginBottom: "6px" }}>Demo Credentials:</div>
          <div>📧 ravi@student.com / 🔑 ravi123</div>
          <div>📧 priya@student.com / 🔑 priya123</div>
        </div>
      </div>
    </div>
  );
}
import { S } from "./Styles";

export default function Navbar({ page, setPage, user, setUser }) {
  const guestLinks = [["login", "Login"], ["register", "Register"]];
  const userLinks = [
    ["dashboard", "Dashboard"],
    ["details", "My Details"],
    ["scholarship", "Scholarship"],
    ["payment", "Fees & Payment"],
    ["cgpa", "CGPA Calc"],
  ];
  const links = user ? userLinks : guestLinks;

  return (
    <nav style={S.nav}>
      <div style={S.navInner}>
        <span style={S.logo} onClick={() => setPage(user ? "dashboard" : "login")}>
          🎓 <span>EduPortal</span>
        </span>
        <div style={S.navLinks}>
          {links.map(([key, label]) => (
            <button
              key={key}
              style={{ ...S.navLink, ...(page === key ? S.navActive : {}) }}
              onClick={() => setPage(key)}
            >
              {label}
            </button>
          ))}
          {user && (
            <button
              style={{ padding: "7px 14px", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", borderRadius: "8px", cursor: "pointer", fontSize: "12px", fontWeight: "600" }}
              onClick={() => { setUser(null); setPage("login"); }}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
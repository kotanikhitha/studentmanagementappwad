import { useState } from "react";

import { DEMO_STUDENTS } from "./Constants";
import { S, C } from "./Styles";

import Navbar          from "./Navbar";
import Login           from "./Login";
import Register        from "./Register";
import Dashboard       from "./Dashboard";
import StudentDetails  from "./Studentdetails";
import Scholarship     from "./Scholarship";
import Payment         from "./Payment";
import CGPACalculator  from "./Cgpacalculator";

export default function App() {
  const [page, setPage]       = useState("login");
  const [user, setUser]       = useState(null);
  const [students, setStudents] = useState(DEMO_STUDENTS);

  const addStudent  = s        => setStudents(prev => [...prev, s]);
  const updateUser  = updated  => {
    setStudents(prev => prev.map(s => s.id === updated.id ? updated : s));
    setUser(updated);
  };

  const pages = {
    login:        <Login          setPage={setPage} setUser={setUser} students={students} />,
    register:     <Register       setPage={setPage} addStudent={addStudent} />,
    dashboard:    <Dashboard      user={user} setPage={setPage} />,
    details:      <StudentDetails user={user} />,
    scholarship:  <Scholarship    user={user} updateUser={updateUser} />,
    payment:      <Payment        user={user} updateUser={updateUser} />,
    cgpa:         <CGPACalculator user={user} />,
  };

  const currentPage = user || page === "login" || page === "register"
    ? (pages[page] || pages.login)
    : pages.login;

  return (
    <div style={S.page}>
      <Navbar page={page} setPage={setPage} user={user} setUser={setUser} />

      {currentPage}

      <footer style={{ background: C.primary, color: "rgba(255,255,255,0.7)", padding: "24px", textAlign: "center", marginTop: "40px", fontSize: "13px" }}>
        <div style={{ fontWeight: "700", color: "#fff", marginBottom: "6px" }}>🎓 EduPortal — Student Management System</div>
        <div>© 2025 EduPortal. All academic records are confidential.</div>
      </footer>
    </div>
  );
}
// ─── MOCK DATA ───────────────────────────────────────────────────────────────
export const DEMO_STUDENTS = [
  {
    id: "STU001", name: "Ravi Kumar", email: "ravi@student.com", password: "ravi123",
    branch: "Computer Science", year: "3rd Year", phone: "9876543210",
    rollNo: "21CS101", dob: "2003-05-10", gender: "Male",
    subjects: [
      { name: "Data Structures", credits: 4, grade: "O" },
      { name: "Operating Systems", credits: 3, grade: "A+" },
      { name: "DBMS", credits: 4, grade: "A" },
      { name: "Computer Networks", credits: 3, grade: "B+" },
      { name: "Software Engineering", credits: 3, grade: "A+" },
    ],
    scholarshipApplied: false,
    feesPaid: false,
  },
  {
    id: "STU002", name: "Priya Sharma", email: "priya@student.com", password: "priya123",
    branch: "Electronics", year: "2nd Year", phone: "9123456780",
    rollNo: "22EC202", dob: "2004-11-25", gender: "Female",
    subjects: [
      { name: "Circuit Theory", credits: 4, grade: "A+" },
      { name: "Digital Electronics", credits: 3, grade: "O" },
      { name: "Signals & Systems", credits: 4, grade: "A" },
      { name: "Engineering Mathematics", credits: 3, grade: "A+" },
    ],
    scholarshipApplied: false,
    feesPaid: false,
  },
];

export const GRADE_POINTS = { O: 10, "A+": 9, A: 8, "B+": 7, B: 6, C: 5, F: 0 };
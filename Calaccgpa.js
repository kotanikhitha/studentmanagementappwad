import { GRADE_POINTS } from "./Constants";

export function calcCGPA(subjects) {
  const total = subjects.reduce((a, s) => a + s.credits, 0);
  const weighted = subjects.reduce((a, s) => a + (GRADE_POINTS[s.grade] || 0) * s.credits, 0);
  return total > 0 ? (weighted / total).toFixed(2) : "0.00";
}
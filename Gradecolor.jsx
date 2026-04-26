import { C, S } from "./Styles";

const gradeMap = {
  O:   [C.success,  C.successBg],
  "A+": ["#1565C0", "#E3F2FD"],
  A:   ["#00838F",  "#E0F7FA"],
  "B+": ["#6A1B9A", "#F3E5F5"],
  B:   ["#E65100",  "#FFF3E0"],
  C:   ["#827717",  "#F9FBE7"],
  F:   [C.danger,   C.dangerBg],
};

export default function GradeColor({ grade }) {
  const [color, bg] = gradeMap[grade] || [C.textSec, C.bg];
  return <span style={S.badge(color, bg)}>{grade}</span>;
}
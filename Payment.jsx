import { useState } from "react";
import { C, S } from "./Styles";

const FEES = [
  { label: "Tuition Fee", amount: 45000 },
  { label: "Exam Fee",    amount: 2000  },
  { label: "Lab Fee",     amount: 3000  },
  { label: "Library Fee", amount: 500   },
  { label: "Sports Fee",  amount: 500   },
];
const TOTAL = FEES.reduce((a, f) => a + f.amount, 0);

export default function Payment({ user, updateUser }) {
  const [method, setMethod] = useState("upi");
  const [upiId, setUpiId]   = useState("");
  const [card, setCard]     = useState({ num: "", name: "", exp: "", cvv: "" });
  const [done, setDone]     = useState(false);
  const [err, setErr]       = useState("");

  const handlePay = e => {
    e.preventDefault();
    setErr("");
    if (method === "upi" && !upiId.includes("@")) { setErr("Enter a valid UPI ID (e.g. name@upi)"); return; }
    if (method === "card") {
      if (card.num.replace(/\s/g, "").length !== 16) { setErr("Enter a valid 16-digit card number."); return; }
      if (!card.name || !card.exp || card.cvv.length !== 3) { setErr("Fill all card details correctly."); return; }
    }
    updateUser({ ...user, feesPaid: true });
    setDone(true);
  };

  if (done) return (
    <div style={{ ...S.formWrap, flexDirection: "column", gap: "16px", textAlign: "center" }}>
      <div style={{ fontSize: "64px" }}>🎉</div>
      <h2 style={{ color: C.success, fontSize: "26px", fontWeight: "800" }}>Payment Successful!</h2>
      <p style={{ color: C.textSec }}>₹{TOTAL.toLocaleString()} paid for {user.name} ({user.rollNo})</p>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: "12px", padding: "20px 28px", minWidth: "280px" }}>
        <div style={{ fontSize: "12px", color: C.textSec, marginBottom: "4px" }}>Transaction ID</div>
        <div style={{ fontWeight: "700", color: C.primary, fontSize: "16px" }}>TXN{Date.now().toString().slice(-10)}</div>
      </div>
    </div>
  );

  return (
    <div style={S.pageBody}>
      <h2 style={S.pageTitle}>Fee Payment</h2>
      <p style={S.pageSub}>Pay your semester fees securely online</p>

      <div style={S.grid2}>
        {/* Fee breakdown */}
        <div>
          <div style={S.card}>
            <h3 style={S.sectionTitle}>Fee Breakdown</h3>
            {user.feesPaid && <div style={S.suc}>✅ Fees already paid for this semester!</div>}
            <table style={S.table}>
              <thead>
                <tr>
                  <th style={S.th}>Fee Type</th>
                  <th style={{ ...S.th, textAlign: "right" }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {FEES.map((f, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#F8FAFC" }}>
                    <td style={S.td}>{f.label}</td>
                    <td style={{ ...S.td, textAlign: "right" }}>₹{f.amount.toLocaleString()}</td>
                  </tr>
                ))}
                <tr style={{ background: C.primaryLight }}>
                  <td style={{ ...S.td, fontWeight: "800", color: C.primary }}>Total</td>
                  <td style={{ ...S.td, textAlign: "right", fontWeight: "900", color: C.primary, fontSize: "17px" }}>₹{TOTAL.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={S.card}>
            <h3 style={S.sectionTitle}>Student Info</h3>
            {[["Name", user.name], ["Roll No", user.rollNo], ["Branch", user.branch], ["Semester", user.year]].map(([l, v]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${C.border}`, fontSize: "14px" }}>
                <span style={{ color: C.textSec }}>{l}</span>
                <span style={{ fontWeight: "600" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment form */}
        <div style={S.card}>
          <h3 style={S.sectionTitle}>Payment Method</h3>
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            {[["upi", "📱 UPI"], ["card", "💳 Card"], ["netbanking", "🏦 Net Banking"]].map(([val, label]) => (
              <button key={val} onClick={() => setMethod(val)}
                style={{ flex: 1, padding: "10px 6px", borderRadius: "9px", border: `2px solid ${method === val ? C.primary : C.border}`, background: method === val ? C.primaryLight : "#fff", color: method === val ? C.primary : C.textSec, cursor: "pointer", fontSize: "13px", fontWeight: "700" }}>
                {label}
              </button>
            ))}
          </div>

          {err && <div style={S.err}>{err}</div>}

          <form onSubmit={handlePay}>
            {method === "upi" && (
              <div style={S.inputGroup}>
                <label style={S.label}>UPI ID</label>
                <input style={S.input} type="text" value={upiId} onChange={e => setUpiId(e.target.value)} placeholder="yourname@upi" required />
              </div>
            )}

            {method === "card" && (
              <>
                {[
                  ["num",  "text",     "Card Number",    "1234 5678 9012 3456"],
                  ["name", "text",     "Name on Card",   "RAVI KUMAR"],
                  ["exp",  "text",     "Expiry (MM/YY)", "12/26"],
                  ["cvv",  "password", "CVV",            "•••"],
                ].map(([key, type, label, ph]) => (
                  <div key={key} style={S.inputGroup}>
                    <label style={S.label}>{label}</label>
                    <input style={S.input} type={type} value={card[key]} onChange={e => setCard({ ...card, [key]: e.target.value })} placeholder={ph} required maxLength={key === "num" ? 19 : key === "cvv" ? 3 : undefined} />
                  </div>
                ))}
              </>
            )}

            {method === "netbanking" && (
              <div style={S.inputGroup}>
                <label style={S.label}>Select Bank</label>
                <select style={S.select} required>
                  <option value="">Select your bank</option>
                  {["State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank", "Bank of Baroda"].map(b => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
              </div>
            )}

            <div style={{ background: C.successBg, border: `1px solid #A5D6A7`, borderRadius: "10px", padding: "14px", marginBottom: "16px", fontSize: "13px", color: C.success }}>
              🔒 Your payment is 100% secure and encrypted.
            </div>

            <button type="submit" style={S.btnSuccess} disabled={user.feesPaid}>
              {user.feesPaid ? "✓ Already Paid" : `Pay ₹${TOTAL.toLocaleString()} Now →`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
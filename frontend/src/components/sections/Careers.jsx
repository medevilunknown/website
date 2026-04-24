import React, { useState } from "react";
import SectionShell from "../SectionShell";
import { submitApplication } from "../../lib/api";
import { playClick } from "../../hooks/useSound";
import { Check } from "lucide-react";

const FIELDS = [
  { k: "name", label: "identity.name", placeholder: "Your name", type: "text", required: true },
  { k: "email", label: "identity.email", placeholder: "you@domain.com", type: "email", required: true },
  { k: "role", label: "role.target", placeholder: "What you do / want to do", type: "text", required: true },
  { k: "portfolio_url", label: "portfolio.url", placeholder: "https://…", type: "url", required: false },
];

export default function Careers({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    portfolio_url: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [error, setError] = useState("");

  const onChange = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (status === "submitting") return;
    setError("");
    setStatus("submitting");
    playClick();
    try {
      const payload = { ...form };
      if (!payload.portfolio_url) delete payload.portfolio_url;
      await submitApplication(payload);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      const detail = err?.response?.data?.detail;
      setError(
        typeof detail === "string"
          ? detail
          : Array.isArray(detail)
          ? detail.map((d) => d.msg).join(" · ")
          : "Transmission failed. Please try again."
      );
    }
  };

  if (status === "success") {
    return (
      <SectionShell
        code="OPYO.CAREERS"
        title={
          <>
            Signal<br />
            <span className="text-[#60A5FA] glow-text">received.</span>
          </>
        }
        tagline="Your application has been committed to the ecosystem. We read every transmission."
        onClose={onClose}
      >
        <div className="glass p-10 md:p-14 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="relative">
            <div className="w-16 h-16 border border-[#60A5FA] flex items-center justify-center mb-6 mx-auto glow-border">
              <Check size={28} className="text-[#60A5FA]" />
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#60A5FA] mb-3">
              transmission.status
            </div>
            <h3 className="font-display text-3xl md:text-4xl font-semibold mb-4">
              Welcome to the waitlist.
            </h3>
            <p className="text-[#8B9BB4] max-w-xl mx-auto leading-relaxed">
              Thanks, <span className="text-[#E8EEF5]">{form.name}</span>. If
              there's a fit, we'll reach out at{" "}
              <span className="text-[#E8EEF5]">{form.email}</span>.
            </p>
            <button
              data-testid="careers-submit-another"
              onClick={() => {
                setForm({ name: "", email: "", role: "", portfolio_url: "", message: "" });
                setStatus("idle");
              }}
              className="mt-8 hairline px-6 py-3 font-mono text-[10px] uppercase tracking-[0.3em] hover:border-[#60A5FA] hover:text-[#60A5FA] transition-colors"
            >
              [ send another ]
            </button>
          </div>
        </div>
      </SectionShell>
    );
  }

  return (
    <SectionShell
      code="OPYO.CAREERS"
      title={
        <>
          Join the<br />
          <span className="text-[#60A5FA] glow-text">ecosystem.</span>
        </>
      }
      tagline="We hire slowly and with care. If you build like the seams matter — tell us what you've made and what you want to build next."
      onClose={onClose}
    >
      <div className="grid lg:grid-cols-12 gap-6 md:gap-8">
        {/* LEFT: pseudo-code intro */}
        <div className="lg:col-span-5">
          <div className="glass p-6 md:p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-25" />
            <div className="relative font-mono text-[11px] md:text-sm space-y-1 text-[#8B9BB4]">
              <div><span className="text-[#60A5FA]">function</span> applyToOPYO(you) {"{"}</div>
              <div className="pl-4">you.commit(craft);</div>
              <div className="pl-4">you.share(what.you.built);</div>
              <div className="pl-4">you.signal(where.you.want.to.go);</div>
              <div className="pl-4"><span className="text-[#60A5FA]">return</span> ecosystem.open(you);</div>
              <div>{"}"}</div>
            </div>
          </div>

          <div className="mt-6 hairline p-6 space-y-4 text-sm text-[#8B9BB4]">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#60A5FA] mb-1">
                who we hire
              </div>
              <div>
                Engineers, directors, designers, and players with taste.
              </div>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#60A5FA] mb-1">
                where we are
              </div>
              <div>Distributed. Timezones are a feature.</div>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#60A5FA] mb-1">
                how to stand out
              </div>
              <div>Ship a link. One real thing beats ten résumés.</div>
            </div>
          </div>
        </div>

        {/* RIGHT: form */}
        <form
          onSubmit={submit}
          className="lg:col-span-7 glass p-6 md:p-8 space-y-6 relative"
          data-testid="careers-form"
        >
          {FIELDS.map((f) => (
            <div key={f.k}>
              <label
                htmlFor={`field-${f.k}`}
                className="block font-mono text-[10px] uppercase tracking-[0.3em] text-[#60A5FA] mb-2"
              >
                &gt; {f.label}
                {f.required && <span className="text-[#E8EEF5] ml-1">*</span>}
              </label>
              <input
                id={`field-${f.k}`}
                data-testid={`careers-field-${f.k}`}
                type={f.type}
                value={form[f.k]}
                onChange={onChange(f.k)}
                required={f.required}
                placeholder={f.placeholder}
                className="w-full bg-transparent hairline-b border-b-[#1E293B] pb-3 pt-1 font-display text-lg text-[#E8EEF5] placeholder:text-[#1E293B] focus:outline-none focus:border-b-[#60A5FA] transition-colors"
              />
            </div>
          ))}

          <div>
            <label
              htmlFor="field-message"
              className="block font-mono text-[10px] uppercase tracking-[0.3em] text-[#60A5FA] mb-2"
            >
              &gt; transmission.body <span className="text-[#E8EEF5] ml-1">*</span>
            </label>
            <textarea
              id="field-message"
              data-testid="careers-field-message"
              value={form.message}
              onChange={onChange("message")}
              required
              rows={5}
              placeholder="What have you built? What do you want to build at OPYO?"
              className="w-full bg-[#060708]/40 hairline p-4 font-mono text-sm text-[#E8EEF5] placeholder:text-[#1E293B] focus:outline-none focus:border-[#60A5FA] transition-colors resize-none"
            />
          </div>

          {error && (
            <div
              data-testid="careers-form-error"
              className="font-mono text-xs text-[#60A5FA] hairline p-3"
            >
              &gt; error: {error}
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#8B9BB4]">
              {status === "submitting" ? "transmitting…" : "ready to send"}
            </div>
            <button
              type="submit"
              data-testid="careers-submit-button"
              disabled={status === "submitting"}
              className="group relative font-mono text-[11px] uppercase tracking-[0.3em] px-7 py-4 hairline border-[#60A5FA] text-[#E8EEF5] hover:bg-[#3B82F6]/10 hover:glow-border transition-all disabled:opacity-50"
            >
              <span className="relative z-10">
                {status === "submitting" ? "[ sending… ]" : "[ transmit ]"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </SectionShell>
  );
}

import React, { useState } from "react";
import SectionShell from "../SectionShell";
import { TerminalArt } from "../HeroArt";
import { submitApplication } from "../../lib/api";
import { playClick } from "../../hooks/useSound";
import { Check, ArrowRight } from "lucide-react";

const FIELDS = [
  { k: "name", label: "Name", placeholder: "Your name", type: "text", required: true },
  { k: "email", label: "Email", placeholder: "you@domain.com", type: "email", required: true },
  { k: "role", label: "Role", placeholder: "What you do or want to do", type: "text", required: true },
  { k: "portfolio_url", label: "Portfolio", placeholder: "https://…", type: "url", required: false },
];

export default function Careers({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    portfolio_url: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const onChange = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    if (!form.name || form.name.trim().length < 2) return "Name must be at least 2 characters.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return "Please enter a valid email address.";
    if (!form.role || form.role.trim().length < 2) return "Role is required.";
    if (!form.message || form.message.trim().length < 10)
      return "Message must be at least 10 characters.";
    return null;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (status === "submitting") return;
    const clientError = validate();
    if (clientError) {
      setError(clientError);
      setStatus("error");
      return;
    }
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
        code="C / 05"
        eyebrow="Careers"
        title={
          <>
            Signal<br />
            <span className="text-[#60A5FA] glow-text">received.</span>
          </>
        }
        tagline="Your transmission has been committed to the ecosystem. We read every one."
        onClose={onClose}
      >
        <div className="border-t border-[#1E293B] py-16 md:py-20 flex flex-col items-start">
          <div className="w-14 h-14 border border-[#60A5FA] flex items-center justify-center mb-8">
            <Check size={22} className="text-[#60A5FA]" />
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#60A5FA] mb-4">
            Status · confirmed
          </div>
          <div
            className="font-display text-3xl md:text-5xl font-semibold text-[#E8EEF5] mb-6 max-w-2xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            Welcome to the waitlist, {form.name.split(" ")[0] || "operator"}.
          </div>
          <p className="text-[#8B9BB4] max-w-xl text-base md:text-lg leading-relaxed">
            If there's a fit, we'll reach out at{" "}
            <span className="text-[#E8EEF5]">{form.email}</span>.
          </p>
          <button
            data-testid="careers-submit-another"
            onClick={() => {
              setForm({ name: "", email: "", role: "", portfolio_url: "", message: "" });
              setStatus("idle");
            }}
            className="mt-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-[#E8EEF5] hover:text-[#60A5FA] transition-colors group"
          >
            <span>send another</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </SectionShell>
    );
  }

  return (
    <SectionShell
      code="C / 05"
      eyebrow="Careers"
      title={
        <>
          Join the<br />
          <span className="text-[#60A5FA] glow-text">ecosystem.</span>
        </>
      }
      tagline="We hire slowly and with care. Tell us what you've built and what you want to build next."
      onClose={onClose}
      accent="#C89B3C"
      hero={<TerminalArt />}
    >
      <form
        onSubmit={submit}
        noValidate
        className="max-w-3xl"
        data-testid="careers-form"
      >
        {FIELDS.map((f) => (
          <div
            key={f.k}
            className="border-t border-[#1E293B] py-6 md:py-7 focus-within:border-[#60A5FA] transition-colors"
          >
            <label
              htmlFor={`field-${f.k}`}
              className="block font-mono text-[10px] uppercase tracking-[0.3em] text-[#8B9BB4] mb-3"
            >
              {f.label}
              {f.required && <span className="text-[#60A5FA] ml-1">*</span>}
            </label>
            <input
              id={`field-${f.k}`}
              data-testid={`careers-field-${f.k}`}
              type={f.type}
              value={form[f.k]}
              onChange={onChange(f.k)}
              required={f.required}
              placeholder={f.placeholder}
              className="w-full bg-transparent font-display text-2xl md:text-3xl text-[#E8EEF5] placeholder:text-[#1E293B] focus:outline-none"
              style={{ letterSpacing: "-0.01em" }}
            />
          </div>
        ))}

        <div className="border-t border-[#1E293B] py-6 md:py-7 focus-within:border-[#60A5FA] transition-colors">
          <label
            htmlFor="field-message"
            className="block font-mono text-[10px] uppercase tracking-[0.3em] text-[#8B9BB4] mb-3"
          >
            Message <span className="text-[#60A5FA] ml-1">*</span>
          </label>
          <textarea
            id="field-message"
            data-testid="careers-field-message"
            value={form.message}
            onChange={onChange("message")}
            required
            rows={4}
            placeholder="What have you built? What do you want to build at OPYO?"
            className="w-full bg-transparent font-display text-xl md:text-2xl text-[#E8EEF5] placeholder:text-[#1E293B] focus:outline-none resize-none leading-snug"
            style={{ letterSpacing: "-0.005em" }}
          />
        </div>

        {error && (
          <div
            data-testid="careers-form-error"
            className="border-t border-[#60A5FA] py-4 font-mono text-[11px] uppercase tracking-[0.28em] text-[#60A5FA]"
          >
            {error}
          </div>
        )}

        <div className="border-t border-[#1E293B] pt-8 flex items-center justify-between">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#8B9BB4]">
            {status === "submitting" ? "transmitting…" : "ready"}
          </div>
          <button
            type="submit"
            data-testid="careers-submit-button"
            disabled={status === "submitting"}
            className="group flex items-center gap-4 font-display text-xl md:text-2xl font-semibold text-[#E8EEF5] hover:text-[#60A5FA] transition-colors disabled:opacity-50"
            style={{ letterSpacing: "-0.02em" }}
          >
            <span>{status === "submitting" ? "Sending" : "Transmit"}</span>
            <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </form>
    </SectionShell>
  );
}

"use client";

import { useState } from "react";
import { MessageCircle, Youtube, Mail } from "lucide-react";
import { socials } from "@/lib/socials";

// Netlify Forms: the form tag below (with data-netlify + a "form-name"
// hidden input) is what Netlify's build-time bot scans for in the exported
// static HTML — this works with drag-and-drop deploys too, not just
// Git-connected ones. Submissions land in Netlify's dashboard under
// Site → Forms. No backend/email server needed.
export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    try {
      const body = new URLSearchParams({ "form-name": "contact", ...form }).toString();
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
      if (!res.ok) throw new Error("Form submission failed");
      setStatus("sent");
      setForm({ name: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-6 md:px-10 py-16 md:py-24">
      <p className="tracking-tracked text-xs text-gold mb-3">GET IN TOUCH</p>
      <h1 className="font-serif text-4xl md:text-5xl mb-8">Contact Us</h1>

      <div className="grid md:grid-cols-2 gap-10">
        <form
          name="contact"
          data-netlify="true"
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* Required for Netlify's static-HTML form detection */}
          <input type="hidden" name="form-name" value="contact" />

          <div>
            <label className="text-xs tracking-tracked text-ink/60">NAME</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="mt-1 w-full border border-black/15 rounded-sm px-3 py-2.5 text-sm outline-none focus:border-gold"
            />
          </div>
          <div>
            <label className="text-xs tracking-tracked text-ink/60">PHONE</label>
            <input
              required
              type="tel"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              placeholder="03XX-XXXXXXX"
              className="mt-1 w-full border border-black/15 rounded-sm px-3 py-2.5 text-sm outline-none focus:border-gold"
            />
          </div>
          <div>
            <label className="text-xs tracking-tracked text-ink/60">MESSAGE</label>
            <textarea
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              className="mt-1 w-full border border-black/15 rounded-sm px-3 py-2.5 text-sm outline-none focus:border-gold"
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="px-7 py-3 bg-charcoal text-ivory text-sm tracking-tracked hover:bg-gold transition-colors disabled:opacity-50"
          >
            {status === "sending" ? "SENDING..." : "SEND MESSAGE"}
          </button>

          {status === "sent" && (
            <p className="text-sm text-green-700">
              Thanks — we&apos;ll get back to you soon. For a faster reply, use WhatsApp below.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-600">
              Something went wrong. Please try WhatsApp instead for now.
            </p>
          )}
        </form>

        <div className="space-y-4">
          <a
            href={`${socials.whatsappLink}?text=${encodeURIComponent("Hi Luxe Wear, I have a question.")}`}
            target="_blank"
            className="flex items-center gap-3 p-4 border border-black/10 rounded-sm hover:border-gold-soft transition-colors"
          >
            <MessageCircle size={20} className="text-[#25D366]" />
            <div>
              <p className="text-sm font-medium">WhatsApp</p>
              <p className="text-xs text-ink/50">Fastest way to reach us</p>
            </div>
          </a>
          <a
            href={socials.youtube}
            target="_blank"
            className="flex items-center gap-3 p-4 border border-black/10 rounded-sm hover:border-gold-soft transition-colors"
          >
            <Youtube size={20} className="text-red-600" />
            <div>
              <p className="text-sm font-medium">YouTube</p>
              <p className="text-xs text-ink/50">@luxe_wear4544</p>
            </div>
          </a>
          <a
            href={`mailto:${socials.email}`}
            className="flex items-center gap-3 p-4 border border-black/10 rounded-sm hover:border-gold-soft transition-colors"
          >
            <Mail size={20} className="text-gold" />
            <div>
              <p className="text-sm font-medium">Email</p>
              <p className="text-xs text-ink/50">{socials.email}</p>
            </div>
          </a>
        </div>
      </div>
    </main>
  );
}

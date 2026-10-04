"use client";

import { useState } from "react";

// Netlify Forms again (separate form name from the Contact page's "contact"
// form) — submissions land in Netlify's dashboard under Site → Forms.
export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    try {
      const body = new URLSearchParams({ "form-name": "newsletter", email }).toString();
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="bg-charcoal text-ivory mt-24">
      <div className="max-w-2xl mx-auto px-6 md:px-10 py-16 text-center">
        <p className="tracking-tracked text-xs text-gold-soft mb-3">STAY IN TOUCH</p>
        <h2 className="font-serif text-2xl md:text-3xl mb-6">
          Get new drops before anyone else
        </h2>
        {status === "sent" ? (
          <p className="text-sm text-gold-soft">You&apos;re on the list — thank you!</p>
        ) : (
          <form name="newsletter" data-netlify="true" onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center">
            <input type="hidden" name="form-name" value="newsletter" />
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="px-4 py-3 rounded-sm bg-ivory/10 border border-ivory/20 text-sm outline-none focus:border-gold-soft placeholder:text-ivory/40 sm:w-72"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="px-6 py-3 bg-gold text-ivory text-sm tracking-tracked hover:bg-gold-soft transition-colors disabled:opacity-50"
            >
              {status === "sending" ? "..." : "SUBSCRIBE"}
            </button>
          </form>
        )}
        {status === "error" && <p className="text-xs text-red-300 mt-3">Something went wrong — please try again.</p>}
      </div>
    </section>
  );
}

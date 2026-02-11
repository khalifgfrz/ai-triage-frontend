"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import { createTicketAction } from "@/app/actions/createTicket";

export default function CreateTicketForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const subject = String(formData.get("subject") ?? "");
    const message = String(formData.get("message") ?? "");
    const userEmail = String(formData.get("userEmail") ?? "");

    if (subject.trim().length < 3) {
      Swal.fire("Error", "Please lengthen the subject to at least 3 characters", "error");
      return;
    }
    if (message.trim().length < 10) {
      Swal.fire("Error", "Please lengthen the message to at least 10 characters", "error");
      return;
    }

    try {
      setIsSubmitting(true);

      Swal.fire({
        title: "Submitting Ticket...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const result = await createTicketAction(subject, message, userEmail);
      const titleMessage = result.data;
      const textMessage = result.message;

      await Swal.fire({
        title: titleMessage,
        text: textMessage,
        icon: "success",
        confirmButtonColor: "#10b981",
        timer: 3000,
        timerProgressBar: true,
      });

      router.push("/tickets");
      router.refresh();
    } catch (err: any) {
      Swal.close();
      Swal.fire("Error", err?.message || "Failed to create ticket", "error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 rounded-xl border border-border bg-card p-6">
      {/* Email */}
      <div className="flex flex-col gap-2">
        <label htmlFor="userEmail" className="text-sm font-medium text-foreground">
          Email Address
        </label>
        <input
          id="userEmail"
          name="userEmail"
          type="email"
          placeholder="you@example.com"
          required
          className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50"
        />
      </div>

      {/* Subject */}
      <div className="flex flex-col gap-2">
        <label htmlFor="subject" className="text-sm font-medium text-foreground">
          Subject <span className="text-xs text-muted-foreground">(minimum 3 characters)</span>
        </label>
        <input
          id="subject"
          name="subject"
          placeholder="Brief description of your issue"
          required
          minLength={3}
          className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50"
        />
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          Message <span className="text-xs text-muted-foreground">(minimum 10 characters)</span>
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Describe your issue in detail..."
          required
          minLength={10}
          rows={6}
          className="resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50"
        />
      </div>

      {/* Submit */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m22 2-7 20-4-9-9-4z" />
            <path d="M22 2 11 13" />
          </svg>
          {isSubmitting ? "Sending..." : "Submit Ticket"}
        </button>
        <Link href="/tickets" className="rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
          Cancel
        </Link>
      </div>
    </form>
  );
}

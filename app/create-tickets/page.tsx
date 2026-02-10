import { api } from "@/lib/api";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function CreateTicketPage() {
  return (
    <main className="py-10">
      {/* Back link */}
      <Link
        href="/tickets"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
        Back to tickets
      </Link>

      <div className="mt-6">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Create New Ticket
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Submit a support ticket and our AI will help triage it.
        </p>
      </div>

      <div className="mt-8 max-w-2xl">
        <form
          action={async (formData: FormData) => {
            "use server";

            const subject = String(formData.get("subject") ?? "");
            const message = String(formData.get("message") ?? "");
            const userEmail = String(formData.get("userEmail") ?? "");

            try {
              await api.post("/tickets", { subject, message, userEmail });
              redirect("/tickets");
            } catch (err: any) {
              console.error("Ticket creation failed:", {
                message: err?.message,
                status: err?.response?.status,
                data: err?.response?.data,
              });
              throw err;
            }
          }}
          className="flex flex-col gap-6 rounded-xl border border-border bg-card p-6"
        >
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
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              placeholder="Brief description of your issue"
              required
              className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50"
            />
          </div>

          {/* Message */}
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm font-medium text-foreground">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Describe your issue in detail..."
              required
              rows={6}
              className="resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50"
            />
          </div>

          {/* Submit */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m22 2-7 20-4-9-9-4z" />
                <path d="M22 2 11 13" />
              </svg>
              Submit Ticket
            </button>
            <Link
              href="/tickets"
              className="rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}

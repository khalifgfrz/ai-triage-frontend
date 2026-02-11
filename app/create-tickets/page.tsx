import Link from "next/link";
import CreateTicketForm from "@/components/CreateTicketForm";

export default function CreateTicketPage() {
  return (
    <main className="py-10">
      {/* Back link */}
      <Link href="/tickets" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
        Back to tickets
      </Link>

      <div className="mt-6">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Create New Ticket</h1>
        <p className="mt-1 text-sm text-muted-foreground">Submit a support ticket and our AI will help triage it.</p>
      </div>

      <div className="mt-8 max-w-2xl">
        <CreateTicketForm />
      </div>
    </main>
  );
}

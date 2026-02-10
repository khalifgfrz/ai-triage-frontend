import { api } from "@/lib/api";
import TicketsDashboard from "@/components/TicketsDashboard";

export const dynamic = "force-dynamic";

export default async function TicketsPage() {
  const res = await api.get("/tickets");
  const tickets = res.data;

  return (
    <main className="py-10">
      <TicketsDashboard initialTickets={tickets} />
    </main>
  );
}

import TicketList from "@/components/TicketList";
import { api } from "@/lib/api";

export default async function TicketsPage() {
  const res = await api.get("/tickets");
  const tickets = res.data;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Tickets Dashboard</h1>
      <TicketList tickets={tickets} />
    </main>
  );
}

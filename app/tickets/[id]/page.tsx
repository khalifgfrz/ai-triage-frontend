import { api } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";

type Props = { params: { id: string } };

export default async function TicketDetail({ params }: Props) {
  const res = await api.get(`/tickets`);
  const ticket = res.data.find((t: any) => t.id === params.id);

  if (!ticket) return notFound();

  async function resolveTicket() {
    "use server";
    await api.patch(`/tickets/${params.id}/resolve`);
    revalidatePath(`/tickets/${params.id}`);
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">{ticket.subject}</h1>
      <p>Status: {ticket.status}</p>
      <p>Urgency: {ticket.urgency ?? "N/A"}</p>
      <p>Message: {ticket.message}</p>

      <label className="block mb-2 font-bold">AI Draft Reply</label>
      <textarea name="aiDraft" defaultValue={ticket.aiDraft} className="w-full border rounded p-2" />
      <form action={resolveTicket} method="POST" className="mt-6">
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition-colors">
          Resolve Ticket
        </button>
      </form>
    </main>
  );
}

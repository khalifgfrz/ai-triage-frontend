import type { Ticket } from "@/types/ticket";
import Link from "next/link";
import clsx from "clsx";

type Props = { ticket: Ticket };

export default function TicketItem({ ticket }: Props) {
  const urgencyColor = clsx({
    "bg-red-100 text-red-800": ticket.urgency === "High",
    "bg-yellow-100 text-yellow-800": ticket.urgency === "Medium",
    "bg-green-100 text-green-800": ticket.urgency === "Low",
  });

  return (
    <Link href={`/tickets/${ticket.id}`} className={`block p-4 rounded border mb-2 ${urgencyColor}`}>
      <h3 className="font-bold">{ticket.subject}</h3>
      <p>Status: {ticket.status}</p>
      <p>Urgency: {ticket.urgency ?? "N/A"}</p>
    </Link>
  );
}

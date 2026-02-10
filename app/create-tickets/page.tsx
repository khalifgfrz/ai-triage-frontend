import { api } from "@/lib/api";
import { redirect } from "next/navigation";

export default async function CreateTicketPage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Create Ticket</h1>

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
        className="flex flex-col gap-4"
      >
        <input name="subject" placeholder="Subject" className="border p-2 rounded" required />
        <textarea name="message" placeholder="Message" className="border p-2 rounded" required />
        <input name="userEmail" type="email" placeholder="Your Email" className="border p-2 rounded" required />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Submit Ticket
        </button>
      </form>
    </main>
  );
}

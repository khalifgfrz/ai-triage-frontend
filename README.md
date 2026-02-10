# AI Triage Frontend

Frontend application for an AI-powered support ticket triage system. Built with Next.js 14, Tailwind CSS 4, and SWR for real-time data fetching.

## Features

- **AI Auto-Categorization** -- Tickets are automatically categorized by AI based on content analysis
- **Urgency Detection** -- Sentiment analysis determines urgency levels (High / Medium / Low)
- **AI Suggested Response** -- AI generates draft replies that can be reviewed and edited before resolving
- **Real-time Dashboard** -- Ticket statuses update automatically via SWR polling (no manual refresh needed)
- **Ticket Management** -- Create, view, and resolve support tickets from a single dashboard

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **HTTP Client**: Axios
- **Data Fetching**: SWR (polling every 3 seconds)

## Project Structure

```
app/
  layout.tsx                      # Root layout with Navbar, fonts, and metadata
  page.tsx                        # Homepage / landing
  tickets/
    page.tsx                      # Tickets dashboard
    [id]/page.tsx                 # Ticket detail & resolve
  create-tickets/
    page.tsx                      # Create new ticket form
  api/
    tickets/
      route.ts                   # GET proxy for client-side fetching
      [id]/resolve/route.ts      # POST proxy for resolving tickets
components/
  Navbar.tsx                      # Navigation bar
  TicketsDashboard.tsx            # Client component with SWR polling
  TicketList.tsx                  # Ticket list with empty state
  TicketItem.tsx                  # Individual ticket card
lib/
  api.ts                          # Axios instance (backend connection)
types/
  ticket.ts                       # Ticket TypeScript interface
```

## Getting Started

### Prerequisites

- Node.js 18+
- A running instance of the [AI Triage Backend](https://github.com/khalifgfrz/ai-triage-backend) API

### Installation

```bash
# Clone the repository
git clone https://github.com/khalifgfrz/ai-triage-frontend.git
cd ai-triage-frontend

# Install dependencies
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

| Variable                   | Description                           |
| -------------------------- | ------------------------------------- |
| `NEXT_PUBLIC_API_BASE_URL` | Base URL of the AI Triage backend API |

### Running the App

```bash
# Development
npm run dev

# Production build
npm run build
npm start
```

The app will be available at `http://localhost:3000`.

## Pages Overview

| Route             | Description                                                                    |
| ----------------- | ------------------------------------------------------------------------------ |
| `/`               | Landing page with feature overview                                             |
| `/tickets`        | Dashboard with stats, ticket list, and real-time status updates                |
| `/tickets/[id]`   | Ticket detail with customer message, AI suggested response, and resolve action |
| `/create-tickets` | Form to submit a new support ticket                                            |

## Ticket Statuses

| Status       | Description                            |
| ------------ | -------------------------------------- |
| `PROCESSING` | Ticket is being analyzed by AI         |
| `READY`      | AI analysis complete, ready for review |
| `RESOLVED`   | Ticket has been resolved               |
| `FAILED`     | AI processing failed                   |

## Urgency Levels

| Level  | Description                                |
| ------ | ------------------------------------------ |
| High   | Urgent issue requiring immediate attention |
| Medium | Moderate priority issue                    |
| Low    | Low priority, non-urgent issue             |

## Deploy on Vercel

The easiest way to deploy this app is via the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme). Make sure to set the `NEXT_PUBLIC_API_BASE_URL` environment variable in your Vercel project settings.

# CLISphere - Cliente Management System

A minimalist, keyboard-first client management system inspired by Superhuman.

## Main Features

### 1. Client Management Module

-   Quick client registration via keyboard shortcuts (Cmd + N or /client)
-   Ultra-fast search with dynamic filters
-   Minimalist layout with essential client information

### 2. Smart Calendar Module

-   Interactive minimalist calendar
-   Quick appointments via shortcuts (/schedule [date])
-   AI-powered intelligent schedule suggestions
-   Integration with Google Calendar and Outlook

### 3. Message Automation Module (AI Follow-Up)

-   Intelligent inbox similar to Superhuman
-   AI-suggested follow-up responses
-   Quick commands:
    -   `/followup John 3 days` → Schedule automatic contact
    -   `/whatsapp Maria "Hi, how are you?"` → Send instant message
-   Post-consultation automated messages based on history

### 4. Sales Funnel Module

-   Ultra-light pipeline with minimalist drag & drop
-   Status updates via commands (`/move John to "Loyal Customer"`)
-   Simplified dashboard without visual clutter

### 5. AI Insights Module

-   Interactive reports without confusing tables
-   Intelligent suggestions (e.g., "This client has been inactive for 6 months. Want to send a contact?")
-   Visual indicators like line graphs and heatmaps

## Technologies Used

-   **Frontend:** Next.js with React.js, Tailwind CSS, Radix UI
-   **Backend:** Node.js + Express.js, MongoDB, Prisma ORM
-   **Integrations:** WhatsApp API (Meta Business), Google Calendar API, Claude/OpenAI API

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

## Development Phases

### Phase 1 (MVP)

-   Minimalist client registration
-   Smart calendar and intelligent notifications

### Phase 2

-   Quick command interface (/command)
-   AI for response automation

### Phase 3

-   Insights dashboard with intelligent recommendations
-   UX/UI refinement

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

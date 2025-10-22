<<<<<<< HEAD
# WebAutomation
## 🪜 Setup Instructions

1. Clone this repo
2. Run `npm install`
3. Set up Supabase and copy API keys into `.env.local`
4. Run database migrations for tables: flows, runs, issues
5. Start the app:
   ```bash
   npm run dev
   ```
6. Open http://localhost:3000

## 🧩 Technologies
- Next.js 14+
- TailwindCSS
- Framer Motion
- React Flow
- Supabase

## ✨ Features
- Drag & Drop Workflow Builder
- Gradient UI (#3b84f2 → #57d58b)
- Flow Execution Simulation
- Supabase Data Storage
- Modern Dashboard UI

## 📁 Project Structure
```
zenflow/
│
├── app/
│   ├── layout.tsx
│   ├── page.tsx                        # Dashboard (Flows)
│   ├── flows/
│   │   ├── new/page.tsx                # New Flow Builder
│   │   ├── [id]/page.tsx               # Edit Flow
│   ├── runs/page.tsx
│   ├── issues/page.tsx
│   ├── connections/page.tsx
│   ├── settings/page.tsx
│
├── components/
│   ├── Sidebar.tsx
│   ├── Topbar.tsx
│   ├── WorkflowCanvas.tsx
│   ├── NodeTrigger.tsx
│   ├── NodeAction.tsx
│
├── lib/
│   ├── supabaseClient.ts
│   ├── workflowRunner.ts
│
├── styles/
│   ├── globals.css
```

## 🪄 Extra Notes

- Make all components responsive and mobile-friendly.
- Animate modals, node connections, and button hovers.
- Keep UI identical in layout to the ZenXAI screenshot provided.
- Avoid using authentication for now — just local session.
- Ensure database connectivity with Supabase.
- Comment code clearly.

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Geist, a new font family for Vercel.

## 📚 Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## 🚢 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
=======
# WebAutomation
>>>>>>> 175d383fb2401f93b8a74ad63d355db793301931

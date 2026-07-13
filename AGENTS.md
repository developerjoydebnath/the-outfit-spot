<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project Standards

- **UI:** Always use Tailwind CSS and the existing shadcn/ui components in `@/shared/components/ui`. Avoid inline styles.
- **State & Fetching:** Use SWR for client-side fetching. Use Zustand for global state.
- **Imports:** Use absolute imports with the `@/` alias pointing to `src/`.
- **Architecture:** Keep domain-specific logic in `src/modules/<feature-name>` and generic elements in `src/shared/`.
- **Components:** Default to React Server Components. Only add `"use client"` when interactivity or React hooks are needed.
- **Forms:** Use `react-hook-form`.

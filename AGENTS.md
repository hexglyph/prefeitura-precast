# Repository Guidelines

## Project Structure & Module Organization
- `app/`: Next.js App Router routes, layouts, and pages. Prefer server components; add `"use client"` only when needed.
- `components/`: Reusable React components (PascalCase filenames).
- `lib/`: Utilities, data helpers, and configuration modules.
- `styles/`: Global styles and Tailwind layers.
- `public/`: Static assets served at the site root.
- Root config: `next.config.mjs`, `tsconfig.json`, `postcss.config.mjs`, `components.json`.

## Build, Test, and Development Commands
- `pnpm install`: Install dependencies (pnpm is recommended; lockfile present).
- `pnpm dev`: Run the local dev server at `http://localhost:3000`.
- `pnpm build`: Production build with Next.js.
- `pnpm start`: Start the production server (after `pnpm build`).
- `pnpm lint`: Run ESLint checks (`next lint`).

## Coding Style & Naming Conventions
- **Language**: TypeScript. **Indentation**: 2 spaces.
- **Components**: PascalCase (`UserCard.tsx`), hooks start with `use*` (`useFeature.ts`).
- **Files**: kebab-case for non-components (`user-service.ts`). Route files follow Next patterns (`app/*/page.tsx`).
- **Styling**: Tailwind CSS (utility-first). Prefer composition with `clsx` and `tailwind-merge`.
- **Imports**: Absolute or relative per tsconfig; keep paths short and local.

## Testing Guidelines
- No test framework is configured yet. If adding tests, prefer Vitest + React Testing Library.
- **Location**: co-locate as `*.test.tsx|ts` or in `__tests__/` mirroring source.
- **Coverage**: Prioritize critical paths (routing, forms, API calls). Add a `test` script in `package.json` when introduced.

## Commit & Pull Request Guidelines
- History does not show a convention yet. Adopt Conventional Commits for clarity:
  - Example: `feat(app): add dashboard charts` or `fix(components): handle empty data state`.
- **PRs must include**:
  - Clear description and rationale; link issues (e.g., `Closes #123`).
  - Screenshots or recordings for UI changes.
  - Checklist: `pnpm lint` passes, builds locally, no console errors.

## Security & Configuration Tips
- Use `.env.local` for secrets; never commit env files. Likely keys: `OPENAI_API_KEY`, analytics tokens.
- Configure environment variables in Vercel for deployments.
- Avoid hardcoding URLs/keys; read from `process.env.*` and validate in `lib/`.


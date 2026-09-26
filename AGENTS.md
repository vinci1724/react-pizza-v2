# AGENTS.md

Work-in-progress learning project: React 19 + TypeScript + Vite, Redux Toolkit, React Router v8, SCSS. UI text and most code comments are Russian — match that.

## Commands

- `npm run dev` — Vite dev server
- `npm run build` — `tsc -b && vite build`. **Currently fails**: many components have untyped props (implicit `any`). This is pre-existing WIP, not a regression from your change. Use `npx tsc -b` to see the list.
- `npx eslint src` — lint only the app. **Do not run `npm run lint`** as a check: it is `eslint .` and traverses `info/react-pizza-html/` (the reference HTML template), emitting ~150 `no-undef` errors.
- `npm run lint:fix` — same scope caveat.

There is no test runner or typecheck script beyond `tsc -b`.

## Architecture

- Entry: `src/main.tsx` → `BrowserRouter` > Redux `Provider` > `App`.
- Routes in `src/App.tsx` (`/`, `/cart`, `*`).
- State is split while being migrated: `src/redux/store.ts` + `slices/filterSlice.ts` (only `category` so far), while `Home.tsx` still keeps pizzas/sort/page in local `useState`. Search lives in `src/context/SearchContext.ts`.
- `src/pages/Home.tsx` fetches from a hardcoded mockapi.io URL in a `useEffect`; skeletons come from `PizzaBlock/Skeleton.tsx`.
- `src/components/*` use BEM global class names; only `Search`, `Pagination`, and `NotFoundBlock` use CSS Modules (`.module.scss`).

## Conventions / gotchas

- ESLint is `@antfu/eslint-config` with `semi: true`, braceStyle `1tbs`, single quotes.
- React 19: read context with `use(Context)` (see `src/components/Search/index.tsx:7`), not `useContext`.
- React Compiler is enabled via `@rolldown/plugin-babel` in `vite.config.ts`; avoid manual memoization patterns it handles.
- Import routing from `react-router`, not `react-router-dom`.
- `react-paginate` needs a default-export interop shim: `ReactPaginateExport.default` (`src/components/Pagination/index.tsx:1`).
- `info/react-pizza-html/` is the original static EJS/SCSS template the styles were ported from. It is reference only; do not modify or lint it.

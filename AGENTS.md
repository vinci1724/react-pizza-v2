# AGENTS.md

Work-in-progress learning project: React 19 + TypeScript + Vite, Redux Toolkit, React Router v8, SCSS. UI text and most code comments are Russian — match that.

## Commands

- `npm run dev` — Vite dev server
- `npm run build` — `tsc -b && vite build`. **Currently fails** (`tsc -b` exits 2): many components have untyped props (implicit `any`) and untyped `useSelector(state => ...)` so `state` is `unknown`. This is pre-existing WIP, not a regression from your change. Use `npx tsc -b` to see the list.
- `npx eslint src` — lint only the app. **Do not run `npm run lint`** as a check: it is `eslint .` and traverses `info/react-pizza-html/` (the reference HTML template), emitting ~155 errors (`no-undef`) vs. 1 real error + 2 warnings in `src`.
- `npm run lint:fix` — same scope caveat.

Lint/typecheck are not clean: `src/components/Sort.tsx:48` has a pre-existing unused `i`, plus array-index-key warnings in `Categories.tsx`/`Home.tsx`. Fix only issues you introduce. There is no test runner or typecheck script beyond `tsc -b`.

## Architecture

- Entry: `src/main.tsx` → `BrowserRouter` > Redux `Provider` > `App`.
- Routes in `src/App.tsx` (`/`, `/cart`, `*`).
- State is split while being migrated: `src/redux/store.ts` + `slices/filterSlice.ts` holds `categoryId` and `sort`; `Home.tsx` still keeps pizzas/currentPage/isLoading in local `useState`. Search lives in `src/context/SearchContext.ts` (React context, not Redux).
- `RootState`/`AppDispatch` are exported from `src/redux/store.ts` but `useSelector`/`useDispatch` are so far called untyped — this is the source of the `state is unknown` build errors.
- `src/pages/Home.tsx` fetches from a hardcoded mockapi.io URL in a `useEffect`; skeletons come from `PizzaBlock/Skeleton.tsx`.
- `src/components/*` use BEM global class names; only `Search`, `Pagination`, and `NotFoundBlock` use CSS Modules (`.module.scss`).

## Conventions / gotchas

- ESLint is `@antfu/eslint-config` with `semi: true`, braceStyle `1tbs`, single quotes. Zed formats via ESLint `--fix` on save (`.zed/settings.json`).
- React 19: read context with `use(Context)` (see `src/components/Search/index.tsx:7`), not `useContext`; provide it as `<SearchContext value={...}>` (no `.Provider`, see `src/App.tsx:16`).
- `tsconfig.app.json` sets `verbatimModuleSyntax` (use `import type` for type-only imports) and `erasableSyntaxOnly` (no TS `enum`, `namespace`, or constructor parameter properties).
- React Compiler is enabled via `@rolldown/plugin-babel` in `vite.config.ts`; avoid manual memoization patterns it handles.
- Import routing from `react-router`, not `react-router-dom`.
- `react-paginate` needs a default-export interop shim: `ReactPaginateExport.default` (`src/components/Pagination/index.tsx:1`).
- `info/react-pizza-html/` is the original static EJS/SCSS template the styles were ported from. It is reference only; do not modify or lint it.

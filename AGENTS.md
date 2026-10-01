# AGENTS.md

Work-in-progress learning project: React 19 + TypeScript + Vite 8, Redux Toolkit, React Router v8, SCSS. UI text and most code comments are Russian — match that.

## Commands

- `npm run dev` — Vite dev server.
- `npm run build` — `tsc -b && vite build`. **Currently fails** (`tsc -b` exits 2) with exactly 3 pre-existing errors — not caused by your change:
  - `src/redux/store.ts:21` — preloaded `filter` object omits `searchValue`, required by `FilterState` (also a real bug: URL reload never restores search).
  - `src/components/Pagination/index.tsx:5` — the `ReactPaginateExport.default` interop shim doesn't typecheck (`.default` missing on the component).
  - `src/components/Pagination/index.tsx:19` — `event` implicitly `any`.
- `npx eslint src` / `npm run lint` — both fine now. `eslint.config.mjs` ignores `info/`, so `eslint .` is safe. Currently 0 errors + 3 pre-existing `react-hooks/exhaustive-deps` warnings (`Search`, `FullPizza`, `Home`).
- No test runner or typecheck script beyond `tsc -b`.

## Architecture

- Entry: `src/main.tsx` → `BrowserRouter` > Redux `Provider` > `App`. All routes are nested under `src/layouts/MainLayout.tsx` (Header + `<Outlet/>`): `/`, `/cart`, `/pizza/:id`, `*`.
- Redux store has three slices: `filter` (`searchValue`, `categoryId`, `currentPage`, `sort`), `cart` (`items`, `totalPrice`), `pizza` (`items`, `status` + `fetchPizzas` `createAsyncThunk`). Home/Cart render from these — no local pizza state anymore.
- **URL query is the source of truth for filters.** `store.ts` preloads `state.filter` synchronously from `window.location.search` via `qs` before first render; `Home.tsx` writes filter changes back with `navigate('?${qs.stringify({ sortBy, categoryId, currentPage })}')`, skipping the initial render via `isMountedRef`. Preserve this round-trip when touching filters.
- `src/context/SearchContext.ts` is now **dead** (all usages commented out); search lives in `filterSlice.searchValue`, debounced in `Search` with lodash.
- `RootState`/`AppDispatch` are exported from `src/redux/store.ts`; `useSelector` is typed with `RootState` in Home/Cart/Sort/Header. `useDispatch()` is still untyped in Search/Sort/Cart/CartItem.
- API is a hardcoded mockapi.io URL in `redux/slices/pizzaSlice.ts` and `pages/FullPizza.tsx`.
- `src/components/*` use BEM global class names; only `Search`, `Pagination`, `NotFoundBlock` use `.module.scss`.

## Conventions / gotchas

- `tsconfig.app.json` sets `verbatimModuleSyntax` (use `import type` for type-only imports), `erasableSyntaxOnly` (no TS `enum`, `namespace`, or constructor parameter properties), and `noUnusedLocals`/`noUnusedParameters`.
- ESLint is `@antfu/eslint-config` with `semi: true`, `braceStyle: 1tbs`, single quotes; `antfu/top-level-function` is off. Zed runs ESLint `--fix` on save (`.zed/settings.json`).
- React Compiler is enabled via `@rolldown/plugin-babel` + `reactCompilerPreset()` in `vite.config.ts`; avoid manual memoization it handles (the existing `useCallback(debounce(...))` in `Search` triggers a warning).
- Import routing from `react-router`, not `react-router-dom`. React 19 is in use, but `use(Context)` is moot here since `SearchContext` is unused.
- `info/react-pizza-html/` is the original static EJS/SCSS template the styles were ported from. Reference only: do not modify; it is already eslint-ignored.

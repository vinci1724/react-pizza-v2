# AGENTS.md

Work-in-progress learning project: React 19 + TypeScript + Vite 8, Redux Toolkit, React Router v8, SCSS. UI text and most code comments are Russian — match that. No README, no tests, no CI.

## Commands

- `npm run dev` — Vite dev server.
- `npm run build` — just `vite build`; succeeds (type-checking is *not* part of the build).
- `npm run typecheck` — `tsc --build --noEmit`; currently passes with 0 errors.
- `npm run lint` / `npx eslint src` — `eslint .`, 0 errors. Currently 4 pre-existing `react/exhaustive-deps` warnings (not the usual `react-hooks/*` name): `Search/index.tsx:31`, `FullPizza.tsx:24`, `Home.tsx:52`, `Home.tsx:82`. `eslint.config.mjs` ignores `info/`, so `eslint .` is safe. `npm run lint:fix` exists.
- No test runner exists. Do not assume one.

## Architecture

- Entry: `main.tsx` → `BrowserRouter` > Redux `Provider` > `App`. Routes nest under `layouts/MainLayout.tsx` (Header + `<Outlet/>`): `/`, `/cart`, `/pizza/:id`, `*`. Cart is `lazy()` + `Suspense` in `App.tsx`.
- Three slices: `filter` (`searchValue`, `categoryId`, `currentPage`, `sort`), `cart` (`items`, `totalPrice`), `pizza` (`items`, `status` + `fetchPizzas` `createAsyncThunk`). Components render from these selectors; no local pizza list state.
- **URL query is the source of truth for filters.** `store.ts` preloads `state.filter` synchronously from `window.location.search` via `qs` before first render (note: `searchValue` is forced to `''`). `Home.tsx` writes changes back with `navigate('?${qs.stringify({ sortBy, categoryId, currentPage })}')`, skipping the initial render via `isMountedRef`. `searchValue` is deliberately *not* in the URL. Preserve this round-trip when touching filters.
- Cart persists to `localStorage` under key `cart`: written in `Header.tsx`'s `useEffect` (skips first render via `isMountedRef`), read in `cartSlice.ts` via `utils/getCartFromLS.ts`.
- Known current bug: `cartSlice` calls `calcTotalPrice(state.items);` but discards the return value — `totalPrice` is never recalculated on add/plus/minus/remove/clear, so the Header sum is stale until reload. The reducer must assign it.
- `context/SearchContext.ts` is **dead** (all usages commented out); search lives in `filterSlice.searchValue`, debounced in `Search` with lodash.
- `RootState`/`AppDispatch` exported from `redux/store.ts`. `Home` uses typed `useDispatch<AppDispatch>()`; Search/Sort/Cart/CartItem/PizzaBlock still use untyped `useDispatch()`.
- Copy-pasted hardcoded mockapi.io API URL in `redux/slices/pizzaSlice.ts` and `pages/FullPizza.tsx`.
- `components/*` use BEM global class names; only `Search`, `Pagination`, `NotFoundBlock` use `.module.scss`.

## Conventions / gotchas

- `tsconfig.app.json` sets `verbatimModuleSyntax` (use `import type` for type-only imports), `erasableSyntaxOnly` (no TS `enum`/`namespace`/constructor param properties — see the const-object `Status` workaround in `pizzaSlice.ts`), plus `noUnusedLocals`/`noUnusedParameters`.
- ESLint is `@antfu/eslint-config` with `semi: true`, `braceStyle: 1tbs`, single quotes; `antfu/top-level-function` is off. Zed runs ESLint `--fix` via `code_actions_on_format` (`.zed/settings.json`).
- React Compiler is enabled via `@rolldown/plugin-babel` + `reactCompilerPreset()` in `vite.config.ts`; manual `memo`/`useMemo`/`useCallback` is redundant (existing ones in `Categories`/`Home`/`Search` are leftovers, and `Search`'s `useCallback(debounce(...))` triggers a warning).
- Import routing from `react-router`, not `react-router-dom`.
- `info/react-pizza-html/` is the original static EJS/SCSS template the styles were ported from. Reference only: do not modify; it is eslint-ignored.

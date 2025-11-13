
# AI Prompts Log

This file documents the prompts used with AI assistance during development of this project (YumeFind). The candidate used an AI assistant to implement UI and behavior changes across the app. Recording prompts helps reviewers understand the problem-solving steps and which parts of the codebase each prompt influenced.

AI tool used
- ChatGPT (interactive assistant) — used to suggest and apply code changes, create components, and make UI improvements.

How to read this file
- Each entry contains: the prompt text, a short description of what the prompt was asking for, and which files were created/updated as a result.

---
## Project Initialization

I give overview of the task to ChatGPT. 

Purpose: to get the idea/plan how should i build this project.

---

## Encounter error where the http://localhost:4000 doest not display anything

Prompt: 
> i already run npm run dev, when i clicked http://localhost:4000, the page display nothing.

Purpose: to find is there any possbile error that make the local host display nothing

Solution: The blank page comes from the dev server failing to compile because the Node.js version on your machine is just slightly too old. Vite 7.2.2 requires Node 20.19.0 or newer (or 22.12+), but you’re running 20.18.0, so the build never finishes and the browser only shows a blank page. -- so install newer version of Node.js

---

## Add Anime Filter Functionality

Prompt:
> i want to add anime search where user can filter based on what usually anime website have in their filter function.

Purpose: to add filter functionality

Files created/changed: 
- `src/type/anime.ts`
- `src/service/api.ts`
- `src/store/slice/serachSlice.ts`
- `src/component/SearchBar.tsx`
- `src/component/Pagination.tsx`
- `src/pages/SearchPage.tsx`
- `src/component/FiltersPanel.tsx`

---

## Fix DetailPage theme & layout

Prompt:
> the detailpage background does not apply the same as searchpage. and on the details page, place the anime picture at the top instead of on the side. and make the theme, color, ui same as searchpage

Purpose: align `DetailPage` visual theme with the rest of the app and move the anime image to the top (stacked layout).

Files changed:
- `src/pages/DetailPage.tsx` — replaced light gradient backgrounds, moved image to top, changed card background to `bg-gray-800`, adjusted text/badge colors.

---

## Make DetailPage more beautiful / improve back button

Prompt (verbatim):
> detail page can you make it more beautiful and intuitive? for example the anime title, instead of just text, make it like it inside a box or something. same goes for any other details of the anime.

Also in detailpage the back to search button please make it more intuitive instead of just text

Purpose: improve UI/UX of `DetailPage` — make title prominent, group details into boxes/pills, replace plain back link with a button.

Files changed:
- `src/pages/DetailPage.tsx` — added gradient title box, metric cards, styled back button.

---

## Add subtle animations & expandable synopsis

Prompt (verbatim):
> Add subtle animations (hover lift on cards) or an expandable synopsis for very long descriptions.

Purpose: add subtle hover animations to meta cards and badges; implement an expandable/collapsible synopsis with a Read more / Show less toggle.

Files changed:
- `src/pages/DetailPage.tsx` — added hover transform/transition classes (hover:-translate-y-1, hover:shadow-lg) to cards and badges; added local state `synopsisExpanded`, truncation constant, and toggle button.

---

##  Debugging: page shows nothing

Prompt (verbatim):
> now the detail anime page shows nothing

Purpose: report an issue after earlier edits. This triggered an inspection of the current file contents and quick checks for syntax/typing errors.

Files inspected:
- `src/pages/DetailPage.tsx` (confirmed no TypeScript or syntax errors). Edits were iterated until the page rendered again.

---

## Add floating navigation (glass effect) that shows/hides on scroll

Prompt (verbatim):
> i want to add floating navigation bar with glass effect that shows/hides on scroll with smooth animations that consist of the name of the website which is YumeFind and search logo. when user click the search logo, it will auto scroll the serachbar. it is not nessary navigation bar, more like i want to add something at the top. you can look at this code as reference: (reference code provided)

Purpose: add a small floating glass-like top bar with the site name and search icon; clicking icon scrolls to the search bar.

Files created/changed:
- `src/components/TopNav.tsx` — new floating nav component implementing show/hide on scroll and click-to-scroll behavior.
- `src/App.tsx` — render `<TopNav />` at the application root so it appears across pages.
- `src/components/SearchBar.tsx` — added `id="search-bar"` to the SearchBar container so the TopNav can target it.

---

## Add indicator when search bar is in view

Prompt (verbatim):
> Add an indicator/animation when the SearchBar is already in view.

Purpose: show a pulsing indicator on the TopNav search button when the search bar is visible in the viewport.

Files changed:
- `src/components/TopNav.tsx` — added IntersectionObserver to detect `#search-bar` intersection and show a pulsing indicator dot (Tailwind `animate-pulse`).

---



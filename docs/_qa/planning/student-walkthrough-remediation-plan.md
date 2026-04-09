---
schema: qa/v1
qaType: remediation-plan
targetId: student-walkthrough-2026-04-08
status: review_requested
createdAt: 2026-04-08T00:00:00Z
outcome: pending
supersedes: null
---

# Student Walkthrough Remediation Plan

## Context

A full student-perspective walkthrough of the live site (localhost:3000) was performed on 2026-04-08. The review covered the home page, tour step pages (`/tour/signal/`), the browse page, the examples page, the modules index, and a module detail page (`/modules/web-presence-framework/`).

The pedagogical design, 6-step tour scaffolding, prompt structure, and exemplar system are strong. The issues below are primarily layout, UX, and information-design problems that undermine the polish of otherwise well-structured pages.

Each issue below includes the editorial rationale (the *why* for students) and a specific technical solution (the *how* in code).

---

## Issue 1 — Header layout breaks when "Resume" pill is present

**Severity:** P0 — Critical. Visually broken on every non-home, non-tour page once a tour step is visited.

### What happens

In `site-header.tsx`, the resume pill is rendered in two places:

- **Mobile** (`< md`): inside the left flex column below the caption, with class `action-primary mt-4 inline-flex md:hidden`.
- **Desktop** (`lg+`): inside the right flex column alongside the Menu button, with class `action-primary hidden lg:inline-flex`.

The label is built from the full tour-step title: `Resume ${lastTourPage.title}` — for example, `"Resume Figure out who it is for"`. This string has no max-width constraint. The right column uses `shrink-0`, so it refuses to shrink. On mobile, the left column wraps the long pill below the already-wrapping site title, inflating the header to ~50% of the viewport. On tablet (`md`–`lg`), neither pill is visible, leaving a dead zone.

The `familyLandingPaths` guard (lines 17–22, 40) correctly hides the header pill on landing pages where `JourneyResumeBand` already shows, but every other page (modules, lessons, recipes, deliverables) gets the broken layout.

### Editorial rationale

The resume pill is valuable — it's the fastest way back to the build path. But if it makes the header unusable, students lose trust in the site. The pill should act like a quiet bookmark, not a billboard.

### Technical solution

**File:** `components/site-header.tsx`

1. **Truncate the label.** Replace `Resume ${lastTourPage.title}` with a short fixed string — `"Resume tour"` — or at most a truncated variant: `Resume ${title.length > 20 ? title.slice(0, 18) + '…' : title}`. The full title is already visible on the destination page; the pill only needs to signal "go back to your place."

2. **Add `max-w` and `truncate` to the pill.** On both mobile and desktop renderings, add `max-w-[14rem] truncate` so the pill never exceeds a predictable width regardless of future step titles.

3. **Show the pill at `md` breakpoint too.** Currently the pill hides between `md` and `lg` because the mobile version uses `md:hidden` and the desktop version uses `hidden lg:inline-flex`. Change the desktop pill to `hidden md:inline-flex` so there's no dead zone. Or move the pill entirely into the nav row (the `div` with `mt-4 hidden md:flex`) to sit alongside `SiteHeaderNav`.

4. **Compact-state handling.** When `isCompact` is true (scrolled > 48px), the eyebrow and caption collapse. The pill should also shrink: consider hiding the text and showing only a small icon-button (e.g., a ← arrow) in compact mode, or moving it to the nav row.

**Change sketch:**

```tsx
// In the resumeAction memo, shorten the label:
return {
  href: lastTourPage.path,
  label: "Resume tour",
};

// On the mobile pill, add max-width + truncate:
<Link href={resumeAction.href}
  className="action-primary mt-4 inline-flex max-w-[14rem] truncate md:hidden">
  {resumeAction.label}
</Link>

// On the desktop pill, widen breakpoint from lg to md:
<Link href={resumeAction.href}
  className="action-primary hidden max-w-[14rem] truncate md:inline-flex">
  {resumeAction.label}
</Link>
```

**Verification:** Test at 375px, 768px, 1024px with `lastTourPage.title` set to the longest step name ("Add proof people can trust"). Confirm the header never exceeds ~80px height.

---

## Issue 2 — "My brief" FAB overlaps body text

**Severity:** P1 — High. Obscures the final visible content line on every page.

### What happens

In `brief-fab.tsx`, the button is positioned `fixed bottom-6 right-6 z-40`. It's 3.5rem (56px) tall with horizontal padding, sitting in a pill shape. Since the page content in `page-shell.tsx` uses `pb-20` (5rem = 80px) on the outer container, there's some bottom padding — but it's not enough on short-viewport or heavily-scrolled pages where the last paragraph sits right at the bottom edge of the visible area.

The FAB is `z-40`, the same as the sticky header. It floats freely over all content with no safe-area offset on the content side.

### Editorial rationale

The brief FAB is a core companion tool — it should be ever-present but never in the way. A student reading the last paragraph of a prompt section shouldn't have to tilt their head to read around a floating button.

### Technical solution

**Files:** `components/page-shell.tsx`, `components/brief-fab.tsx`

1. **Increase bottom padding on the page container.** In `page-shell.tsx`, change `pb-20` to `pb-28` (7rem = 112px). This gives 56px of clear space below the last content element — exactly the FAB height plus `bottom-6` (24px) offset.

2. **Add `scroll-padding-bottom` to the root.** In the same `page-shell.tsx` outer div, add `scroll-pb-28` so anchor-link scrolling accounts for the FAB.

3. **Auto-collapse on mobile (optional enhancement).** In `brief-fab.tsx`, after 4 seconds of inactivity post-scroll, collapse the pill to show only the icon (hide the "My brief" text span). Expand on hover/tap. This halves the footprint on narrow screens. This is a nice-to-have; the padding fix alone solves the overlap.

**Change sketch:**

```tsx
// page-shell.tsx — increase bottom padding
<div className={`mx-auto flex w-full ${maxWidthClassName} flex-col gap-8 px-5 pb-28 pt-8 sm:px-8 md:px-10 lg:px-12`}>
```

**Verification:** Scroll to the absolute bottom of every page. Confirm the last line of text is fully readable above the FAB at 375px viewport.

---

## Issue 3 — No persistent progress indicator on tour pages

**Severity:** P2 — Medium. Students lose their bearings in the 6-step path while scrolling.

### What happens

In `guided-step-shell.tsx`, the progress label (`Step 1 of 6`) is rendered inside a `TonePanel` in the hero's right column — specifically inside a `synthesis`-toned panel alongside "Before you start" and "Leave with" cards. On mobile, this panel appears below the hero text. Once the student scrolls past the hero, the step number is gone.

The mobile `GuidedStepCompanion` (rendered via `<div className="xl:hidden">`) shows a "Keep your place" section with an "Open tour helper" button, but no inline step indicator. On desktop (xl+), the companion becomes a sticky sidebar at `top-44`, but even there it defaults to the brief tab, not the path tab.

### Editorial rationale

The tour is the backbone of the student experience. A student should always know "I'm on step 3 of 6" the way a book reader sees page numbers. This ambient awareness reduces anxiety and helps students pace themselves.

### Technical solution

**File:** `components/guided-step-shell.tsx`

Add a slim step-progress strip between the `<PageShell>` header and the hero `EditorialBand`. This strip is a new inline component — 6 segments (dots or short bars) with the current step highlighted.

1. **Create the strip directly inside `GuidedStepShell`.** No new component file needed — it's a simple `<nav>` with 6 links.

2. **Make it sticky on mobile.** Use `sticky top-[4.5rem] z-30` so it pins below the header.

**Change sketch:**

```tsx
// At the top of GuidedStepShell's return, before EditorialBand:
<nav aria-label="Tour progress" className="sticky top-[4.5rem] z-30 -mx-5 flex items-center justify-center gap-2 bg-(--page-reading)/90 px-5 py-3 backdrop-blur sm:-mx-8 md:-mx-10 lg:-mx-12">
  {guidedTourSteps.map((step, index) => {
    const isCurrent = step.id === currentStepId;
    const stepNumber = index + 1;
    return (
      <Link
        key={step.id}
        href={step.href}
        aria-label={`Step ${stepNumber}: ${step.publicLabel}`}
        aria-current={isCurrent ? "step" : undefined}
        className={`flex h-8 items-center gap-1.5 rounded-full px-3 text-sm font-semibold transition ${
          isCurrent
            ? "bg-(--accent-strong) text-white"
            : "text-(--ink-body) hover:bg-(--surface-reading)"
        }`}
      >
        <span>{stepNumber}</span>
        <span className="hidden sm:inline">{step.publicLabel}</span>
      </Link>
    );
  })}
</nav>
```

On very narrow screens, hide the labels (only show numbers) to keep the strip compact. On `sm+`, show the short label.

**Verification:** On a 375px screen, the strip should fit all 6 numbered circles in one row and pin beneath the header on scroll. Tapping a circle navigates to that step.

---

## Issue 4 — "Open tour helper" button label is vague

**Severity:** P3 — Low. Minor wording improvement.

### What happens

In `guided-step-companion.tsx`, the mobile-mode render includes:

```tsx
<button type="button" onClick={() => setIsSheetOpen(true)} className="action-primary">
  Open tour helper
</button>
<p className="type-annotation text-(--ink-body)">
  {showBriefTab ? "Inside: My brief and 6-step path." : "See the 6-step path."}
</p>
```

The adjacent text explains what's inside, but the button itself says "Open tour helper," which means nothing to a first-time student. "Helper" is system jargon.

### Editorial rationale

Every button label should be a mini-instruction. A student scanning the page should know what they'll get from a single label without reading surrounding prose.

### Technical solution

**File:** `components/guided-step-companion.tsx`

Change the button label from `"Open tour helper"` to `"See all 6 steps"` (when `showBriefTab` is false) or `"See your brief & progress"` (when `showBriefTab` is true).

Also update the sheet header from `"Tour helper"` to `"Your tour progress"`.

**Change sketch:**

```tsx
// Mobile mode button:
<button type="button" onClick={() => setIsSheetOpen(true)} className="action-primary">
  {showBriefTab ? "See your brief & progress" : "See all 6 steps"}
</button>

// Sheet header eyebrow:
<p className="type-meta text-(--accent-strong)">Your tour progress</p>
```

**Verification:** Read the button label in isolation. A new student should understand the destination.

---

## Issue 5 — All six modules show "Active" status with no differentiation

**Severity:** P2 — Medium. The badge adds visual noise without conveying useful information.

### What happens

In `module-index-card.tsx`, the status badge renders `statusLabel[module.status]`, which maps `"active"` → `"Active"`, `"preview"` → `"Preview"`, `"coming"` → `"Coming soon"`. The `ModuleStatus` type in `lib/module-content/types.ts` defines three states: `"active" | "preview" | "coming"`.

Currently all six modules have `status: "active"`, producing six identical "Active" badges. The badge serves no purpose since it doesn't differentiate anything.

### Editorial rationale

Badges should earn their place. If every card says "Active," students learn to ignore badges entirely, which makes them useless later when a module truly is in preview or coming soon.

### Technical solution

**File:** `components/module-index-card.tsx`

**Option A — Hide when all active (recommended for now):** Suppress the badge when `module.status === "active"`. Only show it for `"preview"` and `"coming"` states, where it provides real signal.

```tsx
{module.status !== "active" && (
  <span className="inline-flex rounded-full border border-(--border-strong) px-2.5 py-0.5 type-meta text-(--ink-body)">
    {statusLabel[module.status]}
  </span>
)}
```

**Option B — Student progress badges (future enhancement):** If journey-state tracking reaches module level, replace the publish-status badge with a student-progress badge: "Not started" / "In progress" / "Complete". This would require extending the `useSiteJourney()` hook with module completion state — a larger change that belongs in a future sprint.

**Verification:** Confirm the badge disappears on all six "active" modules but still renders for any module with `"preview"` or `"coming"` status. Test with at least one module set to `"coming"` in the content data.

---

## Issue 6 — "Continue where you left off" card hijacks page entry

**Severity:** P1 — Medium-high. First screen of browse and examples is consumed by a resume prompt instead of the page's own content.

### What happens

In `page-shell.tsx`, the render order is:

```tsx
<SiteHeader />            {/* sticky top-3 z-40 */}
<JourneyResumeBand />     {/* full-width card, NOT sticky */}
<main>{children}</main>
```

`JourneyResumeBand` renders on the 5 paths defined in its own `familyLandingPaths` set: `/`, `/tour`, `/browse`, `/examples`, `/instructor-guide`. The band is a full `panel-shell panel-emphasis` card with a heading ("Continue where you left off"), a paragraph, a primary action button, and up to 3 recent-page pills. On mobile this easily fills the entire viewport below the header.

A student who clicks "Examples" in the nav lands on `/examples/` and sees the resume card — not the examples. They have to scroll or tap × to dismiss.

### Editorial rationale

Every page should lead with its own identity. The resume card is a *convenience*, not the *purpose* of the page. Students who navigated intentionally to browse or examples came for that content, not a detour.

### Technical solution

**File:** `components/page-shell.tsx` (render order) and `components/journey-resume-band.tsx` (size/presentation)

Two complementary changes:

**A. Render the band *after* the page hero, not before `<main>`.** Move `<JourneyResumeBand />` from its current position (between header and main) into the main content flow, after the first editorial band. Since the page hero is the first child of `<main>`, this means placing the band after `children[0]` is impractical without rearchitecting. Instead:

**B. (Preferred) Collapse the band into a compact inline strip.** Replace the large card with a single-line banner:

```
[← Resume: Figure out who it is for]    [Modules]  [Examples]  [Signal step]    [×]
```

This gives the same resume + recent-links functionality in ~48px of height instead of ~300px.

**Implementation in `journey-resume-band.tsx`:**

- Replace the current `panel-shell panel-emphasis` card layout with a slim horizontal bar:
  ```tsx
  <section data-resume-band className="flex items-center gap-3 rounded-full border border-(--border-neutral) bg-(--surface-reading) px-4 py-2.5 shadow-sm">
    <Link href={resumeHref} className="action-primary text-sm">
      Resume tour
    </Link>
    <span className="h-4 w-px bg-(--border-neutral)" />
    {recentLinks.map(link => (
      <Link key={link.path} href={link.path} className="type-annotation text-(--ink-body) hover:underline">
        {link.title}
      </Link>
    ))}
    <button onClick={dismiss} aria-label="Dismiss" className="ml-auto">×</button>
  </section>
  ```

- Keep the dismiss (×) button. Already exists in the current component.

- After dismissal, store a flag in the journey state so the band stays hidden for the session.

**Verification:** Land on `/examples/` with tour history in state. Confirm the page hero ("Examples") is visible without scrolling. The resume strip should be visible but compact above it.

---

## Issue 7 — No breadcrumbs or top-of-page "back" affordance

**Severity:** P3 — Low. Students who arrive via shared links have limited orientation.

### What happens

`module-shell.tsx` renders a `<nav aria-label="Module navigation">` at the bottom with `← All modules` and a next-module link. There is nothing at the top.

`lesson-shell.tsx` has no navigation at all — it's a pure content grid with an optional `LocalNav` sidebar for in-page section links.

### Editorial rationale

A student who bookmarks a lesson URL or follows a link from a classmate lands in the middle of the site with no context. A single breadcrumb line at the top costs almost nothing and immediately orients them: *Modules > Web Presence Framework > Lesson 2*.

### Technical solution

**File:** `components/module-shell.tsx`, `components/lesson-shell.tsx`

Add a breadcrumb `<nav>` as the first element inside the component return. Use a simple inline approach (no new component needed for now):

**In `module-shell.tsx`:**

```tsx
<nav aria-label="Breadcrumb" className="type-caption text-(--ink-body)">
  <Link href="/modules" className="underline underline-offset-4 hover:text-(--accent-strong)">
    Modules
  </Link>
  <span className="mx-1.5">›</span>
  <span className="text-(--ink-strong)">{module.title}</span>
</nav>
```

**In `lesson-shell.tsx`:** Accept `breadcrumb` as an optional prop (a `ReactNode`) and render it above the content grid. The parent page (e.g., `app/modules/[slug]/[lesson]/page.tsx`) passes the breadcrumb:

```tsx
<LessonShell breadcrumb={
  <nav aria-label="Breadcrumb" className="type-caption text-(--ink-body)">
    <Link href="/modules">Modules</Link>
    <span className="mx-1.5">›</span>
    <Link href={`/modules/${module.slug}`}>{module.title}</Link>
    <span className="mx-1.5">›</span>
    <span className="text-(--ink-strong)">{lesson.title}</span>
  </nav>
}>
```

**Verification:** Navigate directly to a lesson URL. Confirm the breadcrumb renders above the content and each segment links correctly.

---

## Issue 8 — Tour step pages have high text density with no collapsibility

**Severity:** P3 — Low. Cognitive overload for anxious or first-time students.

### What happens

The tour signal page (`app/tour/signal/page.tsx`) composes these sections as direct children of `<GuidedStepShell>`:

1. **"One real person"** — primary prompts (portfolio + museum tabs) — *always needed*
2. **"Read it back"** — peer-check questions — *secondary*
3. **`<CalloutBand>` — "Why this matters"** — *explanatory*
4. **`<TonePanel>` — "Go deeper"** — *navigation to module*

Additionally, `GuidedStepShell` itself injects:
5. **`misconception` → "Avoid" panel** — via the `tone="warning"` TonePanel
6. **`formativeCheck` → "Quick check" panel** — via the `tone="next"` TonePanel

That's 6 distinct content zones on a single page that's supposed to be one step in a quick guided tour.

### Editorial rationale

The primary prompts (section 1) are the *action* — this is what students came to do. Everything else is supporting context. For a confident student, the page should feel fast: do the prompts, hit next. For an uncertain student, the extra sections should be *available* but not *mandatory* to scroll through. Progressive disclosure matches both needs.

### Technical solution

**Files:** `app/tour/signal/page.tsx` (and same pattern for other tour step pages), `components/guided-step-shell.tsx`

**A. Wrap secondary sections in `<details>` elements.** No new component needed — HTML `<details>` with styled `<summary>` provides native collapsible sections with accessibility built in.

In the tour step page, wrap sections 2–4 (Read it back, Why this matters, Go deeper):

```tsx
<details className="group">
  <summary className="flex cursor-pointer items-center gap-2 type-meta text-(--accent-strong) marker:content-none">
    <span className="transition group-open:rotate-90">›</span>
    Read it back
  </summary>
  <div className="mt-4">
    {/* existing ContentGrid with TonePanel cards */}
  </div>
</details>
```

**B. Keep "Avoid" and "Quick check" visible but compact.** These are already rendered by `GuidedStepShell` via the `misconception` and `formativeCheck` props. They're short. Leave them open but visually deemphasized (they already use `tone="warning"` and `tone="next"` which are distinct).

**C. Default state.** On first load, secondary sections are closed. Students who want them can expand. On desktop (xl+), where the content column is alongside the sticky companion sidebar, consider defaulting them open since there's more screen real estate.

**Verification:** On a 375px screen, the tour step page should show the hero, prompts, and a next button without requiring 4+ full swipes of scrolling. Secondary sections should be reachable by tapping their summary labels.

---

## Priority Order

| Priority | Issue | Effort | Files |
|----------|-------|--------|-------|
| P0 | 1. Header layout break with resume pill | Small | `site-header.tsx` |
| P1 | 2. FAB overlapping body text | Trivial | `page-shell.tsx` |
| P1 | 6. Resume card hijacking page entry | Medium | `journey-resume-band.tsx` |
| P2 | 3. Progress indicator on tour pages | Medium | `guided-step-shell.tsx` |
| P2 | 5. Module "Active" badge noise | Trivial | `module-index-card.tsx` |
| P3 | 4. Vague "Open tour helper" label | Trivial | `guided-step-companion.tsx` |
| P3 | 7. Breadcrumbs on inner pages | Small | `module-shell.tsx`, `lesson-shell.tsx` |
| P3 | 8. Text density on tour step pages | Medium | `app/tour/*/page.tsx` |

## Verification

Each fix should be verified at 375px (mobile), 768px (tablet), and 1024px+ (desktop) viewports. The header and FAB fixes should also be checked with and without an active tour journey in localStorage/state.

## Sequencing notes

- Issues 1 and 6 both touch the resume/journey system. Fix 1 first (header pill), then 6 (band compaction), since the band changes may affect the header's `hasResumeBand` guard.
- Issue 3 (progress strip) should be done before issue 4 (button label), since the progress strip may reduce or eliminate the need for the "tour helper" button entirely on mobile.
- Issues 5 and 7 are independent of each other and of all other issues.

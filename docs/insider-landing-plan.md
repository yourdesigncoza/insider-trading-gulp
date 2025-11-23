# Insider Trading Landing Page Plan

## Layout Overview
- **Base Layout:** Extend `src/pug/layouts/LayoutTheme.pug` to inherit Phoenix navigation, typography, and utility classes without introducing external frameworks.
- **Navigation:** Build a focused navbar mixin (based on `mixins/landing/common/Navbar`) with anchors for `#insiders`, `#signals`, `#method`, `#pricing`, and a persistent “Request Access” CTA.
- **Hero Section:** Create a hero mixin featuring the “Follow the Corporate Smart Money” narrative, dual CTAs (Start 30-day trial, Book a walkthrough), and a data card column that surfaces recent insider trades (cluster buys, allocation, upside).

## Section Breakdown
1. **Proof Metrics Strip**
   - Three stat cards anchored to PRD metrics (292.9% annual return, 75% one-month spike, two-month average hold).
   - Use Phoenix `.card`, `.text-uppercase`, `.fs-xx` utility combos.

2. **Insider Signal Feed**
   - Split layout showing “Corporate Smart Money” vs “Capitol Moves” tables.
   - Each table displays ticker, insider, trade value, conviction badge, and projected upside.
   - Use Phoenix table styles (`table.table-stocks` etc.) with pill badges to mimic Quiver/CapitolTrades feel.

3. **Methodology / Filtering Logic**
   - Three-step timeline (“Surface disclosures”, “Score conviction”, “Deliver swing-ready alerts”) referencing cluster buying + large-dollar filters from PRD.
   - Implement with Phoenix timeline classes or stacked cards.

4. **Product Modules**
   - Cards describing: Insider Heatmap, AI anomaly detection, Managed account concierge.
   - Leverage iconography via Feather icons already bundled.

5. **Testimonials / Trust**
   - Quote card referencing COVID bottom timing + client testimonial for credibility.

6. **Pricing & CTA**
   - Highlight $100/month subscription, bullet list of inclusions, switcher for Managed Account contact.
   - Secondary CTA for “Book a strategy call”.

## Mixins To Create
- `mixins/pages/insider/Navbar`
- `mixins/pages/insider/Hero`
- `mixins/pages/insider/StatsStrip`
- `mixins/pages/insider/SignalFeed`
- `mixins/pages/insider/Methodology`
- `mixins/pages/insider/ProductModules`
- `mixins/pages/insider/Testimonial`
- `mixins/pages/insider/PricingCTA`

Each mixin will exclusively use Phoenix’s utility classes and variables. Content hooks (ids `#insiders`, `#signals`, etc.) align with navbar anchors to keep scroll navigation consistent.

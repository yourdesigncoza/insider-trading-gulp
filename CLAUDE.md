# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a customized Phoenix-based insider trading dashboard project built on the Phoenix v1.23.0 admin template by ThemeWagon. The project tracks legal insider trading disclosures (CFO, COO, executives) and provides investment signals based on corporate insider cluster buying patterns.

**Core Purpose**: A subscription-based financial service ($100/month) that provides high-conviction trade ideas by tracking corporate insider purchases disclosed via SEC filings (Form 4). The system focuses on cluster buying (multiple insiders buying simultaneously) and large-dollar-value transactions to identify genuine investment signals.

## Technology Stack

- **Template System**: Pug (formerly Jade)
- **Styling**: SCSS with Bootstrap 5.3.6
- **JavaScript**: ES2021 with Babel transpilation
- **Build System**: Gulp 4.x
- **Charts**: ECharts 5.6.0, Chart.js 4.4.9
- **Icons**: Font Awesome 6.7.2, Feather Icons 4.29.2
- **Additional Libraries**: Lodash, Day.js, FullCalendar, Sortable.js, Swiper, TinyMCE

## Development Commands

### Starting Development Server
```bash
npm start          # Development mode with hot reload (default)
npm run start:prod # Production mode
gulp               # Same as npm start
```

This will:
- Compile SCSS to CSS (expanded + minified, LTR + RTL variants)
- Transpile and bundle JavaScript via Rollup
- Convert Pug templates to HTML
- Copy vendor assets from `node_modules` to `public/vendors`
- Start BrowserSync on port 3000 with live reload
- Watch for changes in `src/pug/`, `src/scss/`, `src/js/`, `public/assets/`

### Building for Production
```bash
npm run build       # Full production build to /build directory
npm run build:test  # Production build + watch mode
```

### Publishing
```bash
npm run live        # Compile + build to /live directory
npm run publish     # Deploy /live to gh-pages via gh-pages package
```

### Individual Tasks
```bash
gulp style   # Compile SCSS only
gulp script  # Bundle JavaScript only
gulp pug     # Compile Pug templates only
gulp vendor  # Copy vendor files only
gulp clean   # Clean generated files
```

## Project Structure

```
phoenix-it/
├── src/                        # Source files (DO NOT edit files in public/)
│   ├── pug/                    # Pug templates
│   │   ├── insider-trading.pug # Main insider trading page
│   │   ├── layouts/            # Page layouts (13 different layouts)
│   │   ├── mixins/             # Reusable Pug components
│   │   │   └── pages/insider/  # Insider trading specific components
│   │   ├── apps/               # Template apps (e-commerce, CRM, etc.)
│   │   └── pages/              # Other template pages
│   ├── scss/                   # SCSS stylesheets
│   │   ├── theme.scss          # Main theme entry point
│   │   ├── _user-variables.scss # User-customizable variables
│   │   ├── _user.scss          # Custom user styles (not present yet)
│   │   └── theme/              # Theme SCSS partials
│   └── js/                     # JavaScript source
│       ├── phoenix.js          # Main app entry point
│       ├── config.js           # App configuration
│       ├── utils.js            # Utility functions
│       ├── theme/              # Theme components
│       │   └── charts/         # Chart implementations
│       └── pages/              # Page-specific JS bundles
├── public/                     # Generated output directory (DO NOT EDIT)
│   ├── assets/                 # Compiled assets
│   │   ├── css/                # Compiled CSS (4 variants)
│   │   ├── js/                 # Bundled JavaScript
│   │   └── img/                # Images (safe to add/modify)
│   ├── vendors/                # Third-party libraries (auto-copied)
│   └── *.html                  # Generated HTML files
├── gulp/                       # Gulp task definitions
│   ├── pug.gulp.js             # Pug compilation
│   ├── style.gulp.js           # SCSS compilation
│   ├── vendor.gulp.js          # Vendor file copying
│   ├── watch.gulp.js           # File watching
│   ├── build.gulp.js           # Production build tasks
│   ├── gulp.json               # Build configuration
│   └── utils.js                # Shared utilities
├── docs/                       # Project documentation
│   ├── initial-prd.md          # Product requirements document
│   ├── insider-landing-plan.md
│   └── insider-sub-hero.md
├── gulpfile.js                 # Main Gulp configuration
├── vendors.json                # Vendor asset configuration
└── package.json                # Dependencies and scripts
```

## Architecture

### Pug Template System

**Page Structure**: All pages follow this pattern:
```pug
extends layouts/LayoutTheme       // Choose appropriate layout
include mixins/pages/insider/index  // Include mixins

append variables
  - var disableNavigationType = false  // Layout configuration

block mainContent
  +InsiderNavbar                  // Use mixins for components
  +InsiderHero2
  +InsiderSubHero
```

**Mixins Location**: `src/pug/mixins/` - Reusable components organized by feature
- `mixins/pages/insider/index.pug` - Insider trading page components
- Components defined as `mixin ComponentName` and used with `+ComponentName`

**Important**: All `.pug` files in the root of `src/pug/` and subdirectories listed in `gulp/gulp.json` (apps/, pages/, dashboard/, etc.) will be compiled to HTML in `public/`.

### SCSS Architecture

**Entry Point**: `src/scss/theme.scss`
- Imports Bootstrap, theme variables, and component styles
- Variables can be overridden in `src/scss/_user-variables.scss`
- Custom styles should go in `src/scss/_user.scss` (create if needed)

**Output**: 4 CSS files are generated:
- `theme.css` (expanded, LTR)
- `theme.min.css` (compressed, LTR)
- `theme-rtl.css` (expanded, RTL)
- `theme-rtl.min.css` (compressed, RTL)

**RTL Support**: Enabled by default (`rtl: true` in `gulp/gulp.json`), uses `gulp-rtlcss`

### JavaScript Architecture

**Build System**: Rollup with Babel transpilation
- ES6+ modules with import/export
- Multiple bundles defined in `gulp/gulp.json` under `script.bundles`
- Each bundle is compiled separately (phoenix.js, dashboards, page-specific)

**Main Bundle**: `src/js/phoenix.js` - Core application bundle that includes theme functionality

**Code Style**: ESLint with Airbnb config + Prettier
- Browser environment, ES2021
- `console` allowed, no import resolution checking
- Global return enabled for script contexts

### Build Pipeline

1. **Development** (`gulp`):
   - `clean` → removes old generated files
   - `compile` (parallel) → `style`, `script`, `vendor`
   - `watch` → monitors changes, recompiles, triggers BrowserSync reload

2. **Production** (`gulp build`):
   - `clean:build` → clears `/build` directory
   - `build:static` → copies static assets
   - `compile:all` → compiles all assets + Pug to HTML
   - Output goes to `/build` instead of `/public`

3. **Vendor Management**:
   - Dependencies listed in `vendors.json`
   - `gulp vendor` copies specified files from `node_modules` to `public/vendors`
   - Automatically runs during `gulp` and `gulp build`

## Insider Trading Feature

**Main Page**: `src/pug/insider-trading.pug`
**Components**: `src/pug/mixins/pages/insider/index.pug`
**Output**: `public/insider-trading.html`

**Current Sections** (as of git status):
- `+InsiderNavbar` - Navigation with theme toggle, sign in/up
- `+InsiderHero2` - Hero section with tagline
- `+InsiderSubHero` - Corporate smart money tracking explanation
- `+InsiderPerformanceSignals` - Performance metrics section
- `+InsiderStatsStrip` - Statistics display
- `+InsiderSignalFeed` - Signal feed display

**Commented Out** (for future implementation):
- `+InsiderMethodology`
- `+InsiderProductModules`
- `+InsiderTestimonial`
- `+InsiderPricingCTA`

## Working with the Codebase

### Creating New Pages

1. Create `.pug` file in `src/pug/` (root or appropriate subdirectory)
2. Extend a layout: `extends layouts/LayoutTheme`
3. Include needed mixins
4. Define content in `block mainContent`
5. Run `gulp` - HTML auto-generates in `public/`

### Modifying Styles

1. **Global variables**: Edit `src/scss/_user-variables.scss`
2. **Custom styles**: Add to `src/scss/_user.scss` (create if needed)
3. **Theme modifications**: Edit files in `src/scss/theme/`
4. Changes auto-compile and trigger browser reload

### Adding JavaScript

1. **Page-specific**: Create file in `src/js/pages/`
2. **Add bundle config**: Update `gulp/gulp.json` → `script.bundles`
3. **Theme utilities**: Add to `src/js/theme/`
4. **Global utilities**: Add to `src/js/utils.js`

### Adding Third-Party Libraries

1. `npm install package-name`
2. Add entry to `vendors.json` with source/dest paths
3. Run `gulp vendor` to copy files
4. Reference in Pug templates from `/vendors/package-name/`

## Important Notes

### DO NOT Edit These Directories Directly
- `public/**/*.html` - Generated from Pug
- `public/assets/css/` - Generated from SCSS
- `public/assets/js/` - Generated from JS source
- `public/vendors/` - Auto-copied from node_modules

These are regenerated on every build and changes will be lost.

### Git Workflow
- **Never commit automatically** - Wait for explicit user instruction
- **Commit message format**: "Generated by John @ YourDesign.co.za"
- **No promotional text**: Remove Claude Code references and co-authorship
- When user says "GIT push": Commit outstanding changes first, then push

### Design Reference
- **Figma**: Available at provided link in README.md
- **Reference sites**: QuiverQuant, CapitolTrades
- **Screenshots**: `/home/laudes/zoot/projects/insider-trading` (for UI inspiration)
- **@phoenix/ folder**: Reference only for UI patterns - NEVER modify

## Environment Variables

- `MODE=PROD` - Sets production mode (compressed output, no sourcemaps)
- `MODE` not set or other value - Development mode (expanded output, sourcemaps)

Used in build commands via `cross-env MODE=PROD`

## Linting & Code Quality

- **ESLint**: Configured with Airbnb base + Prettier
- **Prettier**: Auto-formatting with `endOfLine: "auto"`
- **JSBeautifier**: Applied to generated HTML (2-space indent)
- Run manually or integrated in IDE

## Browser Support

Target: Last 5 versions (defined in `package.json` browserslist)

## Known Template Apps (Reference Only)

The Phoenix template includes multiple pre-built apps in `src/pug/apps/`:
- E-commerce (landing, admin)
- Social media (feed, profile, settings)
- CRM (leads, reports, deal details)
- Project management (board, list, card views)
- Kanban boards
- Gallery (grid, masonry, slider)
- Email client
- Travel agency (hotel, flight, trip)
- File manager
- Events
- Stock (dashboard, details, portfolio)

These are available as reference for components and patterns but are not part of the core insider trading feature.

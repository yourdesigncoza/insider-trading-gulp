# Working with Phoenix Pug Templates

This theme ships with a Gulp-driven asset pipeline and a large catalog of reusable Pug mixins. The generated HTML under `public/` is disposable—every `gulp` run wipes and rebuilds it—so day-to-day work happens inside `src/`.

## Dev Environment Recap

- Install deps (`npm i`) and run `gulp` to launch BrowserSync with live reload (see `README.md:5-51`).
- Gulp watches `src/pug/`, `src/scss/`, `src/js/`, and selected asset folders; any change recompiles the relevant outputs.
- The `gulp/pug.gulp.js` task loads shared locals (`name`, `version`, `ENV`, `uuid`, `flatSitemap`), renders all pages under `paths.pug.src.pages`, prettifies the HTML, and writes it into `public/`.

## Layout Hierarchy

- `src/pug/layouts/Layout.pug` defines global variables (`CWD`, `attrsHtml`, `title`, etc.), includes core mixins, and emits the bare HTML skeleton with overridable `block` regions for meta, styles, scripts, and main content.
- `src/pug/layouts/LayoutTheme.pug` extends `Layout`, adds nav/footer/support mixins, registers vendor assets (Simplebar, Unicons, FontAwesome, Lodash, Day.js), and toggles between `LayoutContent` and `LayoutContentProd` depending on `ENV`. Pages that extend this layout automatically get the Phoenix chrome plus the settings panel and support chat.

## Authoring Pages

1. Create a file under `src/pug/` (e.g., `src/pug/pages/example.pug`) and `extends` the desired layout, typically `layouts/LayoutTheme`.
2. `include` any mixins you need near the top; folders under `src/pug/mixins/` organize cards, tables, navbar components, dashboard widgets, etc.
3. Override the relevant template blocks:
   - `prepend/append scripts` or `styles` to load page-specific assets (mirroring what `src/pug/index.pug:10-22` does for Leaflet and ECharts).
   - `block content` (or `block mainContent`, depending on the layout) to compose the page UI with mixin invocations such as `+Stats`, `+TotalSalesChart`, `+TopRegionsTable`.
4. Reference shared locals exposed by Gulp (`ENV`, `version`, `flatSitemap`, etc.) when needed.

Running `gulp` recompiles the new template into `public/<relative-path>.html` and refreshes the browser automatically. Since BrowserSync also runs the `compilePug` middleware, visiting `http://localhost:3000/your-page.html` renders the corresponding `src/pug/.../your-page.pug` file even if it did not exist beforehand (the middleware creates intermediate directories and writes the HTML before responding).

## Key Tips

- Always edit source files under `src/`; anything under `public/` will be overwritten.
- Keep mixin usage declarative—Pug blocks stay clean when you let mixins encapsulate markup chunks.
- When you need a new reusable component, add it to the `src/pug/mixins/` tree and `include` it where required rather than duplicating markup.
- Use `append`/`prepend` blocks for scripts and styles so layout defaults remain intact.

With this structure understood, adding or customizing `.pug` files in Phoenix is straightforward: extend the proper layout, leverage the mixin library, and let Gulp handle compilation.

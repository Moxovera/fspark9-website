# fspark9 design boards v2

boards/: source of every artboard (plain HTML, inline styles). Names ending in M are 375 px, the rest 1440 px.
screens/: full page screenshots of the same boards. The portrait is a grey placeholder here.

Notes for the build:
- Images inside the boards point to /_blob/ paths from the design canvas. Use the portrait and screens from Sanity or public/assets.
- Fonts load from Google Fonts in these boards only for preview. The site self hosts them with next/font.
- Arrows and the close mark are text glyphs here. The site uses inline SVG icons (see CLAUDE.md).
- LastDay10 shows the episode list with placeholder rows to show how it scales. It is not content.

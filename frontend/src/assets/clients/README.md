# Client logos

Drop a company's supplied logo file here, then point its entry in
`src/data/company.ts` at it:

```ts
import sapphire from "../assets/clients/sapphire.svg";

export const CLIENTS: Client[] = [
  { name: "Sapphire Textile Mills", logo: sapphire },
  ...
];
```

Entries without a `logo` render an initials tile instead — see
`src/component/site/ClientWall.tsx`.

Only use marks the company has supplied or permitted. Approximations drawn to
look like a company's logo are not that company's logo and must not be used.

## Format and resolution

SVG is best — it is sharp at every screen density and three clients already
supply one. Ask for it first.

For PNG, transparent background, and large enough for a retina screen: the band
fits each mark into a 150x48 box, so a wide wordmark is painted about 150px
across and **300px wide is the 2x minimum, 450px comfortable**. A squarer mark
is height-bound instead and wants about 150px tall. Anything under that is
upscaled on most phones and laptops and looks soft next to the vector marks.

The old guidance here said "~120px or larger ... rendered at 40px", which is
why several of the current PNGs are too small to hold up. Measure before
accepting a file: `sips -g pixelWidth -g pixelHeight <file>`.

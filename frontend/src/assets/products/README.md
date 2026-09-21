# Product photographs

The catalog ships without photography. Drop a supplier's image here and point
the item at it in `src/data/products.ts`:

```ts
import gumStick from "../assets/products/003664-gum-stick.png";

item("003664", "Gum Stick 21 Grams First", "NUM", "Gum", gumStick),
```

Name files `<item-code>-<slug>.<ext>` so they stay matched to the stock system.

## Resolution

Photographs are displayed large — they fill the catalog tile and the whole left
panel of the quick-view dialog. Supply them at **1200x1200 or larger**; 1000px
on the short edge is the floor. On a retina screen the quick-view panel alone
paints roughly 700 device pixels wide, so anything under that is visibly soft
once enlarged. Square shots on a plain white ground crop best — the tile is
square and the image is fitted with `object-contain`, never cropped.

Ask the supplier or manufacturer for the original press/catalog file rather than
the web-sized copy from their site; the web copy is usually 400-500px, which is
what most of the current images are and why they should be replaced.

Items with no `image` fall back to their category glyph (see
`src/data/productIcons.ts`) — a pen for Ballpoint, a tape roll for Tape, and so
on, rather than one identical box on all 87 cards.

Use photographs you own or that the manufacturer/distributor has cleared for
resale listings. Product shots lifted from other retailers' sites are their
copyright, not ours.

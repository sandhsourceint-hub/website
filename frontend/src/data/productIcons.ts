import {
  BookCopy,
  Container,
  Copy,
  Droplet,
  Eraser,
  FileText,
  Folder,
  Grid2x2,
  Highlighter,
  Layers,
  Mail,
  Notebook,
  Package,
  Paperclip,
  Pen,
  PenLine,
  PenTool,
  Pencil,
  Ribbon,
  Ruler,
  Scissors,
  Square,
  Stamp,
  Sticker,
  StickyNote,
  type LucideIcon,
} from "lucide-react";

/**
 * A glyph per catalog category.
 *
 * The catalog has no product photography yet, so every card would otherwise
 * show the same generic box. A per-category glyph at least tells a pencil from
 * a tape roll while browsing. Replaced by the real photo on any product that
 * has an `image`.
 */
export const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Ballpoint: Pen,
  "Carbon Paper": Copy,
  Chalk: Ruler,
  Cutter: Scissors,
  "Duplicate Book": BookCopy,
  Envelop: Mail,
  Eraser: Eraser,
  Files: Folder,
  "Fluid Pen": Droplet,
  Gum: Container,
  Highlighter: Highlighter,
  Ink: Stamp,
  Marker: PenTool,
  Paper: FileText,
  Pen: PenLine,
  "Pen Jar": Container,
  Pencil: Pencil,
  "Punch Machine": Grid2x2,
  Register: Notebook,
  Ribbon: Ribbon,
  Sheet: Layers,
  Stapler: Paperclip,
  "Stapler Pin": Paperclip,
  Sticker: Sticker,
  Tape: Square,
  "Tape Dispensor": Square,
  "Tracing Paper": StickyNote,
  "Tray Paper": Layers,
  "Writing Pad": StickyNote,
};

export const iconFor = (category: string): LucideIcon => CATEGORY_ICONS[category] ?? Package;

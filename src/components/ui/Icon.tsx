import {
  type LucideIcon,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Cable,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Clock,
  Contact,
  Eye,
  Factory,
  FileText,
  FlaskConical,
  Fuel,
  HardHat,
  Headset,
  Info,
  LayoutDashboard,
  Mail,
  MapPin,
  Minus,
  Package,
  Phone,
  Plus,
  ReceiptText,
  Recycle,
  Ruler,
  SearchX,
  Send,
  Shield,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  SlidersHorizontal,
  Trash2,
  Truck,
  UploadCloud,
  Utensils,
  Wheat,
  X,
} from "lucide-react";

/**
 * Maps the Material Symbols names used across the app to inline Lucide SVG
 * icons. Inline SVGs always render (no icon-font network dependency, no
 * flash-of-ligature-text), which is why we don't rely on a webfont.
 */
const icons: Record<string, LucideIcon> = {
  add: Plus,
  add_shopping_cart: ShoppingCart,
  agriculture: Wheat,
  analytics: BarChart3,
  arrow_forward: ArrowRight,
  badge: Contact,
  call: Phone,
  check: Check,
  check_circle: CheckCircle2,
  chevron_right: ChevronRight,
  close: X,
  cloud_upload: UploadCloud,
  expand_more: ChevronDown,
  construction: HardHat,
  dashboard: LayoutDashboard,
  delete: Trash2,
  description: FileText,
  info: Info,
  lab_profile: ClipboardList,
  local_shipping: Truck,
  location_on: MapPin,
  mail: Mail,
  oil_barrel: Fuel,
  package_2: Package,
  precision_manufacturing: Factory,
  recycling: Recycle,
  remove: Minus,
  request_quote: ReceiptText,
  restaurant: Utensils,
  schedule: Clock,
  science: FlaskConical,
  search_off: SearchX,
  send: Send,
  settings_input_component: Cable,
  shield: Shield,
  shopping_bag: ShoppingBag,
  shopping_cart: ShoppingCart,
  straighten: Ruler,
  support_agent: Headset,
  tune: SlidersHorizontal,
  verified: BadgeCheck,
  verified_user: ShieldCheck,
  visibility: Eye,
};

type IconProps = {
  name: string;
  className?: string;
  /** Kept for API compatibility; Lucide icons are outline-style. */
  filled?: boolean;
};

export function Icon({ name, className = "" }: IconProps) {
  const Glyph = icons[name] ?? ShoppingBag;
  return (
    <Glyph
      aria-hidden="true"
      className={`inline-block shrink-0 ${className}`}
      // Size follows the surrounding font-size (text-* classes) via 1em,
      // matching how the previous icon-font was sized.
      style={{ width: "1em", height: "1em" }}
      strokeWidth={2}
    />
  );
}

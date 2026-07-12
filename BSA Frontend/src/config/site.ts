export const siteConfig = {
  name: "Aabharan",
  tagline: "Fine jewellery, made local",
  description:
    "Handcrafted gold, diamond, and kundan jewellery from a local atelier — browse the collection, book a fitting, or track your order.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  business: {
    legalName: "Bhavnagar Suvarnkar Association",
    email: "hello@aabharan.example",
    phone: "+91 98765 43210",
    address: "Bhavnagar, Gujarat 364001",
  },
} as const;

export const storefrontNav = [] as const;

export const adminNav = [
  { label: "Dashboard", href: "/admin", icon: "LayoutDashboard" },
  { label: "Inventory", href: "/admin/inventory", icon: "Gem" },
  { label: "Orders", href: "/admin/orders", icon: "Package" },
  { label: "Customers", href: "/admin/customers", icon: "Users" },
  { label: "Appointments", href: "/admin/appointments", icon: "CalendarClock" },
] as const;

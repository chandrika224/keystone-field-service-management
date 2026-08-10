export interface NavigationItem {
  label: string;
  path: string;
}

export const publicNavigation: NavigationItem[] = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];
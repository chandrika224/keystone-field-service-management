import { Link } from "react-router-dom";

import logo from "@/assets/logos/keystone_std_logo.svg";

import { publicNavigation } from "../navigation/PublicNavbar/navigation";
import NavItem from "../navigation/PublicNavbar/NavItem";
import MobileMenu from "../navigation/PublicNavbar/MobileMenu";

export default function PublicNavbar() {
  return (
    <header className="sticky top-3 z-50 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* --------------------------------------------------
            LOGO
        -------------------------------------------------- */}

        <Link
          to="/"
          className="flex shrink-0 items-center"
          aria-label="Keystone Field Service Management Home"
        >
          <img
            src={logo}
            alt="Keystone Field Service Management"
            className="h-18 w-auto object-contain sm:h-16"
          />
        </Link>


        {/* --------------------------------------------------
            DESKTOP NAVIGATION
        -------------------------------------------------- */}

        <nav
          className="hidden items-center gap-7 md:flex"
          aria-label="Main navigation"
        >
          {publicNavigation.map((item) => (
            <NavItem
              key={item.path}
              label={item.label}
              path={item.path}
            />
          ))}
        </nav>


        {/* --------------------------------------------------
            RIGHT SIDE ACTIONS
        -------------------------------------------------- */}

        <div className="hidden items-center gap-3 md:flex">

          <Link
            to="/login"
            className="rounded-md px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Login
          </Link>


          <Link
            to="/register"
            className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md"
          >
            Register
          </Link>


          {/* Brand */}

          <div className="ml-4 hidden border-l pl-5 lg:block">
            <Link to="/" className="block">
              <h1 className="text-lg font-bold leading-tight text-blue-600">
                Meridian
              </h1>

              <p className="text-[11px] leading-tight text-muted-foreground">
                Field Service Management
              </p>
            </Link>
          </div>

        </div>


        {/* --------------------------------------------------
            MOBILE MENU
        -------------------------------------------------- */}

        <div className="md:hidden">
          <MobileMenu />
        </div>

      </div>
    </header>
  );
}
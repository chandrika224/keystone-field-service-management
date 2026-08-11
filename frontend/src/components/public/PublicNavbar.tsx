import { Link } from "react-router-dom";
import logo from "@/assets/logos/keystone_std_logo.svg";
import { publicNavigation } from "../navigation/PublicNavbar/navigation";
import NavItem from "../navigation/PublicNavbar/NavItem";
import { Button } from "@base-ui/react/button";
import MobileMenu from "../navigation/PublicNavbar/MobileMenu";

export default function PublicNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-card shadow-sm">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <img
            src={logo}
            alt="Meridian Logo"
            className="h-20 w-auto"
          />

          <nav className="hidden md:flex items-center gap-8">
            {publicNavigation.map((item) => (
              <NavItem
                key={item.path}
                label={item.label}
                path={item.path}
              />
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">

            <Link to="/login">
              <Button>
                Login
              </Button>
            </Link>

            <Link to="/register">
              <Button>
                Register
              </Button>
            </Link>

            <MobileMenu />

          </div>

          <div>
            <h1 className="text-lg font-bold text-blue-600">
              Meridian
            </h1>

            <p className="text-xs text-muted-foreground">
              Field Service Management
            </p>
          </div>

        </Link>

      </div>
    </header>
  );
}
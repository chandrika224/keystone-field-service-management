import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import logo from "@/assets/logos/keystone_std_logo.svg";

import { publicNavigation } from "../navigation/PublicNavbar/navigation";

export default function PublicFooter() {
  return (
    <footer className="border-t bg-card">

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

        {/* Main Footer */}

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}

          <div className="lg:col-span-2">

            <Link
              to="/"
              className="inline-flex items-center gap-3"
            >

              <img
                src={logo}
                alt="Meridian Logo"
                className="h-16 w-auto"
              />

              <div>
                <h2 className="text-lg font-bold text-blue-600">
                  Meridian
                </h2>

                <p className="text-xs text-muted-foreground">
                  Field Service Management
                </p>
              </div>

            </Link>

            <p className="mt-5 max-w-md text-sm leading-6 text-muted-foreground">
              A centralized field service management platform
              designed to help organizations manage work orders,
              technicians, schedules, inventory and field operations
              efficiently.
            </p>

          </div>


          {/* Navigation */}

          <div>

            <h3 className="text-sm font-semibold">
              Quick Links
            </h3>

            <nav className="mt-4 flex flex-col gap-3">

              {publicNavigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-sm text-muted-foreground transition-colors hover:text-blue-600"
                >
                  {item.label}
                </Link>
              ))}

            </nav>

          </div>


          {/* Contact */}

          <div>

            <h3 className="text-sm font-semibold">
              Contact
            </h3>

            <div className="mt-4 space-y-4">

              <div className="flex items-start gap-3">

                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />

                <span className="text-sm text-muted-foreground">
                  support@meridian.com
                </span>

              </div>


              <div className="flex items-start gap-3">

                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />

                <span className="text-sm text-muted-foreground">
                  +91 98765 43210
                </span>

              </div>


              <div className="flex items-start gap-3">

                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />

                <span className="text-sm text-muted-foreground">
                  Bengaluru, India
                </span>

              </div>

            </div>

          </div>

        </div>


        {/* Bottom Footer */}

        <div className="mt-10 flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Meridian.
            All rights reserved.
          </p>

          <p className="text-sm text-muted-foreground">
            Field Service Management Platform
          </p>

        </div>

      </div>

    </footer>
  );
}
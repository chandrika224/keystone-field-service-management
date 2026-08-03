import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import { breadcrumbMap } from "@/config/breadcrumbs";

export default function Breadcrumb() {
  const { pathname } = useLocation();

  const paths = pathname.split("/").filter(Boolean);

  let currentPath = "";

  return (
    <nav className="flex items-center gap-2 text-sm">

      {paths.map((segment, index) => {
        currentPath += `/${segment}`;

        return (
          <div
            key={currentPath}
            className="flex items-center gap-2"
          >
            {index !== 0 && (
              <ChevronRight
                size={14}
                className="text-slate-400"
              />
            )}

            <Link
              to={currentPath}
              className={`
                ${
                  index === paths.length - 1
                    ? "font-semibold text-foreground"
                    : "text-muted-foreground hover:text-blue-600"
                }
              `}
            >
              {breadcrumbMap[segment] ?? segment}
            </Link>
          </div>
        );
      })}

    </nav>
  );
}
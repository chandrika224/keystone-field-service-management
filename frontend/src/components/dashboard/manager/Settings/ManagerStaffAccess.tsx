import { ShieldCheck } from "lucide-react";

import type {
  StaffPermission,
  PermissionAction,
} from "@/data/manager/permissions";

interface ManagerStaffAccessProps {
  permissions: StaffPermission[];
}

const actionStyles: Record<PermissionAction, string> = {
  View: "bg-blue-50 text-blue-700",
  Create: "bg-green-50 text-green-700",
  Edit: "bg-yellow-50 text-yellow-700",
  Delete: "bg-red-50 text-red-700",
};

export default function ManagerStaffAccess({
  permissions,
}: ManagerStaffAccessProps) {
  return (
    <div className="rounded-xl border bg-card">

      {/* Header */}

      <div className="border-b p-6">

        <div className="flex items-start gap-3">

          <div className="rounded-lg bg-primary/10 p-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
          </div>

          <div>
            <h2 className="text-lg font-semibold">
              Staff Access & Permissions
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Review the permissions assigned to
              dispatchers and technicians.
            </p>
          </div>

        </div>

      </div>

      {/* Permission Table */}

      <div className="overflow-x-auto">

        <table className="w-full text-sm">

          <thead>
            <tr className="border-b bg-muted/30">

              <th className="px-6 py-4 text-left font-medium">
                Module
              </th>

              <th className="px-6 py-4 text-left font-medium">
                Dispatcher
              </th>

              <th className="px-6 py-4 text-left font-medium">
                Technician
              </th>

            </tr>
          </thead>

          <tbody>

            {permissions.map((permission) => (
              <tr
                key={permission.module}
                className="border-b last:border-0"
              >

                {/* Module */}

                <td className="px-6 py-4 font-medium">
                  {permission.module}
                </td>

                {/* Dispatcher */}

                <td className="px-6 py-4">

                  <div className="flex flex-wrap gap-2">

                    {permission.dispatcher.length === 0 ? (
                      <span className="text-muted-foreground">
                        No access
                      </span>
                    ) : (
                      permission.dispatcher.map(
                        (action) => (
                          <span
                            key={action}
                            className={`rounded-full px-2.5 py-1 text-xs font-medium ${actionStyles[action]}`}
                          >
                            {action}
                          </span>
                        )
                      )
                    )}

                  </div>

                </td>

                {/* Technician */}

                <td className="px-6 py-4">

                  <div className="flex flex-wrap gap-2">

                    {permission.technician.length === 0 ? (
                      <span className="text-muted-foreground">
                        No access
                      </span>
                    ) : (
                      permission.technician.map(
                        (action) => (
                          <span
                            key={action}
                            className={`rounded-full px-2.5 py-1 text-xs font-medium ${actionStyles[action]}`}
                          >
                            {action}
                          </span>
                        )
                      )
                    )}

                  </div>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {/* Footer */}

      <div className="border-t bg-muted/20 px-6 py-4">

        <p className="text-xs text-muted-foreground">
          Permissions are controlled by the manager and
          will be enforced by the backend when role-based
          authorization is connected.
        </p>

      </div>

    </div>
  );
}
import {
  ShieldCheck,
  Users,
  ClipboardList,
  Package,
  Wrench,
} from "lucide-react";

export default function AuthBranding() {
  return (
    <div
      className="
        hidden
        lg:flex
        flex-1
        flex-col
        justify-center
        bg-primary
        px-20
        text-primary-foreground
      "
    >
    
        <p className="mb-3 text-sm uppercase tracking-[0.3em] opacity-70">
          Enterprise Platform
        </p>

        <img
          src="src/assets/logos/keystone_dark_logo.svg"
          alt="Keystone"
          className="mb-8 h-30 w-auto"
        />

        <p className="mb-10 text-lg leading-8 opacity-90">
          Enterprise platform for managing work orders,
          technicians, customers and inventory from one
          centralized cloud platform.
        </p>


        <div className="space-y-4">

          <Feature
            icon={<ClipboardList size={20} />}
            text="Smart Work Order Management"
          />

          <Feature
            icon={<Users size={20} />}
            text="Customer Relationship Management"
          />

          <Feature
            icon={<Wrench size={20} />}
            text="Technician Scheduling"
          />

          <Feature
            icon={<Package size={20} />}
            text="Inventory Tracking"
          />

        </div>
            <div className="mt-16 border-t border-white/10 pt-6">

              <p className="text-sm opacity-60">
                Powered by Meridian Technologies
              </p>

              <p className="mt-2 text-xs opacity-40">
                Version 1.0.0
              </p>

            </div>

      </div>
   
  );
}

function Feature({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-4">

      <div className="rounded-lg bg-white/10 p-2">
        {icon}
      </div>

      <span className="text-lg">
        {text}
      </span>

    </div>
  );
}
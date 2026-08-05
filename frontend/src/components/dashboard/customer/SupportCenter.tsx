import SupportCard from "@/components/common/SupportCard";
import { customerSupport } from "@/data/dashboard/customerSupport";

export default function SupportCenter() {
  return (
    <div className="grid gap-4 md:grid-cols-2">

      {customerSupport.map((item) => (
        <SupportCard
          key={item.title}
          title={item.title}
          subtitle={item.subtitle}
          icon={item.icon}
        />
      ))}

    </div>
  );
}
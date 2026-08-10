import WelcomeBanner from "@/components/dashboard/shared/WelcomeBanner";

export default function TechnicianDashboard() {
  return <h1 className="p-8 text-3xl font-bold">
    <WelcomeBanner
        title="Today's Tasks"
        subtitle="Complete your assigned jobs."
      />
    </h1>;
}
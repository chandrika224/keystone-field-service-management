import WelcomeBanner from "@/components/dashboard/shared/WelcomeBanner";

export default function DispatcherDashboard() {
  return (
    <div>
      <h1 className="p-8 text-3xl font-bold">Dispatcher Dashboard</h1>
      <WelcomeBanner title="Welcome, Dispatcher!" subtitle="Here's what's happening today." />
    </div>
  );
}
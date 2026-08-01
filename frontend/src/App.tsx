import "./App.css";
import { useState } from "react";

import StatusBadge from "./components/common/StatusBadge";
import PriorityBadge from "./components/common/PriorityBadge";
import Loader from "./components/common/Loader";
import EmptyState from "./components/common/EmptyState";
import SearchBar from "./components/common/SearchBar";
import PageHeader from "./components/common/PageHeader";
import UserAvatar from "./components/common/UserAvatar";
import NotificationBell from "./components/common/NotificationBell";
import StatCard from "./components/common/StatCard";
import FilterBar from "./components/common/FilterBar";
import DataTable from "./components/common/DataTable";
import NavBar from "./components/layout/NavBar";


import { Button } from "./components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";

import {
  Bell,
  ClipboardList,
  Users,
  Wrench,
  AlertTriangle,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import Sidebar from "./components/layout/SideBar/Sidebar";

type WorkOrder = {
  id: string;
  issue: string;
  status: string;
  priority: string;
};

function App() {
  const [search, setSearch] = useState("");

  const data: WorkOrder[] = [
    {
      id: "WO101",
      issue: "AC Not Working",
      status: "Open",
      priority: "High",
    },
    {
      id: "WO102",
      issue: "Water Leakage",
      status: "Assigned",
      priority: "Medium",
    },
  ];

  const columns: { key: keyof WorkOrder; header: string }[] = [
    { key: "id", header: "ID" },
    { key: "issue", header: "Issue" },
    { key: "status", header: "Status" },
    { key: "priority", header: "Priority" },
  ];

  const menu = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/",
    },
    {
      title: "Work Orders",
      icon: ClipboardList,
      href: "/work-orders",
    },
    {
      title: "Technicians",
      icon: Users,
      href: "/technicians",
    },
    {
      title: "Assets",
      icon: Wrench,
      href: "/assets",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/settings",
    },
  ];

  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <Sidebar menu={menu} />

      {/* Main Content */}
      <main className="flex-1 bg-slate-100 p-10">

        <header className="mb-12">
          <h1 className="text-5xl font-bold text-blue-600">
            KEYSTONE UI COMPONENT LIBRARY
          </h1>

          <p className="mt-3 text-lg text-slate-600">
            Reusable Components Showcase
          </p>
        </header>

        <div>

          <h1 className="text-3xl font-bold">
            Dashboard Layout
          </h1>

          <p className="mt-2 text-slate-600">
            Welcome to Meridian Field Service Management.
          </p>

        </div>

        <div className="space-y-10">

          <PageHeader
            title="Page Header"
            description="Manage, assign and track all work orders."
            action={<Button>Create Work Order</Button>}
          />

          <div className="rounded-xl bg-white p-8 shadow">
            <h2 className="mb-6 text-2xl font-semibold">User Avatar</h2>

            <div className="flex gap-5">
              <UserAvatar name="John Doe" />
              <UserAvatar name="Rahul Kumar" size="lg" />
              <UserAvatar name="Chandrika Pise" size="sm" />
              <UserAvatar
                name="John Doe"
                image="https://i.pravatar.cc/150"
              />
            </div>
          </div>
          <div className="flex min-h-screen">

            <div className="flex flex-1 flex-col">

                <NavBar />

                <main className="p-8">
                    Your Components
                </main>

            </div>

        </div>

          <div className="rounded-xl bg-white p-8 shadow">
            <h2 className="mb-6 text-2xl font-semibold">Data Table</h2>

            <DataTable
              columns={columns}
              data={data}
            />
          </div>

          <div className="rounded-xl bg-white p-8 shadow">
            <h2 className="mb-6 text-2xl font-semibold">Stat Cards</h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Total Work Orders"
                value={245}
                icon={<ClipboardList size={28} />}
              />

              <StatCard
                title="Technicians"
                value={32}
                icon={<Users size={28} />}
                iconColor="text-green-600"
              />

              <StatCard
                title="Open Requests"
                value={18}
                icon={<Wrench size={28} />}
                iconColor="text-orange-600"
              />

              <StatCard
                title="SLA Violations"
                value={3}
                icon={<AlertTriangle size={28} />}
                iconColor="text-red-600"
              />
            </div>
          </div>

          <div className="rounded-xl bg-white p-8 shadow">
            <h2 className="mb-6 text-2xl font-semibold">Filter Bar</h2>

            <FilterBar onReset={() => setSearch("")}>
              <SearchBar
                placeholder="Search Work Orders..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <Select>
                <SelectTrigger className="w-44">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="assigned">Assigned</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-44">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </FilterBar>
          </div>

          <div className="rounded-xl bg-white p-8 shadow">
            <h2 className="mb-6 text-2xl font-semibold">
              Notification Bell
            </h2>

            <div className="flex gap-6">
              <NotificationBell unreadCount={0} />
              <NotificationBell unreadCount={5} />
              <NotificationBell unreadCount={12} />
              <NotificationBell unreadCount={105} />
            </div>
          </div>

          <div className="rounded-xl bg-white p-8 shadow">
            <h2 className="mb-6 text-2xl font-semibold">
              Status & Priority Badges
            </h2>

            <div className="mb-6 flex flex-wrap gap-3">
              <StatusBadge status="NEW" />
              <StatusBadge status="ASSIGNED" />
              <StatusBadge status="IN_PROGRESS" />
              <StatusBadge status="ON_HOLD" />
              <StatusBadge status="COMPLETED" />
              <StatusBadge status="CLOSED" />
              <StatusBadge status="CANCELLED" />
            </div>

            <div className="flex gap-3">
              <PriorityBadge priority="LOW" />
              <PriorityBadge priority="MEDIUM" />
              <PriorityBadge priority="HIGH" />
              <PriorityBadge priority="CRITICAL" />
            </div>
          </div>

          <div className="rounded-xl bg-white p-8 shadow">
            <h2 className="mb-6 text-2xl font-semibold">Loader</h2>

            <div className="flex items-center gap-10">
              <Loader size="sm" />
              <Loader />
              <Loader size="lg" />
              <Loader text="Loading Dashboard..." />
            </div>
          </div>

          <div className="rounded-xl bg-white p-8 shadow">
            <h2 className="mb-6 text-2xl font-semibold">Empty States</h2>

            <div className="grid gap-6 md:grid-cols-2">
              <EmptyState
                icon={<ClipboardList size={56} />}
                title="No Work Orders"
                description="There are currently no work orders available."
                action={<Button>Create Work Order</Button>}
              />

              <EmptyState
                icon={<Bell size={56} />}
                title="No Notifications"
                description="You're all caught up!"
              />
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}

export default App;
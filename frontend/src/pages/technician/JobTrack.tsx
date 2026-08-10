import { useState } from "react";

import SectionHeader from "@/components/dashboard/shared/SectionHeader";


import { technicianJobs } from "@/data/technician/jobs";
import TechnicianJobTrackToolbar from "@/components/dashboard/technician/JobTrack/TechnicianJobTrackToolbar";
import TechnicianJobTrackTable from "@/components/dashboard/technician/JobTrack/TechnicianJobTrackTable";

export default function JobTrack() {

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  return (
    <div className="space-y-6">

      <SectionHeader
        title="Job Track"
        subtitle="Track the progress of your assigned service jobs."
      />

      <TechnicianJobTrackToolbar
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
      />

      <TechnicianJobTrackTable
        jobs={technicianJobs}
        search={search}
        status={status}
      />

    </div>
  );
}
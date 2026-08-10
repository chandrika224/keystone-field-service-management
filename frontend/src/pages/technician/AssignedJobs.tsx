import { useState } from "react";

import SectionHeader from "@/components/dashboard/shared/SectionHeader";

import TechnicianAssignedJobsToolbar
  from "@/components/dashboard/technician/AssignedJobs/TechnicianAssignedJobsToolbar";

import TechnicianAssignedJobsTable
  from "@/components/dashboard/technician/AssignedJobs/TechnicianAssignedJobsTable";

import { technicianJobs } from "@/data/technician/jobs";

import type { TechnicianJob } from "@/data/technician/jobs";

import TechnicianJobDetailsDrawer
  from "@/components/dashboard/technician/AssignedJobs/TechnicianJobDetailsDrawer";

export default function AssignedJobs() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  const [selectedJob, setSelectedJob] =
    useState<TechnicianJob | null>(null);
  
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [jobs, setJobs] = useState<TechnicianJob[]>(technicianJobs);

  const handleStartJob = (job: TechnicianJob) => {
  const updatedJob: TechnicianJob = {
    ...job,
    status: "IN_PROGRESS",
  };

  setJobs((prevJobs) =>
    prevJobs.map((existingJob) =>
      existingJob.id === updatedJob.id
        ? updatedJob
        : existingJob
    )
  );

  setSelectedJob(updatedJob);
};

const handleCompleteJob = (job: TechnicianJob) => {
  const updatedJob: TechnicianJob = {
    ...job,
    status: "COMPLETED",
  };

  setJobs((prevJobs) =>
    prevJobs.map((existingJob) =>
      existingJob.id === updatedJob.id
        ? updatedJob
        : existingJob
    )
  );

  setSelectedJob(updatedJob);
};

  return (
    <div className="space-y-6">

      <SectionHeader
        title="Assigned Jobs"
        subtitle="View and manage your assigned service jobs."
      />

      <TechnicianAssignedJobsToolbar
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
      />

      <TechnicianAssignedJobsTable
        jobs={jobs}
        search={search}
        status={status}
        onView={(job) => {
          console.log("Parent received job:", job);

          setSelectedJob(job);
          setDrawerOpen(true);
        }}
      />

      <TechnicianJobDetailsDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        job={selectedJob}

        onStartJob={handleStartJob}

        onCompleteJob={handleCompleteJob}
      />

    </div>
  );
}
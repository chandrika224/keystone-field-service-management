import { useMemo, useState } from "react";

import SectionHeader from "@/components/dashboard/shared/SectionHeader";

import TechnicianScheduleToolbar from "@/components/dashboard/technician/Schedule/TechnicianScheduleToolbar";

import TechnicianScheduleList from "@/components/dashboard/technician/Schedule/TechnicianScheduleList";

import {
  technicianSchedule,
  type TechnicianScheduleItem,
} from "@/data/technician/schedule";

import TechnicianScheduleDetailsDrawer from "@/components/dashboard/technician/Schedule/TechnicianScheduleDetailsDrawer";

import { useNavigate } from "react-router-dom";

import TechnicianScheduleStats from "@/components/dashboard/technician/Schedule/TechnicianScheduleStats";


export default function TechnicianSchedule() {
  /* --------------------------------------------------
     TODAY
  -------------------------------------------------- */

  const getToday = () => {
    return new Date().toISOString().split("T")[0];
  };

  const navigate = useNavigate();

  
  /* --------------------------------------------------
     DATE FILTER
  -------------------------------------------------- */

  const [selectedDate, setSelectedDate] =
    useState(getToday());

  /* --------------------------------------------------
     SELECTED JOB
  -------------------------------------------------- */

  const [selectedJob, setSelectedJob] =
    useState<TechnicianScheduleItem | null>(null);

  /* --------------------------------------------------
     DETAILS DRAWER
  -------------------------------------------------- */

  const [detailsOpen, setDetailsOpen] =
    useState(false);

  /* --------------------------------------------------
     FILTER SCHEDULE
  -------------------------------------------------- */
  const [schedule, setSchedule] =
  useState<TechnicianScheduleItem[]>(
    technicianSchedule
  );


  const filteredSchedule = useMemo(() => {
  if (!selectedDate) {
    return [];
  }
  return schedule.filter(
    (item) =>
      item.scheduledDate === selectedDate
  );
}, [schedule, selectedDate]);
  /* --------------------------------------------------
     TODAY
  -------------------------------------------------- */

  const handleToday = () => {
    setSelectedDate(getToday());
  };

  /* --------------------------------------------------
     CLEAR DATE
  -------------------------------------------------- */

  const handleClear = () => {
    setSelectedDate("");
  };

  /* --------------------------------------------------
     VIEW JOB
  -------------------------------------------------- */

  const handleView = (
    item: TechnicianScheduleItem
  ) => {
    setSelectedJob(item);
    setDetailsOpen(true);
  };

  /* --------------------------------------------------
     OPEN WORK ORDER
  -------------------------------------------------- */

  const handleOpenWorkOrder = (
      item: TechnicianScheduleItem
    ) => {
      setDetailsOpen(false);

      navigate(
        `/technician/track-jobs`
      );
    };
        // We will connect this to the existing
        // Job Tracking page in the next step.
      

  /* --------------------------------------------------
     RENDER
  -------------------------------------------------- */

  const handleStatusChange = (
  item: TechnicianScheduleItem,
  status: TechnicianScheduleItem["status"]
) => {
  setSchedule((currentSchedule) =>
    currentSchedule.map((job) =>
      job.id === item.id
        ? {
            ...job,
            status,
          }
        : job
    )
  );

  setSelectedJob((currentJob) =>
    currentJob && currentJob.id === item.id
      ? {
          ...currentJob,
          status,
        }
      : currentJob
  );
};

  return (
    <div className="space-y-6">

      {/* ---------------------------------------------
          PAGE HEADER
      --------------------------------------------- */}

      <SectionHeader
        title="Schedule"
        subtitle="View your assigned jobs and scheduled field activities."
      />

      {/* ---------------------------------------------
          TOOLBAR
      --------------------------------------------- */}

      <TechnicianScheduleToolbar
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        onToday={handleToday}
        onClear={handleClear}
      />
        <TechnicianScheduleStats
          items={filteredSchedule}
        />

        <TechnicianScheduleList
          items={filteredSchedule}
          onView={handleView}
        />


      {/* ---------------------------------------------
          DETAILS DRAWER
      --------------------------------------------- */}

      <TechnicianScheduleDetailsDrawer
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        item={selectedJob}
        onOpenWorkOrder={handleOpenWorkOrder}
        onStatusChange={handleStatusChange}
      />

    </div>
  );
}
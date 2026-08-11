import { useMemo, useState } from "react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import SectionHeader from "@/components/dashboard/shared/SectionHeader";

import TechnicianReportsStats
  from "@/components/dashboard/technician/Reports/TechnicianReportsStats";

import TechnicianReportDetailsDrawer
  from "@/components/dashboard/technician/Reports/TechnicianReportDetailsDrawer";

import TechnicianCreateReportDrawer
  from "@/components/dashboard/technician/Reports/TechnicianCreateReportDrawer";

import TechnicianEditReportDrawer
  from "@/components/dashboard/technician/Reports/TechnicianEditReportDrawer";

import {
  technicianReports,
  type TechnicianReportStatus,
  type TechnicianWorkReport,
} from "@/data/technician/reports";


export default function TechnicianReports() {

  /* --------------------------------------------------
     REPORT DATA
  -------------------------------------------------- */

  const [reports, setReports] =
    useState<TechnicianWorkReport[]>(
      technicianReports
    );


  /* --------------------------------------------------
     REPORT DETAILS
  -------------------------------------------------- */

  const [selectedReport, setSelectedReport] =
    useState<TechnicianWorkReport | null>(null);

  const [detailsOpen, setDetailsOpen] =
    useState(false);


  /* --------------------------------------------------
     SEARCH
  -------------------------------------------------- */

  const [search, setSearch] =
    useState("");


  /* --------------------------------------------------
     STATUS
  -------------------------------------------------- */

  const [status, setStatus] =
    useState<"All" | TechnicianReportStatus>(
      "All"
    );


  /* --------------------------------------------------
     CREATE REPORT
  -------------------------------------------------- */

  const [createReportOpen, setCreateReportOpen] =
    useState(false);


  /* --------------------------------------------------
     EDIT REPORT
  -------------------------------------------------- */

  const [editReport, setEditReport] =
    useState<TechnicianWorkReport | null>(null);

  const [editReportOpen, setEditReportOpen] =
    useState(false);


  /* --------------------------------------------------
     FILTER REPORTS
  -------------------------------------------------- */

  const filteredReports = useMemo(() => {

    const searchValue =
      search.toLowerCase().trim();

    return reports.filter((report) => {

      const matchesSearch =
        report.workOrderId
          .toLowerCase()
          .includes(searchValue) ||

        report.title
          .toLowerCase()
          .includes(searchValue) ||

        report.customerName
          .toLowerCase()
          .includes(searchValue) ||

        report.siteName
          .toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        status === "All" ||
        report.status === status;

      return (
        matchesSearch &&
        matchesStatus
      );
    });

  }, [reports, search, status]);


  /* --------------------------------------------------
     CLEAR FILTERS
  -------------------------------------------------- */

  const handleClearFilters = () => {
    setSearch("");
    setStatus("All");
  };


  /* --------------------------------------------------
     VIEW REPORT
  -------------------------------------------------- */

  const handleViewReport = (
    report: TechnicianWorkReport
  ) => {

    setSelectedReport(report);
    setDetailsOpen(true);

  };


  /* --------------------------------------------------
     EDIT REPORT
  -------------------------------------------------- */

  const handleEditReport = (
    report: TechnicianWorkReport
  ) => {

    setEditReport(report);
    setEditReportOpen(true);

  };


  /* --------------------------------------------------
     CREATE / SAVE REPORT
  -------------------------------------------------- */

  const handleSaveReport = (
    report: TechnicianWorkReport,
    submit: boolean
  ) => {

    const finalReport: TechnicianWorkReport = {
      ...report,

      status: submit
        ? "Submitted"
        : "Draft",
    };


    setReports((currentReports) => [
      finalReport,
      ...currentReports,
    ]);


    setCreateReportOpen(false);


    toast.success(
      submit
        ? "Report submitted successfully"
        : "Report saved as draft",
      {
        description: submit
          ? "Your work report has been submitted for manager review."
          : "Your work report has been saved as a draft.",
      }
    );

  };


  /* --------------------------------------------------
     UPDATE REPORT
  -------------------------------------------------- */

  const handleUpdateReport = (
    updatedReport: TechnicianWorkReport,
    submit: boolean
  ) => {

    const finalReport: TechnicianWorkReport = {
      ...updatedReport,

      status: submit
        ? "Submitted"
        : "Draft",
    };


    setReports((currentReports) =>
      currentReports.map((report) =>
        report.id === finalReport.id
          ? finalReport
          : report
      )
    );


    setEditReportOpen(false);


    toast.success(
      submit
        ? "Report submitted successfully"
        : "Draft updated successfully",
      {
        description: submit
          ? "Your report has been submitted for manager review."
          : "Your report changes have been saved.",
      }
    );

  };


  /* --------------------------------------------------
     RENDER
  -------------------------------------------------- */

  return (
    <div className="space-y-6">


      {/* HEADER */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <SectionHeader
          title="Work Reports"
          subtitle="Submit and review reports for your completed field jobs."
        />


        <Button
          type="button"
          onClick={() =>
            setCreateReportOpen(true)
          }
        >
          Create Report
        </Button>

      </div>


      {/* STATS */}

      <TechnicianReportsStats
        reports={reports}
      />


      {/* FILTERS */}

      <div className="flex flex-col gap-3 rounded-xl border bg-card p-4 sm:flex-row">

        <input
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          placeholder="Search reports..."
          className="h-10 flex-1 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        />


        <select
          value={status}
          onChange={(event) =>
            setStatus(
              event.target.value as
                | "All"
                | TechnicianReportStatus
            )
          }
          className="h-10 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        >

          <option value="All">
            All Status
          </option>

          <option value="Draft">
            Draft
          </option>

          <option value="Submitted">
            Submitted
          </option>

          <option value="Approved">
            Approved
          </option>

          <option value="Rejected">
            Rejected
          </option>

        </select>


        {(search || status !== "All") && (
          <Button
            type="button"
            variant="outline"
            onClick={handleClearFilters}
          >
            Clear
          </Button>
        )}

      </div>


      {/* REPORT LIST */}

      <div className="space-y-4">

        {filteredReports.length === 0 ? (

          <div className="rounded-xl border bg-card p-10 text-center">

            <p className="text-sm text-muted-foreground">
              No reports found.
            </p>

          </div>

        ) : (

          filteredReports.map((report) => (

            <div
              key={report.id}
              className="rounded-xl border bg-card p-5"
            >

              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                <div className="space-y-2">

                  <div className="flex items-center gap-3">

                    <h3 className="font-semibold">
                      {report.title}
                    </h3>


                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        report.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : report.status === "Submitted"
                          ? "bg-blue-100 text-blue-700"
                          : report.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {report.status}
                    </span>

                  </div>


                  <p className="text-sm text-muted-foreground">
                    {report.workOrderId}
                  </p>


                  <p className="text-sm">
                    {report.customerName}
                  </p>


                  <p className="text-sm text-muted-foreground">
                    {report.siteName}
                  </p>


                  <p className="text-xs text-muted-foreground">
                    Report date: {report.reportDate}
                  </p>

                </div>


                {/* ACTIONS */}

                <div className="flex shrink-0 gap-2">

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      handleViewReport(report)
                    }
                  >
                    View
                  </Button>


                  {(report.status === "Draft" ||
                    report.status === "Rejected") && (

                    <Button
                      type="button"
                      onClick={() =>
                        handleEditReport(report)
                      }
                    >
                      Edit
                    </Button>

                  )}

                </div>

              </div>

            </div>

          ))

        )}

      </div>


      {/* CREATE REPORT DRAWER */}

      <TechnicianCreateReportDrawer
        open={createReportOpen}
        onOpenChange={setCreateReportOpen}
        onSave={handleSaveReport}
      />


      {/* DETAILS DRAWER */}

      <TechnicianReportDetailsDrawer
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        report={selectedReport}
      />


      {/* EDIT REPORT DRAWER */}

      <TechnicianEditReportDrawer
        open={editReportOpen}
        onOpenChange={setEditReportOpen}
        report={editReport}
        onSave={handleUpdateReport}
      />

    </div>
  );
}
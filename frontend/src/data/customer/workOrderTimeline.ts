export interface TimelineEvent {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export const workOrderTimeline: TimelineEvent[] = [
  {
    id: 1,
    title: "Request Created",
    description: "Your service request has been submitted.",
    completed: true,
  },
  {
    id: 2,
    title: "Technician Assigned",
    description: "John Doe has been assigned.",
    completed: true,
  },
  {
    id: 3,
    title: "Work In Progress",
    description: "Technician is working on your request.",
    completed: true,
  },
  {
    id: 4,
    title: "Quality Inspection",
    description: "Final inspection pending.",
    completed: false,
  },
  {
    id: 5,
    title: "Completed",
    description: "Service completed successfully.",
    completed: false,
  },
];
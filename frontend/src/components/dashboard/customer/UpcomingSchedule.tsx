import { upcomingSchedule } from "@/data/dashboard/upcomingSchedule";

export default function UpcomingSchedule() {
  return (
    <div className="rounded-2xl border bg-card shadow-sm">

      <div className="divide-y">

        {upcomingSchedule.map((item) => (

          <div
            key={item.time}
            className="flex items-center justify-between p-5"
          >

            <div>

              <h3 className="font-semibold">
                {item.title}
              </h3>

              <p className="text-sm text-muted-foreground">
                {item.location}
              </p>

            </div>

            <span
              className="
                rounded-lg
                bg-primary/10
                px-3
                py-1
                text-sm
                font-medium
                text-primary
              "
            >
              {item.time}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}
import { Calendar } from "@/components/calendar"

export default function SpaceOwnerCalendar() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Calendar</h2>
        <p className="text-muted-foreground">Manage your site visits, meetings, and campaign schedules.</p>
      </div>
      <Calendar userType="space_owner" />
    </div>
  )
}

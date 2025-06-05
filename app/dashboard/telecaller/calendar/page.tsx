import { Calendar } from "@/components/calendar"

export default function TelecallerCalendar() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Calendar</h2>
        <p className="text-muted-foreground">Schedule follow-up calls, client meetings, and appointments.</p>
      </div>
      <Calendar userType="telecaller" />
    </div>
  )
}

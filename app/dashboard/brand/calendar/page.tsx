import { Calendar } from "@/components/calendar"

export default function BrandCalendar() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Calendar</h2>
        <p className="text-muted-foreground">Schedule campaign launches, meetings, and site visits.</p>
      </div>
      <Calendar userType="brand" />
    </div>
  )
}

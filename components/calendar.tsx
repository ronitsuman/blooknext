"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin, User } from "lucide-react"

interface CalendarEvent {
  id: string
  title: string
  date: string
  time: string
  type: "meeting" | "campaign" | "site-visit" | "call"
  location?: string
  attendees?: string[]
  description?: string
  status: "scheduled" | "completed" | "cancelled"
}

interface CalendarProps {
  userType?: "space_owner" | "brand" | "vendor" | "blookforce" | "telecaller" | "admin"
}

export function Calendar({ userType = "space_owner" }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: "1",
      title: "Site Visit - Mumbai Mall",
      date: "2024-01-15",
      time: "10:00 AM",
      type: "site-visit",
      location: "Phoenix Mall, Mumbai",
      attendees: ["Brand Manager", "Space Owner"],
      description: "Initial site inspection for advertising campaign",
      status: "scheduled",
    },
    {
      id: "2",
      title: "Campaign Planning Meeting",
      date: "2024-01-16",
      time: "2:00 PM",
      type: "meeting",
      location: "Virtual Meeting",
      attendees: ["Creative Team", "Account Manager"],
      description: "Discuss BlookPerks campaign strategy",
      status: "scheduled",
    },
    {
      id: "3",
      title: "Client Call - Fashion Brand",
      date: "2024-01-17",
      time: "11:30 AM",
      type: "call",
      attendees: ["Brand Representative"],
      description: "Follow-up on campaign performance",
      status: "scheduled",
    },
  ])

  const [isAddEventOpen, setIsAddEventOpen] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    type: "meeting" as CalendarEvent["type"],
    location: "",
    description: "",
  })

  // Get calendar days for current month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0]
  }

  const getEventsForDate = (date: Date) => {
    const dateStr = formatDate(date)
    return events.filter((event) => event.date === dateStr)
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.time) {
      const event: CalendarEvent = {
        id: Date.now().toString(),
        ...newEvent,
        attendees: [],
        status: "scheduled",
      }
      setEvents([...events, event])
      setNewEvent({
        title: "",
        date: "",
        time: "",
        type: "meeting",
        location: "",
        description: "",
      })
      setIsAddEventOpen(false)
    }
  }

  const getEventTypeColor = (type: CalendarEvent["type"]) => {
    switch (type) {
      case "meeting":
        return "bg-blue-500"
      case "campaign":
        return "bg-green-500"
      case "site-visit":
        return "bg-purple-500"
      case "call":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  const getEventTypeLabel = (type: CalendarEvent["type"]) => {
    switch (type) {
      case "meeting":
        return "Meeting"
      case "campaign":
        return "Campaign"
      case "site-visit":
        return "Site Visit"
      case "call":
        return "Call"
      default:
        return "Event"
    }
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>Manage your appointments and events</CardDescription>
            </div>
            <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Event
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Event</DialogTitle>
                  <DialogDescription>Schedule a new appointment or event</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Event Title</Label>
                    <Input
                      id="title"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      placeholder="Enter event title"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="time">Time</Label>
                      <Input
                        id="time"
                        type="time"
                        value={newEvent.time}
                        onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="type">Event Type</Label>
                    <Select
                      value={newEvent.type}
                      onValueChange={(value: CalendarEvent["type"]) => setNewEvent({ ...newEvent, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="meeting">Meeting</SelectItem>
                        <SelectItem value="campaign">Campaign</SelectItem>
                        <SelectItem value="site-visit">Site Visit</SelectItem>
                        <SelectItem value="call">Call</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={newEvent.location}
                      onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                      placeholder="Enter location or 'Virtual'"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                      placeholder="Enter event description"
                    />
                  </div>
                  <Button onClick={handleAddEvent} className="w-full">
                    Add Event
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6">
            <Button variant="outline" size="sm" onClick={handlePrevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-semibold">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <Button variant="outline" size="sm" onClick={handleNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {dayNames.map((day) => (
              <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {getDaysInMonth(currentDate).map((date, index) => (
              <div
                key={index}
                className={`min-h-[80px] p-1 border rounded-lg cursor-pointer hover:bg-muted/50 ${
                  date ? "bg-background" : "bg-muted/20"
                } ${
                  selectedDate && date && formatDate(date) === formatDate(selectedDate) ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => date && setSelectedDate(date)}
              >
                {date && (
                  <>
                    <div className="text-sm font-medium mb-1">{date.getDate()}</div>
                    <div className="space-y-1">
                      {getEventsForDate(date)
                        .slice(0, 2)
                        .map((event) => (
                          <div
                            key={event.id}
                            className={`text-xs p-1 rounded text-white truncate ${getEventTypeColor(event.type)}`}
                            title={event.title}
                          >
                            {event.title}
                          </div>
                        ))}
                      {getEventsForDate(date).length > 2 && (
                        <div className="text-xs text-muted-foreground">+{getEventsForDate(date).length - 2} more</div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>Your scheduled appointments and meetings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events
              .filter((event) => new Date(event.date) >= new Date())
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .slice(0, 5)
              .map((event) => (
                <div key={event.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <div className={`w-3 h-3 rounded-full ${getEventTypeColor(event.type)}`} />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold">{event.title}</h4>
                      <Badge variant="outline">{getEventTypeLabel(event.type)}</Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>
                          {new Date(event.date).toLocaleDateString()} at {event.time}
                        </span>
                      </div>
                      {event.location && (
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{event.location}</span>
                        </div>
                      )}
                      {event.attendees && event.attendees.length > 0 && (
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>
                            {event.attendees.length} attendee{event.attendees.length !== 1 ? "s" : ""}
                          </span>
                        </div>
                      )}
                    </div>
                    {event.description && <p className="text-sm text-muted-foreground mt-2">{event.description}</p>}
                  </div>
                  <Badge variant={event.status === "scheduled" ? "default" : "secondary"}>{event.status}</Badge>
                </div>
              ))}
            {events.filter((event) => new Date(event.date) >= new Date()).length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No upcoming events scheduled</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

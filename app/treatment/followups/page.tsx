"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Calendar, Bell, Clock, AlertCircle, CheckCircle, Phone } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function FollowUps() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  const followUps = [
    {
      id: "FU001",
      patientName: "John Doe",
      patientId: "P001",
      treatmentType: "Implant Surgery",
      scheduledDate: "2024-01-25",
      dueDate: "2024-01-25",
      priority: "High",
      status: "Pending",
      lastContact: "2024-01-20",
      notes: "Post-surgical follow-up. Check healing and remove sutures.",
      contactMethod: "Phone",
      dentist: "Dr. Smith",
    },
    {
      id: "FU002",
      patientName: "Jane Smith",
      patientId: "P002",
      treatmentType: "Orthodontic Treatment",
      scheduledDate: "2024-02-01",
      dueDate: "2024-02-01",
      priority: "Medium",
      status: "Scheduled",
      lastContact: "2024-01-18",
      notes: "Monthly orthodontic adjustment and progress check.",
      contactMethod: "Email",
      dentist: "Dr. Johnson",
    },
    {
      id: "FU003",
      patientName: "Mike Johnson",
      patientId: "P003",
      treatmentType: "Root Canal",
      scheduledDate: "2024-01-24",
      dueDate: "2024-01-24",
      priority: "High",
      status: "Overdue",
      lastContact: "2024-01-15",
      notes: "Follow-up on root canal treatment. Patient reported some discomfort.",
      contactMethod: "Phone",
      dentist: "Dr. Wilson",
    },
    {
      id: "FU004",
      patientName: "Sarah Wilson",
      patientId: "P004",
      treatmentType: "Dental Cleaning",
      scheduledDate: "2024-01-28",
      dueDate: "2024-01-28",
      priority: "Low",
      status: "Completed",
      lastContact: "2024-01-22",
      notes: "Routine 6-month cleaning follow-up completed successfully.",
      contactMethod: "SMS",
      dentist: "Dr. Brown",
    },
  ]

  const filteredFollowUps = followUps.filter((followUp) => {
    const matchesSearch =
      followUp.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      followUp.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || followUp.status.toLowerCase() === statusFilter
    const matchesPriority = priorityFilter === "all" || followUp.priority.toLowerCase() === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        )
      case "Scheduled":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <Calendar className="h-3 w-3 mr-1" />
            Scheduled
          </Badge>
        )
      case "Pending":
        return (
          <Badge variant="secondary">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "Overdue":
        return (
          <Badge variant="destructive">
            <AlertCircle className="h-3 w-3 mr-1" />
            Overdue
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return <Badge variant="destructive">High</Badge>
      case "Medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
      case "Low":
        return <Badge variant="secondary">Low</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const upcomingCount = followUps.filter((f) => f.status === "Pending" || f.status === "Scheduled").length
  const overdueCount = followUps.filter((f) => f.status === "Overdue").length

  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex-1">
          <h1 className="text-lg font-semibold">Follow-up Management</h1>
          <p className="text-sm text-muted-foreground">Track and manage patient follow-up appointments</p>
        </div>
      </header>

      <main className="flex-1 p-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Follow-ups</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingCount}</div>
              <p className="text-xs text-muted-foreground">Next 7 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{overdueCount}</div>
              <p className="text-xs text-muted-foreground">Require immediate attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed This Week</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+3 from last week</p>
            </CardContent>
          </Card>
        </div>

        {/* Overdue Alerts */}
        {overdueCount > 0 && (
          <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-800 dark:text-red-200">
                <AlertCircle className="h-5 w-5" />
                Overdue Follow-ups
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {followUps
                  .filter((f) => f.status === "Overdue")
                  .map((followUp) => (
                    <div key={followUp.id} className="flex items-center justify-between text-sm">
                      <span>
                        {followUp.patientName} - {followUp.treatmentType} (Due: {followUp.dueDate})
                      </span>
                      <Button size="sm" variant="outline">
                        <Phone className="h-3 w-3 mr-1" />
                        Contact
                      </Button>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>Follow-up Schedule</CardTitle>
                <CardDescription>Manage patient follow-up appointments and notifications</CardDescription>
              </div>
              <Button>
                <Bell className="h-4 w-4 mr-2" />
                Send Reminders
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by patient name or follow-up ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Follow-ups Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Follow-up ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Treatment</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Contact</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFollowUps.map((followUp) => (
                    <TableRow key={followUp.id}>
                      <TableCell className="font-medium">{followUp.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{followUp.patientName}</div>
                          <div className="text-sm text-muted-foreground">{followUp.patientId}</div>
                        </div>
                      </TableCell>
                      <TableCell>{followUp.treatmentType}</TableCell>
                      <TableCell>{followUp.dueDate}</TableCell>
                      <TableCell>{getPriorityBadge(followUp.priority)}</TableCell>
                      <TableCell>{getStatusBadge(followUp.status)}</TableCell>
                      <TableCell>{followUp.lastContact}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Follow-up Details - {followUp.id}</DialogTitle>
                                <DialogDescription>Follow-up information for {followUp.patientName}</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-sm font-medium">Patient</Label>
                                    <p className="text-sm text-muted-foreground">{followUp.patientName}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Treatment Type</Label>
                                    <p className="text-sm text-muted-foreground">{followUp.treatmentType}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Due Date</Label>
                                    <p className="text-sm text-muted-foreground">{followUp.dueDate}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Priority</Label>
                                    {getPriorityBadge(followUp.priority)}
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Status</Label>
                                    {getStatusBadge(followUp.status)}
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Assigned Dentist</Label>
                                    <p className="text-sm text-muted-foreground">{followUp.dentist}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Last Contact</Label>
                                    <p className="text-sm text-muted-foreground">{followUp.lastContact}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Contact Method</Label>
                                    <p className="text-sm text-muted-foreground">{followUp.contactMethod}</p>
                                  </div>
                                </div>

                                <div>
                                  <Label className="text-sm font-medium">Follow-up Notes</Label>
                                  <p className="text-sm text-muted-foreground mt-1">{followUp.notes}</p>
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor="updateNotes">Update Notes</Label>
                                  <Textarea id="updateNotes" placeholder="Add follow-up notes..." rows={3} />
                                </div>

                                <div className="flex justify-end gap-2">
                                  <Button variant="outline">
                                    <Phone className="h-4 w-4 mr-2" />
                                    Contact Patient
                                  </Button>
                                  <Button>Mark Complete</Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button variant="outline" size="sm">
                            <Phone className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

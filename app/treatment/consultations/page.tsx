"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Eye } from "lucide-react"
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
import { Checkbox } from "@/components/ui/checkbox"

export default function Consultations() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const consultations = [
    {
      id: "CON001",
      patientName: "John Doe",
      patientId: "P001",
      date: "2024-01-22",
      time: "10:00 AM",
      dentist: "Dr. Smith",
      type: "Follow-up",
      status: "Completed",
      duration: "30 min",
      notes: "Patient healing well post-surgery. No complications observed.",
      checklist: {
        vitalSigns: true,
        painAssessment: true,
        woundCheck: true,
        medicationReview: true,
        nextAppointment: true,
      },
    },
    {
      id: "CON002",
      patientName: "Jane Smith",
      patientId: "P002",
      date: "2024-01-22",
      time: "2:00 PM",
      dentist: "Dr. Johnson",
      type: "Initial Consultation",
      status: "Completed",
      duration: "45 min",
      notes: "New patient consultation. Discussed treatment options for orthodontic care.",
      checklist: {
        vitalSigns: true,
        painAssessment: false,
        woundCheck: false,
        medicationReview: true,
        nextAppointment: true,
      },
    },
    {
      id: "CON003",
      patientName: "Mike Johnson",
      patientId: "P003",
      date: "2024-01-23",
      time: "9:00 AM",
      dentist: "Dr. Wilson",
      type: "Pre-operative",
      status: "Scheduled",
      duration: "60 min",
      notes: "",
      checklist: {
        vitalSigns: false,
        painAssessment: false,
        woundCheck: false,
        medicationReview: false,
        nextAppointment: false,
      },
    },
  ]

  const filteredConsultations = consultations.filter((consultation) => {
    const matchesSearch =
      consultation.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || consultation.status.toLowerCase() === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case "Scheduled":
        return <Badge variant="secondary">Scheduled</Badge>
      case "In Progress":
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex-1">
          <h1 className="text-lg font-semibold">Consultations</h1>
          <p className="text-sm text-muted-foreground">Log and manage patient consultations</p>
        </div>
      </header>

      <main className="flex-1 p-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>Patient Consultations</CardTitle>
                <CardDescription>Track consultation appointments and clinical notes</CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Log Consultation
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Log New Consultation</DialogTitle>
                    <DialogDescription>Record details of a patient consultation</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="patient">Patient</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select patient" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="p001">John Doe (P001)</SelectItem>
                            <SelectItem value="p002">Jane Smith (P002)</SelectItem>
                            <SelectItem value="p003">Mike Johnson (P003)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dentist">Dentist</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select dentist" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dr-smith">Dr. Smith</SelectItem>
                            <SelectItem value="dr-johnson">Dr. Johnson</SelectItem>
                            <SelectItem value="dr-wilson">Dr. Wilson</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Input id="date" type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time">Time</Label>
                        <Input id="time" type="time" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="duration">Duration</Label>
                        <Input id="duration" placeholder="e.g., 30 min" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="type">Consultation Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="initial">Initial Consultation</SelectItem>
                          <SelectItem value="follow-up">Follow-up</SelectItem>
                          <SelectItem value="pre-operative">Pre-operative</SelectItem>
                          <SelectItem value="post-operative">Post-operative</SelectItem>
                          <SelectItem value="emergency">Emergency</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4">
                      <Label>Consultation Checklist</Label>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="vitalSigns" />
                          <Label htmlFor="vitalSigns">Vital Signs Check</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="painAssessment" />
                          <Label htmlFor="painAssessment">Pain Assessment</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="woundCheck" />
                          <Label htmlFor="woundCheck">Wound/Site Check</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="medicationReview" />
                          <Label htmlFor="medicationReview">Medication Review</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="nextAppointment" />
                          <Label htmlFor="nextAppointment">Next Appointment Scheduled</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="patientEducation" />
                          <Label htmlFor="patientEducation">Patient Education</Label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Clinical Notes</Label>
                      <Textarea id="notes" placeholder="Enter detailed consultation notes..." rows={4} />
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Cancel</Button>
                      <Button>Save Consultation</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by patient name or consultation ID..."
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
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="in progress">In Progress</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Consultations Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Consultation ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Dentist</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredConsultations.map((consultation) => (
                    <TableRow key={consultation.id}>
                      <TableCell className="font-medium">{consultation.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{consultation.patientName}</div>
                          <div className="text-sm text-muted-foreground">{consultation.patientId}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{consultation.date}</div>
                          <div className="text-sm text-muted-foreground">{consultation.time}</div>
                        </div>
                      </TableCell>
                      <TableCell>{consultation.dentist}</TableCell>
                      <TableCell>{consultation.type}</TableCell>
                      <TableCell>{consultation.duration}</TableCell>
                      <TableCell>{getStatusBadge(consultation.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Consultation Details - {consultation.id}</DialogTitle>
                                <DialogDescription>
                                  Consultation record for {consultation.patientName}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-sm font-medium">Patient</Label>
                                    <p className="text-sm text-muted-foreground">{consultation.patientName}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Dentist</Label>
                                    <p className="text-sm text-muted-foreground">{consultation.dentist}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Date & Time</Label>
                                    <p className="text-sm text-muted-foreground">
                                      {consultation.date} at {consultation.time}
                                    </p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Duration</Label>
                                    <p className="text-sm text-muted-foreground">{consultation.duration}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Type</Label>
                                    <p className="text-sm text-muted-foreground">{consultation.type}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Status</Label>
                                    {getStatusBadge(consultation.status)}
                                  </div>
                                </div>

                                <div>
                                  <Label className="text-sm font-medium mb-3 block">Consultation Checklist</Label>
                                  <div className="grid grid-cols-2 gap-3">
                                    {Object.entries(consultation.checklist).map(([key, value]) => (
                                      <div key={key} className="flex items-center gap-2">
                                        <div
                                          className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                                            value ? "bg-green-100 border-green-500" : "border-gray-300"
                                          }`}
                                        >
                                          {value && <div className="w-2 h-2 bg-green-500 rounded"></div>}
                                        </div>
                                        <span className="text-sm capitalize">
                                          {key.replace(/([A-Z])/g, " $1").trim()}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <div>
                                  <Label className="text-sm font-medium">Clinical Notes</Label>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {consultation.notes || "No notes recorded"}
                                  </p>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
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

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Eye, Upload, Download, FileText } from "lucide-react"
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

export default function SurgicalProcedures() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const procedures = [
    {
      id: "SUR001",
      patientName: "John Doe",
      patientId: "P001",
      procedureType: "Dental Implant",
      surgeon: "Dr. Smith",
      date: "2024-01-20",
      duration: "2 hours",
      status: "Completed",
      complications: "None",
      notes: "Successful implant placement. Patient tolerated procedure well.",
      preOpImages: 3,
      postOpImages: 4,
      signedOff: true,
      signedBy: "Dr. Smith",
      signedDate: "2024-01-20",
    },
    {
      id: "SUR002",
      patientName: "Mike Johnson",
      patientId: "P003",
      procedureType: "Wisdom Tooth Extraction",
      surgeon: "Dr. Wilson",
      date: "2024-01-18",
      duration: "45 minutes",
      status: "Completed",
      complications: "Minor bleeding",
      notes: "Extraction completed successfully. Patient advised on post-op care.",
      preOpImages: 2,
      postOpImages: 2,
      signedOff: true,
      signedBy: "Dr. Wilson",
      signedDate: "2024-01-18",
    },
    {
      id: "SUR003",
      patientName: "Sarah Wilson",
      patientId: "P004",
      procedureType: "Bone Graft",
      surgeon: "Dr. Brown",
      date: "2024-01-22",
      duration: "1.5 hours",
      status: "In Progress",
      complications: "None",
      notes: "Procedure in progress. Initial graft placement successful.",
      preOpImages: 2,
      postOpImages: 0,
      signedOff: false,
      signedBy: null,
      signedDate: null,
    },
  ]

  const filteredProcedures = procedures.filter((procedure) => {
    const matchesSearch =
      procedure.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      procedure.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || procedure.status.toLowerCase() === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case "In Progress":
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
      case "Scheduled":
        return <Badge variant="secondary">Scheduled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex-1">
          <h1 className="text-lg font-semibold">Surgical Procedures</h1>
          <p className="text-sm text-muted-foreground">Log and manage surgical procedures with documentation</p>
        </div>
      </header>

      <main className="flex-1 p-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>Surgical Procedures</CardTitle>
                <CardDescription>Track surgical procedures with image uploads and digital sign-off</CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Log Procedure
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Log New Surgical Procedure</DialogTitle>
                    <DialogDescription>Record details of a surgical procedure</DialogDescription>
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
                        <Label htmlFor="surgeon">Surgeon</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select surgeon" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dr-smith">Dr. Smith</SelectItem>
                            <SelectItem value="dr-wilson">Dr. Wilson</SelectItem>
                            <SelectItem value="dr-brown">Dr. Brown</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="procedureType">Procedure Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select procedure" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="implant">Dental Implant</SelectItem>
                            <SelectItem value="extraction">Tooth Extraction</SelectItem>
                            <SelectItem value="bone-graft">Bone Graft</SelectItem>
                            <SelectItem value="sinus-lift">Sinus Lift</SelectItem>
                            <SelectItem value="oral-surgery">Oral Surgery</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Input id="date" type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="duration">Duration</Label>
                        <Input id="duration" placeholder="e.g., 2 hours" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Procedure Notes</Label>
                      <Textarea id="notes" placeholder="Detailed procedure notes..." rows={4} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="complications">Complications</Label>
                      <Textarea id="complications" placeholder="Any complications or issues..." rows={2} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <Label>Pre-operative Images</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                          <Upload className="mx-auto h-8 w-8 text-gray-400" />
                          <div className="mt-2">
                            <Button variant="outline" size="sm">
                              Upload Images
                            </Button>
                            <p className="mt-1 text-xs text-gray-500">JPG, PNG files</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <Label>Post-operative Images</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                          <Upload className="mx-auto h-8 w-8 text-gray-400" />
                          <div className="mt-2">
                            <Button variant="outline" size="sm">
                              Upload Images
                            </Button>
                            <p className="mt-1 text-xs text-gray-500">JPG, PNG files</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label>Digital Sign-off</Label>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="signOff" />
                        <Label htmlFor="signOff">I confirm this procedure record is accurate and complete</Label>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Save Draft</Button>
                      <Button>Complete Record</Button>
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
                  placeholder="Search by patient name or procedure ID..."
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
                  <SelectItem value="in progress">In Progress</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Procedures Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Procedure ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Procedure Type</TableHead>
                    <TableHead>Surgeon</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProcedures.map((procedure) => (
                    <TableRow key={procedure.id}>
                      <TableCell className="font-medium">{procedure.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{procedure.patientName}</div>
                          <div className="text-sm text-muted-foreground">{procedure.patientId}</div>
                        </div>
                      </TableCell>
                      <TableCell>{procedure.procedureType}</TableCell>
                      <TableCell>{procedure.surgeon}</TableCell>
                      <TableCell>{procedure.date}</TableCell>
                      <TableCell>{procedure.duration}</TableCell>
                      <TableCell>{getStatusBadge(procedure.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl">
                              <DialogHeader>
                                <DialogTitle>Procedure Details - {procedure.id}</DialogTitle>
                                <DialogDescription>
                                  Surgical procedure record for {procedure.patientName}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-sm font-medium">Patient</Label>
                                    <p className="text-sm text-muted-foreground">{procedure.patientName}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Procedure Type</Label>
                                    <p className="text-sm text-muted-foreground">{procedure.procedureType}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Surgeon</Label>
                                    <p className="text-sm text-muted-foreground">{procedure.surgeon}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Date & Duration</Label>
                                    <p className="text-sm text-muted-foreground">
                                      {procedure.date} ({procedure.duration})
                                    </p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Status</Label>
                                    {getStatusBadge(procedure.status)}
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Complications</Label>
                                    <p className="text-sm text-muted-foreground">{procedure.complications}</p>
                                  </div>
                                </div>

                                <div>
                                  <Label className="text-sm font-medium">Procedure Notes</Label>
                                  <p className="text-sm text-muted-foreground mt-1">{procedure.notes}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                  <div>
                                    <Label className="text-sm font-medium mb-3 block">
                                      Pre-operative Images ({procedure.preOpImages})
                                    </Label>
                                    <div className="grid grid-cols-2 gap-2">
                                      {Array.from({ length: procedure.preOpImages }, (_, i) => (
                                        <div
                                          key={i}
                                          className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center"
                                        >
                                          <span className="text-xs text-gray-500">Pre-op {i + 1}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium mb-3 block">
                                      Post-operative Images ({procedure.postOpImages})
                                    </Label>
                                    <div className="grid grid-cols-2 gap-2">
                                      {Array.from({ length: procedure.postOpImages }, (_, i) => (
                                        <div
                                          key={i}
                                          className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center"
                                        >
                                          <span className="text-xs text-gray-500">Post-op {i + 1}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>

                                {procedure.signedOff && (
                                  <div className="border rounded-lg p-4 bg-green-50">
                                    <Label className="text-sm font-medium text-green-800">Digital Sign-off</Label>
                                    <p className="text-sm text-green-700 mt-1">
                                      Signed by {procedure.signedBy} on {procedure.signedDate}
                                    </p>
                                  </div>
                                )}

                                <div className="flex justify-end gap-2">
                                  <Button variant="outline">
                                    <Download className="h-4 w-4 mr-2" />
                                    Download Report
                                  </Button>
                                  <Button variant="outline">
                                    <FileText className="h-4 w-4 mr-2" />
                                    Print Record
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
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

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Upload, Download, Eye, FileText, CheckCircle, Clock } from "lucide-react"
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

export default function ConsentForms() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const consentForms = [
    {
      id: "CNS001",
      patientName: "John Doe",
      patientId: "P001",
      formType: "Surgical Consent",
      procedure: "Implant Surgery",
      status: "Signed",
      uploadDate: "2024-01-20",
      signedDate: "2024-01-20",
      witnessName: "Dr. Smith",
      documentUrl: "/documents/consent-001.pdf",
      notes: "Patient fully informed about risks and benefits",
    },
    {
      id: "CNS002",
      patientName: "Jane Smith",
      patientId: "P002",
      formType: "Treatment Consent",
      procedure: "Orthodontic Treatment",
      status: "Signed",
      uploadDate: "2024-01-18",
      signedDate: "2024-01-18",
      witnessName: "Dr. Johnson",
      documentUrl: "/documents/consent-002.pdf",
      notes: "Standard orthodontic consent form",
    },
    {
      id: "CNS003",
      patientName: "Mike Johnson",
      patientId: "P003",
      formType: "Anesthesia Consent",
      procedure: "Oral Surgery",
      status: "Pending",
      uploadDate: "2024-01-15",
      signedDate: null,
      witnessName: null,
      documentUrl: "/documents/consent-003.pdf",
      notes: "Awaiting patient signature",
    },
    {
      id: "CNS004",
      patientName: "Sarah Wilson",
      patientId: "P004",
      formType: "General Consent",
      procedure: "Dental Cleaning",
      status: "Signed",
      uploadDate: "2024-01-12",
      signedDate: "2024-01-12",
      witnessName: "Dr. Brown",
      documentUrl: "/documents/consent-004.pdf",
      notes: "Routine cleaning consent",
    },
  ]

  const filteredForms = consentForms.filter((form) => {
    const matchesSearch =
      form.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      form.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || form.status.toLowerCase() === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Signed":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Signed
          </Badge>
        )
      case "Pending":
        return (
          <Badge variant="secondary">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex-1">
          <h1 className="text-lg font-semibold">Consent Forms</h1>
          <p className="text-sm text-muted-foreground">Manage patient consent forms and documentation</p>
        </div>
      </header>

      <main className="flex-1 p-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>Patient Consent Forms</CardTitle>
                <CardDescription>Upload, track, and manage consent documentation</CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Consent Form
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Upload New Consent Form</DialogTitle>
                    <DialogDescription>Upload a signed consent form for a patient</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
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
                      <Label htmlFor="formType">Form Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select form type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="surgical">Surgical Consent</SelectItem>
                          <SelectItem value="treatment">Treatment Consent</SelectItem>
                          <SelectItem value="anesthesia">Anesthesia Consent</SelectItem>
                          <SelectItem value="general">General Consent</SelectItem>
                          <SelectItem value="photography">Photography Consent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="procedure">Procedure</Label>
                      <Input id="procedure" placeholder="Enter procedure name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="witness">Witness Name</Label>
                      <Input id="witness" placeholder="Enter witness name" />
                    </div>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4">
                        <Button variant="outline">Select PDF File</Button>
                        <p className="mt-2 text-sm text-gray-500">Upload signed consent form (PDF only)</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea id="notes" placeholder="Additional notes..." />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Cancel</Button>
                      <Button>Upload Form</Button>
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
                  placeholder="Search by patient name or form ID..."
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
                  <SelectItem value="signed">Signed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Forms Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Form ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Form Type</TableHead>
                    <TableHead>Procedure</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead>Signed Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredForms.map((form) => (
                    <TableRow key={form.id}>
                      <TableCell className="font-medium">{form.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{form.patientName}</div>
                          <div className="text-sm text-muted-foreground">{form.patientId}</div>
                        </div>
                      </TableCell>
                      <TableCell>{form.formType}</TableCell>
                      <TableCell>{form.procedure}</TableCell>
                      <TableCell>{getStatusBadge(form.status)}</TableCell>
                      <TableCell>{form.uploadDate}</TableCell>
                      <TableCell>{form.signedDate || "—"}</TableCell>
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
                                <DialogTitle>Consent Form Details - {form.id}</DialogTitle>
                                <DialogDescription>Consent form information for {form.patientName}</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-sm font-medium">Patient</Label>
                                    <p className="text-sm text-muted-foreground">{form.patientName}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Form Type</Label>
                                    <p className="text-sm text-muted-foreground">{form.formType}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Procedure</Label>
                                    <p className="text-sm text-muted-foreground">{form.procedure}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Status</Label>
                                    {getStatusBadge(form.status)}
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Upload Date</Label>
                                    <p className="text-sm text-muted-foreground">{form.uploadDate}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Signed Date</Label>
                                    <p className="text-sm text-muted-foreground">{form.signedDate || "Not signed"}</p>
                                  </div>
                                  {form.witnessName && (
                                    <div className="col-span-2">
                                      <Label className="text-sm font-medium">Witness</Label>
                                      <p className="text-sm text-muted-foreground">{form.witnessName}</p>
                                    </div>
                                  )}
                                </div>

                                <div>
                                  <Label className="text-sm font-medium">Notes</Label>
                                  <p className="text-sm text-muted-foreground mt-1">{form.notes}</p>
                                </div>

                                <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                                  <div className="mt-4">
                                    <p className="text-sm font-medium">PDF Document Preview</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                      {form.documentUrl.split("/").pop()}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex justify-end gap-2">
                                  <Button variant="outline">
                                    <Download className="h-4 w-4 mr-2" />
                                    Download PDF
                                  </Button>
                                  <Button variant="outline">Print</Button>
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

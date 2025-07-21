"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, FileText, CheckCircle, XCircle, Download, Eye } from "lucide-react"
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

export default function EligibilityReports() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const eligibilityReports = [
    {
      id: "ELG001",
      patientName: "John Doe",
      patientId: "P001",
      reportType: "Surgery",
      procedure: "Implant Surgery",
      status: "Approved",
      evaluationDate: "2024-01-20",
      evaluatedBy: "Dr. Smith",
      riskLevel: "Low",
      notes: "Patient cleared for implant surgery. All prerequisites met.",
      criteria: {
        medicalHistory: true,
        bloodWork: true,
        imaging: true,
        consent: true,
        allergies: true,
      },
    },
    {
      id: "ELG002",
      patientName: "Jane Smith",
      patientId: "P002",
      reportType: "Treatment",
      procedure: "Orthodontic Treatment",
      status: "Approved",
      evaluationDate: "2024-01-18",
      evaluatedBy: "Dr. Johnson",
      riskLevel: "Low",
      notes: "Suitable for orthodontic treatment. No contraindications found.",
      criteria: {
        medicalHistory: true,
        bloodWork: false,
        imaging: true,
        consent: true,
        allergies: true,
      },
    },
    {
      id: "ELG003",
      patientName: "Mike Johnson",
      patientId: "P003",
      reportType: "Surgery",
      procedure: "Oral Surgery",
      status: "Pending",
      evaluationDate: "2024-01-15",
      evaluatedBy: "Dr. Wilson",
      riskLevel: "Medium",
      notes: "Awaiting additional blood work results. Diabetes management review required.",
      criteria: {
        medicalHistory: true,
        bloodWork: false,
        imaging: true,
        consent: true,
        allergies: true,
      },
    },
    {
      id: "ELG004",
      patientName: "Sarah Wilson",
      patientId: "P004",
      reportType: "Surgery",
      procedure: "Wisdom Tooth Extraction",
      status: "Rejected",
      evaluationDate: "2024-01-12",
      evaluatedBy: "Dr. Brown",
      riskLevel: "High",
      notes: "Current medication contraindications. Requires cardiologist clearance.",
      criteria: {
        medicalHistory: true,
        bloodWork: true,
        imaging: true,
        consent: false,
        allergies: false,
      },
    },
  ]

  const filteredReports = eligibilityReports.filter((report) => {
    const matchesSearch =
      report.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || report.status.toLowerCase() === statusFilter
    const matchesType = typeFilter === "all" || report.reportType.toLowerCase() === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>
      case "Pending":
        return <Badge variant="secondary">Pending</Badge>
      case "Rejected":
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "Low":
        return <Badge className="bg-green-100 text-green-800">Low Risk</Badge>
      case "Medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium Risk</Badge>
      case "High":
        return <Badge variant="destructive">High Risk</Badge>
      default:
        return <Badge variant="outline">{risk}</Badge>
    }
  }

  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex-1">
          <h1 className="text-lg font-semibold">Eligibility Reports</h1>
          <p className="text-sm text-muted-foreground">Patient eligibility for surgery and treatment</p>
        </div>
      </header>

      <main className="flex-1 p-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>Patient Eligibility Assessments</CardTitle>
                <CardDescription>Review and manage patient eligibility for procedures</CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <FileText className="h-4 w-4 mr-2" />
                    New Assessment
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create Eligibility Assessment</DialogTitle>
                    <DialogDescription>Evaluate patient eligibility for surgery or treatment</DialogDescription>
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
                        <Label htmlFor="reportType">Assessment Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="surgery">Surgery</SelectItem>
                            <SelectItem value="treatment">Treatment</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="procedure">Procedure</Label>
                      <Input id="procedure" placeholder="Enter procedure name" />
                    </div>

                    <div className="space-y-4">
                      <Label>Eligibility Criteria</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="medicalHistory" />
                          <Label htmlFor="medicalHistory">Medical History Review</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="bloodWork" />
                          <Label htmlFor="bloodWork">Blood Work Complete</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="imaging" />
                          <Label htmlFor="imaging">Imaging Studies</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="consent" />
                          <Label htmlFor="consent">Informed Consent</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="allergies" />
                          <Label htmlFor="allergies">Allergy Assessment</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="clearance" />
                          <Label htmlFor="clearance">Medical Clearance</Label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="riskLevel">Risk Level</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select risk level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low Risk</SelectItem>
                          <SelectItem value="medium">Medium Risk</SelectItem>
                          <SelectItem value="high">High Risk</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Assessment Notes</Label>
                      <Textarea id="notes" placeholder="Enter assessment notes and recommendations..." rows={4} />
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Save Draft</Button>
                      <Button>Complete Assessment</Button>
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
                  placeholder="Search by patient name or report ID..."
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
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="surgery">Surgery</SelectItem>
                  <SelectItem value="treatment">Treatment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Reports Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Procedure</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{report.patientName}</div>
                          <div className="text-sm text-muted-foreground">{report.patientId}</div>
                        </div>
                      </TableCell>
                      <TableCell>{report.reportType}</TableCell>
                      <TableCell>{report.procedure}</TableCell>
                      <TableCell>{getStatusBadge(report.status)}</TableCell>
                      <TableCell>{getRiskBadge(report.riskLevel)}</TableCell>
                      <TableCell>{report.evaluationDate}</TableCell>
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
                                <DialogTitle>Eligibility Report - {report.id}</DialogTitle>
                                <DialogDescription>
                                  Detailed eligibility assessment for {report.patientName}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-sm font-medium">Patient</Label>
                                    <p className="text-sm text-muted-foreground">{report.patientName}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Procedure</Label>
                                    <p className="text-sm text-muted-foreground">{report.procedure}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Status</Label>
                                    {getStatusBadge(report.status)}
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Risk Level</Label>
                                    {getRiskBadge(report.riskLevel)}
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Evaluated By</Label>
                                    <p className="text-sm text-muted-foreground">{report.evaluatedBy}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Date</Label>
                                    <p className="text-sm text-muted-foreground">{report.evaluationDate}</p>
                                  </div>
                                </div>

                                <div>
                                  <Label className="text-sm font-medium mb-3 block">Eligibility Criteria</Label>
                                  <div className="grid grid-cols-2 gap-3">
                                    {Object.entries(report.criteria).map(([key, value]) => (
                                      <div key={key} className="flex items-center gap-2">
                                        {value ? (
                                          <CheckCircle className="h-4 w-4 text-green-600" />
                                        ) : (
                                          <XCircle className="h-4 w-4 text-red-600" />
                                        )}
                                        <span className="text-sm capitalize">
                                          {key.replace(/([A-Z])/g, " $1").trim()}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <div>
                                  <Label className="text-sm font-medium">Assessment Notes</Label>
                                  <p className="text-sm text-muted-foreground mt-1">{report.notes}</p>
                                </div>

                                <div className="flex justify-end gap-2">
                                  <Button variant="outline">
                                    <Download className="h-4 w-4 mr-2" />
                                    Download Report
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

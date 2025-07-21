"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Eye, Edit, FileText, Calendar } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Label } from "@/components/ui/label"

export default function PatientRecords() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const patients = [
    {
      id: "P001",
      name: "John Doe",
      age: 45,
      phone: "(555) 123-4567",
      lastVisit: "2024-01-15",
      status: "Active",
      treatments: 3,
      allergies: ["Penicillin", "Latex"],
      medications: ["Aspirin 81mg", "Lisinopril 10mg"],
      medicalHistory: "Hypertension, Previous root canal",
      emergencyContact: "Jane Doe - (555) 123-4568",
    },
    {
      id: "P002",
      name: "Jane Smith",
      age: 32,
      phone: "(555) 234-5678",
      lastVisit: "2024-01-20",
      status: "Active",
      treatments: 1,
      allergies: ["None"],
      medications: ["Birth control"],
      medicalHistory: "No significant history",
      emergencyContact: "Mike Smith - (555) 234-5679",
    },
    {
      id: "P003",
      name: "Mike Johnson",
      age: 58,
      phone: "(555) 345-6789",
      lastVisit: "2023-12-10",
      status: "Inactive",
      treatments: 5,
      allergies: ["Codeine"],
      medications: ["Metformin", "Atorvastatin"],
      medicalHistory: "Diabetes Type 2, High cholesterol",
      emergencyContact: "Sarah Johnson - (555) 345-6790",
    },
    {
      id: "P004",
      name: "Sarah Wilson",
      age: 28,
      phone: "(555) 456-7890",
      lastVisit: "2024-01-22",
      status: "Active",
      treatments: 2,
      allergies: ["Shellfish"],
      medications: ["Vitamin D"],
      medicalHistory: "No significant history",
      emergencyContact: "Tom Wilson - (555) 456-7891",
    },
  ]

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || patient.status.toLowerCase() === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex-1">
          <h1 className="text-lg font-semibold">Patient Records</h1>
          <p className="text-sm text-muted-foreground">View and manage patient information</p>
        </div>
      </header>

      <main className="flex-1 p-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>Patient Database</CardTitle>
                <CardDescription>Search and filter patient records</CardDescription>
              </div>
              <Button>
                <FileText className="h-4 w-4 mr-2" />
                Add New Patient
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by name or patient ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Patients</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Patient Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Last Visit</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Treatments</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell className="font-medium">{patient.id}</TableCell>
                      <TableCell>{patient.name}</TableCell>
                      <TableCell>{patient.age}</TableCell>
                      <TableCell>{patient.phone}</TableCell>
                      <TableCell>{patient.lastVisit}</TableCell>
                      <TableCell>
                        <Badge variant={patient.status === "Active" ? "default" : "secondary"}>{patient.status}</Badge>
                      </TableCell>
                      <TableCell>{patient.treatments}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Patient Record - {patient.name}</DialogTitle>
                                <DialogDescription>Complete patient information and medical history</DialogDescription>
                              </DialogHeader>

                              <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-sm font-medium">Patient ID</Label>
                                    <p className="text-sm text-muted-foreground">{patient.id}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Age</Label>
                                    <p className="text-sm text-muted-foreground">{patient.age} years</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Phone</Label>
                                    <p className="text-sm text-muted-foreground">{patient.phone}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Last Visit</Label>
                                    <p className="text-sm text-muted-foreground">{patient.lastVisit}</p>
                                  </div>
                                </div>

                                <Accordion type="single" collapsible className="w-full">
                                  <AccordionItem value="allergies">
                                    <AccordionTrigger>Allergies & Medications</AccordionTrigger>
                                    <AccordionContent>
                                      <div className="space-y-4">
                                        <div>
                                          <Label className="text-sm font-medium">Known Allergies</Label>
                                          <div className="flex flex-wrap gap-2 mt-2">
                                            {patient.allergies.map((allergy) => (
                                              <Badge key={allergy} variant="destructive">
                                                {allergy}
                                              </Badge>
                                            ))}
                                          </div>
                                        </div>
                                        <div>
                                          <Label className="text-sm font-medium">Current Medications</Label>
                                          <div className="flex flex-wrap gap-2 mt-2">
                                            {patient.medications.map((medication) => (
                                              <Badge key={medication} variant="secondary">
                                                {medication}
                                              </Badge>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    </AccordionContent>
                                  </AccordionItem>

                                  <AccordionItem value="history">
                                    <AccordionTrigger>Medical History</AccordionTrigger>
                                    <AccordionContent>
                                      <p className="text-sm text-muted-foreground">{patient.medicalHistory}</p>
                                    </AccordionContent>
                                  </AccordionItem>

                                  <AccordionItem value="emergency">
                                    <AccordionTrigger>Emergency Contact</AccordionTrigger>
                                    <AccordionContent>
                                      <p className="text-sm text-muted-foreground">{patient.emergencyContact}</p>
                                    </AccordionContent>
                                  </AccordionItem>

                                  <AccordionItem value="treatments">
                                    <AccordionTrigger>Treatment History</AccordionTrigger>
                                    <AccordionContent>
                                      <div className="space-y-2">
                                        <div className="flex justify-between items-center p-2 border rounded">
                                          <span className="text-sm">Root Canal - Tooth #14</span>
                                          <span className="text-xs text-muted-foreground">2023-12-15</span>
                                        </div>
                                        <div className="flex justify-between items-center p-2 border rounded">
                                          <span className="text-sm">Dental Cleaning</span>
                                          <span className="text-xs text-muted-foreground">2023-11-20</span>
                                        </div>
                                        <div className="flex justify-between items-center p-2 border rounded">
                                          <span className="text-sm">Consultation</span>
                                          <span className="text-xs text-muted-foreground">2023-10-10</span>
                                        </div>
                                      </div>
                                    </AccordionContent>
                                  </AccordionItem>
                                </Accordion>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>

                          <Button variant="outline" size="sm">
                            <Calendar className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredPatients.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No patients found matching your criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

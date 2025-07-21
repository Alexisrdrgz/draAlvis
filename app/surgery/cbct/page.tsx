"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Upload, Download, Eye, ExternalLink } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export default function CBCTImages() {
  const [searchTerm, setSearchTerm] = useState("")
  const [patientFilter, setPatientFilter] = useState("all")

  const cbctStudies = [
    {
      id: "CBCT001",
      patientName: "John Doe",
      patientId: "P001",
      studyDate: "2024-01-20",
      studyType: "Pre-surgical Planning",
      region: "Mandible",
      slices: 256,
      resolution: "0.2mm",
      status: "Completed",
      fileSize: "45.2 MB",
      notes: "Implant site evaluation",
    },
    {
      id: "CBCT002",
      patientName: "Jane Smith",
      patientId: "P002",
      studyDate: "2024-01-18",
      studyType: "Post-surgical",
      region: "Maxilla",
      slices: 180,
      resolution: "0.3mm",
      status: "Completed",
      fileSize: "32.1 MB",
      notes: "Follow-up after implant placement",
    },
    {
      id: "CBCT003",
      patientName: "Mike Johnson",
      patientId: "P003",
      studyDate: "2024-01-15",
      studyType: "Diagnostic",
      region: "Full Mouth",
      slices: 512,
      resolution: "0.15mm",
      status: "Processing",
      fileSize: "78.5 MB",
      notes: "Comprehensive evaluation",
    },
  ]

  const filteredStudies = cbctStudies.filter((study) => {
    const matchesSearch =
      study.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPatient = patientFilter === "all" || study.patientId === patientFilter
    return matchesSearch && matchesPatient
  })

  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex-1">
          <h1 className="text-lg font-semibold">CBCT & 3D X-ray Images</h1>
          <p className="text-sm text-muted-foreground">Manage and view 3D imaging studies</p>
        </div>
      </header>

      <main className="flex-1 p-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>CBCT Studies</CardTitle>
                <CardDescription>3D imaging studies and DICOM files</CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload CBCT Study
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Upload New CBCT Study</DialogTitle>
                    <DialogDescription>Upload DICOM files for a new 3D imaging study</DialogDescription>
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
                      <Label htmlFor="studyType">Study Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select study type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="diagnostic">Diagnostic</SelectItem>
                          <SelectItem value="pre-surgical">Pre-surgical Planning</SelectItem>
                          <SelectItem value="post-surgical">Post-surgical</SelectItem>
                          <SelectItem value="follow-up">Follow-up</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="region">Anatomical Region</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="maxilla">Maxilla</SelectItem>
                          <SelectItem value="mandible">Mandible</SelectItem>
                          <SelectItem value="full-mouth">Full Mouth</SelectItem>
                          <SelectItem value="tmj">TMJ</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4">
                        <Button variant="outline">Select DICOM Files</Button>
                        <p className="mt-2 text-sm text-gray-500">Upload .dcm files or ZIP archive</p>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Cancel</Button>
                      <Button>Upload Study</Button>
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
                  placeholder="Search by patient name or study ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={patientFilter} onValueChange={setPatientFilter}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Filter by patient" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Patients</SelectItem>
                  <SelectItem value="P001">John Doe (P001)</SelectItem>
                  <SelectItem value="P002">Jane Smith (P002)</SelectItem>
                  <SelectItem value="P003">Mike Johnson (P003)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Studies Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Study ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>Slices</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudies.map((study) => (
                    <TableRow key={study.id}>
                      <TableCell className="font-medium">{study.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{study.patientName}</div>
                          <div className="text-sm text-muted-foreground">{study.patientId}</div>
                        </div>
                      </TableCell>
                      <TableCell>{study.studyDate}</TableCell>
                      <TableCell>{study.studyType}</TableCell>
                      <TableCell>{study.region}</TableCell>
                      <TableCell>{study.slices}</TableCell>
                      <TableCell>
                        <Badge variant={study.status === "Completed" ? "default" : "secondary"}>{study.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-6xl max-h-[90vh]">
                              <DialogHeader>
                                <DialogTitle>CBCT Viewer - {study.id}</DialogTitle>
                                <DialogDescription>3D imaging study for {study.patientName}</DialogDescription>
                              </DialogHeader>

                              <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-sm font-medium">Patient</Label>
                                    <p className="text-sm text-muted-foreground">{study.patientName}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Study Date</Label>
                                    <p className="text-sm text-muted-foreground">{study.studyDate}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Study Type</Label>
                                    <p className="text-sm text-muted-foreground">{study.studyType}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Region</Label>
                                    <p className="text-sm text-muted-foreground">{study.region}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Resolution</Label>
                                    <p className="text-sm text-muted-foreground">{study.resolution}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">File Size</Label>
                                    <p className="text-sm text-muted-foreground">{study.fileSize}</p>
                                  </div>
                                </div>

                                <div>
                                  <Label className="text-sm font-medium">Notes</Label>
                                  <p className="text-sm text-muted-foreground mt-1">{study.notes}</p>
                                </div>

                                <div>
                                  <Label className="text-sm font-medium mb-3 block">Open with Imaging Software</Label>
                                  <div className="grid gap-3">
                                    <Button
                                      variant="outline"
                                      className="justify-start h-auto p-4"
                                      onClick={() => alert(`Opening CBCT study ${study.id} in Blue Sky Plan`)}
                                    >
                                      <div className="flex items-center gap-3">
                                        <span className="text-xl">🔵</span>
                                        <div className="text-left">
                                          <div className="font-medium">Blue Sky Plan</div>
                                          <div className="text-sm text-muted-foreground">
                                            Professional dental imaging and treatment planning
                                          </div>
                                        </div>
                                      </div>
                                      <ExternalLink className="h-4 w-4 ml-auto" />
                                    </Button>

                                    <Button
                                      variant="outline"
                                      className="justify-start h-auto p-4"
                                      onClick={() => alert(`Opening CBCT study ${study.id} in Horos`)}
                                    >
                                      <div className="flex items-center gap-3">
                                        <span className="text-xl">🏥</span>
                                        <div className="text-left">
                                          <div className="font-medium">Horos</div>
                                          <div className="text-sm text-muted-foreground">
                                            Free, open-source medical image viewer
                                          </div>
                                        </div>
                                      </div>
                                      <ExternalLink className="h-4 w-4 ml-auto" />
                                    </Button>

                                    <Button
                                      variant="outline"
                                      className="justify-start h-auto p-4"
                                      onClick={() => alert(`Opening CBCT study ${study.id} in 3D Slicer`)}
                                    >
                                      <div className="flex items-center gap-3">
                                        <span className="text-xl">🔬</span>
                                        <div className="text-left">
                                          <div className="font-medium">3D Slicer</div>
                                          <div className="text-sm text-muted-foreground">
                                            Advanced medical image analysis platform
                                          </div>
                                        </div>
                                      </div>
                                      <ExternalLink className="h-4 w-4 ml-auto" />
                                    </Button>
                                  </div>
                                </div>

                                <div className="flex justify-end gap-2">
                                  <Button variant="outline">
                                    <Download className="h-4 w-4 mr-2" />
                                    Download DICOM
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

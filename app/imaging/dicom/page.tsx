"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ExternalLink, Monitor, Download, Eye } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export default function DICOMViewer() {
  const [searchTerm, setSearchTerm] = useState("")
  const [modalityFilter, setModalityFilter] = useState("all")

  const dicomStudies = [
    {
      id: "DCM001",
      patientName: "John Doe",
      patientId: "P001",
      studyDate: "2024-01-20",
      modality: "CBCT",
      description: "Pre-surgical CBCT for implant planning",
      seriesCount: 3,
      imageCount: 256,
      fileSize: "45.2 MB",
      status: "Available",
      studyUID: "1.2.840.113619.2.55.3.604688119.971.1234567890.123",
    },
    {
      id: "DCM002",
      patientName: "Jane Smith",
      patientId: "P002",
      studyDate: "2024-01-18",
      modality: "Panoramic",
      description: "Panoramic X-ray for orthodontic evaluation",
      seriesCount: 1,
      imageCount: 1,
      fileSize: "2.1 MB",
      status: "Available",
      studyUID: "1.2.840.113619.2.55.3.604688119.971.1234567890.124",
    },
    {
      id: "DCM003",
      patientName: "Mike Johnson",
      patientId: "P003",
      studyDate: "2024-01-15",
      modality: "Intraoral",
      description: "Periapical X-rays for endodontic evaluation",
      seriesCount: 4,
      imageCount: 8,
      fileSize: "5.8 MB",
      status: "Available",
      studyUID: "1.2.840.113619.2.55.3.604688119.971.1234567890.125",
    },
  ]

  const viewerOptions = [
    {
      name: "Blue Sky Plan",
      description: "Professional dental imaging and treatment planning software",
      icon: "🔵",
      url: "https://www.blueskybio.com/",
      features: ["3D Implant Planning", "CBCT Analysis", "Surgical Guides", "Treatment Planning"],
    },
    {
      name: "Horos",
      description: "Free, open-source medical image viewer based on OsiriX",
      icon: "🏥",
      url: "https://horosproject.org/",
      features: ["DICOM Viewing", "3D Reconstruction", "Multi-planar Reconstruction", "Annotations"],
    },
    {
      name: "3D Slicer",
      description: "Open-source platform for medical image analysis and visualization",
      icon: "🔬",
      url: "https://www.slicer.org/",
      features: ["Advanced Visualization", "Image Segmentation", "Registration", "Quantitative Analysis"],
    },
  ]

  const filteredStudies = dicomStudies.filter((study) => {
    const matchesSearch =
      study.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesModality = modalityFilter === "all" || study.modality.toLowerCase() === modalityFilter
    return matchesSearch && matchesModality
  })

  const getModalityBadge = (modality: string) => {
    switch (modality) {
      case "CBCT":
        return <Badge className="bg-blue-100 text-blue-800">CBCT</Badge>
      case "Panoramic":
        return <Badge className="bg-green-100 text-green-800">Panoramic</Badge>
      case "Intraoral":
        return <Badge className="bg-purple-100 text-purple-800">Intraoral</Badge>
      default:
        return <Badge variant="outline">{modality}</Badge>
    }
  }

  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex-1">
          <h1 className="text-lg font-semibold">DICOM Viewer</h1>
          <p className="text-sm text-muted-foreground">Access DICOM studies with external imaging software</p>
        </div>
      </header>

      <main className="flex-1 p-6 space-y-6">
        {/* Viewer Options */}
        <Card>
          <CardHeader>
            <CardTitle>Available Imaging Software</CardTitle>
            <CardDescription>Choose your preferred DICOM viewer to open studies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {viewerOptions.map((viewer) => (
                <Card key={viewer.name} className="border-2 hover:border-blue-300 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{viewer.icon}</span>
                      <div>
                        <CardTitle className="text-lg">{viewer.name}</CardTitle>
                        <CardDescription className="text-sm">{viewer.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-1">
                        {viewer.features.slice(0, 2).map((feature) => (
                          <Badge key={feature} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                      <Button className="w-full" onClick={() => window.open(viewer.url, "_blank")}>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open {viewer.name}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* DICOM Studies */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>DICOM Studies</CardTitle>
                <CardDescription>Available imaging studies for viewing</CardDescription>
              </div>
              <Button variant="outline">
                <Monitor className="h-4 w-4 mr-2" />
                Network File Access
              </Button>
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
              <Select value={modalityFilter} onValueChange={setModalityFilter}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Modality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Modalities</SelectItem>
                  <SelectItem value="cbct">CBCT</SelectItem>
                  <SelectItem value="panoramic">Panoramic</SelectItem>
                  <SelectItem value="intraoral">Intraoral</SelectItem>
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
                    <TableHead>Modality</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Images</TableHead>
                    <TableHead>Size</TableHead>
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
                      <TableCell>{getModalityBadge(study.modality)}</TableCell>
                      <TableCell className="max-w-xs truncate">{study.description}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{study.imageCount} images</div>
                          <div className="text-muted-foreground">{study.seriesCount} series</div>
                        </div>
                      </TableCell>
                      <TableCell>{study.fileSize}</TableCell>
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
                                <DialogTitle>Study Details - {study.id}</DialogTitle>
                                <DialogDescription>DICOM study information and viewer options</DialogDescription>
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
                                    <Label className="text-sm font-medium">Modality</Label>
                                    {getModalityBadge(study.modality)}
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">File Size</Label>
                                    <p className="text-sm text-muted-foreground">{study.fileSize}</p>
                                  </div>
                                  <div className="col-span-2">
                                    <Label className="text-sm font-medium">Description</Label>
                                    <p className="text-sm text-muted-foreground">{study.description}</p>
                                  </div>
                                  <div className="col-span-2">
                                    <Label className="text-sm font-medium">Study UID</Label>
                                    <p className="text-xs text-muted-foreground font-mono">{study.studyUID}</p>
                                  </div>
                                </div>

                                <div>
                                  <Label className="text-sm font-medium mb-3 block">Open with Viewer</Label>
                                  <div className="grid gap-3">
                                    {viewerOptions.map((viewer) => (
                                      <Button
                                        key={viewer.name}
                                        variant="outline"
                                        className="justify-start h-auto p-4"
                                        onClick={() => {
                                          // In a real implementation, this would open the DICOM study
                                          // in the selected viewer application
                                          alert(`Opening study ${study.id} in ${viewer.name}`)
                                        }}
                                      >
                                        <div className="flex items-center gap-3">
                                          <span className="text-xl">{viewer.icon}</span>
                                          <div className="text-left">
                                            <div className="font-medium">{viewer.name}</div>
                                            <div className="text-sm text-muted-foreground">{viewer.description}</div>
                                          </div>
                                        </div>
                                        <ExternalLink className="h-4 w-4 ml-auto" />
                                      </Button>
                                    ))}
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

        {/* Network Access Information */}
        <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
          <CardHeader>
            <CardTitle className="text-blue-800 dark:text-blue-200">Network File Access</CardTitle>
            <CardDescription className="text-blue-700 dark:text-blue-300">
              Access DICOM studies directly from the network storage
            </CardDescription>
          </CardHeader>
          <CardContent className="text-blue-800 dark:text-blue-200">
            <div className="space-y-2 text-sm">
              <div>
                <strong>PACS Server:</strong> 192.168.1.100:4242
              </div>
              <div>
                <strong>Network Path:</strong> \\PACS-SERVER\DICOM\Studies
              </div>
              <div>
                <strong>Access:</strong> Use your network credentials to access studies directly in your preferred
                viewer
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

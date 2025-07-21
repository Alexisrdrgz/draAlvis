"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Upload, Download, Eye, Calendar, User, Camera } from "lucide-react"
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

export default function PhotoGallery() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [patientFilter, setPatientFilter] = useState("all")

  const photoSets = [
    {
      id: "PG001",
      patientName: "John Doe",
      patientId: "P001",
      procedureType: "Dental Implant",
      category: "Pre-operative",
      date: "2024-01-20",
      photographer: "Dr. Smith",
      imageCount: 6,
      description: "Pre-operative documentation for implant site preparation",
      tags: ["implant", "pre-op", "site-preparation"],
    },
    {
      id: "PG002",
      patientName: "John Doe",
      patientId: "P001",
      procedureType: "Dental Implant",
      category: "Post-operative",
      date: "2024-01-20",
      photographer: "Dr. Smith",
      imageCount: 8,
      description: "Post-operative healing documentation after implant placement",
      tags: ["implant", "post-op", "healing"],
    },
    {
      id: "PG003",
      patientName: "Jane Smith",
      patientId: "P002",
      procedureType: "Orthodontic Treatment",
      category: "Progress",
      date: "2024-01-18",
      photographer: "Dr. Johnson",
      imageCount: 4,
      description: "Monthly progress documentation for orthodontic treatment",
      tags: ["orthodontics", "progress", "alignment"],
    },
    {
      id: "PG004",
      patientName: "Mike Johnson",
      patientId: "P003",
      procedureType: "Wisdom Tooth Extraction",
      category: "Pre-operative",
      date: "2024-01-15",
      photographer: "Dr. Wilson",
      imageCount: 3,
      description: "Pre-extraction documentation showing impacted wisdom tooth",
      tags: ["extraction", "pre-op", "wisdom-tooth"],
    },
    {
      id: "PG005",
      patientName: "Mike Johnson",
      patientId: "P003",
      procedureType: "Wisdom Tooth Extraction",
      category: "Post-operative",
      date: "2024-01-15",
      photographer: "Dr. Wilson",
      imageCount: 5,
      description: "Post-extraction healing progress at 1 week follow-up",
      tags: ["extraction", "post-op", "healing"],
    },
  ]

  const filteredPhotoSets = photoSets.filter((set) => {
    const matchesSearch =
      set.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      set.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      set.procedureType.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || set.category.toLowerCase() === categoryFilter
    const matchesPatient = patientFilter === "all" || set.patientId === patientFilter
    return matchesSearch && matchesCategory && matchesPatient
  })

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "Pre-operative":
        return <Badge className="bg-blue-100 text-blue-800">Pre-operative</Badge>
      case "Post-operative":
        return <Badge className="bg-green-100 text-green-800">Post-operative</Badge>
      case "Progress":
        return <Badge className="bg-purple-100 text-purple-800">Progress</Badge>
      case "Consultation":
        return <Badge variant="secondary">Consultation</Badge>
      default:
        return <Badge variant="outline">{category}</Badge>
    }
  }

  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex-1">
          <h1 className="text-lg font-semibold">Photo Gallery</h1>
          <p className="text-sm text-muted-foreground">Pre/post-operative documentation and progress photos</p>
        </div>
      </header>

      <main className="flex-1 p-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>Clinical Photography</CardTitle>
                <CardDescription>Organize and manage clinical documentation photos</CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Photos
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Upload Clinical Photos</DialogTitle>
                    <DialogDescription>Add new photos to patient documentation</DialogDescription>
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
                        <Label htmlFor="procedure">Procedure Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select procedure" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="implant">Dental Implant</SelectItem>
                            <SelectItem value="extraction">Tooth Extraction</SelectItem>
                            <SelectItem value="orthodontics">Orthodontic Treatment</SelectItem>
                            <SelectItem value="surgery">Oral Surgery</SelectItem>
                            <SelectItem value="consultation">Consultation</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pre-operative">Pre-operative</SelectItem>
                            <SelectItem value="post-operative">Post-operative</SelectItem>
                            <SelectItem value="progress">Progress</SelectItem>
                            <SelectItem value="consultation">Consultation</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Input id="date" type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="photographer">Photographer</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select photographer" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dr-smith">Dr. Smith</SelectItem>
                            <SelectItem value="dr-johnson">Dr. Johnson</SelectItem>
                            <SelectItem value="dr-wilson">Dr. Wilson</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea id="description" placeholder="Brief description of the photos..." rows={3} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tags">Tags (comma-separated)</Label>
                      <Input id="tags" placeholder="e.g., implant, healing, follow-up" />
                    </div>

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Camera className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4">
                        <Button variant="outline">Select Photos</Button>
                        <p className="mt-2 text-sm text-gray-500">JPG, PNG files (max 10MB each)</p>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Cancel</Button>
                      <Button>Upload Photos</Button>
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
                  placeholder="Search by patient name, procedure, or photo set ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="pre-operative">Pre-operative</SelectItem>
                  <SelectItem value="post-operative">Post-operative</SelectItem>
                  <SelectItem value="progress">Progress</SelectItem>
                  <SelectItem value="consultation">Consultation</SelectItem>
                </SelectContent>
              </Select>
              <Select value={patientFilter} onValueChange={setPatientFilter}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Patient" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Patients</SelectItem>
                  <SelectItem value="P001">John Doe (P001)</SelectItem>
                  <SelectItem value="P002">Jane Smith (P002)</SelectItem>
                  <SelectItem value="P003">Mike Johnson (P003)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Photo Gallery Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPhotoSets.map((photoSet) => (
                <Card key={photoSet.id} className="overflow-hidden">
                  <div className="aspect-video bg-gray-100 flex items-center justify-center">
                    <Camera className="h-12 w-12 text-gray-400" />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm">{photoSet.procedureType}</CardTitle>
                      {getCategoryBadge(photoSet.category)}
                    </div>
                    <CardDescription className="text-xs">
                      {photoSet.patientName} • {photoSet.imageCount} photos
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {photoSet.date}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <User className="h-3 w-3" />
                        {photoSet.photographer}
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{photoSet.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {photoSet.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          <DialogHeader>
                            <DialogTitle>Photo Set - {photoSet.id}</DialogTitle>
                            <DialogDescription>
                              {photoSet.category} photos for {photoSet.patientName} - {photoSet.procedureType}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="text-sm font-medium">Patient</Label>
                                <p className="text-sm text-muted-foreground">{photoSet.patientName}</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">Procedure</Label>
                                <p className="text-sm text-muted-foreground">{photoSet.procedureType}</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">Category</Label>
                                {getCategoryBadge(photoSet.category)}
                              </div>
                              <div>
                                <Label className="text-sm font-medium">Date</Label>
                                <p className="text-sm text-muted-foreground">{photoSet.date}</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">Photographer</Label>
                                <p className="text-sm text-muted-foreground">{photoSet.photographer}</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">Image Count</Label>
                                <p className="text-sm text-muted-foreground">{photoSet.imageCount} photos</p>
                              </div>
                            </div>

                            <div>
                              <Label className="text-sm font-medium">Description</Label>
                              <p className="text-sm text-muted-foreground mt-1">{photoSet.description}</p>
                            </div>

                            <div>
                              <Label className="text-sm font-medium mb-3 block">Photos</Label>
                              <div className="grid grid-cols-3 gap-4">
                                {Array.from({ length: photoSet.imageCount }, (_, i) => (
                                  <div
                                    key={i}
                                    className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center border"
                                  >
                                    <span className="text-xs text-gray-500">Photo {i + 1}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <Label className="text-sm font-medium">Tags</Label>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {photoSet.tags.map((tag) => (
                                  <Badge key={tag} variant="outline">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div className="flex justify-end gap-2">
                              <Button variant="outline">
                                <Download className="h-4 w-4 mr-2" />
                                Download All
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredPhotoSets.length === 0 && (
              <div className="text-center py-12">
                <Camera className="mx-auto h-12 w-12 text-gray-400" />
                <p className="text-muted-foreground mt-4">No photo sets found matching your criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

"use client"

import { useState } from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Search, Filter, Calendar, User, FileText, MoreHorizontal, Eye, Download } from "lucide-react"

export default function StudiesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const studies = [
    {
      id: "STD-1001",
      patientName: "John Smith",
      patientId: "P-5432",
      studyType: "CBCT",
      date: "2023-06-15",
      status: "completed",
      assignedTo: "Dr. Sarah Johnson",
      size: "256 MB",
    },
    {
      id: "STD-1002",
      patientName: "Maria Garcia",
      patientId: "P-5433",
      studyType: "Panoramic",
      date: "2023-06-16",
      status: "in-progress",
      assignedTo: "Dr. Michael Chen",
      size: "128 MB",
    },
    {
      id: "STD-1003",
      patientName: "Robert Williams",
      patientId: "P-5434",
      studyType: "Cephalometric",
      date: "2023-06-17",
      status: "pending",
      assignedTo: "Dr. Emily Taylor",
      size: "96 MB",
    },
    {
      id: "STD-1004",
      patientName: "James Johnson",
      patientId: "P-5435",
      studyType: "CBCT",
      date: "2023-06-18",
      status: "completed",
      assignedTo: "Dr. Sarah Johnson",
      size: "312 MB",
    },
    {
      id: "STD-1005",
      patientName: "Patricia Brown",
      patientId: "P-5436",
      studyType: "Panoramic",
      date: "2023-06-19",
      status: "in-progress",
      assignedTo: "Dr. Michael Chen",
      size: "145 MB",
    },
    {
      id: "STD-1006",
      patientName: "Linda Davis",
      patientId: "P-5437",
      studyType: "CBCT",
      date: "2023-06-20",
      status: "pending",
      assignedTo: "Dr. Emily Taylor",
      size: "278 MB",
    },
  ]

  const filteredStudies = studies.filter((study) => {
    const matchesSearch =
      study.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.patientId.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || study.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>
      case "in-progress":
        return <Badge className="bg-blue-500">In Progress</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex-1">
          <h1 className="text-lg font-semibold">Study Management</h1>
          <p className="text-sm text-muted-foreground">Manage and organize patient imaging studies</p>
        </div>
        <Button>New Study</Button>
      </header>

      <main className="flex-1 p-6">
        <Tabs defaultValue="all-studies" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <TabsList>
              <TabsTrigger value="all-studies">All Studies</TabsTrigger>
              <TabsTrigger value="my-studies">My Studies</TabsTrigger>
              <TabsTrigger value="shared">Shared With Me</TabsTrigger>
            </TabsList>
            <div className="mt-3 flex items-center gap-2 sm:mt-0">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search studies..."
                  className="w-full pl-8 md:w-[200px] lg:w-[300px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span>Filter by Status</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="all-studies" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Studies</CardTitle>
                <CardDescription>
                  Showing {filteredStudies.length} of {studies.length} studies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Study ID</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudies.map((study) => (
                      <TableRow key={study.id}>
                        <TableCell className="font-medium">{study.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{study.patientName}</div>
                            <div className="text-xs text-muted-foreground">{study.patientId}</div>
                          </div>
                        </TableCell>
                        <TableCell>{study.studyType}</TableCell>
                        <TableCell>{study.date}</TableCell>
                        <TableCell>{getStatusBadge(study.status)}</TableCell>
                        <TableCell>{study.assignedTo}</TableCell>
                        <TableCell>{study.size}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="icon" variant="ghost">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                            <Button size="icon" variant="ghost">
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download</span>
                            </Button>
                            <Button size="icon" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">More</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      Recent Studies
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {studies.slice(0, 3).map((study) => (
                      <div key={study.id} className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{study.patientName}</p>
                          <p className="text-xs text-muted-foreground">{study.studyType}</p>
                        </div>
                        <div className="text-xs text-muted-foreground">{study.date}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      Assigned to Me
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {studies
                      .filter((s) => s.assignedTo === "Dr. Sarah Johnson")
                      .map((study) => (
                        <div key={study.id} className="flex items-center justify-between">
                          <div className="space-y-1">
                            <p className="text-sm font-medium">{study.patientName}</p>
                            <p className="text-xs text-muted-foreground">{study.studyType}</p>
                          </div>
                          <div>{getStatusBadge(study.status)}</div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      Study Types
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">CBCT</div>
                      <div className="text-sm text-muted-foreground">3 studies</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Panoramic</div>
                      <div className="text-sm text-muted-foreground">2 studies</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Cephalometric</div>
                      <div className="text-sm text-muted-foreground">1 study</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="my-studies">
            <Card>
              <CardHeader>
                <CardTitle>My Studies</CardTitle>
                <CardDescription>Studies assigned to you or created by you</CardDescription>
              </CardHeader>
              <CardContent>
                <p>My studies content will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shared">
            <Card>
              <CardHeader>
                <CardTitle>Shared With Me</CardTitle>
                <CardDescription>Studies shared with you by other users</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Shared studies content will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

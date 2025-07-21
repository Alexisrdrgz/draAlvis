import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, FileText, Calendar, Users } from "lucide-react"

export default function StudyCasesPage() {
  const studyCases = [
    {
      id: "SC-2023-001",
      patientName: "Maria Rodriguez",
      patientId: "P-10045",
      type: "Implant Feasibility",
      status: "active",
      assignedTo: "Dr. Sarah Johnson",
      createdAt: "2023-10-15",
      lastUpdated: "2023-11-02",
    },
    {
      id: "SC-2023-002",
      patientName: "John Smith",
      patientId: "P-10078",
      type: "Bone Density Analysis",
      status: "completed",
      assignedTo: "Dr. Michael Chen",
      createdAt: "2023-09-22",
      lastUpdated: "2023-10-30",
    },
    {
      id: "SC-2023-003",
      patientName: "Emily Wilson",
      patientId: "P-10103",
      type: "Sinus Lift Evaluation",
      status: "pending",
      assignedTo: "Dr. Sarah Johnson",
      createdAt: "2023-11-01",
      lastUpdated: "2023-11-01",
    },
    {
      id: "SC-2023-004",
      patientName: "Robert Garcia",
      patientId: "P-10056",
      type: "Full Mouth Reconstruction",
      status: "active",
      assignedTo: "Dr. James Wilson",
      createdAt: "2023-10-28",
      lastUpdated: "2023-11-03",
    },
    {
      id: "SC-2023-005",
      patientName: "Sophia Lee",
      patientId: "P-10089",
      type: "Implant Feasibility",
      status: "on-hold",
      assignedTo: "Dr. Michael Chen",
      createdAt: "2023-10-10",
      lastUpdated: "2023-10-25",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-blue-500">Active</Badge>
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>
      case "on-hold":
        return <Badge className="bg-orange-500">On Hold</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Study Cases</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Study Case
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Cases</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Study Cases Management</CardTitle>
              <CardDescription>Manage and track all patient study cases in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 w-full max-w-sm">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search cases..." className="flex-1" />
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="implant">Implant Feasibility</SelectItem>
                      <SelectItem value="bone">Bone Density Analysis</SelectItem>
                      <SelectItem value="sinus">Sinus Lift Evaluation</SelectItem>
                      <SelectItem value="reconstruction">Full Mouth Reconstruction</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Doctors</SelectItem>
                      <SelectItem value="johnson">Dr. Sarah Johnson</SelectItem>
                      <SelectItem value="chen">Dr. Michael Chen</SelectItem>
                      <SelectItem value="wilson">Dr. James Wilson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Case ID</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studyCases.map((studyCase) => (
                      <TableRow key={studyCase.id}>
                        <TableCell className="font-medium">{studyCase.id}</TableCell>
                        <TableCell>
                          {studyCase.patientName}
                          <div className="text-xs text-muted-foreground">{studyCase.patientId}</div>
                        </TableCell>
                        <TableCell>{studyCase.type}</TableCell>
                        <TableCell>{getStatusBadge(studyCase.status)}</TableCell>
                        <TableCell>{studyCase.assignedTo}</TableCell>
                        <TableCell>{studyCase.createdAt}</TableCell>
                        <TableCell>{studyCase.lastUpdated}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="icon">
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon">
                              <Calendar className="h-4 w-4" />
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
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Study Cases</CardTitle>
              <CardDescription>Currently active study cases requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Similar table structure with filtered data */}
              <div className="text-center py-8 text-muted-foreground">Showing active cases only</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Study Cases</CardTitle>
              <CardDescription>Cases awaiting review or assignment</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Similar table structure with filtered data */}
              <div className="text-center py-8 text-muted-foreground">Showing pending cases only</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Completed Study Cases</CardTitle>
              <CardDescription>Successfully completed study cases</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Similar table structure with filtered data */}
              <div className="text-center py-8 text-muted-foreground">Showing completed cases only</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates on study cases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                  <FileText className="h-4 w-4 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium">Case SC-2023-004 updated</p>
                  <p className="text-sm text-muted-foreground">Dr. James Wilson added new CBCT analysis</p>
                  <p className="text-xs text-muted-foreground">Today at 10:23 AM</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                  <Users className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <p className="font-medium">Case SC-2023-002 completed</p>
                  <p className="text-sm text-muted-foreground">Dr. Michael Chen marked case as completed</p>
                  <p className="text-xs text-muted-foreground">Yesterday at 4:45 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-yellow-100 dark:bg-yellow-900 p-2 rounded-full">
                  <Calendar className="h-4 w-4 text-yellow-500" />
                </div>
                <div>
                  <p className="font-medium">New case SC-2023-005 created</p>
                  <p className="text-sm text-muted-foreground">Assigned to Dr. Michael Chen</p>
                  <p className="text-xs text-muted-foreground">Nov 1, 2023</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Study Case Statistics</CardTitle>
            <CardDescription>Overview of study case distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background rounded-lg p-4 border">
                  <div className="text-sm font-medium text-muted-foreground">Total Cases</div>
                  <div className="text-3xl font-bold">24</div>
                </div>
                <div className="bg-background rounded-lg p-4 border">
                  <div className="text-sm font-medium text-muted-foreground">Active Cases</div>
                  <div className="text-3xl font-bold">12</div>
                </div>
                <div className="bg-background rounded-lg p-4 border">
                  <div className="text-sm font-medium text-muted-foreground">Completed This Month</div>
                  <div className="text-3xl font-bold">8</div>
                </div>
                <div className="bg-background rounded-lg p-4 border">
                  <div className="text-sm font-medium text-muted-foreground">Avg. Completion Time</div>
                  <div className="text-3xl font-bold">14d</div>
                </div>
              </div>
              <div className="h-[150px] flex items-center justify-center border rounded-md bg-muted/20">
                <p className="text-sm text-muted-foreground">Case distribution chart placeholder</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

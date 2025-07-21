import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Save, Upload, X } from "lucide-react"

export default function CreateStudyCase() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">Create New Study Case</h1>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="details">Case Details</TabsTrigger>
          <TabsTrigger value="imaging">Imaging Data</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="review">Review & Submit</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Enter the basic details for this study case</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="case-id">Case ID</Label>
                  <Input id="case-id" placeholder="Auto-generated" disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="case-type">Case Type</Label>
                  <Select>
                    <SelectTrigger id="case-type">
                      <SelectValue placeholder="Select case type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="implant">Implant Feasibility</SelectItem>
                      <SelectItem value="bone">Bone Density Analysis</SelectItem>
                      <SelectItem value="sinus">Sinus Lift Evaluation</SelectItem>
                      <SelectItem value="reconstruction">Full Mouth Reconstruction</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="case-title">Case Title</Label>
                <Input id="case-title" placeholder="Enter a descriptive title for this case" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="case-description">Description</Label>
                <Textarea id="case-description" placeholder="Provide a detailed description of the case" rows={4} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
              <CardDescription>Select or enter patient details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="patient-search">Search Patient</Label>
                <div className="flex gap-2">
                  <Input id="patient-search" placeholder="Search by name or ID" className="flex-1" />
                  <Button variant="secondary">Search</Button>
                </div>
              </div>

              <div className="border rounded-md p-4 bg-muted/20">
                <div className="text-center text-muted-foreground">
                  No patient selected. Search for a patient or enter details manually.
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="patient-name">Patient Name</Label>
                  <Input id="patient-name" placeholder="Full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="patient-id">Patient ID</Label>
                  <Input id="patient-id" placeholder="Patient ID" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="patient-age">Age</Label>
                  <Input id="patient-age" type="number" placeholder="Age" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="patient-gender">Gender</Label>
                  <Select>
                    <SelectTrigger id="patient-gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Assignment</CardTitle>
              <CardDescription>Assign this case to a doctor or team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="assigned-to">Assigned To</Label>
                  <Select>
                    <SelectTrigger id="assigned-to">
                      <SelectValue placeholder="Select doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="johnson">Dr. Sarah Johnson</SelectItem>
                      <SelectItem value="chen">Dr. Michael Chen</SelectItem>
                      <SelectItem value="wilson">Dr. James Wilson</SelectItem>
                      <SelectItem value="patel">Dr. Anita Patel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select>
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="due-date">Due Date</Label>
                <Input id="due-date" type="date" />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="notify" />
                <Label htmlFor="notify">Notify assigned doctor via email</Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Save and Continue</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="imaging" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Imaging Data</CardTitle>
              <CardDescription>Upload or link to imaging data for this study case</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <div className="flex flex-col items-center space-y-4">
                  <Upload className="h-10 w-10 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Drag and drop files here or click to browse</p>
                    <p className="text-sm text-muted-foreground">
                      Support for DICOM, STL, OBJ, and image files (max 500MB)
                    </p>
                  </div>
                  <Button>Browse Files</Button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm font-medium">Uploaded Files</div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded-md bg-background">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-md">
                        <div className="h-6 w-6 text-blue-500">DICOM</div>
                      </div>
                      <div>
                        <p className="font-medium">patient_scan_full.dcm</p>
                        <p className="text-xs text-muted-foreground">125 MB • Uploaded just now</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-md bg-background">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 dark:bg-green-900 p-2 rounded-md">
                        <div className="h-6 w-6 text-green-500">STL</div>
                      </div>
                      <div>
                        <p className="font-medium">mandible_model.stl</p>
                        <p className="text-xs text-muted-foreground">45 MB • Uploaded just now</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="external-link">External Imaging Link</Label>
                <div className="flex gap-2">
                  <Input id="external-link" placeholder="Enter URL to external imaging data" className="flex-1" />
                  <Button variant="secondary">Add Link</Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  You can link to images stored in PACS or other external systems
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Back</Button>
              <Button>Save and Continue</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Analysis Parameters</CardTitle>
              <CardDescription>Define the parameters for case analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="analysis-type">Analysis Type</Label>
                <Select>
                  <SelectTrigger id="analysis-type">
                    <SelectValue placeholder="Select analysis type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bone-density">Bone Density</SelectItem>
                    <SelectItem value="implant-planning">Implant Planning</SelectItem>
                    <SelectItem value="nerve-mapping">Nerve Mapping</SelectItem>
                    <SelectItem value="sinus-evaluation">Sinus Evaluation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="analysis-notes">Analysis Notes</Label>
                <Textarea id="analysis-notes" placeholder="Enter specific instructions for analysis" rows={4} />
              </div>

              <div className="space-y-2">
                <div className="font-medium mb-2">Analysis Regions</div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="region-upper-right" />
                    <Label htmlFor="region-upper-right">Upper Right Quadrant</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="region-upper-left" />
                    <Label htmlFor="region-upper-left">Upper Left Quadrant</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="region-lower-right" />
                    <Label htmlFor="region-lower-right">Lower Right Quadrant</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="region-lower-left" />
                    <Label htmlFor="region-lower-left">Lower Left Quadrant</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-medium mb-2">Specific Teeth</div>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {Array.from({ length: 32 }).map((_, i) => (
                    <div key={i} className="flex items-center space-x-1">
                      <Checkbox id={`tooth-${i + 1}`} />
                      <Label htmlFor={`tooth-${i + 1}`} className="text-xs">
                        {i + 1}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Back</Button>
              <Button>Save and Continue</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="review" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Review Study Case</CardTitle>
              <CardDescription>Review all information before submitting</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Case Details</h3>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
                    <div className="text-sm font-medium">Case Type:</div>
                    <div className="text-sm">Implant Feasibility</div>
                    <div className="text-sm font-medium">Case Title:</div>
                    <div className="text-sm">Mandibular Implant Evaluation</div>
                    <div className="text-sm font-medium">Description:</div>
                    <div className="text-sm">Evaluation for potential implant placement in positions 30-32</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Patient Information</h3>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
                    <div className="text-sm font-medium">Patient Name:</div>
                    <div className="text-sm">John Smith</div>
                    <div className="text-sm font-medium">Patient ID:</div>
                    <div className="text-sm">P-10078</div>
                    <div className="text-sm font-medium">Age:</div>
                    <div className="text-sm">45</div>
                    <div className="text-sm font-medium">Gender:</div>
                    <div className="text-sm">Male</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Assignment</h3>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
                    <div className="text-sm font-medium">Assigned To:</div>
                    <div className="text-sm">Dr. Michael Chen</div>
                    <div className="text-sm font-medium">Priority:</div>
                    <div className="text-sm">Medium</div>
                    <div className="text-sm font-medium">Due Date:</div>
                    <div className="text-sm">November 15, 2023</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Imaging Data</h3>
                  <div className="mt-2 space-y-2">
                    <div className="text-sm">2 files uploaded:</div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="bg-blue-100 dark:bg-blue-900 p-1 rounded-md text-blue-500 text-xs">DICOM</div>
                      <div>patient_scan_full.dcm (125 MB)</div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="bg-green-100 dark:bg-green-900 p-1 rounded-md text-green-500 text-xs">STL</div>
                      <div>mandible_model.stl (45 MB)</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Analysis Parameters</h3>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
                    <div className="text-sm font-medium">Analysis Type:</div>
                    <div className="text-sm">Implant Planning</div>
                    <div className="text-sm font-medium">Regions:</div>
                    <div className="text-sm">Lower Right Quadrant</div>
                    <div className="text-sm font-medium">Specific Teeth:</div>
                    <div className="text-sm">30, 31, 32</div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Back</Button>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Submit Study Case
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

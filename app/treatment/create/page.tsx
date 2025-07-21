"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Plus, X, Calendar, Clock, User } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CreateTreatmentPlan() {
  const [treatmentSteps, setTreatmentSteps] = useState([{ id: 1, step: "", duration: "", cost: "", notes: "" }])

  const addTreatmentStep = () => {
    const newStep = {
      id: treatmentSteps.length + 1,
      step: "",
      duration: "",
      cost: "",
      notes: "",
    }
    setTreatmentSteps([...treatmentSteps, newStep])
  }

  const removeTreatmentStep = (id: number) => {
    setTreatmentSteps(treatmentSteps.filter((step) => step.id !== id))
  }

  const updateTreatmentStep = (id: number, field: string, value: string) => {
    setTreatmentSteps(treatmentSteps.map((step) => (step.id === id ? { ...step, [field]: value } : step)))
  }

  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex-1">
          <h1 className="text-lg font-semibold">Create Treatment Plan</h1>
          <p className="text-sm text-muted-foreground">Design comprehensive treatment plans for patients</p>
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Basic Info
              </TabsTrigger>
              <TabsTrigger value="diagnosis" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Diagnosis
              </TabsTrigger>
              <TabsTrigger value="treatment" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Treatment Steps
              </TabsTrigger>
              <TabsTrigger value="schedule" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Schedule
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              <Card>
                <CardHeader>
                  <CardTitle>Patient Information</CardTitle>
                  <CardDescription>Select patient and basic treatment details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          <SelectItem value="p004">Sarah Wilson (P004)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dentist">Assigned Dentist</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select dentist" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dr-smith">Dr. Smith</SelectItem>
                          <SelectItem value="dr-johnson">Dr. Johnson</SelectItem>
                          <SelectItem value="dr-wilson">Dr. Wilson</SelectItem>
                          <SelectItem value="dr-brown">Dr. Brown</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="planName">Treatment Plan Name</Label>
                      <Input id="planName" placeholder="Enter treatment plan name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority Level</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Treatment Description</Label>
                    <Textarea id="description" placeholder="Brief description of the treatment plan..." rows={3} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="estimatedCost">Estimated Total Cost</Label>
                      <Input id="estimatedCost" type="number" placeholder="0.00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="estimatedDuration">Estimated Duration</Label>
                      <Input id="estimatedDuration" placeholder="e.g., 6 weeks" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sessions">Number of Sessions</Label>
                      <Input id="sessions" type="number" placeholder="0" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="diagnosis">
              <Card>
                <CardHeader>
                  <CardTitle>Diagnosis & Assessment</CardTitle>
                  <CardDescription>Record clinical findings and diagnosis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="chiefComplaint">Chief Complaint</Label>
                    <Textarea id="chiefComplaint" placeholder="Patient's main concern or complaint..." rows={3} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="clinicalFindings">Clinical Findings</Label>
                    <Textarea id="clinicalFindings" placeholder="Detailed clinical examination findings..." rows={4} />
                  </div>

                  <div className="space-y-4">
                    <Label>Affected Teeth (Check all that apply)</Label>
                    <div className="grid grid-cols-8 gap-2">
                      {Array.from({ length: 32 }, (_, i) => i + 1).map((tooth) => (
                        <div key={tooth} className="flex items-center space-x-2">
                          <Checkbox id={`tooth-${tooth}`} />
                          <Label htmlFor={`tooth-${tooth}`} className="text-sm">
                            {tooth}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="diagnosis">Primary Diagnosis</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select diagnosis" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="caries">Dental Caries</SelectItem>
                          <SelectItem value="periodontitis">Periodontitis</SelectItem>
                          <SelectItem value="pulpitis">Pulpitis</SelectItem>
                          <SelectItem value="impaction">Tooth Impaction</SelectItem>
                          <SelectItem value="malocclusion">Malocclusion</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="severity">Severity</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select severity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mild">Mild</SelectItem>
                          <SelectItem value="moderate">Moderate</SelectItem>
                          <SelectItem value="severe">Severe</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additionalNotes">Additional Diagnostic Notes</Label>
                    <Textarea id="additionalNotes" placeholder="Any additional observations or notes..." rows={3} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="treatment">
              <Card>
                <CardHeader>
                  <CardTitle>Treatment Steps</CardTitle>
                  <CardDescription>Define the sequence of treatments and procedures</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {treatmentSteps.map((step, index) => (
                    <div key={step.id} className="border rounded-lg p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">Step {index + 1}</Badge>
                        {treatmentSteps.length > 1 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeTreatmentStep(step.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`step-${step.id}`}>Treatment/Procedure</Label>
                          <Select
                            value={step.step}
                            onValueChange={(value) => updateTreatmentStep(step.id, "step", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select treatment" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="consultation">Initial Consultation</SelectItem>
                              <SelectItem value="cleaning">Dental Cleaning</SelectItem>
                              <SelectItem value="filling">Dental Filling</SelectItem>
                              <SelectItem value="root-canal">Root Canal</SelectItem>
                              <SelectItem value="crown">Crown Placement</SelectItem>
                              <SelectItem value="extraction">Tooth Extraction</SelectItem>
                              <SelectItem value="implant">Dental Implant</SelectItem>
                              <SelectItem value="orthodontics">Orthodontic Treatment</SelectItem>
                              <SelectItem value="surgery">Oral Surgery</SelectItem>
                              <SelectItem value="follow-up">Follow-up Visit</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`duration-${step.id}`}>Estimated Duration</Label>
                          <Input
                            id={`duration-${step.id}`}
                            placeholder="e.g., 1 hour"
                            value={step.duration}
                            onChange={(e) => updateTreatmentStep(step.id, "duration", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`cost-${step.id}`}>Estimated Cost</Label>
                          <Input
                            id={`cost-${step.id}`}
                            type="number"
                            placeholder="0.00"
                            value={step.cost}
                            onChange={(e) => updateTreatmentStep(step.id, "cost", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`notes-${step.id}`}>Notes</Label>
                          <Input
                            id={`notes-${step.id}`}
                            placeholder="Additional notes for this step"
                            value={step.notes}
                            onChange={(e) => updateTreatmentStep(step.id, "notes", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <Button onClick={addTreatmentStep} variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Treatment Step
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule">
              <Card>
                <CardHeader>
                  <CardTitle>Treatment Schedule</CardTitle>
                  <CardDescription>Plan appointment dates and follow-up schedule</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Treatment Start Date</Label>
                      <Input id="startDate" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate">Expected End Date</Label>
                      <Input id="endDate" type="date" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Follow-up Schedule</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="followup-1week" />
                        <Label htmlFor="followup-1week">1 Week Follow-up</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="followup-1month" />
                        <Label htmlFor="followup-1month">1 Month Follow-up</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="followup-3month" />
                        <Label htmlFor="followup-3month">3 Month Follow-up</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="followup-6month" />
                        <Label htmlFor="followup-6month">6 Month Follow-up</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="followup-1year" />
                        <Label htmlFor="followup-1year">1 Year Follow-up</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="followup-custom" />
                        <Label htmlFor="followup-custom">Custom Schedule</Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialInstructions">Special Instructions</Label>
                    <Textarea
                      id="specialInstructions"
                      placeholder="Any special instructions for the patient or treatment team..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emergencyContact">Emergency Contact Instructions</Label>
                    <Textarea
                      id="emergencyContact"
                      placeholder="Instructions for patient in case of emergency or complications..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-4 mt-6">
            <Button variant="outline">Save as Draft</Button>
            <Button>Create Treatment Plan</Button>
          </div>
        </div>
      </main>
    </div>
  )
}

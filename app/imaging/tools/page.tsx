"use client"

import { useState } from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Settings,
  Puzzle,
  CheckCircle,
  XCircle,
  AlertCircle,
  ExternalLink,
  RefreshCw,
  Layers,
  SmileIcon as Teeth,
  Brain,
  FileImage,
} from "lucide-react"

export default function ToolsIntegrationPage() {
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 2000)
  }

  const integrations = [
    {
      id: "blue-sky",
      name: "Blue Sky Plan",
      description: "Professional dental implant planning software",
      status: "connected",
      icon: Teeth,
      version: "5.2.1",
      lastSync: "2 hours ago",
      category: "imaging",
    },
    {
      id: "horos",
      name: "Horos",
      description: "Open source medical image viewer",
      status: "connected",
      icon: Brain,
      version: "4.0.0",
      lastSync: "1 day ago",
      category: "imaging",
    },
    {
      id: "3d-slicer",
      name: "3D Slicer",
      description: "Platform for medical image informatics",
      status: "disconnected",
      icon: Layers,
      version: "5.0.3",
      lastSync: "Never",
      category: "imaging",
    },
    {
      id: "dental-pacs",
      name: "Dental PACS",
      description: "Picture archiving and communication system",
      status: "error",
      icon: FileImage,
      version: "3.1.2",
      lastSync: "Failed",
      category: "imaging",
    },
  ]

  const getStatusBadge = (status) => {
    switch (status) {
      case "connected":
        return <Badge className="bg-green-500">Connected</Badge>
      case "disconnected":
        return <Badge variant="outline">Disconnected</Badge>
      case "error":
        return <Badge variant="destructive">Error</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "disconnected":
        return <XCircle className="h-5 w-5 text-muted-foreground" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex-1">
          <h1 className="text-lg font-semibold">Tools Integration</h1>
          <p className="text-sm text-muted-foreground">Manage external software integrations</p>
        </div>
        <Button onClick={handleRefresh} disabled={refreshing}>
          <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </header>

      <main className="flex-1 p-6">
        <Tabs defaultValue="imaging" className="space-y-4">
          <div className="flex justify-between">
            <TabsList>
              <TabsTrigger value="imaging">Imaging</TabsTrigger>
              <TabsTrigger value="practice">Practice Management</TabsTrigger>
              <TabsTrigger value="lab">Lab Integration</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="imaging" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {integrations
                .filter((i) => i.category === "imaging")
                .map((integration) => (
                  <Card key={integration.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="flex items-center gap-2">
                            <integration.icon className="h-5 w-5" />
                            {integration.name}
                          </CardTitle>
                          <CardDescription>{integration.description}</CardDescription>
                        </div>
                        {getStatusIcon(integration.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-muted-foreground">Status</div>
                        <div>{getStatusBadge(integration.status)}</div>
                        <div className="text-muted-foreground">Version</div>
                        <div>{integration.version}</div>
                        <div className="text-muted-foreground">Last Sync</div>
                        <div>{integration.lastSync}</div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t bg-muted/50 px-6 py-3">
                      <Button variant="ghost" size="sm">
                        <Settings className="mr-2 h-4 w-4" />
                        Configure
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Launch
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Integration Settings</CardTitle>
                <CardDescription>Configure how external imaging tools interact with the system</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">File Handling</h3>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-import">Automatic DICOM Import</Label>
                      <p className="text-xs text-muted-foreground">Automatically import DICOM files when detected</p>
                    </div>
                    <Switch id="auto-import" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-categorize">Auto-categorize Studies</Label>
                      <p className="text-xs text-muted-foreground">
                        Automatically categorize studies based on DICOM tags
                      </p>
                    </div>
                    <Switch id="auto-categorize" defaultChecked />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Default Applications</h3>
                  <Separator />
                  <div className="grid gap-2">
                    <Label htmlFor="default-viewer">Default DICOM Viewer</Label>
                    <div className="flex gap-2">
                      <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                        <option value="blue-sky">Blue Sky Plan</option>
                        <option value="horos">Horos</option>
                        <option value="3d-slicer">3D Slicer</option>
                      </select>
                      <Button variant="outline">Set Default</Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Installation Directory</h3>
                  <Separator />
                  <div className="grid gap-2">
                    <Label htmlFor="install-dir">External Tools Location</Label>
                    <div className="flex gap-2">
                      <Input id="install-dir" value="C:\Program Files\Dental\ExternalTools" readOnly />
                      <Button variant="outline">Browse</Button>
                    </div>
                    <p className="text-xs text-muted-foreground">Location where external imaging tools are installed</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t px-6 py-4">
                <Button variant="outline">Reset to Defaults</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="practice">
            <Card>
              <CardHeader>
                <CardTitle>Practice Management Integrations</CardTitle>
                <CardDescription>Connect with practice management software</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
                  <div className="flex flex-col items-center gap-1 text-center">
                    <Puzzle className="h-10 w-10 text-muted-foreground" />
                    <h3 className="text-lg font-medium">No Integrations Available</h3>
                    <p className="text-sm text-muted-foreground">Practice management integrations will appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lab">
            <Card>
              <CardHeader>
                <CardTitle>Lab Integrations</CardTitle>
                <CardDescription>Connect with dental laboratories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
                  <div className="flex flex-col items-center gap-1 text-center">
                    <Puzzle className="h-10 w-10 text-muted-foreground" />
                    <h3 className="text-lg font-medium">No Lab Integrations Available</h3>
                    <p className="text-sm text-muted-foreground">Lab integrations will appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

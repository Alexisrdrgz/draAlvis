import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { AlertCircle, Check, ExternalLink, Settings, Shield, PenToolIcon as Tool } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ToolsIntegrationsPage() {
  const integrations = [
    {
      id: "imaging-viewer",
      name: "Blue Sky Plan",
      description: "Professional dental imaging and treatment planning software",
      category: "imaging",
      status: "connected",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "horos",
      name: "Horos",
      description: "Free, open-source medical image viewer",
      category: "imaging",
      status: "connected",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3d-slicer",
      name: "3D Slicer",
      description: "Advanced medical image analysis platform",
      category: "imaging",
      status: "disconnected",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "dental-charting",
      name: "Open Dental",
      description: "Comprehensive dental practice management software",
      category: "practice",
      status: "connected",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "lab-connect",
      name: "Lab Connect",
      description: "Integration with dental laboratories for case management",
      category: "lab",
      status: "disconnected",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "payment-gateway",
      name: "Stripe",
      description: "Payment processing for patient billing",
      category: "finance",
      status: "connected",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "appointment",
      name: "Calendly",
      description: "Appointment scheduling and reminders",
      category: "practice",
      status: "connected",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "sms-service",
      name: "Twilio",
      description: "SMS notifications for patients",
      category: "communication",
      status: "disconnected",
      icon: "/placeholder.svg?height=40&width=40",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return <Badge className="bg-green-500">Connected</Badge>
      case "disconnected":
        return <Badge variant="outline">Disconnected</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Tools & Integrations</h1>
        <Button>
          <Tool className="mr-2 h-4 w-4" /> Add New Integration
        </Button>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Integration Status</AlertTitle>
        <AlertDescription>
          5 of 8 integrations are currently active. Some integrations may require configuration.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Integrations</TabsTrigger>
          <TabsTrigger value="imaging">Imaging</TabsTrigger>
          <TabsTrigger value="practice">Practice Management</TabsTrigger>
          <TabsTrigger value="finance">Finance</TabsTrigger>
          <TabsTrigger value="lab">Lab</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrations.map((integration) => (
              <Card key={integration.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={integration.icon || "/placeholder.svg"}
                        alt={integration.name}
                        className="h-10 w-10 rounded-md border bg-background p-1"
                      />
                      <div>
                        <CardTitle className="text-lg">{integration.name}</CardTitle>
                        <CardDescription className="line-clamp-1">{integration.description}</CardDescription>
                      </div>
                    </div>
                    {getStatusBadge(integration.status)}
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Category: <span className="capitalize">{integration.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={integration.status === "connected"} />
                      <span className="text-xs text-muted-foreground">
                        {integration.status === "connected" ? "Enabled" : "Disabled"}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <Button variant="outline" size="sm">
                    <Settings className="mr-2 h-3 w-3" />
                    Configure
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="mr-2 h-3 w-3" />
                    Open
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="imaging" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrations
              .filter((integration) => integration.category === "imaging")
              .map((integration) => (
                <Card key={integration.id} className="overflow-hidden">
                  {/* Same card structure as above */}
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={integration.icon || "/placeholder.svg"}
                          alt={integration.name}
                          className="h-10 w-10 rounded-md border bg-background p-1"
                        />
                        <div>
                          <CardTitle className="text-lg">{integration.name}</CardTitle>
                          <CardDescription className="line-clamp-1">{integration.description}</CardDescription>
                        </div>
                      </div>
                      {getStatusBadge(integration.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Category: <span className="capitalize">{integration.category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch checked={integration.status === "connected"} />
                        <span className="text-xs text-muted-foreground">
                          {integration.status === "connected" ? "Enabled" : "Disabled"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <Button variant="outline" size="sm">
                      <Settings className="mr-2 h-3 w-3" />
                      Configure
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="mr-2 h-3 w-3" />
                      Open
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        {/* Similar structure for other tabs */}
        <TabsContent value="practice" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrations
              .filter((integration) => integration.category === "practice")
              .map((integration) => (
                <Card key={integration.id} className="overflow-hidden">
                  {/* Card content */}
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={integration.icon || "/placeholder.svg"}
                          alt={integration.name}
                          className="h-10 w-10 rounded-md border bg-background p-1"
                        />
                        <div>
                          <CardTitle className="text-lg">{integration.name}</CardTitle>
                          <CardDescription className="line-clamp-1">{integration.description}</CardDescription>
                        </div>
                      </div>
                      {getStatusBadge(integration.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Category: <span className="capitalize">{integration.category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch checked={integration.status === "connected"} />
                        <span className="text-xs text-muted-foreground">
                          {integration.status === "connected" ? "Enabled" : "Disabled"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <Button variant="outline" size="sm">
                      <Settings className="mr-2 h-3 w-3" />
                      Configure
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="mr-2 h-3 w-3" />
                      Open
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="finance" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrations
              .filter((integration) => integration.category === "finance")
              .map((integration) => (
                <Card key={integration.id} className="overflow-hidden">
                  {/* Card content */}
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={integration.icon || "/placeholder.svg"}
                          alt={integration.name}
                          className="h-10 w-10 rounded-md border bg-background p-1"
                        />
                        <div>
                          <CardTitle className="text-lg">{integration.name}</CardTitle>
                          <CardDescription className="line-clamp-1">{integration.description}</CardDescription>
                        </div>
                      </div>
                      {getStatusBadge(integration.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Category: <span className="capitalize">{integration.category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch checked={integration.status === "connected"} />
                        <span className="text-xs text-muted-foreground">
                          {integration.status === "connected" ? "Enabled" : "Disabled"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <Button variant="outline" size="sm">
                      <Settings className="mr-2 h-3 w-3" />
                      Configure
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="mr-2 h-3 w-3" />
                      Open
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="lab" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrations
              .filter((integration) => integration.category === "lab")
              .map((integration) => (
                <Card key={integration.id} className="overflow-hidden">
                  {/* Card content */}
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={integration.icon || "/placeholder.svg"}
                          alt={integration.name}
                          className="h-10 w-10 rounded-md border bg-background p-1"
                        />
                        <div>
                          <CardTitle className="text-lg">{integration.name}</CardTitle>
                          <CardDescription className="line-clamp-1">{integration.description}</CardDescription>
                        </div>
                      </div>
                      {getStatusBadge(integration.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Category: <span className="capitalize">{integration.category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch checked={integration.status === "connected"} />
                        <span className="text-xs text-muted-foreground">
                          {integration.status === "connected" ? "Enabled" : "Disabled"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <Button variant="outline" size="sm">
                      <Settings className="mr-2 h-3 w-3" />
                      Configure
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="mr-2 h-3 w-3" />
                      Open
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>API Configuration</CardTitle>
          <CardDescription>Manage API keys and endpoints for integrations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="api-url">API Base URL</Label>
            <Input id="api-url" value="https://api.dentalerp.local/v1" />
            <p className="text-xs text-muted-foreground">
              The base URL for all API requests. This should be your local server address.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="api-key">API Key</Label>
              <Button variant="ghost" size="sm" className="h-7 text-xs">
                Regenerate
              </Button>
            </div>
            <Input id="api-key" value="dk_live_••••••••••••••••••••••••••••••" type="password" />
            <p className="text-xs text-muted-foreground">
              Your API key is used to authenticate requests to the API. Keep this secure.
            </p>
          </div>

          <div className="rounded-md border p-4 bg-muted/20">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-green-500" />
              <h3 className="font-medium">Security Status</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <p className="text-sm">API connections are encrypted with TLS 1.3</p>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <p className="text-sm">API key was last rotated 30 days ago</p>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <p className="text-sm">All integrations use secure authentication</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save API Configuration</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

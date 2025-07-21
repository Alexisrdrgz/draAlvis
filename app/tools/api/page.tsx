"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Key, Activity, Code, RefreshCw, Eye, EyeOff } from "lucide-react"
import { useState } from "react"

export default function APIManagementPage() {
  const [showApiKey, setShowApiKey] = useState(false)

  const apiKeys = [
    {
      id: "key_1",
      name: "Production API Key",
      key: "dk_live_51H7qYKJ2eZvKYlo2C8L4X9Y",
      status: "active",
      lastUsed: "2023-11-03 14:23:45",
      permissions: ["read", "write"],
      created: "2023-10-01",
    },
    {
      id: "key_2",
      name: "Development API Key",
      key: "dk_test_51H7qYKJ2eZvKYlo2C8L4X9Y",
      status: "active",
      lastUsed: "2023-11-03 10:15:22",
      permissions: ["read"],
      created: "2023-10-15",
    },
    {
      id: "key_3",
      name: "Backup API Key",
      key: "dk_live_51H7qYKJ2eZvKYlo2C8L4X9Y",
      status: "inactive",
      lastUsed: "2023-10-28 16:45:12",
      permissions: ["read", "write"],
      created: "2023-09-15",
    },
  ]

  const apiLogs = [
    {
      id: "log_1",
      endpoint: "/api/v1/patients",
      method: "GET",
      status: 200,
      responseTime: "145ms",
      timestamp: "2023-11-03 14:23:45",
      ip: "192.168.1.100",
    },
    {
      id: "log_2",
      endpoint: "/api/v1/appointments",
      method: "POST",
      status: 201,
      responseTime: "234ms",
      timestamp: "2023-11-03 14:22:30",
      ip: "192.168.1.105",
    },
    {
      id: "log_3",
      endpoint: "/api/v1/treatments",
      method: "PUT",
      status: 200,
      responseTime: "189ms",
      timestamp: "2023-11-03 14:21:15",
      ip: "192.168.1.110",
    },
    {
      id: "log_4",
      endpoint: "/api/v1/patients/search",
      method: "GET",
      status: 404,
      responseTime: "67ms",
      timestamp: "2023-11-03 14:20:00",
      ip: "192.168.1.100",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "inactive":
        return <Badge variant="outline">Inactive</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getMethodBadge = (method: string) => {
    const colors = {
      GET: "bg-blue-500",
      POST: "bg-green-500",
      PUT: "bg-yellow-500",
      DELETE: "bg-red-500",
    }
    return <Badge className={colors[method as keyof typeof colors] || "bg-gray-500"}>{method}</Badge>
  }

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return "text-green-500"
    if (status >= 400 && status < 500) return "text-yellow-500"
    if (status >= 500) return "text-red-500"
    return "text-gray-500"
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">API Management</h1>
        <Button>
          <Key className="mr-2 h-4 w-4" /> Generate New Key
        </Button>
      </div>

      <Tabs defaultValue="keys" className="w-full">
        <TabsList>
          <TabsTrigger value="keys">API Keys</TabsTrigger>
          <TabsTrigger value="logs">API Logs</TabsTrigger>
          <TabsTrigger value="docs">Documentation</TabsTrigger>
          <TabsTrigger value="testing">Testing</TabsTrigger>
        </TabsList>

        <TabsContent value="keys" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>API Keys Management</CardTitle>
              <CardDescription>Manage your API keys for accessing the dental ERP system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Key</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Permissions</TableHead>
                      <TableHead>Last Used</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {apiKeys.map((key) => (
                      <TableRow key={key.id}>
                        <TableCell className="font-medium">{key.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <code className="text-sm bg-muted px-2 py-1 rounded">
                              {showApiKey ? key.key : `${key.key.substring(0, 12)}...`}
                            </code>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => setShowApiKey(!showApiKey)}
                            >
                              {showApiKey ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                            </Button>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(key.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            {key.permissions.map((permission) => (
                              <Badge key={permission} variant="outline" className="text-xs">
                                {permission}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{key.lastUsed}</TableCell>
                        <TableCell className="text-sm">{key.created}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-500">
                              Revoke
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total API Calls</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">12,847</div>
                <p className="text-sm text-muted-foreground">This month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Success Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-500">99.2%</div>
                <p className="text-sm text-muted-foreground">Last 30 days</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Avg Response Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">156ms</div>
                <p className="text-sm text-muted-foreground">Last 24 hours</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                API Activity Logs
              </CardTitle>
              <CardDescription>Real-time monitoring of API requests and responses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Input placeholder="Filter by endpoint..." className="w-64" />
                  <Button variant="outline" size="icon">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground">Auto-refresh: ON</div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Endpoint</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Response Time</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Timestamp</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {apiLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>
                          <code className="text-sm bg-muted px-2 py-1 rounded">{log.endpoint}</code>
                        </TableCell>
                        <TableCell>{getMethodBadge(log.method)}</TableCell>
                        <TableCell className={getStatusColor(log.status)}>{log.status}</TableCell>
                        <TableCell>{log.responseTime}</TableCell>
                        <TableCell className="font-mono text-sm">{log.ip}</TableCell>
                        <TableCell className="text-sm">{log.timestamp}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="docs" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                API Documentation
              </CardTitle>
              <CardDescription>Complete reference for the Dental ERP API</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Base URL</h3>
                  <code className="block bg-muted p-3 rounded-md text-sm">https://api.dentalerp.local/v1</code>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Authentication</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Include your API key in the Authorization header:
                  </p>
                  <code className="block bg-muted p-3 rounded-md text-sm">Authorization: Bearer YOUR_API_KEY</code>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Common Endpoints</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {getMethodBadge("GET")}
                      <code className="text-sm">/patients</code>
                      <span className="text-sm text-muted-foreground">- List all patients</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {getMethodBadge("POST")}
                      <code className="text-sm">/patients</code>
                      <span className="text-sm text-muted-foreground">- Create a new patient</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {getMethodBadge("GET")}
                      <code className="text-sm">/patients/{"{id}"}</code>
                      <span className="text-sm text-muted-foreground">- Get patient by ID</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {getMethodBadge("PUT")}
                      <code className="text-sm">/patients/{"{id}"}</code>
                      <span className="text-sm text-muted-foreground">- Update patient</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {getMethodBadge("GET")}
                      <code className="text-sm">/appointments</code>
                      <span className="text-sm text-muted-foreground">- List appointments</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {getMethodBadge("POST")}
                      <code className="text-sm">/treatments</code>
                      <span className="text-sm text-muted-foreground">- Create treatment plan</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Response Format</h3>
                  <p className="text-sm text-muted-foreground mb-2">All responses are in JSON format:</p>
                  <pre className="bg-muted p-3 rounded-md text-sm overflow-x-auto">
                    {`{
  "success": true,
  "data": {
    "id": "patient_123",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "meta": {
    "timestamp": "2023-11-03T14:23:45Z",
    "version": "1.0"
  }
}`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testing" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>API Testing Console</CardTitle>
              <CardDescription>Test API endpoints directly from the interface</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="test-method">HTTP Method</Label>
                  <select id="test-method" className="w-full p-2 border rounded-md">
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="test-endpoint">Endpoint</Label>
                  <Input id="test-endpoint" placeholder="/api/v1/patients" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="test-headers">Headers (JSON)</Label>
                <Textarea id="test-headers" placeholder='{"Authorization": "Bearer YOUR_API_KEY"}' rows={3} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="test-body">Request Body (JSON)</Label>
                <Textarea id="test-body" placeholder='{"name": "John Doe", "email": "john@example.com"}' rows={5} />
              </div>

              <Button className="w-full">Send Request</Button>

              <div className="space-y-2">
                <Label>Response</Label>
                <div className="bg-muted p-4 rounded-md min-h-[200px]">
                  <p className="text-sm text-muted-foreground">Response will appear here after sending a request...</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

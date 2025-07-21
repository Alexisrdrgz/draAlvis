"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, Eye, Printer, Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export default function Receipts() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const receipts = [
    {
      id: "RCP001",
      receiptNumber: "2024-001",
      patientName: "John Doe",
      patientId: "P001",
      amount: 1250.0,
      paymentMethod: "Credit Card",
      issueDate: "2024-01-22",
      treatment: "Root Canal",
      status: "Issued",
      taxAmount: 125.0,
      subtotal: 1125.0,
      paymentId: "PAY001",
    },
    {
      id: "RCP002",
      receiptNumber: "2024-002",
      patientName: "Jane Smith",
      patientId: "P002",
      amount: 850.0,
      paymentMethod: "Cash",
      issueDate: "2024-01-21",
      treatment: "Dental Cleaning",
      status: "Issued",
      taxAmount: 85.0,
      subtotal: 765.0,
      paymentId: "PAY002",
    },
    {
      id: "RCP003",
      receiptNumber: "2024-003",
      patientName: "Mike Johnson",
      patientId: "P003",
      amount: 2100.0,
      paymentMethod: "Bank Transfer",
      issueDate: "2024-01-20",
      treatment: "Implant Surgery",
      status: "Issued",
      taxAmount: 210.0,
      subtotal: 1890.0,
      paymentId: "PAY003",
    },
    {
      id: "RCP004",
      receiptNumber: "2024-004",
      patientName: "Sarah Wilson",
      patientId: "P004",
      amount: 450.0,
      paymentMethod: "Credit Card",
      issueDate: "2024-01-19",
      treatment: "Consultation",
      status: "Draft",
      taxAmount: 45.0,
      subtotal: 405.0,
      paymentId: "PAY004",
    },
  ]

  const filteredReceipts = receipts.filter((receipt) => {
    const matchesSearch =
      receipt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      receipt.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || receipt.status.toLowerCase() === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Issued":
        return <Badge className="bg-green-100 text-green-800">Issued</Badge>
      case "Draft":
        return <Badge variant="secondary">Draft</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex-1">
          <h1 className="text-lg font-semibold">Receipts</h1>
          <p className="text-sm text-muted-foreground">Generate and manage payment receipts</p>
        </div>
      </header>

      <main className="flex-1 p-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>Payment Receipts</CardTitle>
                <CardDescription>Auto-generated receipts for all payments</CardDescription>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Generate Receipt
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by patient name or receipt number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="issued">Issued</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Receipts Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Receipt #</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Treatment</TableHead>
                    <TableHead>Issue Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReceipts.map((receipt) => (
                    <TableRow key={receipt.id}>
                      <TableCell className="font-medium">{receipt.receiptNumber}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{receipt.patientName}</div>
                          <div className="text-sm text-muted-foreground">{receipt.patientId}</div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">${receipt.amount.toFixed(2)}</TableCell>
                      <TableCell>{receipt.paymentMethod}</TableCell>
                      <TableCell>{receipt.treatment}</TableCell>
                      <TableCell>{receipt.issueDate}</TableCell>
                      <TableCell>{getStatusBadge(receipt.status)}</TableCell>
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
                                <DialogTitle>Receipt Preview - {receipt.receiptNumber}</DialogTitle>
                                <DialogDescription>Payment receipt for {receipt.patientName}</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-6">
                                {/* Receipt Header */}
                                <div className="text-center border-b pb-4">
                                  <h2 className="text-xl font-bold">Dental Institute</h2>
                                  <p className="text-sm text-muted-foreground">123 Medical Center Drive</p>
                                  <p className="text-sm text-muted-foreground">City, State 12345</p>
                                  <p className="text-sm text-muted-foreground">Phone: (555) 123-4567</p>
                                </div>

                                {/* Receipt Details */}
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-sm font-medium">Receipt Number</Label>
                                    <p className="text-sm text-muted-foreground">{receipt.receiptNumber}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Issue Date</Label>
                                    <p className="text-sm text-muted-foreground">{receipt.issueDate}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Patient Name</Label>
                                    <p className="text-sm text-muted-foreground">{receipt.patientName}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Patient ID</Label>
                                    <p className="text-sm text-muted-foreground">{receipt.patientId}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Payment Method</Label>
                                    <p className="text-sm text-muted-foreground">{receipt.paymentMethod}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Payment ID</Label>
                                    <p className="text-sm text-muted-foreground">{receipt.paymentId}</p>
                                  </div>
                                </div>

                                {/* Services */}
                                <div>
                                  <Label className="text-sm font-medium mb-3 block">Services Provided</Label>
                                  <div className="border rounded-lg">
                                    <table className="w-full">
                                      <thead className="border-b">
                                        <tr>
                                          <th className="text-left p-3">Description</th>
                                          <th className="text-right p-3">Amount</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td className="p-3">{receipt.treatment}</td>
                                          <td className="text-right p-3">${receipt.subtotal.toFixed(2)}</td>
                                        </tr>
                                        <tr className="border-t">
                                          <td className="p-3 font-medium">Tax (10%)</td>
                                          <td className="text-right p-3">${receipt.taxAmount.toFixed(2)}</td>
                                        </tr>
                                        <tr className="border-t bg-gray-50">
                                          <td className="p-3 font-bold">Total</td>
                                          <td className="text-right p-3 font-bold">${receipt.amount.toFixed(2)}</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>

                                {/* Footer */}
                                <div className="text-center text-sm text-muted-foreground border-t pt-4">
                                  <p>Thank you for choosing our dental services!</p>
                                  <p>Please retain this receipt for your records.</p>
                                </div>

                                <div className="flex justify-end gap-2">
                                  <Button variant="outline">
                                    <Download className="h-4 w-4 mr-2" />
                                    Download PDF
                                  </Button>
                                  <Button variant="outline">
                                    <Printer className="h-4 w-4 mr-2" />
                                    Print
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Printer className="h-4 w-4" />
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

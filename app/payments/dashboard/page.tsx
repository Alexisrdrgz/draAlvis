"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, DollarSign, CreditCard, Receipt, TrendingUp, Download, Eye } from "lucide-react"
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

export default function PaymentDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [paymentMethod, setPaymentMethod] = useState("all")

  const payments = [
    {
      id: "PAY001",
      patientName: "John Doe",
      patientId: "P001",
      amount: 1250.0,
      method: "Credit Card",
      status: "Completed",
      date: "2024-01-22",
      treatment: "Root Canal",
      receiptNumber: "RCP001",
      collaborationType: "Insurance + Patient",
    },
    {
      id: "PAY002",
      patientName: "Jane Smith",
      patientId: "P002",
      amount: 850.0,
      method: "Cash",
      status: "Completed",
      date: "2024-01-21",
      treatment: "Dental Cleaning",
      receiptNumber: "RCP002",
      collaborationType: "Patient Only",
    },
    {
      id: "PAY003",
      patientName: "Mike Johnson",
      patientId: "P003",
      amount: 2100.0,
      method: "Bank Transfer",
      status: "Pending",
      date: "2024-01-20",
      treatment: "Implant Surgery",
      receiptNumber: "RCP003",
      collaborationType: "Insurance + Patient",
    },
    {
      id: "PAY004",
      patientName: "Sarah Wilson",
      patientId: "P004",
      amount: 450.0,
      method: "Credit Card",
      status: "Failed",
      date: "2024-01-19",
      treatment: "Consultation",
      receiptNumber: "RCP004",
      collaborationType: "Patient Only",
    },
  ]

  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231",
      change: "+12%",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Pending Payments",
      value: "$8,420",
      change: "-5%",
      icon: CreditCard,
      color: "text-orange-600",
    },
    {
      title: "Completed Today",
      value: "23",
      change: "+8%",
      icon: Receipt,
      color: "text-blue-600",
    },
    {
      title: "Success Rate",
      value: "94.2%",
      change: "+2%",
      icon: TrendingUp,
      color: "text-purple-600",
    },
  ]

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || payment.status.toLowerCase() === statusFilter
    const matchesMethod = paymentMethod === "all" || paymentMethod === "" || payment.method === paymentMethod
    return matchesSearch && matchesStatus && matchesMethod
  })

  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex-1">
          <h1 className="text-lg font-semibold">Payment Dashboard</h1>
          <p className="text-sm text-muted-foreground">Manage payments and financial records</p>
        </div>
      </header>

      <main className="flex-1 p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className={stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}>{stat.change}</span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>Payment Records</CardTitle>
                <CardDescription>Track and manage all payment transactions</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <CreditCard className="h-4 w-4 mr-2" />
                      New Payment
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Record New Payment</DialogTitle>
                      <DialogDescription>Enter payment details for a patient</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
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
                        <Label htmlFor="amount">Amount</Label>
                        <Input id="amount" type="number" placeholder="0.00" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="method">Payment Method</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cash">Cash</SelectItem>
                            <SelectItem value="credit">Credit Card</SelectItem>
                            <SelectItem value="debit">Debit Card</SelectItem>
                            <SelectItem value="transfer">Bank Transfer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="collaboration">Collaboration Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="patient">Patient Only</SelectItem>
                            <SelectItem value="insurance">Insurance + Patient</SelectItem>
                            <SelectItem value="full-insurance">Full Insurance</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea id="notes" placeholder="Additional notes..." />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline">Cancel</Button>
                        <Button>Record Payment</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by patient name or payment ID..."
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
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Credit Card">Credit Card</SelectItem>
                  <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Payment Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payment ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Treatment</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{payment.patientName}</div>
                          <div className="text-sm text-muted-foreground">{payment.patientId}</div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">${payment.amount.toFixed(2)}</TableCell>
                      <TableCell>{payment.method}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            payment.status === "Completed"
                              ? "default"
                              : payment.status === "Pending"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {payment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>{payment.treatment}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Payment Details - {payment.id}</DialogTitle>
                                <DialogDescription>Complete payment information and receipt</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-sm font-medium">Patient</Label>
                                    <p className="text-sm text-muted-foreground">{payment.patientName}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Amount</Label>
                                    <p className="text-sm text-muted-foreground">${payment.amount.toFixed(2)}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Method</Label>
                                    <p className="text-sm text-muted-foreground">{payment.method}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Status</Label>
                                    <Badge
                                      variant={
                                        payment.status === "Completed"
                                          ? "default"
                                          : payment.status === "Pending"
                                            ? "secondary"
                                            : "destructive"
                                      }
                                    >
                                      {payment.status}
                                    </Badge>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Treatment</Label>
                                    <p className="text-sm text-muted-foreground">{payment.treatment}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Receipt Number</Label>
                                    <p className="text-sm text-muted-foreground">{payment.receiptNumber}</p>
                                  </div>
                                  <div className="col-span-2">
                                    <Label className="text-sm font-medium">Collaboration Type</Label>
                                    <p className="text-sm text-muted-foreground">{payment.collaborationType}</p>
                                  </div>
                                </div>
                                <div className="flex justify-end gap-2">
                                  <Button variant="outline">
                                    <Download className="h-4 w-4 mr-2" />
                                    Download Receipt
                                  </Button>
                                  <Button variant="outline">
                                    <Receipt className="h-4 w-4 mr-2" />
                                    Print Receipt
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button variant="outline" size="sm">
                            <Receipt className="h-4 w-4" />
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

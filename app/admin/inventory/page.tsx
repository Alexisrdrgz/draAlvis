"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Package, AlertTriangle, Plus, Minus, TrendingDown, TrendingUp } from "lucide-react"
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

export default function InventoryManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const inventoryItems = [
    {
      id: "INV001",
      name: "Dental Implants - Titanium",
      category: "Implants",
      currentStock: 5,
      minStock: 10,
      maxStock: 50,
      unit: "pieces",
      unitPrice: 250.0,
      supplier: "DentalTech Inc",
      lastRestocked: "2024-01-10",
      expiryDate: "2026-01-10",
      status: "Low Stock",
    },
    {
      id: "INV002",
      name: "Anesthetic Cartridges",
      category: "Medications",
      currentStock: 45,
      minStock: 20,
      maxStock: 100,
      unit: "cartridges",
      unitPrice: 12.5,
      supplier: "MedSupply Co",
      lastRestocked: "2024-01-15",
      expiryDate: "2024-12-31",
      status: "In Stock",
    },
    {
      id: "INV003",
      name: "Surgical Gloves - Latex Free",
      category: "Consumables",
      currentStock: 0,
      minStock: 50,
      maxStock: 500,
      unit: "boxes",
      unitPrice: 8.75,
      supplier: "SafeHands Ltd",
      lastRestocked: "2023-12-20",
      expiryDate: "2025-06-30",
      status: "Out of Stock",
    },
    {
      id: "INV004",
      name: "Composite Filling Material",
      category: "Materials",
      currentStock: 25,
      minStock: 15,
      maxStock: 60,
      unit: "syringes",
      unitPrice: 45.0,
      supplier: "DentalMaterials Pro",
      lastRestocked: "2024-01-18",
      expiryDate: "2025-03-15",
      status: "In Stock",
    },
    {
      id: "INV005",
      name: "X-ray Films",
      category: "Imaging",
      currentStock: 8,
      minStock: 12,
      maxStock: 50,
      unit: "packs",
      unitPrice: 35.0,
      supplier: "ImageTech Solutions",
      lastRestocked: "2024-01-05",
      expiryDate: "2025-12-31",
      status: "Low Stock",
    },
  ]

  const stats = [
    {
      title: "Total Items",
      value: "247",
      change: "+5",
      icon: Package,
      color: "text-blue-600",
    },
    {
      title: "Low Stock Alerts",
      value: "12",
      change: "+3",
      icon: AlertTriangle,
      color: "text-orange-600",
    },
    {
      title: "Out of Stock",
      value: "3",
      change: "+1",
      icon: TrendingDown,
      color: "text-red-600",
    },
    {
      title: "Total Value",
      value: "$45,230",
      change: "+8%",
      icon: TrendingUp,
      color: "text-green-600",
    },
  ]

  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter
    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStockStatus = (item: (typeof inventoryItems)[0]) => {
    if (item.currentStock === 0) return "Out of Stock"
    if (item.currentStock <= item.minStock) return "Low Stock"
    return "In Stock"
  }

  const getStockBadgeVariant = (status: string) => {
    switch (status) {
      case "Out of Stock":
        return "destructive"
      case "Low Stock":
        return "secondary"
      default:
        return "default"
    }
  }

  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex-1">
          <h1 className="text-lg font-semibold">Inventory Management</h1>
          <p className="text-sm text-muted-foreground">Track stock levels and manage supplies</p>
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

        {/* Low Stock Alerts */}
        <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800 dark:text-orange-200">
              <AlertTriangle className="h-5 w-5" />
              Low Stock Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Dental Implants - Titanium (5 remaining)</span>
                <Button size="sm" variant="outline">
                  Reorder
                </Button>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>X-ray Films (8 packs remaining)</span>
                <Button size="sm" variant="outline">
                  Reorder
                </Button>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Surgical Gloves - Out of Stock</span>
                <Button size="sm" variant="destructive">
                  Urgent Reorder
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>Inventory Items</CardTitle>
                <CardDescription>Manage stock levels and supplier information</CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Inventory Item</DialogTitle>
                    <DialogDescription>Add a new item to the inventory system</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="itemName">Item Name</Label>
                      <Input id="itemName" placeholder="Enter item name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="implants">Implants</SelectItem>
                          <SelectItem value="medications">Medications</SelectItem>
                          <SelectItem value="consumables">Consumables</SelectItem>
                          <SelectItem value="materials">Materials</SelectItem>
                          <SelectItem value="imaging">Imaging</SelectItem>
                          <SelectItem value="equipment">Equipment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="minStock">Min Stock</Label>
                        <Input id="minStock" type="number" placeholder="0" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="maxStock">Max Stock</Label>
                        <Input id="maxStock" type="number" placeholder="0" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="unitPrice">Unit Price</Label>
                        <Input id="unitPrice" type="number" step="0.01" placeholder="0.00" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="unit">Unit</Label>
                        <Input id="unit" placeholder="pieces, boxes, etc." />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="supplier">Supplier</Label>
                      <Input id="supplier" placeholder="Supplier name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea id="notes" placeholder="Additional notes..." />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Cancel</Button>
                      <Button>Add Item</Button>
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
                  placeholder="Search by item name or ID..."
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
                  <SelectItem value="Implants">Implants</SelectItem>
                  <SelectItem value="Medications">Medications</SelectItem>
                  <SelectItem value="Consumables">Consumables</SelectItem>
                  <SelectItem value="Materials">Materials</SelectItem>
                  <SelectItem value="Imaging">Imaging</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="In Stock">In Stock</SelectItem>
                  <SelectItem value="Low Stock">Low Stock</SelectItem>
                  <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Inventory Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Current Stock</TableHead>
                    <TableHead>Min/Max</TableHead>
                    <TableHead>Unit Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-muted-foreground">{item.supplier}</div>
                        </div>
                      </TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>
                        <div className="font-medium">
                          {item.currentStock} {item.unit}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {item.minStock} / {item.maxStock}
                      </TableCell>
                      <TableCell>${item.unitPrice.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={getStockBadgeVariant(getStockStatus(item))}>{getStockStatus(item)}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Plus className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Minus className="h-4 w-4" />
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

"use client"

import { useState } from "react"

export default function PayrollPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const employees = [
    {
      id: "EMP-001",
      name: "Dr. Sarah Johnson",
      position: "Dental Surgeon",
      department: "Surgery",
      salary: 8500,
      status: "active",
      lastPayment: "2023-06-01",
      bankAccount: "XXXX-XXXX-1234"
    },
    {
      id: "EMP-002",
      name: "Dr. Michael Chen",
      position: "Orthodontist",
      department: "Orthodontics",
      salary: 7800,
      status: "active",
      lastPayment: "2023-06-01",
      bankAccount: "XXXX-XXXX-5678"
    },
    {
      id: "EMP-003",
      name: "Dr. Emily Taylor",
      position: "Periodontist",
      department: "Periodontics",
      salary: 7500,
      status: "active",
      lastPayment: "2023-06-01",
      bankAccount: "XXXX-XXXX-9012"
    },
    {
      id: "EMP-004",
      name: "Robert Wilson",
      position: "Dental Hygienist",
      department: "Hygiene",
      salary: 4200,
      status: "active",
      lastPayment: "2023-06-01",
      bankAccount: "XXXX-XXXX-3456"
    },
    {
      id: "EMP-005",
      name: "Jennifer Lopez",
      position: "Dental Assistant",
      department: "General",
      salary: 3800,
      status: "active",
      lastPayment: "2023-06-01",
      bankAccount: "XXXX-XXXX-7890"
    },
    {
      id: "EMP-006",
      name: "David Brown",
      position: "Office Manager",
      department: "Administration",
      salary: 4500,
      status: "on-leave",
      lastPayment: "2023-06-01",
      bankAccount: "XXXX-XXXX-1357"
    },
    {
      id: "EMP-007",
      name: "Lisa Garcia",
      position: "Receptionist",
      department: "Administration",
      salary: 3200,
      status: "active",
      lastPayment: "2023-06-01",
      bankAccount: "XXXX-XXXX-2468"
    }
  ]

  const payrollHistory = [
    {
      id: "PAY-2023-06",
      date: "2023-06-01",
      totalAmount: 39500,
      employeeCount: 7,
      status: "completed"
    },
        {
          id: "PAY-2023-05",
          date: "2023-05-01",
          totalAmount: 39500,
          employeeCount: 7
        }
      ]
    
      return (
        <div>
          <h1>Payroll Page</h1>
          {/* Add your UI here */}
        </div>
      )
    }

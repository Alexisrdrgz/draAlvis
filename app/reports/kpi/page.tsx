"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Heart, DollarSign, TrendingUp, TrendingDown, Activity, Clock, Download } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function KPIDashboard() {
  const kpiData = [
    {
      title: "Patients Treated",
      value: "2,847",
      change: "+12%",
      period: "This Month",
      icon: Users,
      color: "text-blue-600",
      trend: "up",
    },
    {
      title: "Surgery Success Rate",
      value: "96.8%",
      change: "+2.1%",
      period: "This Quarter",
      icon: Heart,
      color: "text-green-600",
      trend: "up",
    },
    {
      title: "Revenue Generated",
      value: "$145,230",
      change: "+18%",
      period: "This Month",
      icon: DollarSign,
      color: "text-green-600",
      trend: "up",
    },
    {
      title: "Average Treatment Time",
      value: "45 min",
      change: "-8%",
      period: "This Month",
      icon: Clock,
      color: "text-orange-600",
      trend: "down",
    },
    {
      title: "Patient Satisfaction",
      value: "4.8/5",
      change: "+0.2",
      period: "This Quarter",
      icon: TrendingUp,
      color: "text-purple-600",
      trend: "up",
    },
    {
      title: "Equipment Utilization",
      value: "87%",
      change: "+5%",
      period: "This Month",
      icon: Activity,
      color: "text-blue-600",
      trend: "up",
    },
  ]

  const treatmentStats = [
    { treatment: "Dental Cleaning", count: 245, percentage: 35, revenue: "$24,500" },
    { treatment: "Root Canal", count: 89, percentage: 13, revenue: "$89,000" },
    { treatment: "Implant Surgery", count: 67, percentage: 10, revenue: "$134,000" },
    { treatment: "Orthodontics", count: 156, percentage: 22, revenue: "$78,000" },
    { treatment: "Oral Surgery", count: 45, percentage: 6, revenue: "$45,000" },
    { treatment: "Consultation", count: 98, percentage: 14, revenue: "$9,800" },
  ]

  const monthlyTrends = [
    { month: "Jan", patients: 234, revenue: 45230, surgeries: 23 },
    { month: "Feb", patients: 267, revenue: 52100, surgeries: 28 },
    { month: "Mar", patients: 298, revenue: 58900, surgeries: 31 },
    { month: "Apr", patients: 312, revenue: 62400, surgeries: 35 },
    { month: "May", patients: 289, revenue: 57800, surgeries: 29 },
    { month: "Jun", patients: 334, revenue: 68200, surgeries: 38 },
  ]

  const studentPerformance = [
    { name: "Alice Johnson", treatments: 45, successRate: 94, avgTime: 42, efficiency: "High" },
    { name: "Bob Smith", treatments: 38, successRate: 91, avgTime: 48, efficiency: "Medium" },
    { name: "Carol Davis", treatments: 52, successRate: 96, avgTime: 39, efficiency: "High" },
    { name: "David Wilson", treatments: 29, successRate: 88, avgTime: 55, efficiency: "Low" },
    { name: "Emma Brown", treatments: 41, successRate: 93, avgTime: 44, efficiency: "Medium" },
  ]

  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex-1">
          <h1 className="text-lg font-semibold">KPI Dashboard</h1>
          <p className="text-sm text-muted-foreground">Key performance indicators and analytics</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="month">
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </header>

      <main className="flex-1 p-6 space-y-6">
        {/* Main KPIs */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {kpiData.map((kpi) => (
            <Card key={kpi.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className={kpi.trend === "up" ? "text-green-600" : "text-red-600"}>
                    {kpi.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {kpi.change}
                  </span>
                  <span>{kpi.period}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Treatment Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Treatment Distribution</CardTitle>
              <CardDescription>Breakdown of treatments performed this month</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {treatmentStats.map((treatment) => (
                <div key={treatment.treatment} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{treatment.treatment}</span>
                    <div className="text-right">
                      <div className="text-sm font-medium">{treatment.count}</div>
                      <div className="text-xs text-muted-foreground">{treatment.revenue}</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${treatment.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Monthly Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Trends</CardTitle>
              <CardDescription>Patient volume and revenue over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyTrends.map((month) => (
                  <div key={month.month} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="font-medium">{month.month}</div>
                    <div className="text-right space-y-1">
                      <div className="text-sm">{month.patients} patients</div>
                      <div className="text-xs text-muted-foreground">${month.revenue.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">{month.surgeries} surgeries</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Student Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Student Performance</CardTitle>
            <CardDescription>Individual student metrics and efficiency ratings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Student Name</th>
                    <th className="text-center p-2">Treatments</th>
                    <th className="text-center p-2">Success Rate</th>
                    <th className="text-center p-2">Avg Time (min)</th>
                    <th className="text-center p-2">Efficiency</th>
                  </tr>
                </thead>
                <tbody>
                  {studentPerformance.map((student) => (
                    <tr key={student.name} className="border-b">
                      <td className="p-2 font-medium">{student.name}</td>
                      <td className="p-2 text-center">{student.treatments}</td>
                      <td className="p-2 text-center">{student.successRate}%</td>
                      <td className="p-2 text-center">{student.avgTime}</td>
                      <td className="p-2 text-center">
                        <Badge
                          variant={
                            student.efficiency === "High"
                              ? "default"
                              : student.efficiency === "Medium"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {student.efficiency}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Quick Insights */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-green-800 dark:text-green-200">Top Performer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-green-800 dark:text-green-200">Carol Davis</div>
              <p className="text-sm text-green-700 dark:text-green-300">96% success rate, 52 treatments</p>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-blue-800 dark:text-blue-200">Most Popular Treatment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-blue-800 dark:text-blue-200">Dental Cleaning</div>
              <p className="text-sm text-blue-700 dark:text-blue-300">245 procedures (35% of total)</p>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-purple-800 dark:text-purple-200">Revenue Leader</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-purple-800 dark:text-purple-200">Implant Surgery</div>
              <p className="text-sm text-purple-700 dark:text-purple-300">$134,000 (33% of revenue)</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

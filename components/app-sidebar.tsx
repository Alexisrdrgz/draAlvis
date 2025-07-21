"use client"
import { BarChart3, CreditCard, Heart, Home, ImageIcon, Lock, Settings, Stethoscope, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"

const navigation = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Patient Management",
    icon: Users,
    items: [
      { title: "Register Patient", url: "/patients/register" },
      { title: "Patient Records", url: "/patients/records" },
      { title: "Eligibility Reports", url: "/patients/eligibility" },
    ],
  },
  {
    title: "Consent & Payment",
    icon: CreditCard,
    items: [
      { title: "Payment Dashboard", url: "/payments/dashboard" },
      { title: "Consent Forms", url: "/payments/consent" },
      { title: "Receipts", url: "/payments/receipts" },
    ],
  },
  {
    title: "Treatment Plans",
    icon: Stethoscope,
    items: [
      { title: "Create Plan", url: "/treatment/create" },
      { title: "Consultations", url: "/treatment/consultations" },
      { title: "Follow-ups", url: "/treatment/followups" },
    ],
  },
  {
    title: "Implant Surgery",
    icon: Heart,
    items: [
      { title: "CBCT Images", url: "/surgery/cbct" },
      { title: "Procedures", url: "/surgery/procedures" },
      { title: "Photo Gallery", url: "/surgery/gallery" },
    ],
  },
  {
    title: "Imaging (PACS)",
    icon: ImageIcon,
    items: [
      { title: "DICOM Viewer", url: "/imaging/dicom" },
      { title: "Study Management", url: "/imaging/studies" },
      { title: "Tools Integration", url: "/imaging/tools" },
    ],
  },
  {
    title: "Administration",
    icon: Settings,
    items: [
      { title: "Finances", url: "/" },
      { title: "Payroll", url: "/" },
      { title: "Inventory", url: "/" },
      { title: "Maintenance", url: "/" },
    ],
  },
  {
    title: "Security",
    icon: Lock,
    items: [
      { title: "Access Control", url: "/" },
      { title: "Activity Logs", url: "/" },
      { title: "Compliance", url: "/" },
    ],
  },
  {
    title: "Reports",
    icon: BarChart3,
    items: [
      { title: "KPI Dashboard", url: "/" },
      { title: "Data Import", url: "/" },
    ],
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-3 px-2 py-3">
          <div className="flex-shrink-0">
            <Image src="/draAlvis.png" alt="draalvis Logo" width={80} height={42} className="h-10 w-auto" />
          </div>
          <div className="flex flex-col">
   
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items ? (
                    <div className="space-y-1">
                      <SidebarMenuButton className="w-full justify-start">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                      <div className="ml-6 space-y-1">
                        {item.items.map((subItem) => (
                          <SidebarMenuButton key={subItem.url} asChild isActive={pathname === subItem.url} size="sm">
                            <Link href={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <Link href={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-2">
          <ThemeToggle />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

"use client"
import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StudentProfile } from "@/components/student-profile"
import { InternshipsList } from "@/components/internships-list"
import { MyApplications } from "@/components/my-applications"
import { WorkshopsList } from "@/components/workshops-list"
import { ReportManagement } from "@/components/report-management"
import { OnlineAssessmentSystem } from "@/components/online-assessment-system"
import { VideoCallSystem } from "@/components/video-call-system"
import { AppointmentScheduler } from "@/components/appointment-scheduler"
import { ProStudentFeatures } from "@/components/pro-student-features"

export default function ProStudentDashboard() {
  const [activeTab, setActiveTab] = useState("profile")

  // Dummy data
  const studentInfo = {
    name: "Sara Ahmed",
    id: "43-12346",
    program: "Computer Science",
    semester: "Spring 2025",
    advisor: "Dr. Mervat Abuelkheir",
    completedHours: 135,
    gpa: 3.9,
  }

  const completedInternships = [
    {
      id: 1,
      company: "Tech Innovations Inc.",
      position: "Frontend Developer Intern",
      startDate: "Jan 15, 2024",
      endDate: "Apr 15, 2024",
      status: "Completed",
      rating: 4.8,
    },
    {
      id: 2,
      company: "Global Solutions",
      position: "Mobile App Developer Intern",
      startDate: "Jun 1, 2024",
      endDate: "Aug 30, 2024",
      status: "Completed",
      rating: 4.5,
    },
  ]

  const profileViewers = [
    { id: 1, company: "Future Systems", date: "2 days ago" },
    { id: 2, company: "Digital Experts", date: "1 week ago" },
    { id: 3, company: "Smart Technologies", date: "2 weeks ago" },
  ]

  return (
    <DashboardShell>
      <DashboardHeader
        heading={
          <div className="flex items-center">
            PRO Student Dashboard
            <Badge className="ml-2 bg-gradient-to-r from-amber-500 to-orange-500">PRO</Badge>
          </div>
        }
        text="Access exclusive PRO features and manage your internship journey."
      />

      <Tabs defaultValue="profile" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-9">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="internships">Internships</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="workshops">Workshops</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="video-calls">Video Calls</TabsTrigger>
          <TabsTrigger value="pro-features">PRO Features</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <StudentProfile isPro={true} />
        </TabsContent>

        <TabsContent value="internships" className="space-y-4">
          <InternshipsList />
        </TabsContent>

        <TabsContent value="applications" className="space-y-4">
          <MyApplications />
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <ReportManagement userType="student" />
        </TabsContent>

        <TabsContent value="workshops" className="space-y-4">
          <WorkshopsList userType="pro" />
        </TabsContent>

        <TabsContent value="assessments" className="space-y-4">
          <OnlineAssessmentSystem />
        </TabsContent>

        <TabsContent value="appointments" className="space-y-4">
          <AppointmentScheduler userType="student" />
        </TabsContent>

        <TabsContent value="video-calls" className="space-y-4">
          <VideoCallSystem />
        </TabsContent>

        <TabsContent value="pro-features" className="space-y-4">
          <ProStudentFeatures />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

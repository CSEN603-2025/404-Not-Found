"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StudentProfile } from "@/components/student-profile"
import { InternshipsList } from "@/components/internships-list"
import { MyApplications } from "@/components/my-applications"
import { WorkshopsList } from "@/components/workshops-list"
import { ReportManagement } from "@/components/report-management"
import { OnlineAssessmentSystem } from "@/components/online-assessment-system"
import { AppointmentScheduler } from "@/components/appointment-scheduler"
import { VideoCallSystem } from "@/components/video-call-system"

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Student Dashboard"
        text="Manage your internship applications, reports, and career development."
      />

      <Tabs defaultValue="profile" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="internships">Internships</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="workshops">Workshops</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="video-calls">Video Calls</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <StudentProfile />
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
          <WorkshopsList />
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
      </Tabs>
    </DashboardShell>
  )
}

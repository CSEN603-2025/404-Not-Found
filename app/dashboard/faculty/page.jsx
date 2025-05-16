"use client"

import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { InternshipReportsList } from "@/components/internship-reports-list"
import { FacultyProfile } from "@/components/faculty-profile"
import { FacultyStudentsList } from "@/components/faculty-students-list"
import { VideoCallAppointments } from "@/components/video-call-appointments"

export default function FacultyDashboard() {
  // Dummy data
  const advisorInfo = {
    name: "Dr. Aya Mohamed",
    department: "Media Engineering and Technology",
    studentsCount: 24,
    pendingReviews: 8,
  }

  const studentsList = [
    {
      id: 1,
      name: "Ahmed Mohamed",
      studentId: "43-12345",
      company: "Tech Innovations Inc.",
      progress: 65,
      status: "In Progress",
    },
    {
      id: 2,
      name: "Sara Ahmed",
      studentId: "43-12346",
      company: "Global Solutions",
      progress: 90,
      status: "In Progress",
    },
    {
      id: 3,
      name: "Omar Khaled",
      studentId: "43-12347",
      company: "Future Systems",
      progress: 30,
      status: "In Progress",
    },
    {
      id: 4,
      name: "Nour Ibrahim",
      studentId: "43-12348",
      company: "Digital Experts",
      progress: 100,
      status: "Completed",
    },
    {
      id: 5,
      name: "Youssef Ali",
      studentId: "43-12349",
      company: "Smart Technologies",
      progress: 0,
      status: "Not Started",
    },
  ]

  const pendingReviews = [
    { id: 1, studentName: "Ahmed Mohamed", reportType: "Mid-term Report", dueDate: "April 25, 2025" },
    { id: 2, studentName: "Sara Ahmed", reportType: "Weekly Progress", dueDate: "April 15, 2025" },
    { id: 3, studentName: "Omar Khaled", reportType: "Initial Plan", dueDate: "April 12, 2025" },
  ]

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Faculty Dashboard"
        text="Monitor and evaluate student internships, review reports, and provide feedback."
      >
        <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700">
          Generate Reports
        </Button>
      </DashboardHeader>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Advisor Profile</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{advisorInfo.name}</div>
                <p className="text-xs text-muted-foreground">{advisorInfo.department}</p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Assigned Students:</span>
                    <span className="font-medium">{advisorInfo.studentsCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Pending Reviews:</span>
                    <span className="font-medium">{advisorInfo.pendingReviews}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Pending Reviews</CardTitle>
                <CardDescription>Student reports awaiting your review and feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingReviews.map((review) => (
                    <div
                      key={review.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback>
                            {review.studentName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{review.studentName}</p>
                          <p className="text-xs text-muted-foreground">{review.reportType}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-xs text-right">
                          <p>Due: {review.dueDate}</p>
                        </div>
                        <Button size="sm" variant="outline">
                          Review
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Reviews
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Student Internship Progress</CardTitle>
              <CardDescription>Overview of your assigned students and their internship progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studentsList.map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarFallback>
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{student.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {student.studentId} • {student.company}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-32 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span>Progress</span>
                          <span>{student.progress}%</span>
                        </div>
                        <Progress value={student.progress} className="h-1.5" />
                      </div>
                      <Badge
                        variant={
                          student.status === "Completed"
                            ? "outline"
                            : student.status === "In Progress"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {student.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Students
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-4">
          <FacultyProfile />
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          <FacultyStudentsList students={studentsList} />
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <InternshipReportsList />
        </TabsContent>

        <TabsContent value="appointments" className="space-y-4">
          <VideoCallAppointments isFaculty={true} />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { EvaluationSystem } from "@/components/evaluation-system"

export default function CompanyDashboard() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [selectedIntern, setSelectedIntern] = useState<string | null>(null)
  const [evaluationText, setEvaluationText] = useState("")
  const [recommendationValue, setRecommendationValue] = useState("yes")

  // Dummy data
  const companyInfo = {
    name: "Tech Innovations Inc.",
    industry: "Information Technology",
    size: "51-200 employees",
    description:
      "Tech Innovations is a leading software development company specializing in AI and machine learning solutions for businesses across various industries.",
    website: "www.techinnovations.com",
    location: "Cairo, Egypt",
    contactPerson: "Ahmed Hassan",
    contactEmail: "ahmed.hassan@techinnovations.com",
    contactPhone: "+20 123 456 7890",
    logo: "TI",
  }

  const internshipPosts = [
    {
      id: "1",
      title: "Frontend Developer Intern",
      duration: "3 months",
      isPaid: true,
      salary: "5000 EGP/month",
      applications: 12,
      status: "active",
      postedDate: "April 1, 2025",
    },
    {
      id: "2",
      title: "Mobile App Developer Intern",
      duration: "6 months",
      isPaid: true,
      salary: "6000 EGP/month",
      applications: 8,
      status: "active",
      postedDate: "April 5, 2025",
    },
    {
      id: "3",
      title: "UI/UX Design Intern",
      duration: "3 months",
      isPaid: false,
      salary: "",
      applications: 15,
      status: "closed",
      postedDate: "March 10, 2025",
    },
  ]

  const internsList = [
    {
      id: 1,
      name: "Ahmed Mohamed",
      studentId: "43-12345",
      program: "Media Engineering",
      startDate: "Feb 15, 2025",
      endDate: "May 15, 2025",
      status: "Active",
    },
    {
      id: 2,
      name: "Sara Ahmed",
      studentId: "43-12346",
      program: "Computer Science",
      startDate: "Feb 15, 2025",
      endDate: "May 15, 2025",
      status: "Active",
    },
    {
      id: 3,
      name: "Omar Khaled",
      studentId: "43-12347",
      program: "Electronics Engineering",
      startDate: "Feb 15, 2025",
      endDate: "May 15, 2025",
      status: "Active",
    },
    {
      id: 4,
      name: "Nour Ibrahim",
      studentId: "43-12348",
      program: "Media Engineering",
      startDate: "Jan 10, 2025",
      endDate: "Apr 10, 2025",
      status: "Completed",
    },
    {
      id: 5,
      name: "Youssef Ali",
      studentId: "43-12349",
      program: "Computer Science",
      startDate: "Mar 1, 2025",
      endDate: "Jun 1, 2025",
      status: "Active",
    },
  ]

  const openPositions = internshipPosts.filter((position) => position.status === "active")

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Company Dashboard"
        text="Manage internship positions, evaluate interns, and track performance."
      >
        <Button
          onClick={() => setActiveTab("positions")}
          className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
        >
          Post New Position
        </Button>
      </DashboardHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="profile">Company Profile</TabsTrigger>
          <TabsTrigger value="positions">Positions</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="interns">Interns</TabsTrigger>
          <TabsTrigger value="evaluations">Evaluations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Company Profile</CardTitle>
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
                  <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                  <path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{companyInfo.name}</div>
                <p className="text-xs text-muted-foreground">
                  {companyInfo.industry} • {companyInfo.location}
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Active Interns:</span>
                    <span className="font-medium">
                      {internsList.filter((intern) => intern.status === "Active").length}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Open Positions:</span>
                    <span className="font-medium">{openPositions.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Open Positions</CardTitle>
                <CardDescription>Current internship positions and application statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {openPositions.map((position) => (
                    <div
                      key={position.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div>
                        <p className="font-medium">{position.title}</p>
                        <p className="text-xs text-muted-foreground">{position.department}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm">{position.applications} Applications</p>
                          <p className="text-xs text-muted-foreground">Deadline: {position.deadline}</p>
                        </div>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Manage All Positions
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Current Interns</CardTitle>
              <CardDescription>Students currently interning at your company</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {internsList
                  .filter((intern) => intern.status === "Active")
                  .map((intern) => (
                    <div
                      key={intern.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback>
                            {intern.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{intern.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {intern.studentId} • {intern.program}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right text-xs">
                          <p>
                            {intern.startDate} - {intern.endDate}
                          </p>
                        </div>
                        <Badge variant={intern.status === "Active" ? "secondary" : "outline"}>{intern.status}</Badge>
                        <Button size="sm" onClick={() => setSelectedIntern(intern.id.toString())}>
                          Evaluate
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Interns
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* PROFILE */}
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Company Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Name:</strong> {companyInfo.name}
              </p>
              <p>
                <strong>Industry:</strong> {companyInfo.industry}
              </p>
              <p>
                <strong>Size:</strong> {companyInfo.size}
              </p>
              <p>
                <strong>Website:</strong> {companyInfo.website}
              </p>
              <p>
                <strong>Location:</strong> {companyInfo.location}
              </p>
              <p>
                <strong>Contact:</strong> {companyInfo.contactPerson} –{" "}
                {companyInfo.contactEmail}
              </p>
              <p className="mt-2 text-sm">{companyInfo.description}</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* POSITIONS */}
        <TabsContent value="positions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Internship Positions</CardTitle>
            </CardHeader>
            <CardContent>
              {internshipPosts.map((post) => (
                <div key={post.id} className="border-b py-2">
                  <p className="font-medium">
                    {post.title} ({post.duration})
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {post.isPaid ? `Paid – ${post.salary}` : "Unpaid"} &middot;{" "}
                    {post.applications} apps
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* APPLICATIONS */}
        <TabsContent value="applications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Applications Summary</CardTitle>
            </CardHeader>
            <CardContent>
              {internshipPosts.map((post) => (
                <div key={post.id} className="border-b py-2">
                  <p>
                    <strong>{post.title}</strong>:{" "}
                    {post.applications} applicant
                    {post.applications > 1 ? "s" : ""}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* INTERNS */}
        <TabsContent value="interns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Interns</CardTitle>
            </CardHeader>
            <CardContent>
              {internsList.map((intern) => (
                <div key={intern.id} className="flex justify-between py-2 border-b">
                  <div>
                    <p className="font-medium">{intern.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {intern.program}
                    </p>
                  </div>
                  <Badge
                    variant={
                      intern.status === "Active" ? "secondary" : "outline"
                    }
                  >
                    {intern.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* EVALUATIONS */}
        <TabsContent value="evaluations" className="space-y-4">
          <EvaluationSystem type="company" />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

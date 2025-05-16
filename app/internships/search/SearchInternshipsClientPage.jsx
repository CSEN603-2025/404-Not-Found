"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Building, Calendar, Clock, MapPin, Star, Users } from "lucide-react"

// Internship Card Component
function InternshipCard({ internship, isSaved, onToggleSave }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-3">
            <Avatar className="h-10 w-10 border">
              <AvatarImage src={internship.companyLogo || "/placeholder.svg"} alt={internship.company} />
              <AvatarFallback>{internship.company.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl">{internship.title}</CardTitle>
              <CardDescription className="flex items-center mt-1">
                <Building className="h-3.5 w-3.5 mr-1" />
                {internship.company}
              </CardDescription>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onToggleSave} className={isSaved ? "text-yellow-500" : ""}>
            <Star className="h-5 w-5" fill={isSaved ? "currentColor" : "none"} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="outline" className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {internship.location}
            {internship.isRemote && " (Remote)"}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {internship.duration}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {internship.isFullTime ? "Full-time" : "Part-time"}
          </Badge>
          <Badge variant="secondary">{internship.salary}</Badge>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{internship.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-2">
          {internship.skills.map((skill, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-100"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
          <Users className="h-4 w-4 mr-1" />
          {internship.applicants} applicants
        </div>
        <Button>Apply Now</Button>
      </CardFooter>
    </Card>
  )
}

export default function SearchInternshipsClientPage() {
  return (
    <div>
      {/* Your page content here */}
      <h1>Search Internships</h1>
      {/* Example usage of the InternshipCard component */}
      <InternshipCard
        internship={{
          title: "Software Engineering Intern",
          company: "Google",
          companyLogo: "/google-logo.png",
          location: "Mountain View, CA",
          isRemote: false,
          duration: "3 months",
          isFullTime: true,
          salary: "$6,000 / month",
          description: "Work on cutting-edge software projects.",
          skills: ["JavaScript", "React", "Node.js"],
          applicants: 150,
        }}
        isSaved={false}
        onToggleSave={() => {}}
      />
    </div>
  )
}

"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Briefcase, DollarSign, List, FileText } from "lucide-react";
import "../styles/JobPostPage.css";

const skillOptions = [
  "Programming",
  "Web Development",
  "Database Management",
  "Version Control",
  "Cloud Computing",
  "Data Analysis",
  "Cybersecurity",
  "UI/UX Design",
  "Networking",
  "Machine Learning",
  "Communication Skills",
  "Teamwork",
  "Problem-Solving",
  "Critical Thinking",
  "Time Management",
  "Adaptability",
  "Creativity",
  "Leadership",
  "Attention to Detail",
  "Project Management",
];

export default function JobPostPage() {
  const navigate = useNavigate();
  const methods = useForm({
    defaultValues: {
      paid: "unpaid", // Set the default value for "paid" to "unpaid"
    },
  });
  const { handleSubmit, setValue, watch, reset } = methods;

  const [jobPosts, setJobPosts] = useState([
    {
      duration: "1 month",
      paid: "paid",
      salary: "1000",
      skills: ["Programming", "Web Development"],
      description: "Need Software Engineering Interns.",
    },
  ]); // Pre-filled dummy job post
  const [editingIndex, setEditingIndex] = useState(null);

  const formData = watch();

  const handleAddSkill = (skill) => {
    const currentSkills = formData.skills || [];
    if (!currentSkills.includes(skill)) {
      setValue("skills", [...currentSkills, skill]);
    }
  };

  const handleRemoveSkill = (skill) => {
    const currentSkills = formData.skills || [];
    setValue(
      "skills",
      currentSkills.filter((s) => s !== skill)
    );
  };

  const onSubmit = (data) => {
    if (editingIndex !== null) {
      // Update existing job post
      const updatedJobPosts = [...jobPosts];
      updatedJobPosts[editingIndex] = data;
      setJobPosts(updatedJobPosts);
      setEditingIndex(null);
    } else {
      // Add new job post
      setJobPosts([...jobPosts, data]);
    }
    reset(); // Reset the form
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    const jobToEdit = jobPosts[index];
    reset(jobToEdit); // Populate the form with the selected job post
  };

  const handleDelete = (index) => {
    const updatedJobPosts = jobPosts.filter((_, i) => i !== index);
    setJobPosts(updatedJobPosts);
  };

  return (
    <div className="job-post-page">
      
      <FormProvider {...methods}>
        <Card className="job-post-form max-w-lg">
          <CardHeader>
            <CardTitle>{editingIndex !== null ? "Edit Job Post" : "Create Job Post"}</CardTitle>
            <CardDescription>
              Enter the details of the internship job post.
            </CardDescription>
          </CardHeader>
          <CardContent className="max-h-[60vh] overflow-y-auto">
            <Form>
              <form onSubmit={handleSubmit(onSubmit)} className="form-container">
                <FormField
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration</FormLabel>
                      <Select
                        onValueChange={(value) => setValue("duration", value)}
                        value={field.value} // Bind the field value
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="2 weeks">2 Weeks</SelectItem>
                          <SelectItem value="1 month">1 Month</SelectItem>
                          <SelectItem value="2 months">2 Months</SelectItem>
                          <SelectItem value="6 months">6 Months</SelectItem>
                          <SelectItem value="1 year">1 Year</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="paid"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Paid/Unpaid</FormLabel>
                      <Select
                        onValueChange={(value) => setValue("paid", value)}
                        defaultValue="unpaid" // Set the default value to "unpaid"
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select payment type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="paid">Paid</SelectItem>
                          <SelectItem value="unpaid">Unpaid</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {formData.paid === "paid" && (
                  <FormField
                    name="salary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expected Salary</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter salary amount"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  name="skills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skills Required</FormLabel>
                      <div className="skills-container">
                        {(formData.skills || []).map((skill) => (
                          <span key={skill} className="skill-tag">
                            {skill}
                            <button
                              type="button"
                              className="remove-skill-button"
                              onClick={() => handleRemoveSkill(skill)}
                            >
                              &times;
                            </button>
                          </span>
                        ))}
                      </div>
                      <Select
                        onValueChange={(value) => {
                          handleAddSkill(value);
                        }}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Add a skill" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {skillOptions
                            .filter(
                              (skill) =>
                                !(formData.skills || []).includes(skill)
                            )
                            .map((skill) => (
                              <SelectItem key={skill} value={skill}>
                                {skill}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Description</FormLabel>
                      <FormControl>
                        <textarea
                          className="textarea"
                          placeholder="Enter job description"
                          {...field}
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="form-submit sticky bottom-0 bg-white pt-4">
                  <button type="submit" className="custom-submit-button">
                    <span className="text">Submit</span>
                    <span className="icon">
                      <svg
                        viewBox="0 0 24 24"
                        height="24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5.5 0 0 1 0-2.121l.707-.707a1.5.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5.5 0 0 1 2.121 0l.707.707a1.5.5 0 0 1 0 2.121z"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </FormProvider>

      <div className="job-post-list mt-6">
        {jobPosts.map((job, index) => (
          <Card key={index} className="job-post-item mb-4">
            <CardHeader>
              <CardTitle>Job Post </CardTitle>
              
            </CardHeader>
            <CardContent>
              <p><strong>Duration:</strong> {job.duration}</p>
              <p><strong>Type:</strong> {job.paid === "paid" ? "Paid" : "Unpaid"}</p>
              {job.paid === "paid" && <p><strong>Salary:</strong> ${job.salary}</p>}
              <p><strong>Skills:</strong> {job.skills.join(", ")}</p>
              <CardDescription>{job.description}</CardDescription>
            </CardContent>
            <div className="job-post-actions flex justify-end gap-2 p-4">
              <button className="btn" onClick={() => handleEdit(index)}>
                <span className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-pencil-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.854.146a.5.5 0 0 1 .11.638l-.057.07L6.854 6.854l-.708.708L5.5 8.207l-.707.707-1.5 1.5a.5.5 0 0 1-.638.057l-.07-.057a.5.5 0 0 1-.057-.638l.057-.07 1.5-1.5.707-.707.646-.646.708-.708 6-6a.5.5 0 0 1 .707 0Z" />
                    <path d="M11.207 2.5 13.5 4.793 4.793 13.5H2.5v-2.293L11.207 2.5Z" />
                  </svg>
                </span>
                <span className="text">Edit</span>
              </button>
              <button className="custom-delete-button" onClick={() => handleDelete(index)}>
                <span className="text">Delete</span>
                <span className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                  </svg>
                </span>
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
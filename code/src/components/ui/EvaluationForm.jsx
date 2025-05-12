"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Save, Lightbulb, Copy, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { suggestFeedback } from "@/ai/flows/suggest-feedback";

const evaluationFormSchema = z.object({
  studentName: z.string().min(2, { message: "Student name must be at least 2 characters." }).max(100),
  internshipStartDate: z.date({ required_error: "Internship start date is required." }),
  internshipEndDate: z.date({ required_error: "Internship end date is required." }),
  overallPerformance: z.string().nonempty({ message: "Performance is required." }),
  skills: z.string().min(10, { message: "Skills description must be at least 10 characters." }),
  attitude: z.string().min(10, { message: "Attitude description must be at least 10 characters." }),
  areasForImprovement: z.string().min(10, { message: "Areas for improvement must be at least 10 characters." }),
  managerComments: z.string().optional(),
}).refine(data => data.internshipEndDate >= data.internshipStartDate, {
  message: "End date cannot be earlier than start date.",
  path: ["internshipEndDate"],
});

export function EvaluationForm({ initialData, onSubmit, isSubmitting }) {
  const router = useRouter();
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [isLoadingAISuggestions, setIsLoadingAISuggestions] = useState(false);
  const [aiError, setAiError] = useState(null);

  const form = useForm({
    resolver: zodResolver(evaluationFormSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          internshipStartDate: initialData.internshipStartDate ? new Date(initialData.internshipStartDate) : undefined,
          internshipEndDate: initialData.internshipEndDate ? new Date(initialData.internshipEndDate) : undefined,
        }
      : {
          studentName: "",
          skills: "",
          attitude: "",
          areasForImprovement: "",
          managerComments: "",
        },
  });

  const handleGetAISuggestions = async () => {
    const { overallPerformance, skills, attitude, areasForImprovement } = form.getValues();
    if (!overallPerformance || !skills || !attitude || !areasForImprovement) {
      setAiError("Please fill in Performance, Skills, Attitude, and Areas for Improvement to get AI suggestions.");
      return;
    }
    setAiError(null);
    setIsLoadingAISuggestions(true);
    setAiSuggestions([]);
    try {
      const result = await suggestFeedback({ performance: overallPerformance, skills, attitude, areasForImprovement });
      setAiSuggestions(result.feedbackSuggestions);
    } catch (error) {
      console.error("AI Suggestion Error:", error);
      setAiError("Failed to get AI suggestions. Please try again.");
    } finally {
      setIsLoadingAISuggestions(false);
    }
  };

  const handleAddSuggestionToComments = (suggestion) => {
    const currentComments = form.getValues("managerComments") || "";
    form.setValue("managerComments", `${currentComments}${currentComments ? "\n" : ""}- ${suggestion}`);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle>{initialData ? "Edit Evaluation" : "Create New Evaluation"}</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="studentName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Jane Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="internshipStartDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Internship Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="internshipEndDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Internship End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < (form.getValues("internshipStartDate") || new Date("1900-01-01"))
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="overallPerformance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Overall Performance</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select performance level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PerformanceOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills & Competencies</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe the intern's skills and competencies..." {...field} rows={4}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="attitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Attitude & Work Ethic</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe the intern's attitude and work ethic..." {...field} rows={4}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="areasForImprovement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Areas for Improvement</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Identify areas where the intern can improve..." {...field} rows={4}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="managerComments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Manager Comments</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter any additional comments..." {...field} rows={5} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4 rounded-md border border-dashed p-4 bg-muted/40">
              <div className="flex items-center justify-between">
                 <h4 className="text-sm font-medium">AI Feedback Suggestions</h4>
                <Button type="button" variant="outline" size="sm" onClick={handleGetAISuggestions} disabled={isLoadingAISuggestions}>
                  {isLoadingAISuggestions ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Lightbulb className="mr-2 h-4 w-4" />
                  )}
                  Get Suggestions
                </Button>
              </div>
              {aiError && <p className="text-sm text-destructive">{aiError}</p>}
              {aiSuggestions.length > 0 && (
                <ul className="space-y-2 pt-2">
                  {aiSuggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-center justify-between p-2 border rounded-md bg-background shadow-sm">
                      <span className="text-sm flex-1 pr-2">{suggestion}</span>
                      <Button variant="ghost" size="sm" onClick={() => handleAddSuggestionToComments(suggestion)} title="Add to comments">
                        <Copy className="h-3.5 w-3.5" />
                        <span className="sr-only">Add to comments</span>
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
              {isLoadingAISuggestions && !aiSuggestions.length && (
                 <div className="flex items-center justify-center p-4">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    <p className="ml-2 text-muted-foreground">Generating suggestions...</p>
                  </div>
              )}
               {!isLoadingAISuggestions && !aiSuggestions.length && !aiError && (
                 <p className="text-sm text-muted-foreground text-center py-2">Click "Get Suggestions" after filling relevant fields above.</p>
               )}
            </div>


          </CardContent>
          <CardFooter className="flex justify-end gap-2 pt-6">
            <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              {initialData ? "Save Changes" : "Create Evaluation"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

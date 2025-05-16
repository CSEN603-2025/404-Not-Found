"use client";

import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Building2,
  Factory,
  Users,
  Image as ImageIcon,
  Mail,
  ArrowRight,
  Paperclip,
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { companyRegistrationSchema, companySizeEnum } from "../lib/schema";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const companySizeLabels = {
  small: "Small (1-50 employees)",
  medium: "Medium (51-100 employees)",
  large: "Large (101-500 employees)",
  corporate: "Corporate (500+ employees)",
};

export function CompanyRegistrationForm({ defaultValues }) {
  const form = useForm({
    resolver: zodResolver(companyRegistrationSchema),
    defaultValues: {
      companyName: defaultValues?.companyName || "",
      industry: defaultValues?.industry || "",
      companySize: defaultValues?.companySize || "small",
      logoUrl: defaultValues?.logoUrl || "",
      email: defaultValues?.email || "",
      taxid: defaultValues?.taxid || "",
    },
  });

  const navigate = useNavigate(); // Initialize navigate

  return (
    <>
      <ToastContainer />
      <Card className="company-registration-form max-w-lg">
        <CardHeader>
          <CardTitle>Company Registration</CardTitle>
          <CardDescription>
            Enter your company details to register on the SCAD System.
          </CardDescription>
        </CardHeader>
        <CardContent className="max-h-[60vh] overflow-y-auto">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) => {
                // Handle your form submission here (e.g., show review, send to server, etc.)
                // Do NOT navigate to login here!
              })}
              className="form-container"
            >
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <Building2 className="form-icon" />
                      Company Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Acme Corporation" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <Factory className="form-icon" />
                      Industry
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Technology" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companySize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <Users className="form-icon" />
                      Company Size
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select company size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {companySizeEnum.options.map((size) => (
                          <SelectItem key={size} value={size}>
                            {companySizeLabels[size]}
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
                name="logoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <ImageIcon className="form-icon" />
                      Company Logo URL (Optional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://example.com/logo.png"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the URL of your company logo.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="taxid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <Building2 className="form-icon" />
                      Tax ID
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="XXX-XX-XXXX" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <Mail className="form-icon" />
                      Official Company Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="contact@acme.com"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Use an official company domain email address.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="documents"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <Paperclip className="form-icon" />
                      Company Documents (Optional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        multiple
                        onChange={(e) => {
                          // If you want to store files in state, you can do so here
                          field.onChange(e.target.files);
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Upload relevant company documents (PDF, DOCX, etc.).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="form-submit sticky bottom-0 bg-white pt-4">
                <Button
                  type="button"
                  className="w-full"
                  onClick={() => navigate("/")}
                >
                  Review Information <ArrowRight className="form-icon" />
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
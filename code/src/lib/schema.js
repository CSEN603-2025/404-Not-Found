import { z } from "zod";

export const companySizeEnum = z.enum([
  "small",
  "medium",
  "large",
  "corporate",
]);

export const companyRegistrationSchema = z.object({
  companyName: z.string().min(1, { message: "Company name is required." }),
  industry: z.string().min(1, { message: "Industry is required." }),
  companySize: companySizeEnum,
  logoUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export type CompanySize = z.infer<typeof companySizeEnum>;
export type CompanyRegistrationData = z.infer<typeof companyRegistrationSchema>;
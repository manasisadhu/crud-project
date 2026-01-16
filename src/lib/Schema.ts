import { z } from "zod";

export const teacherSchema = z.object({
	firstName: z.string().min(3, { error: "enter your first name" }),
	lastName: z.string().min(3, { error: "enter your last name" }),
});

export const studentSchema = z.object({
	firstName: z.string().min(3, { error: "enter your first name" }),
	lastName: z.string().min(3, { error: "enter your last name" }),
	gender: z.string().min(1, { error: "invalid gender" }),
	emailId: z.email().min(3, { error: "invalid email" }),
	teacherId: z.string().min(3, { error: "invalid teacher" }),
});

export type TeacherSchemaType = z.infer<typeof teacherSchema>;
export type StudentSchemaType = z.infer<typeof studentSchema>;

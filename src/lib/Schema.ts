import { z } from "zod";

export const teacherSchema = z.object({
	firstName: z.string().min(3, { error: "enter your first name" }),
	lastName: z.string().min(3, { error: "enter your last name" }),
});

export type TeacherSchemaType = z.infer<typeof teacherSchema>;

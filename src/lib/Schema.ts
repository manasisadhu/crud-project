import z from "zod";

export const teacherSchema = z.object({
	firstName: z.string().min(3, { message: "enter your first name" }),
	lastName: z.string().min(3, { message: "enter your first name" }),
});

export type TeacherSchemaType = z.infer<typeof teacherSchema>;

"use server";

import prisma from "@/lib/database/dbClient";
import { TeacherSchemaType } from "@/lib/Schema";
import { revalidatePath } from "next/cache";

const createTeacherAction = async (fdata: TeacherSchemaType) => {
	try {
		await prisma.teacher.create({
			data: fdata,
		});
		revalidatePath("/student/create");
		return {
			issuccess: true,
			message: "Teacher data created successfully",
		};
	} catch (error) {
		console.error(error);

		return {
			issuccess: false,
			message: "Teacher data creation failed",
		};
	}
};

export default createTeacherAction;

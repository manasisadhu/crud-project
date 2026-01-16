"use server";

import prisma from "@/lib/database/dbClient";
import { StudentSchemaType } from "@/lib/Schema";
import { nanoid } from "nanoid";
import sharp from "sharp";

const createStudentAction = async (sData: StudentSchemaType, img: File) => {
	try {
		const imgBuffer = await img.arrayBuffer();
		const imgId = `${nanoid(8)}.jpg`;
		await sharp(imgBuffer)
			.resize({
				height: 400,
				width: 400,
			})
			.jpeg({
				quality: 80,
				mozjpeg: true,
			})
			.toFile(`./public/${imgId}`);

		await prisma.student.create({
			data: {
				firstName: sData.firstName,
				lastName: sData.lastName,
				emailId: sData.emailId,
				gender: sData.gender,
				teacherId: sData.teacherId,
				stuImg: imgId,
			},
		});
		return {
			isSuccess: true,
			message: "form submition successful",
		};
	} catch (error) {
		console.error(error);
		return {
			isSuccess: false,
			message: "form submition failed",
		};
	}
};

export default createStudentAction;

import DisplayCard from "@/components/DisplayCard";
import prisma from "@/lib/database/dbClient";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Next.js Starter Fullstack",
	description: "Production grade Fullstack Next.js starter template",
};

const page = async () => {
	const studentData = await prisma.student.findMany({
		include: {
			teacher: {
				select: {
					firstName: true,
					lastName: true,
				},
			},
		},
		omit: {
			teacherId: true,
		},
	});
	console.log(studentData);
	return (
		<section className="grid h-[90dvh] grid-cols-1 place-items-center gap-6 pt-20 md:grid-cols-2">
			{studentData.map((item) => (
				<DisplayCard
					key={item.id}
					studentInfo={item}
				/>
			))}
		</section>
	);
};

export default page;

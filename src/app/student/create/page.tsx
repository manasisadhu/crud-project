import StudentForm from "@/components/Forms/StudentForm";
import { Card } from "@/components/shadcnui/card";
import prisma from "@/lib/database/dbClient";

const page = async () => {
	const teacherData = await prisma.teacher.findMany();
	return (
		<section className="grid h-[95dvh] place-items-center">
			<Card className="w-95 px-4">
				<h1 className="text-center text-2xl font-bold">Student Form</h1>
				<StudentForm techerInfo={teacherData} />
			</Card>
		</section>
	);
};

export default page;

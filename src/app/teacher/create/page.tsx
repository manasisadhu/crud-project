import TeacherForm from "@/components/Forms/TeacherForm";
import { Card } from "@/components/shadcnui/card";

const page = () => {
	return (
		<section className="grid h-dvh place-items-center">
			<Card className="w-80 p-5">
				<h1 className="text-center text-2xl font-bold">Create Teacher</h1>
				<TeacherForm />
			</Card>
		</section>
	);
};

export default page;

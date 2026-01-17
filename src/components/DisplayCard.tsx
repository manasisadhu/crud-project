import Image from "next/image";
import { Prisma } from "../../generated/prisma/client";
// import DeleteButton from "./DeleteButton";
import { Button } from "./shadcnui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./shadcnui/card";
type DisplayCardProps = {
	studentInfo: Prisma.StudentGetPayload<{
		include: {
			teacher: {
				select: {
					firstName: true;
					lastName: true;
				};
			};
		};
		omit: {
			teacherId: true;
		};
	}>;
};

const DisplayCard = ({ studentInfo }: DisplayCardProps) => {
	return (
		<Card className="mx-auto w-auto px-4 md:w-110">
			<CardHeader>
				<CardTitle className="text-center text-2xl font-bold">
					Student Details
				</CardTitle>
			</CardHeader>

			<CardContent>
				{/* Wrapper */}
				<div className="flex flex-col items-center gap-6 md:flex-row">
					{/* Image */}
					<div className="shrink-0">
						<Image
							src={`/${studentInfo.stuImg}`}
							alt="defaultpic"
							width={140}
							height={140}
							loading="eager"
							className="h-32 w-32 cursor-pointer rounded-full object-cover"
						/>
					</div>

					{/* Details */}
					<div className="space-y-3 text-center md:text-left">
						<div className="flex space-x-2">
							<p className="font-medium"> {studentInfo.firstName}</p>
							<p className="font-medium">{studentInfo.lastName}</p>
						</div>

						<p>{studentInfo.emailId}</p>

						<div className="flex gap-4">
							<p className="text-start">{studentInfo.gender}</p>
							<p className="text-center">
								{studentInfo.teacher.firstName} {studentInfo.teacher.lastName}
							</p>
						</div>
					</div>
				</div>
			</CardContent>

			<CardFooter className="flex flex-col gap-3">
				<Button
					className="w-full cursor-pointer bg-blue-700 text-white"
					asChild>
					{/* <Link href={`/updatestudent/${studentInfo.stuId}`}>Edit</Link> */}
				</Button>
				{/* <DeleteButton
					stuId={studentInfo.stuId}
					stuImg={studentInfo.stuImg}
				/> */}
			</CardFooter>
		</Card>
	);
};

export default DisplayCard;

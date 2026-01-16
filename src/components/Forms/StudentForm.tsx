"use client";

import { studentSchema, StudentSchemaType } from "@/lib/Schema";
import createStudentAction from "@/server/createStudentAction";
import { faker } from "@faker-js/faker/locale/en_IN";
import { zodResolver } from "@hookform/resolvers/zod";
import { InfoIcon, Loader2Icon, SparkleIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useFilePicker } from "use-file-picker";
import { Teacher } from "../../../generated/prisma/client";
import { Button } from "../shadcnui/button";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../shadcnui/select";
type StudentFormProps = {
	techerInfo: Teacher[];
};

const StudentForm = ({ techerInfo }: StudentFormProps) => {
	const [isFile, setIsFile] = useState(false);
	const { push } = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const {
		handleSubmit,
		control,
		reset,

		formState: { isSubmitting },
		setValue,

		clearErrors,
	} = useForm({
		resolver: zodResolver(studentSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			emailId: "",
			gender: "",
			teacherId: "",
		},
		mode: "all",
	});
	const { openFilePicker, plainFiles, filesContent, clear } = useFilePicker({
		multiple: false,
		accept: "image/*",
		readAs: "DataURL",
		onFilesSuccessfullySelected: () => setIsFile(true),
		onClear: () => setIsFile(false),
	});

	const submitData = async (sData: StudentSchemaType) => {
		await new Promise<void>((r) => setTimeout(r, 1800));
		const { isSuccess, message } = await createStudentAction(
			sData,
			plainFiles[0],
		);
		if (isSuccess) {
			toast.success(message);
			push("/");
			reset();
			clear();
		} else {
			toast.error(message);
		}
	};
	const autoGenarate = async () => {
		setIsLoading(true);
		await new Promise<void>((r) => setTimeout(r, 1800));
		const { person, internet } = faker;
		const sex = person.sexType();
		const firstName = person.firstName(sex);
		const lastName = person.lastName(sex);
		const email = internet.email({
			firstName,
			lastName,
		});

		setValue("firstName", firstName);
		setValue("lastName", lastName);
		setValue("emailId", email);
		setValue("gender", sex);
		clearErrors();
		setIsLoading(false);
	};

	return (
		<>
			{!isFile && (
				<Image
					src={"/defaultpic.png"}
					alt="defaultpic"
					height={400}
					width={400}
					loading="eager"
					className="mx-auto h-34 w-34 cursor-pointer rounded-full object-cover"
					onClick={() => openFilePicker()}
				/>
			)}
			{filesContent.map((file, index) => (
				<Image
					src={file.content}
					alt={file.name}
					height={400}
					width={400}
					loading="eager"
					className="mx-auto h-34 w-34 cursor-pointer rounded-full object-cover"
					onClick={() => openFilePicker()}
					key={index}
				/>
			))}
			<form
				onSubmit={handleSubmit(submitData)}
				noValidate
				className="space-y-3">
				<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
					<Controller
						name="firstName"
						control={control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor={field.name}>First Name</FieldLabel>
								<Input
									{...field}
									id={field.name}
									type="text"
									aria-invalid={fieldState.invalid}
									placeholder="enter your first name"
									autoComplete="given-name"
								/>

								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<Controller
						name="lastName"
						control={control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor={field.name}>Last Name</FieldLabel>
								<Input
									{...field}
									id={field.name}
									type="text"
									aria-invalid={fieldState.invalid}
									placeholder="enter your last name"
									autoComplete="family-name"
								/>

								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
				</div>

				<Controller
					name="emailId"
					control={control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor={field.name}>Email Id</FieldLabel>
							<Input
								{...field}
								id={field.name}
								type="email"
								aria-invalid={fieldState.invalid}
								placeholder="enter your email"
								autoComplete="email"
							/>

							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
					<Controller
						name="gender"
						control={control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor={field.name}>Gender</FieldLabel>
								<Select
									name={field.name}
									value={field.value}
									onValueChange={field.onChange}>
									<SelectTrigger className="w-45">
										<SelectValue placeholder="Select a Gender" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectItem value="male">Male</SelectItem>
											<SelectItem value="female">Female</SelectItem>
											<SelectItem value="others">Others</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>

								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>

					<Controller
						name="teacherId"
						control={control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor={field.name}>Teacher</FieldLabel>
								<Select
									name={field.name}
									value={field.value}
									onValueChange={field.onChange}>
									<SelectTrigger className="w-45">
										<SelectValue placeholder="Select a Teacher" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											{techerInfo.map((item) => (
												<SelectItem
													value={item.id}
													key={item.id}>
													{item.firstName} {item.lastName}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>

								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
				</div>
				<Button
					disabled={isSubmitting}
					className="w-full cursor-pointer">
					{isSubmitting ? (
						<>
							<Loader2Icon className="animate-spin" />
							Submitting......
						</>
					) : (
						<>
							<InfoIcon />
							Submit
						</>
					)}
				</Button>
			</form>
			<Button
				className="w-full cursor-pointer"
				disabled={isLoading}
				onClick={autoGenarate}>
				{isLoading ? (
					<>
						<Loader2Icon className="animate-spin" /> Genarating.....
					</>
				) : (
					<>
						<SparkleIcon /> Genarate
					</>
				)}
			</Button>
		</>
	);
};

export default StudentForm;

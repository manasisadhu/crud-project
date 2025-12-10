"use client";

import { teacherSchema, TeacherSchemaType } from "@/lib/Schema";
import createTeacherAction from "@/server/createTeacherAction";
import { faker } from "@faker-js/faker/locale/en_IN";
import { zodResolver } from "@hookform/resolvers/zod";
import { InfoIcon, Loader2Icon, Sparkles } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../shadcnui/button";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";

const TeacherForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const { handleSubmit, control, formState, reset, setValue, clearErrors } =
		useForm({
			resolver: zodResolver(teacherSchema),
			defaultValues: {
				firstName: "",
				lastName: "",
			},
			mode: "onSubmit",
		});

	const submitTeacherData = async (fdata: TeacherSchemaType) => {
		await new Promise<void>((r) => setTimeout(r, 1800));

		const { issuccess, message } = await createTeacherAction(fdata);

		if (issuccess) {
			toast.success(message);
			reset();
		} else {
			toast.error(message);
		}
	};
	const teacherDetailsGenaretor = async () => {
		setIsLoading(true);
		await new Promise<void>((r) => setTimeout(r, 1800));

		const { person } = faker;

		setValue("firstName", person.firstName());
		setValue("lastName", person.lastName());
		clearErrors();
		setIsLoading(false);
	};

	return (
		<>
			<form
				onSubmit={handleSubmit(submitTeacherData)}
				className="space-y-3">
				<Controller
					name="firstName"
					control={control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor={field.name}>first name</FieldLabel>
							<Input
								{...field}
								id={field.name}
								type="text"
								aria-invalid={fieldState.invalid}
								placeholder="enter your first name"
								autoComplete="given-name"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>

				<Controller
					name="lastName"
					control={control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor={field.name}>last name</FieldLabel>
							<Input
								{...field}
								id={field.name}
								type="text"
								aria-invalid={fieldState.invalid}
								placeholder="enter your last name"
								autoComplete="given-name"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Button
					type="submit"
					disabled={formState.isSubmitting}
					className="w-full cursor-pointer">
					{formState.isSubmitting ? (
						<>
							<Loader2Icon className="animate-spin" />
							submitting.....
						</>
					) : (
						<>
							<InfoIcon /> submit
						</>
					)}
				</Button>
			</form>
			<Button
				className="cursor-pointer"
				onClick={teacherDetailsGenaretor}
				type="button"
				disabled={isLoading}>
				{isLoading ? (
					<>
						<Loader2Icon className="animate-spin" />
						Genarating......
					</>
				) : (
					<>
						<Sparkles /> Genarate
					</>
				)}
			</Button>
		</>
	);
};

export default TeacherForm;

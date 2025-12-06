"use client";

import { teacherSchema, TeacherSchemaType } from "@/lib/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { InfoIcon, Loader2Icon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../shadcnui/button";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";

const TeacherForm = () => {
	const { handleSubmit, control, formState, reset } = useForm({
		resolver: zodResolver(teacherSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
		},
		mode: "onSubmit",
	});

	const submitTeacherData = async (fdata: TeacherSchemaType) => {
		await new Promise<void>((r) => setTimeout(r, 1800));
		console.log(fdata);
		reset();
	};

	return (
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
				disabled={formState.isSubmitting}
				className="w-full">
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
	);
};

export default TeacherForm;

// pages/form.tsx

import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod/src/zod";

// Define a Zod schema for form validation
const schema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters long"),
  lastName: z.string().min(2, "Last name must be at least 2 characters long"),
});

type FormData = z.infer<typeof schema>;

export default function MyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema), // Use Zod as the validation resolver
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>First Name</label>
        <input {...register("firstName")} />
        {errors.firstName && <span>{errors.firstName.message}</span>}
      </div>

      <div>
        <label>Last Name</label>
        <input {...register("lastName")} />
        {errors.lastName && <span>{errors.lastName.message}</span>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

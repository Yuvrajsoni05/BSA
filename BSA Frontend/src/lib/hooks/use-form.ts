"use client";

import { useState } from "react";
import { ZodSchema } from "zod";

interface UseFormProps<T> {
  initialValues: T;
  schema: ZodSchema;
  onSubmit: (values: T) => Promise<void>;
}

interface UseFormReturn<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  isLoading: boolean;
  generalError: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  setGeneralError: (error: string) => void;
  resetForm: () => void;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  schema,
  onSubmit,
}: UseFormProps<T>): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof T]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError("");

    const result = schema.safeParse(values);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof T, string>> = {};
      result.error.issues.forEach((error) => {
        const field = error.path[0] as keyof T;
        fieldErrors[field] = error.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);

    try {
      await onSubmit(values);
    } catch (error: any) {
      setGeneralError(
        error.response?.data?.detail ||
          error.response?.data?.message ||
          "An error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setGeneralError("");
  };

  return {
    values,
    errors,
    isLoading,
    generalError,
    handleChange,
    handleSubmit,
    setGeneralError,
    resetForm,
  };
}

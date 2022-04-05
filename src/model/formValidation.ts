import { ValidationErrors } from "../components/PayForm"

export const required =
  (description: string) =>
  (value: string): string | undefined =>
    !value || value.trim() === "" ? description : undefined;

export const hasError = (
  validationErrors: ValidationErrors,
  fieldName: string
) => validationErrors[fieldName as keyof ValidationErrors] !== undefined;

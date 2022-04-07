import { MaternityValidationErrors } from "../types/maternity";

export const required =
  (description: string) =>
  (value: string): string | undefined =>
    !value || value.trim() === "" ? description : undefined;

export const hasError = (
  validationErrors: MaternityValidationErrors,
  fieldName: string
) =>
  validationErrors[fieldName as keyof MaternityValidationErrors] !== undefined;

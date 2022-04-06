import React, { ChangeEvent, useState, FormEvent, FocusEvent } from "react";
import { Button, Box, FormControl, TextField, MenuItem } from "@mui/material";
import { useAppDispatch } from "../app/hooks";
import { setValues } from "../features/maternitySlice";
import { required, hasError } from "../model/formValidation";

interface Maternity {
  salary: string;
  weeks: string;
  percentage: string;
  statutory: string;
  studentLoan: string;
}

export interface ValidationErrors {
  salary?: string;
  weeks?: string;
  percentage?: string;
  statutory?: string;
  studentLoan?: string;
}

const PayForm = () => {
  const [maternity, setMaternity] = useState<Maternity>({
    salary: "",
    weeks: "",
    percentage: "",
    statutory: "",
    studentLoan: "0",
  });

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );

  const dispatch = useAppDispatch();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(setValues(maternity));
  };

  const handleReset = (event: FormEvent<HTMLFormElement>) => {
    setMaternity({
      salary: "",
      weeks: "",
      percentage: "",
      statutory: "",
      studentLoan: "0",
    });

    setValidationErrors({});
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setMaternity((maternity) => ({
      ...maternity,
      [name]: value,
    }));
  };

  const canSubmit = (): boolean => {
    const { salary, weeks, percentage, statutory } = maternity;

    if (salary && weeks && percentage && statutory) {
      return false;
    }
    return true;
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const validators = {
      salary: required("Salary is required"),
      weeks: required("Number of weeks is required"),
      percentage: required("Pay percentage is required"),
      statutory: required("statutory maternity pay period is required"),
      studentLoan: required("Student loan is required"),
    };

    const result = validators[event.target.name as keyof ValidationErrors](
      event.target.value
    );

    setValidationErrors({ ...validationErrors, [event.target.name]: result });
  };

  const renderError = (fieldName: string) => {
    if (hasError(validationErrors, fieldName)) {
      return (
        <span className="error">
          {validationErrors[fieldName as keyof ValidationErrors]}
        </span>
      );
    }
  };

  const isError = (fieldName: string) => {
    if (hasError(validationErrors, fieldName)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Box textAlign="center">
      <p>
        A super simple maternity pay calculator. This calculator is designed for
        use by people who are paid monthly, and are looking to see how much they
        will be paid over the course of their maternity leave in a 'contract
        language' friendly way
      </p>
      <form data-testid="PayForm" onSubmit={handleSubmit} onReset={handleReset}>
        <FormControl>
          <TextField
            id="salary"
            name="salary"
            placeholder="30000"
            label="What is your current salary?"
            type="number"
            data-testid="salary"
            value={maternity.salary}
            onChange={handleChange}
            onBlur={handleBlur}
            color="primary"
            error={isError("salary")}
          />
          {renderError("salary")}
          <TextField
            id="weeks"
            name="weeks"
            type="number"
            placeholder="16"
            label="How many weeks will you receive this?"
            value={maternity.weeks}
            onChange={handleChange}
            onBlur={handleBlur}
            color="primary"
            error={isError("weeks")}
          />
          {renderError("weeks")}
          <TextField
            id="percentage"
            name="percentage"
            type="number"
            label="What percentage will you receive?"
            placeholder="100"
            value={maternity.percentage}
            onChange={handleChange}
            onBlur={handleBlur}
            color="primary"
            error={isError("percentage")}
          />
          {renderError("percentage")}
          <TextField
            name="statutory"
            id="statutory"
            type="number"
            placeholder="23"
            label="How many weeks will you receive statutory pay?"
            value={maternity.statutory}
            onChange={handleChange}
            onBlur={handleBlur}
            color="primary"
            error={isError("statutory")}
          />
          {renderError("statutory")}
          <TextField
            label="Student Loan"
            value={maternity.studentLoan}
            onChange={handleChange as any}
            name="studentLoan"
            data-testid="studentLoan"
            select
          >
            <MenuItem value={"0"}>No student loan</MenuItem>
            <MenuItem value={"1"}>Plan 1</MenuItem>
            <MenuItem value={"2"}>Plan 2</MenuItem>
          </TextField>
          <Box textAlign="center">
            <Button
              type="submit"
              name="calculate"
              disabled={canSubmit()}
              color="primary"
              size="large"
              variant="contained"
            >
              Calculate
            </Button>
            <Button
              type="reset"
              name="reset"
              color="primary"
              size="large"
              variant="contained"
            >
              Reset
            </Button>
          </Box>
        </FormControl>
      </form>
    </Box>
  );
};

export default PayForm;

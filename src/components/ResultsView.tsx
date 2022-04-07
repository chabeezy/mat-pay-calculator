import React from "react";
import { salaryWithMonths } from "../model/calculateSalary";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { setValues } from "../features/maternitySlice";
import {
  Table,
  TableHead,
  TableBody,
  Paper,
  TableContainer,
  Button,
  Box,
} from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../styles/theme";

export interface SalaryDetails {
  month: Months;
  salary: number;
}

export type Months =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

const ResultsView = () => {
  const dispatch = useAppDispatch();

  const { salary, weeks, percentage, statutory, studentLoan, maternityMonth } =
    useAppSelector((state) => state.maternity);

  const handleReset = () => {
    dispatch(
      setValues({
        salary: "",
        weeks: "",
        percentage: "",
        statutory: "",
      })
    );
  };

  return (
    <>
      <Box textAlign="center">
        <p>A month by month breakdown of your pay over the next 12 months</p>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell variant="head" align="center">
                Month
              </StyledTableCell>
              <StyledTableCell variant="head" align="center">
                Salary
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {salaryWithMonths(
              Number(maternityMonth) - 1,
              Number(salary),
              Number(percentage),
              Number(weeks),
              Number(statutory),
              Number(studentLoan)
            ).map((result) => (
              <StyledTableRow key={result.month}>
                <StyledTableCell align="center">{result.month}</StyledTableCell>
                <StyledTableCell align="center">
                  £{result.salary}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box textAlign="center">
        <Button
          name="reset"
          data-testid="reset"
          onClick={handleReset}
          color="primary"
          size="large"
          variant="contained"
        >
          Reset
        </Button>
      </Box>
    </>
  );
};

export default ResultsView;

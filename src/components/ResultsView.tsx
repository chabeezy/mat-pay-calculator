import React from "react";
import { styled } from "@mui/material/styles";
import { salaryWithMonths } from "../model/calculateSalary";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { setValues } from "../features/maternitySlice";
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  TableContainer,
  Button,
  Box,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

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

interface Theme {
  theme: {
    palette: {
      common: {
        black: string;
        white: string;
      };
      primary: {
        light: string;
      };
      action: {
        hover: string;
      };
    };
  };
}

const StyledTableCell = styled(TableCell)(({ theme }: Theme) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }: Theme) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ResultsView = () => {
  const dispatch = useAppDispatch();

  const { salary, weeks, percentage, statutory } = useAppSelector(
    (state) => state.maternity
  );

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
              2,
              Number(salary),
              Number(percentage),
              Number(weeks),
              Number(statutory)
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

import TaxCalculator from "tax-calculator-uk";
import { SalaryDetails, Months } from "../components/ResultsView";

interface MonthsResult {
  month: Months;
}

interface SalaryResult {
  salary: number;
}

interface Salary {
  monthly: number;
  weekly: number;
}

export const theNext12Months = (startingMonth: number): MonthsResult[] => {
  const months: Months[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let result = [];

  for (let i = 1; i <= 12; i++) {
    let iterator: number = startingMonth + i;

    if (iterator <= 11) {
      result.push({ month: months[iterator] });
    } else {
      result.push({ month: months[iterator - 12] });
    }
  }

  return result;
};

export const salaryWithDeductions = (
  salary: number,
  percentage: number,
  studentLoan: number
): Salary => {
  const options = {
    age: 30,
    studentLoanPlan: studentLoan,
    blind: false,
    pensionPercentage: 0,
  };

  const maternitySalary = (salary / 100) * percentage;

  const salaryAfterTax = TaxCalculator(maternitySalary, options);

  const monthly = Number(salaryAfterTax.getTaxBreakdown().netIncome.monthly);
  const weekly = Number(salaryAfterTax.getTaxBreakdown().netIncome.weekly);

  return {
    monthly,
    weekly,
  };
};

export const numberOfMonthsFromWeeks = (weeks: number) => {
  return Number((weeks / 4.33).toFixed());
};

export const salaryByMonth = (
  salary: number,
  percentage: number,
  weeks: number,
  studentLoan: number
): SalaryResult[] => {
  const numberOfMonthsAtPercentagePay = numberOfMonthsFromWeeks(weeks);
  const { monthly } = salaryWithDeductions(salary, percentage, studentLoan);

  let salaryResult: SalaryResult[] = [];

  for (let i = 1; i <= numberOfMonthsAtPercentagePay; i++) {
    salaryResult.push({
      salary: monthly,
    });
  }

  return salaryResult;
};

export const addStatutoryPay = (statWeeks: number): SalaryResult[] => {
  const statMaternityPay = Number((156.66 * 4.33).toFixed(2));
  const monthsOnStat = numberOfMonthsFromWeeks(statWeeks);

  let salaryResult: SalaryResult[] = [];

  for (let i = 1; i <= monthsOnStat; i++) {
    salaryResult.push({
      salary: statMaternityPay,
    });
  }

  return salaryResult;
};

export const statOnly = (weeklySalary: number) => {
  const longTermStatPay = 156.66;
  const firstMonth = Number((weeklySalary * 4.3).toFixed(2));
  const secondMonth = Number(
    (weeklySalary * 1.7 + longTermStatPay * 2.6).toFixed(2)
  );

  let salaryResults: SalaryResult[] = [];

  salaryResults.push({ salary: firstMonth }, { salary: secondMonth });

  return salaryResults;
};

export const calculateInitialPeriod = (
  salary: number,
  percentage: number,
  weeks: number,
  studentLoan: number,
  statOnlySelected: boolean = false,
  months: number
) => {
  let salaryResults: SalaryDetails[] = [];
  const monthResult = theNext12Months(months);

  if (statOnlySelected === false) {
    const salaryResult = salaryByMonth(salary, percentage, weeks, studentLoan);

    salaryResult.map((salaryObject, index) => {
      return salaryResults.push({ ...salaryObject, ...monthResult[index] });
    });
  } else {
    const { weekly } = salaryWithDeductions(salary, percentage, studentLoan);
    const statOnlyResult = statOnly(weekly);

    statOnlyResult.map((salaryObject, index) => {
      return salaryResults.push({ ...salaryObject, ...monthResult[index] });
    });
  }

  return salaryResults;
};

export const salaryWithMonths = (
  months: number,
  salary: number,
  percentage: number,
  weeks: number,
  statWeeks: number,
  studentLoan: number,
  statOnlySelected: boolean = false
): SalaryDetails[] => {
  const monthResult = theNext12Months(months);

  const statResult = addStatutoryPay(statWeeks);

  let salaryResults: SalaryDetails[] = calculateInitialPeriod(
    salary,
    percentage,
    weeks,
    studentLoan,
    statOnlySelected,
    months
  );

  let statPayFrom: number = salaryResults.length;
  //add mat pay
  for (let i = 0; i < statResult.length; i++) {
    salaryResults.push({ ...statResult[i], ...monthResult[statPayFrom] });
    statPayFrom++;
  }

  //add 0 months
  let zeroPayFrom: number = salaryResults.length;
  for (let i = 0; salaryResults.length < 12; i++) {
    salaryResults.push({ salary: 0, ...monthResult[zeroPayFrom] });
    zeroPayFrom++;
  }

  if (salaryResults.length <= 11) {
    return salaryResults;
  }

  return salaryResults.slice(0, 12);
};

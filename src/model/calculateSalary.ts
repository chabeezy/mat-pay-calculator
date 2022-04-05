import TaxCalculator from "tax-calculator-uk";
import { SalaryDetails, Months } from "../components/ResultsView";

interface MonthsResult {
  month: Months;
}

interface SalaryResult {
  salary: number;
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

export const salaryWithDeductions = (salary: number, percentage: number) => {
  const options = {
    age: 30,
    studentLoanPlan: 0,
    blind: false,
    pensionPercentage: 0,
  };

  const maternitySalary = (salary / 100) * percentage;

  const salaryAfterTax = TaxCalculator(maternitySalary, options);

  return Number(salaryAfterTax.getTaxBreakdown().netIncome.monthly);
};

export const numberOfMonthsFromWeeks = (weeks: number) => {
  return Number((weeks / 4.33).toFixed());
};

export const salaryByMonth = (
  salary: number,
  percentage: number,
  weeks: number
): SalaryResult[] => {
  const numberOfMonthsAtPercentagePay = numberOfMonthsFromWeeks(weeks);
  const totalSalary = salaryWithDeductions(salary, percentage);

  let salaryResult: SalaryResult[] = [];

  for (let i = 1; i <= numberOfMonthsAtPercentagePay; i++) {
    salaryResult.push({
      salary: totalSalary,
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

export const salaryWithMonths = (
  months: number,
  salary: number,
  percentage: number,
  weeks: number,
  statWeeks: number
): SalaryDetails[] => {
  const monthResult = theNext12Months(months);
  const salaryResult = salaryByMonth(salary, percentage, weeks);
  const statResult = addStatutoryPay(statWeeks);

  let salaryResults: SalaryDetails[] = [];

  //add salary
  salaryResult.map((salaryObject, index) => {
    return salaryResults.push({ ...salaryObject, ...monthResult[index] });
  });

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

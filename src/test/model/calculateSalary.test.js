import {
  theNext12Months,
  salaryWithDeductions,
  numberOfMonthsFromWeeks,
  salaryByMonth,
  addStatutoryPay,
  salaryWithMonths,
  statOnly,
} from "../../model/calculateSalary";

describe("theNext12Months", () => {
  it("displays the next 12 months", () => {
    const months = theNext12Months(2);
    expect(months).toEqual([
      {
        month: "April",
      },
      {
        month: "May",
      },
      {
        month: "June",
      },
      {
        month: "July",
      },
      {
        month: "August",
      },
      {
        month: "September",
      },
      {
        month: "October",
      },
      {
        month: "November",
      },
      {
        month: "December",
      },
      {
        month: "January",
      },
      {
        month: "February",
      },
      {
        month: "March",
      },
    ]);
  });

  it("displays the next 12 months from October", () => {
    const months = theNext12Months(8);
    expect(months).toEqual([
      {
        month: "October",
      },
      {
        month: "November",
      },
      {
        month: "December",
      },
      {
        month: "January",
      },
      {
        month: "February",
      },
      {
        month: "March",
      },
      {
        month: "April",
      },
      {
        month: "May",
      },
      {
        month: "June",
      },
      {
        month: "July",
      },
      {
        month: "August",
      },
      {
        month: "September",
      },
    ]);
  });
});

describe("salaryWithDeductions", () => {
  it("calculates correct tax for a month,  salary of 15000", () => {
    const { monthly } = salaryWithDeductions(15000, 100);

    expect(monthly).toBe(1154.52);
  });

  it("calculates correct tax for a week,  salary of 15000", () => {
    const { weekly } = salaryWithDeductions(15000, 100);

    expect(weekly).toBe(266.43);
  });

  it("calculates correct tax for a month, salary of 25000", () => {
    const { monthly } = salaryWithDeductions(25000, 100);

    expect(monthly).toBe(1721.18);
  });

  it("calculates correct tax for a month, salary of 50000", () => {
    const { monthly } = salaryWithDeductions(50000, 100);

    expect(monthly).toBe(3137.85);
  });

  it("calculates correct tax for a month, salary of 50000 at 90%", () => {
    const { monthly } = salaryWithDeductions(50000, 90);

    expect(monthly).toBe(2854.52);
  });
});

describe("numberOfMonthsFromWeeks", () => {
  it("26 weeks returns 6 months", () => {
    const months = numberOfMonthsFromWeeks(26);

    expect(months).toBe(6);
  });

  it("13 weeks returns 3 months", () => {
    const months = numberOfMonthsFromWeeks(13);

    expect(months).toBe(3);
  });

  describe("salaryByMonth", () => {
    it("returns the correct salary for 3 months", () => {
      const salaryByMonths = salaryByMonth(15000, 100, 13);

      expect(salaryByMonths).toEqual([
        { salary: 1154.52 },
        { salary: 1154.52 },
        { salary: 1154.52 },
      ]);
    });
    it("returns the correct salary for 6 months", () => {
      const salaryByMonths = salaryByMonth(25000, 90, 26);

      expect(salaryByMonths).toEqual([
        { salary: 1579.52 },
        { salary: 1579.52 },
        { salary: 1579.52 },
        { salary: 1579.52 },
        { salary: 1579.52 },
        { salary: 1579.52 },
      ]);
    });
  });

  describe("addStatutoryPay", () => {
    it("returns stat pay for 3 months", () => {
      const statPay = addStatutoryPay(13);

      expect(statPay).toEqual([
        { salary: 678.34 },
        { salary: 678.34 },
        { salary: 678.34 },
      ]);
    });

    it("returns stat pay for 6 months", () => {
      const statPay = addStatutoryPay(26);

      expect(statPay).toEqual([
        { salary: 678.34 },
        { salary: 678.34 },
        { salary: 678.34 },
        { salary: 678.34 },
        { salary: 678.34 },
        { salary: 678.34 },
      ]);
    });
  });
});
describe("salaryWithMonths", () => {
  it("returns array containing 3 months of salary, for a period of 13 weeks", () => {
    const salaryWithMonth = salaryWithMonths(2, 15000, 100, 13, 13);

    expect(salaryWithMonth).toEqual([
      { month: "April", salary: 1154.52 },
      { month: "May", salary: 1154.52 },
      { month: "June", salary: 1154.52 },
      { month: "July", salary: 678.34 },
      { month: "August", salary: 678.34 },
      { month: "September", salary: 678.34 },
      { month: "October", salary: 0 },
      { month: "November", salary: 0 },
      { month: "December", salary: 0 },
      { month: "January", salary: 0 },
      { month: "February", salary: 0 },
      { month: "March", salary: 0 },
    ]);
  });

  it("returns array containing 6 months of salary, for a period of 26 weeks", () => {
    const salaryWithMonth = salaryWithMonths(2, 40000, 100, 26, 13);

    expect(salaryWithMonth).toEqual([
      { month: "April", salary: 2571.18 },
      { month: "May", salary: 2571.18 },
      { month: "June", salary: 2571.18 },
      { month: "July", salary: 2571.18 },
      { month: "August", salary: 2571.18 },
      { month: "September", salary: 2571.18 },
      { month: "October", salary: 678.34 },
      { month: "November", salary: 678.34 },
      { month: "December", salary: 678.34 },
      { month: "January", salary: 0 },
      { month: "February", salary: 0 },
      { month: "March", salary: 0 },
    ]);
  });

  it("charlotte example", () => {
    const salaryWithMonth = salaryWithMonths(2, 27800, 100, 26, 13);

    expect(salaryWithMonth).toEqual([
      { month: "April", salary: 1879.85 },
      { month: "May", salary: 1879.85 },
      { month: "June", salary: 1879.85 },
      { month: "July", salary: 1879.85 },
      { month: "August", salary: 1879.85 },
      { month: "September", salary: 1879.85 },
      { month: "October", salary: 678.34 },
      { month: "November", salary: 678.34 },
      { month: "December", salary: 678.34 },
      { month: "January", salary: 0 },
      { month: "February", salary: 0 },
      { month: "March", salary: 0 },
    ]);
  });

  it("displays a maximum of 12 months", () => {
    const salaryWithMonth = salaryWithMonths(2, 27800, 100, 36, 33);

    expect(salaryWithMonth).toEqual([
      { month: "April", salary: 1879.85 },
      { month: "May", salary: 1879.85 },
      { month: "June", salary: 1879.85 },
      { month: "July", salary: 1879.85 },
      { month: "August", salary: 1879.85 },
      { month: "September", salary: 1879.85 },
      { month: "October", salary: 1879.85 },
      { month: "November", salary: 1879.85 },
      { month: "December", salary: 678.34 },
      { month: "January", salary: 678.34 },
      { month: "February", salary: 678.34 },
      { month: "March", salary: 678.34 },
    ]);
  });

  it("deducts plan 1 student loan", () => {
    const salaryWithMonth = salaryWithMonths(2, 40000, 100, 26, 13, 1);

    expect(salaryWithMonth).toEqual([
      { month: "April", salary: 2420.4 },
      { month: "May", salary: 2420.4 },
      { month: "June", salary: 2420.4 },
      { month: "July", salary: 2420.4 },
      { month: "August", salary: 2420.4 },
      { month: "September", salary: 2420.4 },
      { month: "October", salary: 678.34 },
      { month: "November", salary: 678.34 },
      { month: "December", salary: 678.34 },
      { month: "January", salary: 0 },
      { month: "February", salary: 0 },
      { month: "March", salary: 0 },
    ]);
  });
  it("supports stat only", () => {
    const salaryWithMonth = salaryWithMonths(2, 40000, 90, 6, 33, 0, true);

    expect(salaryWithMonth).toEqual([
      { month: "April", salary: 2326.47 },
      { month: "May", salary: 1327.08 },
      { month: "June", salary: 678.34 },
      { month: "July", salary: 678.34 },
      { month: "August", salary: 678.34 },
      { month: "September", salary: 678.34 },
      { month: "October", salary: 678.34 },
      { month: "November", salary: 678.34 },
      { month: "December", salary: 678.34 },
      { month: "January", salary: 678.34 },
      { month: "February", salary: 0 },
      { month: "March", salary: 0 },
    ]);
  });
});
describe("statOnly", () => {
  test("statOnly returns expected values for a weekly salary of 266.43", () => {
    const monthlySalary = statOnly(266.43);

    expect(monthlySalary).toEqual([{ salary: 1145.65 }, { salary: 860.25 }]);
  });
  test("statOnly returns expected values for a weekly salary of 1000", () => {
    const monthlySalary = statOnly(1000);

    expect(monthlySalary).toEqual([{ salary: 4300 }, { salary: 2107.32 }]);
  });
});

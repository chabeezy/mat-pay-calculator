import reducer, { setValues } from "../../features/maternitySlice";

it("should return the initial state", () => {
  expect(reducer(undefined, {})).toEqual({
    percentage: "",
    salary: "",
    statutory: "",
    weeks: "",
    studentLoan: "0",
  });
});

it("should handle maternity values being added", () => {
  expect(
    reducer(
      undefined,
      setValues({
        percentage: "20",
        salary: "35000",
        statutory: "20",
        weeks: "10",
        studentLoan: "2",
      })
    )
  ).toEqual({
    percentage: "20",
    salary: "35000",
    statutory: "20",
    weeks: "10",
    studentLoan: "2",
  });
});

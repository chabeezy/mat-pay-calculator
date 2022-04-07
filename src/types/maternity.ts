export interface Maternity {
    salary: string;
    weeks: string;
    percentage: string;
    statutory: string;
    studentLoan: string;
    maternityMonth: string;
    statOnlySelected: boolean
  }

  export interface MaternityValidationErrors {
    salary?: string;
    weeks?: string;
    percentage?: string;
    statutory?: string;
    studentLoan?: string;
  }
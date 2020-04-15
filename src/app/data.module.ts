export interface ISpending {
  id: number;
  description: string;
  amount: number;
  date: Date;
  type: ESpendingType;
}

export interface IUser {
  id: number;
  email: string;
  password: string;
}

export enum ESpendingType {
  SINGLE,
  SERIES,
}

export enum ETimeUnit {
  WEEK,
  MONTH,
  YEAR,
}

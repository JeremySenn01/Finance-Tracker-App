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

export interface IDialogProps {
  spending: ISpending;
  operation: EOperation;
}

export interface IUserCredentials {
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

export enum EOperation {
  NEW,
  UPDATE,
}

export enum EEntryType {
  SPENDING,
  INCOME,
}

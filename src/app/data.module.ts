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

export const images = {
  // tslint:disable-next-line:max-line-length
  EDIT: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAA9klEQVRoge3WvQ3CMBCG4VcswDIUrJWKkq9kJPbIHCA6SmhABHSJkyD/nHSv5MounsMJCkRR1FIdcAV6YFfZsjgBj8G6AfuaoCWJb7yrIYSNnzXEJr8v2T2xvwXONH4TYvoW3jfR9Ist0kP0tXDD9Fpje1MDXLLrEokPRjPO/K4uN3AqGaDTyNmDcfaYnzieDNCSIZrFz3mcxvaKJNL41E1US8zHNzeEWI5fNUSOTwnx30uX+rTImlj/y7v4twl8jmSAAl8iGaDAl0gGKPAlkgEKfIlkgAJfIhkgN3hwjgfneHCOB+d4cI4H53hwjgfn+CiKojI9AWv8xBmzmQkvAAAAAElFTkSuQmCC',
  // tslint:disable-next-line:max-line-length
  DELETE: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAABJUlEQVRoge2ZMU7DQBAAx5FFC5Eo8gxqCvIGGmq+QgtNRE3SAg1Fen4T4YZIpAlUmMIUcPLZx93q1hY70jaWz56J5VxhkOEMeAJ2QN0zH8AzcA4UQvePZgLc0i/tm3vgILv1DxYtUn+dVXbrb06BzwDBkJlndgfgwZF4By6BGTD1zDFwAeydtY951RsqR+Iav7g7N87aKlai7V+gjr1YJn45T7QspLAAbWJ3wgI4khQB3hj++6eDxEaVMiddcqN/ByxAGwvQJiWgoH0fkToexL9+AoPAArSxAG0sQBsL0MYCtLEAbSxAGwvQxgK0sQBtLECb0QeUCWt9X1OkjgcR8gReUm6QSA1suk4ICVjKuESxBl5TL1ICVzS/RK7PSlvgDjjsk/sCgfub6GlyprsAAAAASUVORK5CYII=',
};

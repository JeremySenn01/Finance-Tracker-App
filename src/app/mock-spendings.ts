import {ESpendingType, ISpending} from './data.module';

export const SPENDINGS: ISpending[] = [
  {
    id: 1,
    description: 'sunrise bill',
    amount: 60,
    date: new Date(),
    type: ESpendingType.SINGLE
  },
  {
    id: 2,
    description: 'Skillspark Abo',
    amount: 20,
    date: new Date(),
    type: ESpendingType.SINGLE
  },
  {
    id: 3,
    description: 'Xbox Live',
    amount: 25,
    date: new Date(),
    type: ESpendingType.SINGLE
  },
  {
    id: 4,
    description: 'Hookers & Cocaine',
    amount: 15000,
    date: new Date(),
    type: ESpendingType.SINGLE
  },
  {
    id: 5,
    description: 'Mom\'s Spaghetti',
    amount: 420,
    date: new Date(),
    type: ESpendingType.SINGLE
  },
  {
    id: 6,
    description: 'The coochie Fund',
    amount: 69,
    date: new Date(2020, 1, 20),
    type: ESpendingType.SINGLE
  }
];

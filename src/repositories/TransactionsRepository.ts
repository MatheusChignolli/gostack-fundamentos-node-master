import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface allResponse {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): allResponse {
    return {
      transactions: this.transactions,
      balance: this.getBalance(),
    };
  }

  public getBalance(): Balance {
    let income = 0;
    let outcome = 0;

    for (let index = 0; index < this.transactions.length; index++) {
      if (this.transactions[index].type === 'income') {
        income += this.transactions[index].value;
      } else {
        outcome += this.transactions[index].value;
      }
    }

    const total = income - outcome;

    return {
      income,
      outcome,
      total,
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;

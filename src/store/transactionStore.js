import { create } from "zustand";

const initialTransactions = [
  {
    type: "Rent Payment",
    date: "Mar 31, 08:00 PM",
    merchant: "ABC Properties",
    amount: "$1200.00",
    category: "Housing",
  },
  {
    type: "Salary Deposit",
    date: "Apr 1, 08:00 PM",
    merchant: "XYZ Corp",
    amount: "+$4350.00",
    category: "Income",
  },
  {
    type: "Grocery Shopping",
    date: "Apr 2, 08:00 PM",
    merchant: "Whole Foods",
    amount: "$85.75",
    category: "Food",
    tags: ["online", "shopping"],
  },
  {
    type: "Coffee Shop",
    date: "Apr 3, 08:00 PM",
    merchant: "Starbucks",
    amount: "$4.50",
    category: "Dining",
    tags: ["online", "shopping"],
  },
  {
    type: "Online Purchase",
    date: "Apr 4, 08:00 PM",
    merchant: "Amazon",
    amount: "$49.99",
    category: "Shopping",
    tags: ["online", "shopping"],
  },
  {
    type: "Online Purchase",
    date: "Apr 4, 08:00 PM",
    merchant: "Amazon",
    amount: "$49.99",
    category: "Shopping",
    tags: ["online", "shopping"],
  },
];

export const useTransactionStore = create((set) => ({
  transactions: initialTransactions,
  addTransaction: (tx) =>
    set((state) => ({
      transactions: [tx, ...state.transactions],
    })),
  editTransaction: (index, updated) =>
    set((state) => ({
      transactions: state.transactions.map((item, idx) =>
        idx === index ? updated : item
      ),
    })),
  deleteTransaction: (index) =>
    set((state) => ({
      transactions: state.transactions.filter((_, idx) => idx !== index),
    })),
}));

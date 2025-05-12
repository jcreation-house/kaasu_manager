import { create } from "zustand";
import { loadBudgets, saveBudgets } from "./backend";

const demoBudgets = [
  { id: 1, title: "Groceries", spend: 320, budget: 500 },
  { id: 2, title: "Rent", spend: 1200, budget: 1200 },
  { id: 3, title: "Utilities", spend: 110, budget: 150 },
  { id: 4, title: "Transportation", spend: 60, budget: 100 },
  { id: 5, title: "Dining Out", spend: 90, budget: 200 },
  { id: 6, title: "Entertainment", spend: 75, budget: 150 },
  { id: 7, title: "Health & Fitness", spend: 40, budget: 100 },
  { id: 8, title: "Savings", spend: 400, budget: 500 },
];

export const useBudgetStore = create((set) => ({
  budgets: loadBudgets() || demoBudgets,
  editBudget: (id, data) =>
    set((state) => {
      const budgets = state.budgets.map((b) =>
        b.id === id ? { ...b, ...data } : b
      );
      saveBudgets(budgets);
      return { budgets };
    }),
  deleteBudget: (id) =>
    set((state) => {
      const budgets = state.budgets.filter((b) => b.id !== id);
      saveBudgets(budgets);
      return { budgets };
    }),
  addBudget: (budget) =>
    set((state) => {
      const budgets = [...state.budgets, budget];
      saveBudgets(budgets);
      return { budgets };
    }),
}));

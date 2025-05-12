const BUDGETS_KEY = "budgets";

export function loadBudgets() {
  try {
    const data = localStorage.getItem(BUDGETS_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function saveBudgets(budgets) {
  localStorage.setItem(BUDGETS_KEY, JSON.stringify(budgets));
}

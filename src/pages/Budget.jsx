import React, { useState } from "react";
import { Row, Col, Tabs, DatePicker, Button, message, Space } from "antd";
import BudgetCard from "../component/BudgetCard";
import { useBudgetStore } from "../store/budgetStore";
import dayjs from "dayjs";
import ButtonGroup from "antd/es/button/button-group";

export const Budget = () => {
  const budgets = useBudgetStore((state) => state.budgets);
  const editBudget = useBudgetStore((state) => state.editBudget);
  const deleteBudget = useBudgetStore((state) => state.deleteBudget);
  const addBudget = useBudgetStore((state) => state.addBudget);

  const currentMonth = dayjs().format("YYYY-MM");
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const filteredBudgets = (type) =>
    budgets.filter((b) => b.type === type && b.month === selectedMonth);

  // Copy budgets from the selected month in the filter to the current month
  const handleCopyPrevious = () => {
    if (selectedMonth === currentMonth) {
      message.info("Please select a different month to copy from.");
      return;
    }
    const prevBudgets = budgets.filter((b) => b.month === selectedMonth);
    if (prevBudgets.length === 0) {
      message.info("No budgets found for the selected month.");
      return;
    }
    // Only copy if not already present for the current month
    const alreadyExists = budgets.some((b) => b.month === currentMonth);
    if (alreadyExists) {
      message.warning("Budgets for the current month already exist.");
      return;
    }
    prevBudgets.forEach((b) => {
      addBudget({
        ...b,
        id: Date.now() + Math.random(), // unique id
        month: currentMonth,
        spend: 0, // reset spend for new month
      });
    });
    message.success(`Copied budgets from ${selectedMonth} to ${currentMonth}!`);
  };

  const tabItems = [
    {
      key: "income",
      label: "Income",
      children: (
        <Row
          gutter={[16, 16]}
          style={{ background: "#f0f2f5", padding: "16px" }}
        >
          {filteredBudgets("income").map((budget) => (
            <Col key={budget.id} xs={24} sm={24} md={12} lg={8}>
              <BudgetCard
                title={budget.title}
                spend={budget.spend}
                budget={budget.budget}
                type={"income"}
                onEdit={() =>
                  editBudget(budget.id, { spend: budget.spend + 10 })
                }
                onDelete={() => deleteBudget(budget.id)}
              />
            </Col>
          ))}
        </Row>
      ),
    },
    {
      key: "expense",
      label: "Expense",
      children: (
        <Row
          gutter={[16, 16]}
          style={{ background: "#f0f2f5", padding: "16px" }}
        >
          {filteredBudgets("expense").map((budget) => (
            <Col key={budget.id} xs={24} sm={24} md={12} lg={8}>
              <BudgetCard
                title={budget.title}
                spend={budget.spend}
                budget={budget.budget}
                type={"expense"}
                onEdit={() =>
                  editBudget(budget.id, { spend: budget.spend + 10 })
                }
                onDelete={() => deleteBudget(budget.id)}
              />
            </Col>
          ))}
        </Row>
      ),
    },
  ];

  return (
    <div>
      <Space
        style={{
          width: "100%",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <DatePicker
          picker="month"
          value={selectedMonth ? dayjs(selectedMonth) : null}
          onChange={(date) => {
            if (date) {
              setSelectedMonth(date.format("YYYY-MM"));
            } else {
              setSelectedMonth(currentMonth); // Reset to current month if cleared
            }
          }}
          allowClear
        />
        <ButtonGroup>
          <Button onClick={handleCopyPrevious}>Copy From Selected Month</Button>
          <Button onClick={() => alert("Still working on it ")}>+</Button>
        </ButtonGroup>
      </Space>
      <Tabs defaultActiveKey="income" items={tabItems} />
    </div>
  );
};

/*
Features in this Budget page:

- Uses Zustand for global budget state management (add, edit, delete).
- Demo data and all changes are persisted in localStorage (via backend.js).
- Two tabs: "Income" and "Expense", using Tabs with the recommended items prop.
- Each tab shows only budgets for the selected type and month.
- Month filter using DatePicker (month picker).
- If the month filter is cleared, it automatically resets to the current month.
- Each budget is displayed as a BudgetCard, showing title, spend/earned, budget, and percentage.
- Edit and Delete actions for each budget, updating global state and localStorage.
- Percentage and color logic in BudgetCard: 
    - "Earned" and green percent for income if 100% or more.
    - "Spend" and red percent for expense if 100% or more.
- **NEW:** Button to copy budgets from the selected month in the filter to the current month (right side of filter).
*/

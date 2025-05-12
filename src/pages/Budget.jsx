import React from "react";
import { Row, Col } from "antd";
import BudgetCard from "../component/BudgetCard";
import { useBudgetStore } from "../store/budgetStore";

export const Budget = () => {
  const budgets = useBudgetStore((state) => state.budgets);
  const editBudget = useBudgetStore((state) => state.editBudget);
  const deleteBudget = useBudgetStore((state) => state.deleteBudget);

  return (
    <Row gutter={[16, 16]} style={{ background: "#f0f2f5", padding: "16px" }}>
      {budgets.map((budget) => (
        <Col key={budget.id} xs={24} sm={24} md={12} lg={8}>
          <BudgetCard
            title={budget.title}
            spend={budget.spend}
            budget={budget.budget}
            percent={((budget.spend / budget.budget) * 100).toFixed(1)}
            onEdit={() => editBudget(budget.id, { spend: budget.spend + 10 })}
            onDelete={() => deleteBudget(budget.id)}
          />
        </Col>
      ))}
    </Row>
  );
};

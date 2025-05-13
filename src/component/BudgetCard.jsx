import React from "react";
import { Card, Progress, Button, Typography, theme } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Text } = Typography;

const BudgetCard = ({ type, title, spend, budget, onEdit, onDelete }) => {
  const percent = budget > 0 ? (spend / budget) * 100 : 0;
  const percentDisplay = percent.toFixed(1);
  const remaining = budget - spend;
  const { token } = theme.useToken();
  const primaryColor = token.colorPrimary;

  // For income: green if 100% or more, else default
  // For expense: red if 100% or more, else default
  let percentColor = undefined;
  if (type === "income" && percent >= 100) percentColor = "green";
  if (type === "expense" && percent >= 100) percentColor = "red";

  return (
    <Card
      title={
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>{title}</span>
          <div>
            <Button type="text" icon={<EditOutlined />} onClick={onEdit} />
            <Button type="text" icon={<DeleteOutlined />} onClick={onDelete} />
          </div>
        </div>
      }
      style={{ width: "100%", margin: "20px auto" }}
    >
      {/* Card Content: Earned/Spend and Budget */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <Text strong>
          {type === "income" ? "Earned" : "Spend"}: {spend}
        </Text>
        <Text strong>Budget: {budget}</Text>
      </div>

      {/* Progress bar showing how much of the budget is spent/earned */}
      <Progress
        percent={Number(percentDisplay)}
        format={() => (
          <span style={{ color: percentColor }}>{percentDisplay}%</span>
        )}
        status={
          percent >= 100
            ? type === "income"
              ? "success"
              : "exception"
            : "active"
        }
        strokeColor={primaryColor}
      />

      {/* Remaining Balance at the bottom */}
      <div style={{ textAlign: "center", marginTop: 16 }}>
        <Text>
          {type === "income" ? "Remaining to Earn" : "Remaining Balance"}:{" "}
          {remaining}
        </Text>
      </div>
    </Card>
  );
};

export default BudgetCard;

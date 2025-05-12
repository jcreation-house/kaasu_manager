import React from "react";
import { Card, Progress, Button, Typography, theme } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Text } = Typography;

const BudgetCard = ({ title, spend, budget, onEdit, onDelete }) => {
  // Calculate percentage for the progress bar, capping at 100% and format to 1 decimal
  const percent = budget > 0 ? Math.min((spend / budget) * 100, 100) : 0;
  const percentDisplay = percent.toFixed(1);
  const remaining = budget - spend;
  const { token } = theme.useToken();
  const primaryColor = token.colorPrimary;

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
      {/* Card Content: Spend and Budget */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <Text strong>Spend: {spend}</Text>
        <Text strong>Budget: {budget}</Text>
      </div>

      {/* Progress bar showing how much of the budget is spent */}
      <Progress
        percent={Number(percentDisplay)}
        format={() => `${percentDisplay}%`}
        status={percent >= 100 ? "exception" : "active"}
        strokeColor={primaryColor}
      />

      {/* Remaining Balance at the bottom */}
      <div style={{ textAlign: "center", marginTop: 16 }}>
        <Text>Remaining Balance: {remaining}</Text>
      </div>
    </Card>
  );
};

export default BudgetCard;

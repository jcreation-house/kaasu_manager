import React from "react";
import { Row, Col } from "antd";
import BudgetCard from "../component/BudgetCard";

export const Budget = () => {
  return (
    <Row
      gutter={[16, 16]} // Add spacing between rows and columns
      style={{ background: "#f0f2f5", padding: "16px" }}
    >
      {Array.from({ length: 8 }).map((_, index) => (
        <Col
          key={index}
          xs={24} // Full width on extra small screens (mobile)
          sm={24} // Two cards per row on small screens
          md={12} // Three cards per row on medium screens
          lg={8} // Four cards per row on large screens
        >
          <BudgetCard
            title={`Budget ${index + 1}`}
            spend={Math.floor(Math.random() * 500)}
            budget={1000}
            onEdit={() => console.log("Edit clicked")}
            onDelete={() => console.log("Delete clicked")}
          />
        </Col>
      ))}
    </Row>
  );
};

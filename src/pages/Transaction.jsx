import React from "react";
import { List, Typography, Button } from "antd";
import { AddTransactionForm } from "../component/forms/add-transaction-form.";

const transactions = [
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
  },
  {
    type: "Coffee Shop",
    date: "Apr 3, 08:00 PM",
    merchant: "Starbucks",
    amount: "$4.50",
    category: "Dining",
  },
  {
    type: "Online Purchase",
    date: "Apr 4, 08:00 PM",
    merchant: "Amazon",
    amount: "$49.99",
    category: "Shopping",
  },
];

const Transactions = () => (
  <div style={{ padding: "20px" }}>
    <Typography.Title level={2}>Transactions</Typography.Title>
    <Typography.Title level={4}>All Transactions</Typography.Title>
    <Typography.Paragraph>
      A complete history of your financial activities
    </Typography.Paragraph>
    <AddTransactionForm />
    <List
      itemLayout="horizontal"
      dataSource={transactions}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            title={item.type}
            description={`${item.date} - ${item.merchant}`}
          />
          <div>{item.amount}</div>
          <div style={{ marginLeft: "10px", color: "gray" }}>
            {item.category}
          </div>
        </List.Item>
      )}
    />
  </div>
);

export default Transactions;

import React, { useState } from "react";
import { List, Typography, Button, Tag, Switch, Space } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { AddTransactionForm } from "../component/forms/add-transaction-form.";
import { EditTransactionForm } from "../component/forms/EditTransactionForm";

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

const Transactions = () => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  // Filter transactions by selected tags
  const filteredTransactions = selectedTags.length
    ? transactions.filter(
        (tx) => tx.tags && selectedTags.every((tag) => tx.tags.includes(tag))
      )
    : transactions;

  const handleTagClick = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearTags = () => setSelectedTags([]);

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditModalOpen(true);
  };

  const handleEditSave = (updated) => {
    setTransactions((prev) =>
      prev.map((item, idx) => (idx === editIndex ? updated : item))
    );
    setEditModalOpen(false);
    setEditIndex(null);
  };

  const handleDelete = () => {
    setTransactions((prev) => prev.filter((_, idx) => idx !== editIndex));
    setEditModalOpen(false);
    setEditIndex(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Space
        style={{
          width: "100%",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <div>
          <Typography.Title level={2} style={{ marginBottom: 0 }}>
            Transactions
          </Typography.Title>
          <Typography.Title level={4} style={{ marginTop: 0 }}>
            All Transactions
          </Typography.Title>
        </div>
        <div>
          <Switch
            checked={editMode}
            onChange={setEditMode}
            checkedChildren="Edit"
            unCheckedChildren="View"
          />
        </div>
      </Space>
      <Typography.Paragraph>
        A complete history of your financial activities
      </Typography.Paragraph>
      <AddTransactionForm />

      {/* Tag filter display */}
      {selectedTags.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <Typography.Text strong>Selected Tags: </Typography.Text>
          {selectedTags.map((tag) => (
            <Tag
              key={tag}
              color="blue"
              closable
              onClose={() => handleTagClick(tag)}
            >
              {tag}
            </Tag>
          ))}
          <Button type="link" onClick={clearTags}>
            Clear Filters
          </Button>
        </div>
      )}

      <List
        itemLayout="horizontal"
        dataSource={filteredTransactions}
        renderItem={(item, idx) => (
          <List.Item
            actions={
              editMode
                ? [
                    <Button
                      icon={<EditOutlined />}
                      size="small"
                      onClick={() => handleEdit(idx)}
                      key="edit"
                    >
                      Edit
                    </Button>,
                  ]
                : []
            }
          >
            <List.Item.Meta
              title={item.type}
              description={`${item.date.split(",")[0]}, 2024 - ${
                item.merchant
              }`}
            />
            <div style={{ minWidth: 100, textAlign: "right" }}>
              <div style={{ fontWeight: 600 }}>{item.amount}</div>
              <div style={{ color: "gray", fontSize: 12 }}>{item.category}</div>
              <div style={{ marginTop: 4 }}>
                {item.tags &&
                  item.tags.map((tag) => (
                    <Tag
                      key={tag}
                      color={selectedTags.includes(tag) ? "blue" : "default"}
                      onClick={() => handleTagClick(tag)}
                      style={{
                        cursor: "pointer",
                        fontSize: 10,
                        padding: "0 6px",
                        marginBottom: 2,
                        marginRight: 4,
                        borderRadius: 6,
                      }}
                    >
                      {tag}
                    </Tag>
                  ))}
              </div>
            </div>
          </List.Item>
        )}
      />
      {editIndex !== null && (
        <EditTransactionForm
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          onSave={handleEditSave}
          onDelete={handleDelete}
          initialValues={transactions[editIndex]}
          accounts={[]}
        />
      )}
    </div>
  );
};

export default Transactions;

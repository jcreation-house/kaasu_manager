import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, Select, DatePicker } from "antd";
import { Divider, Row, Col, Grid } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { useBreakpoint } = Grid;
const { Option } = Select;

const payees = [
  { label: "Amazon", value: "amazon" },
  { label: "Walmart", value: "walmart" },
  { label: "Target", value: "target" },
  { label: "Starbucks", value: "starbucks" },
  { label: "Netflix", value: "netflix" },
];

const payors = [
  { label: "Employer", value: "employer" },
  { label: "Freelance Client", value: "freelance" },
  { label: "Rental Income", value: "rental" },
  { label: "Dividend", value: "dividend" },
];

const EXPENSE_CATEGORIES = [
  { label: "Housing", value: "Housing" },
  { label: "Food", value: "Food" },
  { label: "Transportation", value: "Transportation" },
  { label: "Entertainment", value: "Entertainment" },
  { label: "Utilities", value: "Utilities" },
  { label: "Shopping", value: "Shopping" },
  { label: "Health", value: "Health" },
];

const INCOME_CATEGORIES = [
  { label: "Salary", value: "Income" },
  { label: "Freelance", value: "Freelance" },
  { label: "Investments", value: "Investments" },
  { label: "Rental", value: "Rental" },
  { label: "Other", value: "Other" },
];

const TRANSFER_CATEGORIES = [
  { label: "Transfer", value: "Transfer" },
  { label: "Investment", value: "Investment" },
  { label: "Savings", value: "Savings" },
  { label: "Debt Payment", value: "Debt Payment" },
];
const MOCK_ACCOUNTS = [
  { id: "acc1", name: "HSBC Checking" },
  { id: "acc2", name: "TD Savings" },
  { id: "acc3", name: "Visa Credit Card" },
  { id: "acc4", name: "Wealthsimple Invest" },
  { id: "acc5", name: "PayPal Balance" },
];

// --- Determine which category list to use ---

export function AddTransactionForm() {
  const [open, setOpen] = useState(false);
  const [transactionType, setTransactionType] = useState("expense");
  // const [accounts, setAccounts] = useState([MOCK_ACCOUNTS]);

  const [form] = Form.useForm();
  const screens = useBreakpoint();

  const getCurrentCategories = () => {
    switch (transactionType) {
      case "income":
        return INCOME_CATEGORIES;
      case "transfer":
        return TRANSFER_CATEGORIES;
      case "expense":
      default:
        return EXPENSE_CATEGORIES;
    }
  };
  const onSubmit = (values) => {
    setOpen(false);
    form.resetFields();
  };

  return (
    <>
      <Button
        type="primary"
        shape="circle" // Changed to circle for a more FAB-like appearance with an icon
        icon={<PlusOutlined />}
        size="large"
        onClick={() => setOpen(true)}
        style={{
          position: "fixed",
          bottom: 24, // Adjusted for better spacing
          right: 24, // Adjusted for better spacing
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)", // Added shadow
          zIndex: 1000, // Ensure it's above other content
        }}
        aria-label="Add new transaction"
      />
      <Modal
        title="Add New Transaction"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null} // Custom footer buttons within the Form
        destroyOnHidden // Reset form state when modal is closed
        width="100%" // Make modal wider on small screens
        style={{ maxWidth: "500px", top: 20 }} // Center modal on the screen
      >
        <Form
          form={form}
          variant="filled"
          layout="vertical"
          size="small"
          onFinish={onSubmit}
          initialValues={{
            date: null,
            status: "pending",
            amount: "",
            type: "expense",
            fromAccount: "",
            toAccount: "",
            payee: "",
            payor: "",
            category: "",
            note: "",
            tags: "",
          }}
        >
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="date"
                label="Date"
                rules={[{ required: true, message: "Please select a date" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="type"
                label="Transaction Type"
                rules={[{ required: true }]}
              >
                <Select onChange={(value) => setTransactionType(value)}>
                  <Option value="expense">Expense</Option>
                  <Option value="income">Income</Option>
                  <Option value="transfer">Transfer</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true }]}
              >
                <Select>
                  <Option value="completed">Completed</Option>
                  <Option value="pending">Pending</Option>
                  <Option value="scheduled">Scheduled</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="amount"
                label="Amount"
                rules={[{ required: true, message: "Please enter an amount" }]}
              >
                <Input prefix="$" placeholder="0.00" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            {transactionType === "expense" && (
              <>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="fromAccount"
                    label="Account"
                    rules={[{ required: true }]}
                  >
                    <Select placeholder="Select account">
                      {MOCK_ACCOUNTS.map((account) => (
                        <Option key={account.id} value={account.id}>
                          {account.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="payee"
                    label="Payee"
                    rules={[{ required: true }]}
                  >
                    <Select placeholder="Select payee">
                      {payees.map((payee) => (
                        <Option key={payee.value} value={payee.value}>
                          {payee.label}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </>
            )}

            {transactionType === "income" && (
              <>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="payor"
                    label="Payor"
                    rules={[{ required: true }]}
                  >
                    <Select placeholder="Select payor">
                      {payors.map((payor) => (
                        <Option key={payor.value} value={payor.value}>
                          {payor.label}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="toAccount"
                    label="Account"
                    rules={[{ required: true }]}
                  >
                    <Select placeholder="Select account">
                      {MOCK_ACCOUNTS.map((account) => (
                        <Option key={account.id} value={account.id}>
                          {account.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </>
            )}

            {transactionType === "transfer" && (
              <>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="fromAccount"
                    label="From Account"
                    rules={[{ required: true }]}
                  >
                    <Select placeholder="Select account">
                      {MOCK_ACCOUNTS.map((account) => (
                        <Option key={account.id} value={account.id}>
                          {account.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="toAccount"
                    label="To Account"
                    rules={[{ required: true }]}
                  >
                    <Select placeholder="Select account">
                      {MOCK_ACCOUNTS.map((account) => (
                        <Option key={account.id} value={account.id}>
                          {account.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </>
            )}
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="category"
                label="Category"
                rules={[
                  { required: true, message: "Please select a category" },
                ]}
              >
                <Select
                  placeholder="Select category"
                  showSearch
                  optionFilterProp="children"
                >
                  {getCurrentCategories().map((category) => (
                    <Option key={category.value} value={category.value}>
                      {category.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="tags" label="Tags">
                <Input placeholder="e.g. groceries, bills" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={24}>
              <Form.Item name="note" label="Note">
                <Input.TextArea placeholder="Add a note..." />
              </Form.Item>
            </Col>
          </Row>
          {/* 

          

          

          
*/}

          <Divider />

          <Row gutter={[8, 8]} justify="end">
            {/* Add gutter for spacing between buttons */}
            <Col xs={12} sm="auto">
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  width: "100%",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                }}
              >
                Save Transaction
              </Button>
            </Col>
            <Col xs={12} sm="auto">
              <Button onClick={() => setOpen(false)} style={{ width: "100%" }}>
                Cancel
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}

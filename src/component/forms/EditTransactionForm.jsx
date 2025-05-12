import React, { useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Row,
  Col,
  Divider,
  Button,
} from "antd";

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

export function EditTransactionForm({
  open,
  onClose,
  onSave,
  onDelete,
  initialValues,
  accounts = [],
}) {
  const [form] = Form.useForm();
  const transactionType =
    Form.useWatch("type", form) || initialValues.type || "expense";

  useEffect(() => {
    if (open) {
      form.setFieldsValue({
        ...initialValues,
        tags: initialValues.tags ? initialValues.tags.join(", ") : "",
      });
    }
  }, [open, initialValues, form]);

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

  const handleFinish = (values) => {
    onSave({
      ...initialValues,
      ...values,
      tags: values.tags ? values.tags.split(",").map((t) => t.trim()) : [],
    });
    form.resetFields();
  };

  return (
    <Modal
      title="Edit Transaction"
      open={open}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      footer={null}
      destroyOnClose
      width="100%"
      style={{ maxWidth: "500px", top: 20 }}
    >
      <Form
        form={form}
        layout="vertical"
        size="small"
        onFinish={handleFinish}
        initialValues={initialValues}
      >
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="date"
              label="Date"
              rules={[{ required: true, message: "Please select a date" }]}
            >
              <Input placeholder="e.g. Apr 4" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="type"
              label="Transaction Type"
              rules={[{ required: true }]}
            >
              <Select>
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
                  rules={[{ required: false }]}
                >
                  <Select placeholder="Select account">
                    {accounts.map((account) => (
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
                  rules={[{ required: false }]}
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
                  rules={[{ required: false }]}
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
                  rules={[{ required: false }]}
                >
                  <Select placeholder="Select account">
                    {accounts.map((account) => (
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
                  rules={[{ required: false }]}
                >
                  <Select placeholder="Select account">
                    {accounts.map((account) => (
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
                  rules={[{ required: false }]}
                >
                  <Select placeholder="Select account">
                    {accounts.map((account) => (
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
              rules={[{ required: true, message: "Please select a category" }]}
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
        <Divider />
        <Row gutter={[8, 8]} justify="end">
          <Col xs={12} sm="auto">
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Save Changes
            </Button>
          </Col>
          <Col xs={12} sm="auto">
            <Button
              danger
              onClick={() => {
                onDelete();
                form.resetFields();
              }}
              style={{ width: "100%" }}
            >
              Delete
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

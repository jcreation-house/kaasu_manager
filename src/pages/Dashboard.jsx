// pages/Dashboard.js
import React from "react";
import { Card, Statistic, Row, Col } from "antd";

const Dashboard = () => {
  return (
    <div style={{ padding: "24px" }}>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic title="Active Users" value={112893} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="New Signups" value={93} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Total Sales" value={112893} prefix="$" />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;

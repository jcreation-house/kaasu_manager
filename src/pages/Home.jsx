// pages/Home.js
import React from "react";
import { Card } from "antd";

const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <Card title="Home" style={{ width: 300 }}>
        <p>Welcome to the Ant Design themed React app with routing!</p>
      </Card>
    </div>
  );
};

export default Home;

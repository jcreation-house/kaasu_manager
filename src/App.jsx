import React from "react";
import { Layout, theme } from "antd";
import { Routes, Route } from "react-router-dom"; // Import React Router components
import Sidebar from "./component/sidebar"; // Import the Sidebar component
import Transaction from "./pages/Transaction"; // Import the Transaction page
import "./App.css";
import { Budget } from "./pages/Budget";

const { Header, Content, Footer } = Layout;

const App = ({
  isDarkTheme,
  handleThemeToggle,
  primaryColor,
  handleColorChange,
}) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar
        isDarkTheme={isDarkTheme}
        handleThemeToggle={handleThemeToggle}
        primaryColor={primaryColor}
        handleColorChange={handleColorChange}
      />
      <Layout>
        {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Routes>
              <Route path="/overview" element={<Transaction />} />
              <Route path="/transaction" element={<Transaction />} />
              <Route path="/accounts" element={<Transaction />} />
              <Route path="/budget" element={<Budget />} />
              <Route path="/investment" element={<Transaction />} />
              <Route path="/" element={<div>Welcome to the Dashboard!</div>} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          JCreation ©{new Date().getFullYear()} Created by JCreationZ
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;

import React from "react";
import { Layout, theme } from "antd";
import Sidebar from "./component/sidebar"; // Import the Sidebar component
import "./App.css";
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
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            content
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;

import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import App from "./App";
import "antd/dist/reset.css";
import "./index.css"; // Import your custom CSS

const Main = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true); // State to manage dark/light mode
  const [primaryColor, setPrimaryColor] = useState("#1890ff"); // Default primary color (blue)

  const handleThemeToggle = (checked) => {
    setIsDarkTheme(checked);
  };

  const handleColorChange = (value) => {
    setPrimaryColor(value); // Update the primary color
  };

  return (
    <React.StrictMode>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: primaryColor, // Dynamic primary color
            colorBgBase: isDarkTheme ? "#2E2E2E" : "#D9D9D9", // Background color
            colorTextBase: isDarkTheme ? "#D9D9D9" : "#000000", // Text color
          },
          components: {
            Layout: {
              siderBg: isDarkTheme ? "#2E2E2E" : "#D9D9D9",
              triggerColor: primaryColor, // Sider trigger color

              // Sider background color
            },
          },
          hashed: false,
        }}
      >
        <BrowserRouter>
          <App
            isDarkTheme={isDarkTheme}
            handleThemeToggle={handleThemeToggle}
            primaryColor={primaryColor}
            handleColorChange={handleColorChange}
          />
        </BrowserRouter>
      </ConfigProvider>
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main />);

import React from "react";
import { Layout, Menu, Divider, Popover, Switch, Select, Button } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import {
  DashboardOutlined,
  BarChartOutlined,
  DollarOutlined,
  LineChartOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Size } from "@tauri-apps/api/dpi";

const { Sider } = Layout;
const { Option } = Select;

const Sidebar = ({
  isDarkTheme,
  handleThemeToggle,
  primaryColor,
  handleColorChange,
}) => {
  const location = useLocation(); // Get the current location
  const navigate = useNavigate(); // For navigation

  const handleMenuClick = ({ key }) => {
    navigate(key); // Navigate to the selected menu item's URL
  };

  // Define menu items
  const menuItems = [
    {
      key: "dashboard-title",
      label: (
        <span style={{ fontSize: "12px", fontWeight: "bold" }}>Dashboard</span>
      ),
      type: "group", // Group type for subtitle
      children: [
        {
          key: "/overview",
          icon: <DashboardOutlined />,
          label: "Overview",
        },
        {
          key: "/transaction",
          icon: <DollarOutlined />,
          label: "Transaction",
        },
        {
          key: "/budget",
          icon: <BarChartOutlined />,
          label: "Budget",
        },
        {
          key: "/investment",
          icon: <LineChartOutlined />,
          label: "Investment",
        },
      ],
    },
    {
      type: "divider", // Divider between sections
    },
    {
      key: "report-title",
      label: (
        <span style={{ fontSize: "12px", fontWeight: "bold" }}>Report</span>
      ),
      type: "group", // Group type for subtitle
      children: [
        {
          key: "/income",
          icon: <DollarOutlined />,
          label: "Income",
        },
        {
          key: "/expense",
          icon: <DollarOutlined />,
          label: "Expense",
        },
        {
          key: "/analytics",
          icon: <LineChartOutlined />,
          label: "Analytics",
        },
      ],
    },
    {
      type: "divider", // Divider before settings
    },
    {
      key: "/settings",
      icon: <SettingOutlined />,
      label: "Settings",
    },
  ];

  // Popover content for theme and color controls
  const popoverContent = (
    <div>
      <div style={{ marginBottom: "8px" }}>
        <span style={{ marginRight: 8 }}>Mode</span>
        <Switch checked={isDarkTheme} onChange={handleThemeToggle} />
      </div>
      <Divider />
      {/* Color Selector */}
      <div>
        <span style={{ marginRight: 8 }}>Color</span>
        <Select
          defaultValue={primaryColor}
          style={{ width: 120 }}
          onChange={handleColorChange}
        >
          <Option value="#1890ff">Blue</Option>
          <Option value="#ff4d4f">Red</Option>
          <Option value="#52c41a">Green</Option>
          <Option value="#722ed1">Purple</Option>
        </Select>
      </div>
    </div>
  );

  return (
    <Sider
      zeroWidthTriggerStyle={{
        backgroundColor: isDarkTheme ? "#9C9C9C" : "#7D7D7D",
      }}
      style={{ color: isDarkTheme ? "#D9D9D9" : "#141414" }}
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      {/* Logo Section */}
      <div
        style={{
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        Kaasu
      </div>

      {/* Main Menu Items */}
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]} // Highlight based on the current URL
        onClick={handleMenuClick} // Handle menu item clicks
        items={menuItems} // Use items prop instead of children
        style={{
          height: "calc(100% - 64px)",
          display: "flex",
          flexDirection: "column",
        }}
      />

      {/* Theme and Color Controls at the Bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 10,
          width: "100%",
          textAlign: "center",
        }}
      >
        <Popover content={popoverContent} trigger="click">
          <div
            style={{
              cursor: "pointer",
              padding: "10px",

              borderRadius: "8px",
              margin: "0 16px",
            }}
          >
            <Button>Theme</Button>
          </div>
        </Popover>
      </div>
    </Sider>
  );
};

export default Sidebar;

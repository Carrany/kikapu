import { Tabs, Card, PageHeader, Avatar, Tag } from "antd";
import React, { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { RiDashboardFill } from "react-icons/ri";
import styled from "styled-components";
import Customers from "_components/Customers/Customers";
import Dashboard from "_components/Dashboard";
import Orders from "_components/Orders/Orders";

const ManagementBoard = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [tab, setTab] = useState("summary");

  const handleBack = () => {
    props.history.goBack();
  };

  return (
    <MainDiv>
      <StyledHeader
        onBack={handleBack}
        title={
          <span>
            <RiDashboardFill
              style={{ marginRight: 5, verticalAlign: "middle" }}
              fontSize={30}
              fill="#1890ff"
            />
            Management Board
          </span>
        }
        extra={
          <div>
            <Avatar>
              <AiOutlineUser size={15} />
            </Avatar>
            <Tag>{user.name}</Tag>
          </div>
        }
      />

      <Card style={{ minHeight: 500, borderRadius: 10 }} key="customer">
        <Tabs type="card" onChange={setTab}>
          <TabPane tab="Summary" key="summary">
            {tab === "summary" && <Dashboard />}
          </TabPane>
          <TabPane tab="Customers" key="customers">
            {tab === "customers" && <Customers />}
          </TabPane>
          <TabPane tab="Orders" key="orders">
            {tab === "orders" && <Orders isCustomer={false} />}
          </TabPane>
        </Tabs>
      </Card>
    </MainDiv>
  );
};

const { TabPane } = Tabs;

const MainDiv = styled.div`
  min-height: 100%;
  width: 100%;
  background: rgb(241, 241, 241);
  padding: 50px 100px 50px 100px;
`;

const StyledHeader = styled(PageHeader)`
  padding-left: 0px;
  .ant-page-header-heading-title {
    font-weight: 700;
    font-size: 25px;
  }
`;

export default ManagementBoard;

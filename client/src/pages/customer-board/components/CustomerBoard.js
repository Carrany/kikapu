import { Tabs, Card, PageHeader, Tag, Avatar } from "antd";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { RiDashboardFill } from "react-icons/ri";
import styled from "styled-components";
import Orders from "_components/Orders/Orders";

const CustomerBoard = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleBack = () => {
    props.history.goBack();
    localStorage.removeItem("user");
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
            Customer Board
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
        <Tabs type="card">
          <TabPane tab="Orders" key="orders">
            <Orders isCustomer={true} />
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

export default CustomerBoard;

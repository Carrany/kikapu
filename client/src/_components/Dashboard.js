import { Card, Row, Col, PageHeader } from "antd";
import React, { useEffect, useState } from "react";
import { IoDocumentText } from "react-icons/io5";
import { SiProducthunt } from "react-icons/si";

import styled from "styled-components";
import QueueAnim from "rc-queue-anim";
import { FaUsers } from "react-icons/fa";
import { customerService, orderService } from "_services";

const Dashboard = (props) => {
  const [orderCount, setOrderCount] = useState(0);
  const [productTotalSold, setProductTotalSold] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);

  useEffect(() => {
    getOrders();
    getCustomers();
  }, []);

  const getOrders = async () => {
    try {
      const { data } = await orderService.fetchOrders();
      setOrderCount(data.length);
      setProductTotalSold(data.reduce((sum, item) => (sum += item.amount), 0));
    } catch (error) {}
  };

  const getCustomers = async () => {
    try {
      const { data } = await customerService.fetchCustomers();
      setCustomerCount(data.length);
    } catch (error) {}
  };
  return (
    <div>
      <PageHeader
        title="Dashboard"
        subTitle="This includes a summary of information based on available operations"
      />
      <Row gutter={[16, 16]} style={{ padding: 20 }}>
        <Col span={8}>
          <QueueAnim duration={1200} delay={500} type="left">
            <div key="customers">
              <SummaryCard hoverable>
                <StyledIconHolder color="#1890ff">
                  <FaUsers
                    fontSize={60}
                    color="white"
                    style={{ paddingTop: 4 }}
                  />
                </StyledIconHolder>
                <StyledTitle>Customers</StyledTitle>
                <StyledDescription>{customerCount}</StyledDescription>
              </SummaryCard>
            </div>
          </QueueAnim>
        </Col>
        <Col span={8}>
          <QueueAnim duration={1200} delay={500} type="top">
            <div key="orders">
              <SummaryCard hoverable>
                <StyledIconHolder color="orange">
                  <IoDocumentText
                    fontSize={60}
                    color="white"
                    style={{ paddingTop: 4 }}
                  />
                </StyledIconHolder>
                <StyledTitle>Orders</StyledTitle>
                <StyledDescription>{orderCount}</StyledDescription>
              </SummaryCard>
            </div>
          </QueueAnim>
        </Col>
        <Col span={8}>
          <QueueAnim duration={1200} delay={500} type="right">
            <div key="sales">
              <SummaryCard hoverable>
                <StyledIconHolder color="limegreen">
                  <SiProducthunt
                    fontSize={60}
                    color="white"
                    style={{ paddingTop: 4 }}
                  />
                </StyledIconHolder>
                <StyledTitle>Sales</StyledTitle>
                <StyledDescription>{productTotalSold} KES</StyledDescription>
              </SummaryCard>
            </div>
          </QueueAnim>
        </Col>
      </Row>
    </div>
  );
};

const SummaryCard = styled(Card)`
  border-radius: 10px;
  text-align: center;
  background: #f1f1f1;
`;

const StyledTitle = styled.div`
  font-weight: 700;
  font-size: 30px;
`;
const StyledIconHolder = styled.div`
background-color:${(props) => props.color};
border-radius: 10px;
width: fit-content;
padding-left: 2px;
padding-right: 2px;
display: inline-block;
margin-top: 20px;
}
`;

const StyledDescription = styled.div`
  color: #595e62;
  font-size: 20px;
`;
export default Dashboard;

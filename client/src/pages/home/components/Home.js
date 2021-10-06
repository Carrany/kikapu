import { Button, Card, Col, Radio, Row, Select } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { FaUsers } from "react-icons/fa";
import { FcCustomerSupport } from "react-icons/fc";
import { customerService, salesAgentService } from "_services";

const Home = (props) => {
  const [selection, setSelection] = useState("");
  const [customers, setCustomers] = useState([]);
  const [salesAgents, setSalesAgents] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const selectedGroup = useMemo(() => {
    let group = [];
    if (selection === Selections["Sales Agent"]) {
      group = salesAgents;
    } else if (selection === Selections.Customer) {
      group = customers;
    }

    return group;
  }, [customers, salesAgents, selection]);

  useEffect(() => {
    getCustomers();
    getSalesAgents();
  }, []);

  const getCustomers = async () => {
    try {
      const response = await customerService.fetchCustomers();
      setCustomers(response.data);
    } catch (error) {}
  };

  const getSalesAgents = async () => {
    try {
      const response = await salesAgentService.fetchSalesAgents();
      setSalesAgents(response.data);
    } catch (error) {}
  };

  const handleNext = () => {
    let url = "";
    if (selection === Selections["Sales Agent"]) {
      url = "/management-board";
    } else {
      url = "/customer-board";
    }
    props.history.push(url);
    localStorage.setItem("user", selectedUser);
  };

  const getCard = ({ title = "", icon: Icon }) => {
    return (
      <OptionCard
        hoverable
        onClick={() => {
          setSelection(title);
          setSelectedUser(null);
        }}
      >
        <Icon size={60} fill="#486bc2" />
        <div style={{ fontSize: 23, fontWeight: 700 }}>{title}</div>
        <Radio checked={selection === title} />
      </OptionCard>
    );
  };
  return (
    <MainDiv>
      <Content>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            {getCard({
              title: Selections.Customer,
              icon: FaUsers,
            })}
          </Col>
          <Col span={12}>
            {getCard({
              title: Selections["Sales Agent"],
              icon: FcCustomerSupport,
            })}
          </Col>
        </Row>
        <Row justify="center" style={{ marginTop: 20 }}>
          <Select
            value={selectedUser}
            style={{ width: "100%" }}
            placeholder="You Are"
            onChange={setSelectedUser}
          >
            {selectedGroup.map((el) => (
              <Select.Option value={JSON.stringify(el)} key={el.id}>
                {el.name}
              </Select.Option>
            ))}
          </Select>
        </Row>
        <Row justify="center" style={{ marginTop: 20 }}>
          <Button
            style={{ borderRadius: 5 }}
            type="primary"
            disabled={!selection || !selectedUser}
            onClick={handleNext}
          >
            Next
          </Button>
        </Row>
      </Content>
    </MainDiv>
  );
};

const Selections = {
  Customer: "Customer",
  "Sales Agent": "Sales Agent",
};

const MainDiv = styled.div`
  height: 100%;
  width: 100%;
  background: rgb(241, 241, 241);
  position: fixed;
`;

const Content = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const OptionCard = styled(Card)`
  border-radius: 10px;
  height: 200px;
  width: 200px;
  display: flex;
  justify-content: center;
  text-align: center;
`;

export default Home;

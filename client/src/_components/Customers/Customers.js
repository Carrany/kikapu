import { Button, Card, PageHeader, Radio, Table } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { customerService } from "_services";
import { customerColumns } from "./columns";
import CreateCustomerModal from "./CreateCustomerModal";

const Customers = () => {
  const [visible, setVisible] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const user = JSON.parse(localStorage.getItem("user"));

  const getCustomers = useCallback(async () => {
    let params = "";
    if (filter === "me") {
      params = { sales_agent_id: user.id };
    }
    setLoading(true);
    try {
      const response = await customerService.fetchCustomers(params);
      setCustomers(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, [filter, user.id]);

  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

  const onCloseModal = (data) => {
    if (data) {
      setCustomers([data, ...customers]);
    }
    setVisible(false);
  };

  return (
    <>
      <CreateCustomerModal isVisible={visible} onClose={onCloseModal} />
      <Card bordered={false}>
        <PageHeader
          title="Customers"
          style={{ paddingLeft: 0 }}
          extra={
            <Button
              size="small"
              type="primary"
              onClick={() => setVisible(true)}
            >
              Create Customer
            </Button>
          }
        />
        <Radio.Group
          value={filter}
          style={{ marginBottom: 5 }}
          onChange={(e) => setFilter(e.target.value)}
        >
          <Radio value="all">All</Radio>
          <Radio value="me">Registered By Me</Radio>
        </Radio.Group>

        <Table
          columns={customerColumns}
          size="small"
          loading={isLoading}
          dataSource={customers}
          rowKey={(data) => data?.id}
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </>
  );
};

export default Customers;

import { Button, Card, PageHeader, Table } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { orderColumns } from "./columns";
import CreateOrderModal from "./CreateOrderModal";
import PropTypes from "prop-types";
import { orderService } from "_services";

const Orders = (props) => {
  const { isCustomer } = props;
  const [visible, setVisible] = useState(false);
  const [orders, setOrders] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const columns = useMemo(() => {
    if (!isCustomer) return orderColumns;
    return orderColumns.filter((col) => col.dataIndex !== "customer_name");
  }, [isCustomer]);

  const getOrders = useCallback(async () => {
    setLoading(true);
    let params = "";
    if (isCustomer) {
      params = { customer_name: user.name };
    }
    try {
      const response = await orderService.fetchOrders(params);
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, [isCustomer, user.name]);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  const onCloseModal = (data) => {
    if (data) {
      setOrders([data, ...orders]);
    }
    setVisible(false);
  };

  return (
    <>
      <CreateOrderModal isVisible={visible} onClose={onCloseModal} />
      <Card bordered={false}>
        <PageHeader
          title="Orders"
          style={{ paddingLeft: 0 }}
          extra={
            isCustomer ? (
              <Button
                size="small"
                type="primary"
                onClick={() => setVisible(true)}
              >
                Create Order
              </Button>
            ) : null
          }
        />

        <Table
          loading={isLoading}
          columns={columns}
          size="small"
          dataSource={orders}
          rowKey={(data) => data?.id}
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </>
  );
};

Orders.propTypes = {
  isCustomer: PropTypes.bool,
};

Orders.defaultProps = {
  isCustomer: true,
};

export default Orders;

import {
  Table,
  Row,
  Col,
  Modal,
  Select,
  Button,
  InputNumber,
  notification,
} from "antd";
import React, { useEffect, useState } from "react";
import { StyledForm } from "_components/StyledComponents";
import PropTypes from "prop-types";
import { productColumns } from "./columns";
import { uuid } from "uuidv4";
import { orderService, productService } from "_services";
import moment from "moment";

const CreateOrderModal = (props) => {
  const { isVisible, onClose } = props;
  const user = JSON.parse(localStorage.getItem("user"));

  const [visible, setVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [orderProducts, setOrderProducts] = useState([]);

  const [form] = StyledForm.useForm();
  useEffect(() => {
    if (isVisible) {
      setVisible(true);
    }
  }, [isVisible]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async (params) => {
    try {
      const response = await productService.fetchProducts();
      setProducts(response.data);
    } catch (error) {}
  };

  const onCancel = (data) => {
    form.resetFields();
    setOrderProducts([]);
    setVisible(false);
    onClose(data);
  };

  const createOrder = async (data) => {
    setLoading(true);
    try {
      await orderService.createOrder(data);
      notification.success({
        message: <b>Success</b>,
        description: "Order added successfully",
      });
      setLoading(false);

      onCancel(data);
    } catch (error) {
      setLoading(false);
    }
  };

  const onFinish = (values) => {
    const product = JSON.parse(values.product);
    const isDuplicate = !!orderProducts.find(
      (op) => op.product_name === product.name
    );
    if (isDuplicate)
      return notification.warning({
        message: <b>Duplicate Warning</b>,
        description: "Product already added to the list",
      });
    product.product_name = product.name;
    delete product.name;
    let newOrderProduct = {
      ...product,
      qty: values.qty,
      amount: Number(values.qty) * Number(product.rate),
    };

    setOrderProducts([...orderProducts, newOrderProduct]);
    form.resetFields();
  };

  const onFinalize = () => {
    let final = {
      products: orderProducts,
      id: uuid(),
      date: moment(),
      amount: orderProducts.reduce((sum, item) => (sum += item.amount), 0),
      order_number: uuid(),
      customer_name: user.name,
      customer_id: user.id,
    };
    createOrder(final);
  };

  return (
    <Modal
      title="Create Order"
      visible={visible}
      onCancel={() => onCancel()}
      footer={null}
      width={700}
      destroyOnClose={true}
    >
      <StyledForm layout="vertical" form={form} onFinish={onFinish}>
        <Row gutter={[16, 16]}>
          <Col span={10}>
            <Item
              name="product"
              label="Products"
              rules={[{ required: true, message: "Please select product" }]}
            >
              <Select>
                {products.map((product) => (
                  <Option value={JSON.stringify(product)} key={product.id}>
                    {product.name}
                  </Option>
                ))}
              </Select>
            </Item>
          </Col>
          <Col span={10}>
            <Item
              name="qty"
              label="Quantity"
              rules={[{ required: true, message: "Please include quantity" }]}
            >
              <InputNumber min={1} style={{ width: "100%" }} />
            </Item>
          </Col>
          <Col span={2}>
            <Item label=" ">
              <Button htmlType="submit" type="primary">
                Add
              </Button>
            </Item>
          </Col>
        </Row>
      </StyledForm>

      <Row style={{ marginTop: 20 }}>
        <Col span={24}>
          <Table
            columns={productColumns}
            size="small"
            dataSource={orderProducts}
            rowKey={(data) => data?.id}
            pagination={false}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: 20 }}>
        <Col span={24}>
          <Button
            type="primary"
            style={{ float: "right" }}
            loading={isLoading}
            disabled={!orderProducts.length}
            onClick={onFinalize}
          >
            Submit
          </Button>
        </Col>
      </Row>
    </Modal>
  );
};

const { Item } = StyledForm;
const { Option } = Select;

CreateOrderModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

export default CreateOrderModal;

import { Input, Row, Col, Modal, Select, Button, notification } from "antd";
import React, { useEffect, useState } from "react";
import { StyledForm } from "_components/StyledComponents";
import PropTypes from "prop-types";
import { customerService } from "_services";
import { uuid } from "uuidv4";
import { phoneNumberValidatorInput } from "_helpers/helpers";

const CreateCustomerModal = (props) => {
  const { isVisible, onClose } = props;
  const user = JSON.parse(localStorage.getItem("user"));

  const [visible, setVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [form] = StyledForm.useForm();
  useEffect(() => {
    if (isVisible) {
      setVisible(true);
    }
  }, [isVisible]);

  const onCancel = (data) => {
    form.resetFields();
    setVisible(false);
    onClose(data);
  };

  const onFinish = async (values) => {
    setLoading(true);
    const final = {
      ...values,
      id: uuid(),
      sales_agent_name: user.name,
      sales_agent_id: user.id,
    };
    try {
      const { data } = await customerService.createCustomer(final);
      notification.success({
        message: <b>Success</b>,
        description: "Customer created successfully",
      });
      setLoading(false);

      onCancel(data);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create Customer"
      visible={visible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <StyledForm layout="vertical" form={form} onFinish={onFinish}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter name" }]}
            >
              <Input />
            </Item>
          </Col>
          <Col span={24}>
            <Item
              name="phone_number"
              label="Phone Number"
              rules={[
                {
                  required: true,
                  validator: phoneNumberValidatorInput,
                },
              ]}
            >
              <Input type="tel" />
            </Item>
          </Col>
          <Col span={24}>
            <Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please enter a valid email",
                  type: "email",
                },
              ]}
            >
              <Input />
            </Item>
          </Col>
          <Col span={24}>
            <Item
              name="location"
              label="Location"
              rules={[{ required: true, message: "Please select location" }]}
            >
              <Select>
                <Option value="Kenya" key="Kenya">
                  Kenya
                </Option>
                <Option value="Ghana" key="Ghana">
                  Ghana
                </Option>
                <Option value="Sudan" key="Sudan">
                  Sudan
                </Option>
              </Select>
            </Item>
          </Col>
          <Col span={24}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ float: "right" }}
              loading={isLoading}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </StyledForm>
    </Modal>
  );
};

const { Item } = StyledForm;
const { Option } = Select;

CreateCustomerModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

export default CreateCustomerModal;

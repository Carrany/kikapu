import { Tag } from "antd";
import moment from "moment";

export const orderColumns = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (text) => <span>{moment(text).format("MMMM Do YYYY, h:mm:ss a")}</span>,
  },
  {
    title: "Order Number",
    dataIndex: "order_number",
    key: "order_number",
  },
  {
    title: "Customer",
    dataIndex: "customer_name",
    key: "customer_name",
  },
  {
    title: "Products",
    dataIndex: "products",
    key: "products",
    render: (products) => (
      <div>
        {products.map((product) => (
          <Tag>
            {product.product_name} {`- ${product.qty} x ${product.rate}`}
          </Tag>
        ))}
      </div>
    ),
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
];

export const productColumns = [
  {
    title: "Product Name",
    dataIndex: "product_name",
    key: "product_name",
  },
  {
    title: "Rate",
    dataIndex: "rate",
    key: "rate",
  },
  {
    title: "Quantity",
    dataIndex: "qty",
    key: "quantity",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
];

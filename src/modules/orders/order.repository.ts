import { PoolConnection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { OrderableMenuItem } from "../menu-items/menu-item.types";
import { db } from "../../database/db";
import { OrderStatus, SORT_COLUMNS } from "./order.constants";
import {
  CreateOrderData,
  CreateOrderItemData,
  GetOrdersRequest,
  GetRestaurantOrdersRequest,
  Order,
  OrderDetails,
  OrderItem,
} from "./order.types";

interface OrderRow extends RowDataPacket {
  id: number;
  customer_id: number;
  restaurant_id: number;
  status: OrderStatus;
  total_amount: string;
  created_at: Date;
  updated_at: Date;
}
interface OrderItemRow extends RowDataPacket {
  id: number;
  order_id: number;
  menu_item_id: number;
  quantity: number;
  unit_price: string;
  subtotal: string;
}
interface CountRow extends RowDataPacket {
  total: number;
}
function toOrderItem(row: OrderItemRow): OrderItem {
  return {
    id: row.id,
    orderId: row.order_id,
    menuItemId: row.menu_item_id,
    quantity: row.quantity,
    unitPrice: Number(row.unit_price),
    subtotal: Number(row.subtotal),
  };
}
function toOrder(row: OrderRow): Order {
  return {
    id: row.id,
    customerId: row.customer_id,
    restaurantId: row.restaurant_id,
    status: row.status,
    totalAmount: Number(row.total_amount),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

async function create(
  connection: PoolConnection,
  data: CreateOrderData,
): Promise<number> {
  const [result] = await connection.execute<ResultSetHeader>(
    `
    INSERT INTO orders (
      customer_id,
      restaurant_id,
      status,
      total_amount
    )
    VALUES (?, ?, ?, ?)
    `,
    [data.customerId, data.restaurantId, data.status, data.totalAmount],
  );

  return result.insertId;
}
async function createItems(
  connection: PoolConnection,
  orderId: number,
  items: CreateOrderItemData[],
): Promise<void> {
  if (items.length === 0) {
    return;
  }

  const placeholders = items.map(() => "(?, ?, ?, ?, ?)").join(", ");

  const values = items.flatMap((item) => [
    orderId,
    item.menuItemId,
    item.quantity,
    item.unitPrice,
    item.subtotal,
  ]);

  await connection.execute(
    `
    INSERT INTO order_items (
      order_id,
      menu_item_id,
      quantity,
      unit_price,
      subtotal
    )
    VALUES ${placeholders}
    `,
    values,
  );
}
async function findById(orderId: number): Promise<Order | null> {
  const [rows] = await db.execute<OrderRow[]>(
    `
    SELECT *
    FROM orders
    WHERE id = ?
    `,
    [orderId],
  );

  if (rows.length === 0) {
    return null;
  }

  return toOrder(rows[0]);
}
async function findItemsByOrderId(orderId: number): Promise<OrderItem[]> {
  const [rows] = await db.execute<OrderItemRow[]>(
    `
    SELECT *
    FROM order_items
    WHERE order_id = ?
    `,
    [orderId],
  );

  return rows.map(toOrderItem);
}
async function findDetailsById(orderId: number): Promise<OrderDetails | null> {
  const order = await findById(orderId);

  if (!order) {
    return null;
  }

  const items = await findItemsByOrderId(orderId);

  return {
    ...order,
    items,
  };
}
function buildCustomerFilter(request: GetOrdersRequest): {
  whereClause: string;
  params: any[];
} {
  let whereClause = "WHERE customer_id = ?";
  const params: unknown[] = [request.customerId];

  if (request.status) {
    whereClause += " AND status = ?";
    params.push(request.status);
  }

  return {
    whereClause,
    params,
  };
}
function buildRestaurantFilter(request: GetRestaurantOrdersRequest): {
  whereClause: string;
  params: any[];
} {
  let whereClause = "WHERE restaurant_id = ?";
  const params: unknown[] = [request.restaurantId];

  if (request.status) {
    whereClause += " AND status = ?";
    params.push(request.status);
  }

  return {
    whereClause,
    params,
  };
}
async function countByCustomer(request: GetOrdersRequest): Promise<number> {
  const { whereClause, params } = buildCustomerFilter(request);

  const [rows] = await db.execute<CountRow[]>(
    `
      SELECT COUNT(*) AS total
      FROM orders
      ${whereClause}
      `,
    params,
  );

  return rows[0].total;
}
async function findByCustomer(request: GetOrdersRequest): Promise<Order[]> {
  const { whereClause, params } = buildCustomerFilter(request);
  

  const sortColumn = SORT_COLUMNS[request.sortBy ?? "createdAt"];

  const sortOrder = (request.sortOrder ?? "desc").toUpperCase();

  const offset = (request.page - 1) * request.limit;

  const sql = `
SELECT *
FROM orders
${whereClause}
ORDER BY ${sortColumn} ${sortOrder}
LIMIT ${offset}, ${request.limit}
`;

  const [rows] = await db.execute<OrderRow[]>(sql, params);

  return rows.map(toOrder);
}
async function countByRestaurant(
  request: GetRestaurantOrdersRequest,
): Promise<number> {
  const { whereClause, params } = buildRestaurantFilter(request);

  const [rows] = await db.execute<CountRow[]>(
    `
      SELECT COUNT(*) AS total
      FROM orders
      ${whereClause}
      `,
    params,
  );

  return rows[0].total;
}
async function findByRestaurant(
  request: GetRestaurantOrdersRequest,
): Promise<Order[]> {
  const { whereClause, params } = buildRestaurantFilter(request);

  const sortColumn = SORT_COLUMNS[request.sortBy ?? "createdAt"];

  const sortOrder = (request.sortOrder ?? "desc").toUpperCase();

  const limit = request.limit;
  const offset = (request.page - 1) * request.limit;

  const [rows] = await db.execute<OrderRow[]>(
    `
  SELECT *
  FROM orders
  ${whereClause}
  ORDER BY ${sortColumn} ${sortOrder}
  LIMIT ${limit}
  OFFSET ${offset}
  `,
    params,
  );

  return rows.map(toOrder);
}
async function updateStatus(
  orderId: number,
  status: OrderStatus,
): Promise<void> {
  await db.execute(
    `
    UPDATE orders
    SET status = ?
    WHERE id = ?
    `,
    [status, orderId],
  );
}

export const orderRepository = {
  create,
  createItems,

  findById,
  findItemsByOrderId,
  findDetailsById,

  findByCustomer,
  countByCustomer,

  findByRestaurant,
  countByRestaurant,

  updateStatus
};
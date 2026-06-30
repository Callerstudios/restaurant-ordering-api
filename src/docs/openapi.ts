import { OpenAPIObject } from "openapi3-ts/oas31";

import { authSchemas } from "./components/schemas/auth.schemas";
import { commonSchemas } from "./components/schemas/common.schemas";
import { restaurantSchemas } from "./components/schemas/restaurant.schemas";
import { categorySchemas } from "./components/schemas/category.schemas";
import { menuItemSchemas } from "./components/schemas/menu-item.schemas";
import { orderSchemas } from "./components/schemas/order.schemas";

import { parameters } from "./components/parameters";
import { responses } from "./components/responses";
import { securitySchemes } from "./components/security";
import {paths} from "./paths"

export const openApiDocument: OpenAPIObject = {
  openapi: "3.1.0",

  info: {
    title: "Restaurant Ordering API",
    version: "1.0.0",
    description: "REST API for restaurant ordering.",
  },

  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
    {
      url: "https://restaurant-ordering-api-uav0.onrender.com",
      description: "Production Server"
    },
  ],

  tags: [
    {
      name: "Authentication",
      description: "Authentication endpoints",
    },
    {
      name: "Restaurants",
      description: "Restaurant management",
    },
    {
      name: "Categories",
      description: "Restaurant categories",
    },
    {
      name: "Menu Items",
      description: "Restaurant menu items",
    },
    {
      name: "Orders",
      description: "Order management",
    },
  ],

  paths,

  components: {
    schemas: {
      ...commonSchemas,
      ...authSchemas,
      ...restaurantSchemas,
      ...categorySchemas,
      ...menuItemSchemas,
      ...orderSchemas,
    },

    parameters,

    responses,

    securitySchemes,
  },
};

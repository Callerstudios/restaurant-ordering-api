import { ComponentsObject } from "openapi3-ts/oas31";

export const restaurantSchemas: ComponentsObject["schemas"] = {
  Restaurant: {
    type: "object",
    required: ["id", "owner_id", "name", "address", "created_at", "updated_at"],
    properties: {
      id: {
        type: "integer",
        example: 1,
      },

      owner_id: {
        type: "integer",
        example: 3,
      },

      name: {
        type: "string",
        minLength: 3,
        maxLength: 150,
        example: "Mama's Kitchen",
      },

      description: {
        type: ["string", "null"],
        example: "Authentic Nigerian cuisine",
      },

      address: {
        type: "string",
        minLength: 5,
        maxLength: 255,
        example: "12 Allen Avenue, Ikeja",
      },

      phone: {
        type: ["string", "null"],
        example: "+2348012345678",
      },

      created_at: {
        type: "string",
        format: "date-time",
      },

      updated_at: {
        type: "string",
        format: "date-time",
      },
    },
  },

  PaginationMeta: {
    type: "object",
    required: ["page", "limit", "total", "totalPages"],
    properties: {
      page: {
        type: "integer",
        example: 1,
      },

      limit: {
        type: "integer",
        example: 10,
      },

      total: {
        type: "integer",
        example: 27,
      },

      totalPages: {
        type: "integer",
        example: 3,
      },
    },
  },

  RestaurantList: {
    type: "object",
    required: ["restaurants", "meta"],
    properties: {
      restaurants: {
        type: "array",
        items: {
          $ref: "#/components/schemas/Restaurant",
        },
      },

      meta: {
        $ref: "#/components/schemas/PaginationMeta",
      },
    },
  },

  CreateRestaurantRequest: {
    type: "object",
    required: ["name", "address"],
    properties: {
      name: {
        type: "string",
        minLength: 3,
        maxLength: 150,
        example: "Mama's Kitchen",
      },

      description: {
        type: "string",
        maxLength: 1000,
        example: "Authentic Nigerian cuisine",
      },

      address: {
        type: "string",
        minLength: 5,
        maxLength: 255,
        example: "12 Allen Avenue, Ikeja",
      },

      phone: {
        type: "string",
        minLength: 7,
        maxLength: 20,
        example: "+2348012345678",
      },
    },
  },

  UpdateRestaurantRequest: {
    type: "object",
    minProperties: 1,
    properties: {
      name: {
        type: "string",
        minLength: 3,
        maxLength: 150,
      },

      description: {
        type: "string",
        maxLength: 1000,
      },

      address: {
        type: "string",
        minLength: 5,
        maxLength: 255,
      },

      phone: {
        type: "string",
        minLength: 7,
        maxLength: 20,
      },
    },
  },
};

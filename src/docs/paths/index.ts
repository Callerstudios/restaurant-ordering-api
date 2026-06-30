import { PathsObject } from "openapi3-ts/oas31";

import { authPaths } from "./auth";
import { restaurantPaths } from "./restaurants";
import { categoryPaths } from "./categories";
import { menuItemPaths } from "./menu-items";
import { orderPaths } from "./orders";

export const paths: PathsObject = {
  ...authPaths,
  ...restaurantPaths,
  ...categoryPaths,
  ...menuItemPaths,
  ...orderPaths,
};

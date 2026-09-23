import { Router } from "express";
import { fetchAllData } from "../controllers/fetchAllData.controllers.js";
import { createCategory } from "../controllers/createCategory.controllers.js";
import { deleteCategory } from "../controllers/deleteCategory.controllers.js";
import { createNewSecret } from "../controllers/createNewSecret.controllers.js";
import { deleteSecret } from "../controllers/deleteSecret.controllers.js";
import { updateSecret } from "../controllers/updateSecret.controllers.js";
import { routeGuard } from "../../../middlewares/routeGuard.middlewares.js";

export const dataRouter = Router();

dataRouter.use(routeGuard);
dataRouter.route("/all").get(fetchAllData);
dataRouter.route("/category").post(createCategory);
dataRouter.route("/category/:categoryID").delete(deleteCategory);
dataRouter.route("/secret").post(createNewSecret);
dataRouter.route("/secret/:secretID").delete(deleteSecret).patch(updateSecret);

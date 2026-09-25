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
dataRouter.route("/create_category").post(createCategory);
dataRouter.route("/delete_category/:categoryID").delete(deleteCategory);
dataRouter.route("/create_secret").post(createNewSecret);
dataRouter.route("/delete_secret/:secretID").delete(deleteSecret);
dataRouter.route("/update_secret/:secretID").patch(updateSecret);

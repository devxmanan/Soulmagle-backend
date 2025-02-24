import { Router } from "express";
import { socialAuth, getMe, updateInterests} from "../controllers/user.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/social-auth").post(socialAuth)
router.route("/me").get(verifyJWT, getMe)
router.route("/update-interests").post(verifyJWT, updateInterests)

export default router;
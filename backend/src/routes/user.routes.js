import {Router} from "express";
import {registerUser, loginUser} from "../controllers/user.controllers"
const router = Router();

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/add_to_activity");
router.route("/get_all_activity");

export default router;
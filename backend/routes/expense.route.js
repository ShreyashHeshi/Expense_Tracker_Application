import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { addExpense, getAllExpense, markAsDone, removeExpense, updateExpense } from "../controller/expense.controller.js";


const router = express.Router();

router.route("/add").post(isAuthenticated, addExpense); // first isAuthenticated func executed and then addExpense get excuted
// after next() line 22 in isAuthenticated

router.route("/getall").get(isAuthenticated, getAllExpense);
router.route("/remove/:id").delete(isAuthenticated, removeExpense);
router.route("/update/:id").put(isAuthenticated, updateExpense);
router.route("/:id/done").put(isAuthenticated, markAsDone);

export default router;
import express from "express"
import { createNewUser, transfer ,getTransaction,getAllAcount,getAccount,payto} from "../controllers/functions";
import { Accountschema, RegisterAccount,pay, validate } from "../interface/types";

const router = express.Router();


router.post('/transfer', validate(Accountschema), transfer);
router.post('/create-account', validate(RegisterAccount), createNewUser);
router.post('/pay-in', validate(pay),payto)

router.get('/',getTransaction);

router.get('/balance',getAllAcount);
router.get('/balance/:account',getAccount);



export default router;

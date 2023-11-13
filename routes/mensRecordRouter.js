
import express  from "express";
import isAuthenticated from "../middlewares/auth.js";

const router = express.Router();


//creating new mens ranl blog route
router.post('/add' , isAuthenticated , addMensRecord)
// router.get('/myrecords' , isAuthenticated , myMensRecord)
// router.put('/:id' , isAuthenticated , updateMensRecord)
// router.delete('/:id' , isAuthenticated , deleteMensRecord)





export default router
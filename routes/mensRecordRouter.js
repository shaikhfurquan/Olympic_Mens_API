
import express  from "express";
import isAuthenticated from "../middlewares/auth.js";
import { addMensRecords, deleteMensRecords, myMensRecords, updateMensRecords , getAllRecords , getRecordById} from "../controllers/mensRecordController.js";

const router = express.Router();


//creating new mens ranl blog route
router.post('/add' , isAuthenticated , addMensRecords)
router.get('/myrecords' , isAuthenticated , myMensRecords)
router.put('/:id' , isAuthenticated , updateMensRecords)
router.delete('/:id' , isAuthenticated , deleteMensRecords)
router.get('/allrecords' , getAllRecords)
router.get('/record/:id' , isAuthenticated , getRecordById)




export default router
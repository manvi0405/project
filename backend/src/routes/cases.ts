import { Router } from "express";
import { getApiValue, validateApiKey } from "../middlewares/apiKeyAuth";
import { deleteCases, getAll, getCasename, getContri, getId, getInsights, postCases, updateCases } from "../controllers/caseController";

const router = Router()
router.get('/apikey',(req,res)=>{
    console.log("api value",getApiValue())
    res.status(200).json({apiValue: getApiValue()})
})
router.use(validateApiKey);


router.post('/postCases',postCases)
router.get('/fetchAll',getAll)
router.put('/updateCases/:id',updateCases)
router.delete('/deleteCases/:id',deleteCases)
router.get('/fetchContri',getContri)
router.get('/fetchinsights/:id',getInsights)
router.get('/fetchId/:casename',getId)
router.get('/validateCasename/:casename',getCasename)

export default router;
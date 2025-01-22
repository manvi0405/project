import { Router } from "express";
import { getApiValue, validateApiKey } from "../middlewares/apiKeyAuth";
import { deleteCases, getAllAndContri, getCasename, getId, getInsights, getPriority, postCases, updateCases } from "../controllers/caseController";

const router = Router()
router.get('/apikey',(req,res)=>{
    console.log("api value",getApiValue())
    res.status(200).json({apiValue: getApiValue()})
})

router.use(validateApiKey);


router.post('/postCases',postCases)
router.get('/fetchAll',getAllAndContri)
router.put('/updateCases/:id',updateCases)
router.delete('/deleteCases/:id',deleteCases)
// router.get('/fetchContri',getContri)
router.get('/fetchinsights/:id',getInsights)
router.get('/fetchId/:casename',getId)
router.get('/validateCasename/:casename',getCasename)
router.get('/priority',getPriority)

export default router;
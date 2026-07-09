const express=require("express");
const router=express.Router();

const {
    getServices,
    addService,
    updateService,
    deleteService
}=require("../controllers/serviceController");
const { requireAdminAuth } = require("../middleware/auth");

router.get("/",getServices);
router.post("/",requireAdminAuth,addService);
router.put("/:id",requireAdminAuth,updateService);
router.delete("/:id",requireAdminAuth,deleteService);

module.exports=router;
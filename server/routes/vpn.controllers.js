const express = require("express");
const router = express.Router();
const Role = require("../database/role");
const vpnServices = require("../services/vpn.services");
const jwt = require("../database/jwt");
const db = require("../database/db");
const Vpn = db.Vpn;


//routes
router.post("/addvpn", jwt(Role.Admin), addvpn);
router.get("/getvpn/:id", getvpn);
router.get("/getall", getAll);
router.put("/update",jwt(Role.Admin),updatever);
router.get("/decrypt", decrypt);


module.exports = router;


function addvpn(req, res, next) {
    vpnServices
      .addvpn(req.body)
      .then((vpn) =>
        res.json({
          vpn: vpn,
          message: `Server create successfully`,
        })
      )
      .catch((error) => next(error));
  }
  
  function getvpn(req, res, next) {
    vpnServices
      .getvpn(req.params.id)
      .then((vpn) =>
        res.json(vpn)
      );
  }

  function getAll(req, res, next) {
    vpnServices
      .getAll()
      .then((vpn) =>
        res.json(vpn)
      );
  }

  function isNewerVersion (oldVer, newVer) {
    const oldParts = oldVer.split('.')
    const newParts = newVer.split('.')
    for (var i = 0; i < newParts.length; i++) {
      const a = ~~newParts[i] 
      const b = ~~oldParts[i] 
      if (a > b) return true
      if (a < b) return false
    }
    return false
  }

async function updatever(req, res) {
    const ver = await Vpn.findOne({ Name: "FREE"});
    if(isNewerVersion(ver.Version,req.body.version)===true)
    {
      Vpn.findOneAndUpdate(ver.id,{$set:{Version :req.body.version}},{new:true},(error,doc)=>{
        if(error) throw(err);
        else res.json(doc);
      })
    }
    else
    {
      res.send("New version is define!");
    }
    
  }
 
  async function decrypt(req, res, next) {
    const id = await Vpn.findOne(  {Name: "FREE"});
    vpnServices
      .callMyPromise(id.id)
      .then(function(result) {
        res.json(result);
      });
  }


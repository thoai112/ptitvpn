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
router.put("/putserver/:id",jwt(Role.Admin),putserver);
router.put("/putnetwork/:id",jwt(Role.Admin),putnetwork);
router.get("/decrypt/:id", decrypt);


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
    
  function putserver(req, res) {
    Vpn.findOneAndUpdate({_id: req.params.id},{$push:{Servers:req.body.serverId}},{new:true},(error,doc)=>{
      if(error) throw(err);
      else res.json(doc);
    })
  }

  function putnetwork(req, res) {
    Vpn.findOneAndUpdate({_id: req.params.id},{$push:{Networks:req.body.networkId}},{new:true},(error,doc)=>{
      if(error) throw(err);
      else res.json(doc);
    })
  }

 
  function decrypt(req, res, next) {
    vpnServices
      .callMyPromise(req.params.id)
      .then(function(result) {
        res.json(result);
      });
  }


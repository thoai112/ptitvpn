const express = require("express");
const router = express.Router();
const networkServices = require("../services/network.services");
const Role = require("../database/role");
const jwt = require("../database/jwt");


//server routes
router.post("/addNetwork", jwt(Role.Admin), addNetwork);
router.get("/getnetwork",jwt(), getNetwork);
router.put("/:id",jwt(Role.Admin), update);
router.delete("/:id", jwt(Role.Admin), _delete);

module.exports = router;


function addNetwork(req, res, next) {
    networkServices
      .createNetwork(req.body)
      .then((server) =>
        res.json({
          server: server,
          message: `Network create successfully`,
        })
      )
      .catch((error) => next(error));
  }
  
function getNetwork(req, res, next) {
  networkServices
    .getAllNetwork(req.body)
    .then((servers) =>
      res.json(servers))
    .catch((error) => next(error));
  }

function update(req, res, next) {
  networkServices
    .update(req.params.id, req.body)
    .then(() =>
      res.json({
        message: `Network with id: ${req.params.id} updated successfully.`,
      })
    )
    .catch((error) => next(error));
  }

function _delete(req, res, next) {
  networkServices
    ._delete(req.params.id)
    .then(() =>
      res.json({
        message: `Network with id: ${req.params.id} deleted successfully.`,
      })
    )
    .catch((error) => next(error));
  }
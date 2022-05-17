const express = require("express");
const router = express.Router();
const serverServices = require("../services/server.services");
const Role = require("../database/role");
const jwt = require("../database/jwt");


//server routes
router.post("/addserver", jwt(Role.Admin), addserver);
router.get("/getserver",jwt(), getserver);//jwt();
router.put("/:id",jwt(Role.Admin), update);
router.delete("/:id", jwt(Role.Admin), _delete);


module.exports = router;


function addserver(req, res, next) {
    serverServices
      .createserver(req.body)
      .then((server) =>
        res.json({
          server: server,
          message: `Server create successfully`,
        })
      )
      .catch((error) => next(error));
  }
  
  function getserver(req, res, next) {
    serverServices
      .getAllServer(req.body)
      .then((servers) =>
        res.json(servers))
      .catch((error) => next(error));
  }

function update(req, res, next) {
  serverServices
    .update(req.params.id, req.body)
    .then(() =>
      res.json({
        message: `Server with id: ${req.params.id} updated successfully.`,
      })
    )
    .catch((error) => next(error));
}

function _delete(req, res, next) {
  serverServices
    ._delete(req.params.id)
    .then(() =>
      res.json({
        message: `Server with id: ${req.params.id} deleted successfully.`,
      })
    )
    .catch((error) => next(error));
}
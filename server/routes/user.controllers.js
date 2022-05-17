const express = require("express");
const router = express.Router();
const userServices = require("../services/user.services");
const Role = require("../database/role");
//const Type = require("../database/type");
const jwt = require("../database/jwt");

//routes
router.post("/login", login);
router.post("/register", register);
router.get("/", jwt(Role.Admin), getAll); //, jwt(Role.Admin)
router.get("/current", jwt(), getCurrent);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", _delete);



module.exports = router;

//route functions
function login(req, res, next) {
  userServices
    .login(req.body)
    .then((user) => {
      console.log(user);
      user
        ? res.json({ token: user.token, sub: user.id, role: user.role, fullName: user.fullName, message: "User logged in successfully" })
        //? res.json({ user: user, message: "User logged in successfully" })

        : res
            .status(400)
            .json({ message: "Username or password is incorrect." });
    })
    .catch((error) => next(error));
}

function register(req, res, next) {
  userServices
    .create(req.body)
    .then((user) =>
      res.json({
        user: user,
        message: `User Registered successfully with username ${req.body.username}`,
      })
    )
    .catch((error) => next(error));
}

function getAll(req, res, next) {
  const currentUser = req.user;

  if (currentUser.role !== Role.Admin) {
    return res.status(401).json({ message: "Not Authorized!" });
  }
  userServices
    .getAll()
    .then((users) => res.json(users))
    .catch((err) => next(err));
}

function getCurrent(req, res, next) {
  console.log(req);
  userServices
    .getById(req.user.sub)
    .then((user) => (user ? res.json(user) : res.status(404)))
    .catch((error) => next(error));
}

function getById(req, res, next) {
  userServices
    .getById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "User Not Found!" });
        next();
      }
      return res.json(user);
    })
    .catch((error) => next(error));
}

function update(req, res, next) {
  userServices
    .update(req.params.id, req.body)
    .then(() =>
      res.json({
        message: `User with id: ${req.params.id} updated successfully.`,
      })
    )
    .catch((error) => next(error));
}

function _delete(req, res, next) {
  userServices
    .delete(req.params.id)
    .then(() =>
      res.json({
        message: `User with id: ${req.params.id} deleted successfully.`,
      })
    )
    .catch((error) => next(error));
}


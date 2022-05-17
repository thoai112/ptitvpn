const db = require("../database/db");
const Server = db.Server;


async function createserver(netParam) {

    //create network obj
    const network = await Server.findOne({ Name: netParam.Name });
    //validate
    if (network) throw `This network already exists`;
    const newNetwork = new Server(netParam);
    await newNetwork.save();
  }

async function getAllServer() {
    return await Server.find();
  }
  

async function update(id, serverParam) {
  console.log(id, serverParam);
  const server = await Server.findById(id);
  console.log(server.Name, serverParam.Name);
  //validate the name
  if (!server) throw "Server not found.";
  if (
    server.Name !== serverParam.Name &&
    (await Server.findOne({ Name: serverParam.Name }))
  ) {
    throw `Server with Name ${serverParam.Name} already exist.`;
  }

  //copy the server obj
  Object.assign(server, serverParam);
  await server.save();
}
  
async function _delete(id) {
  await Server.findByIdAndRemove(id);
}

module.exports = {
    createserver,
    getAllServer,
    update,
    _delete,
}
  
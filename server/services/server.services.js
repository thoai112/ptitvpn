const db = require("../database/db");
const Server = db.Server;
const Vpn = db.Vpn;

// fetchId = name => {
//   return Vpn.findOne({Name: name}).then(user => user._id);
// }; 
// const id = fetchId("FREE").then(id => {return console.log(id)})


async function createserver(netParam) {
    
    const id = await Vpn.findOne({Name: "FREE"});
    //create network obj
    const server = await Server.findOne({ Name: netParam.Name });
    //validate
    if (server) throw `This server already exists`;
    const newServer = new Server(netParam);
    await newServer.save().then(svid => { 
      Vpn.findOneAndUpdate(id.id,{$push:{Servers:svid.id}},{new:true},(error,doc)=>{
      })
    });
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
  
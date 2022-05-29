const db = require("../database/db");
const Network = db.Network;

async function createNetwork(netParam) {

    const id = await Vpn.findOne({Name: "FREE"});
    //create network obj
    const network = await Network.findOne({ Name: netParam.Name });
    //validate
    if (network) throw `This network already exists`;
    const newNetwork = new Network(netParam);
    await newNetwork.save().then(nwid => { 
      Vpn.findOneAndUpdate(id.id,{$push:{Servers:nwid.id}},{new:true},(error,doc)=>{
      })
    });
  }


async function getAllNetwork() {
    return await Network.find();
}


async function update(id, networkParam) {
    console.log(id, networkParam);
    const network = await Network.findById(id);
    console.log(network.Name, networkParam.Name);
    //validate the name
    if (!network) throw "Network not found.";
    if (
      network.Name !== serverParam.Name &&
      (await Network.findOne({ Name: serverParam.Name }))
    ) {
      throw `Network with Name ${serverParam.Name} already exist.`;
    }
  
    //copy the network obj
    Object.assign(network, serverParam);
    await network.save();
  }
    
  async function _delete(id) {
    await Network.findByIdAndRemove(id);
  }


  module.exports = {
    createNetwork,
    getAllNetwork,
    update,
    _delete,
}
  
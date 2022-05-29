const db = require("../database/db");
const Vpn = db.Vpn;
const aesServices = require("../services/aes.services");

  async function addvpn(userParam) {
      const newVpn = new Vpn(userParam);
      await newVpn.save();
    }
  async function getAll() {
    return await Vpn.find();
  }

  async function getvpn(id) {
    return await Vpn.findById(id).populate("Servers Networks").lean();
  }

  

  var myPromise = (id) => (
    new Promise((resolve, reject) => {
        
       
        Vpn.findById(id).populate("Servers Networks")
        .then(function(result){
            return result;
        })
         .then(function(result){
             resolve(result);
        });
    })
  );

  // var callMyPromise = async () => {
  //   var result = await (myPromise());
  //   const  data = JSON.stringify(result);
  //   return data;
  // };

  async function callMyPromise(id) {
    var result = await (myPromise(id));
    const data = JSON.stringify(result);
    const l = aesServices.encrypt(data,"NET4G");
    return l;
  };
  
module.exports = {
  addvpn,
  getvpn,
  getAll,
  callMyPromise,
};
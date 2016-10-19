var request = require("request");
var fs = require("fs");
function IPFSConnector() {
  this.ipfsEndpoint = "http://localhost:8080/ipfs/";
  this.ipfsAPIEndpoint = "http://localhost:5001/";
  this.ipfsAddUrl = this.ipfsAPIEndpoint + "api/v0/add";
}

IPFSConnector.prototype.asUrl = function (hash) {
  return this.ipfsEndpoint + hash;
};

IPFSConnector.prototype.add = function (path) {
  return new Promise(function (resolve, reject) {
    var req = request.post(this.ipfsAddUrl, function (err, resp, body) {
      if (err) {
        reject(err);
      } else {
        var ipfsHash = JSON.parse(body).Hash;
        resolve(ipfsHash);
        console.log(ipfsHash + ": " + path);
      }
    });
    req.form().append('file', fs.createReadStream(path));
  }.bind(this));
};
module.exports = function(RED) {
  "use strict";
  var exec = require('ttbd-exec');

  function main(config) {
    RED.nodes.createNode(this,config);
    var node = this;
    var opt = {hydra_exec_host: "mosquitto"};

    this.on('input', function (msg) {
      var child = exec("hostname", opt, function (error, stdout, stderr) {
        msg.boxname = stdout.replace("\n", "").trim();
        msg.payload = msg.boxname;
        msg.message = "The name is " + msg.boxname;
        node.send(msg);
      });
    });
  }
  RED.nodes.registerType("boxname", main);
}

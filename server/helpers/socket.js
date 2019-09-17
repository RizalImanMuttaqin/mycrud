const socket = require('socket.io').listen(80);

module.exports = {
    broadcast : async () => {
       console.log("my socket hit")
       socket.emit("refresh");
    },


}
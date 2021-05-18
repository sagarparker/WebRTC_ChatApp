const Peer = require('simple-peer');
const peer = new Peer({
  initiator: location.hash === '#init',
  trickle: false
})

window.onload = function(){
  peer.on('signal', function (data) {
    document.getElementById('yourId').value = JSON.stringify(data)
  })

  document.getElementById('connect').addEventListener('click', function () {
    var otherId = JSON.parse(document.getElementById('otherId').value)
    peer.signal(otherId)
  })

  document.getElementById('send').addEventListener('click', function () {
    var msgDiv = document.getElementById('msgList');
    var newMsg = document.createElement("li");
    var yourMessage = document.getElementById('yourMessage').value;
    newMsg.innerHTML = yourMessage;
    msgDiv.appendChild(newMsg);
    peer.send(yourMessage)
  })

  peer.on('data', function (data) {
    var msgDiv = document.getElementById('msgList');
    var newMsg = document.createElement("li");
    newMsg.innerHTML = data;
    msgDiv.appendChild(newMsg);
  })
}




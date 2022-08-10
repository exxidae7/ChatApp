const socket = io()
const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')
const roomName = document.getElementById('room-name')
const userList = document.getElementById('users')

const { username , room } = Qs.parse(location.search , {
  ignoreQueryPrefix : true
})


socket.emit('joinRoom' , {username , room })


socket.on('roomUsers', ({ room , users }) =>{
  outputRoomName(room)
  outputUsers(users)
} )
// message from server
socket.on('message' , message => {
  outputMessage(message)
  console.log(message)
  chatMessages.scrollTop = chatMessages.scrollHeight
})


// message submit
chatForm.addEventListener('submit' , e => {
  e.preventDefault()
  // get message text
  const msg = e.target.elements.msg.value
  // emit message to server
  socket.emit('chatMessage',msg)

  e.target.elements.msg.value = ''
  e.target.elements.msg.focus()
})



function outputMessage(message) {
  const div = document.createElement('div')
  div.classList.add('message')
  div.innerHTML = ` <pre><p class="meta">${message.username} <span>${message.time}</span></p> </pre>
  <p class= "text">
  
  ${message.text}
  
  </p>`
  document.querySelector('.chat-messages').appendChild(div)
  
}

function outputRoomName(room){
  roomName.innerText = room
}
function outputUsers(users){
  userList.innerHTML = `
  ${users.map(user => `<li>${user.username}</li>`).join()}
  `
}
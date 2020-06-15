const socket = io('http://localhost:3000')
const messageContainer= document.getElementById('messageContainer')
const messageForm= document.getElementById('sendContainer')
const messageInput= document.getElementById('messageInput')
const name= prompt('What is your name?')
appendMessage('You joined')
socket.emit('new-user', name)

socket.on('chat-message', data=>{
    appendMessage(`${data.name}: ${data.message}`)
})
socket.on('user-connected',name =>{
    if(name)
        appendMessage(`${name} connected`)
}) 
socket.on('user-disconnected',name =>{
    appendMessage(`${name} disconnected`)
})

messageForm.addEventListener('submit',ele =>{
    ele.preventDefault()
    const message= messageInput.value;
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message',message)
    messageInput.value=''
})

function appendMessage(message){
    const messageElement= document.createElement('div')
    messageElement.innerText= message
    messageContainer.append(messageElement)
}
import SockJS from 'sockjs-client'
import Stomp from 'webstomp-client'
import store from '@/store'
let stompClient = null
const getStompClient = webSocketUrl => {
  const socket = new SockJS(webSocketUrl)
  socket.binaryType = 'arraybuffer'

  return Stomp.over(socket)
}

// let stompClient = getStompClient('http://localhost:8080/gs-guide-websocket')
export const onConnected = () => {
  // Subscribe to the Public Topic
  stompClient &&
  stompClient.send(
    '/app/hello',
    JSON.stringify({ username: 'hihi', id: 1 })
  )
  if (stompClient) {
    stompClient.subscribe('/users/topic/messages', (message) => {
      console.log('1123123', message)
    })
  }
}

export const onConnectWebSocket = () => {
  stompClient = getStompClient('http://localhost:8080/gs-guide-websocket')
  stompClient.connect({ token: `Bearer ${store.getters.userInfo.token}` }, onConnected)
}

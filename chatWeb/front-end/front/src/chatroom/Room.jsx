// import styled from 'styled-components'
// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { List, Modal } from 'antd';
// import axios from 'axios';
// import Message from './Message';
// import { v4 as uuidv4 } from 'uuid';

// function Room(props)
// {
//     const onChat = props.onChat;
//     const user = useSelector(state => state.user);
//     const socket = props.socket;
//     const roomid = props.room_id;
//     const isgroup = props.isGroup;
//     const [messages, setMessages] = useState([]);
//     const [isSend,setIsSend] = useState(true);
//     const data = {roomid:roomid,isSave:true,messages:messages};

//     const fetchmessages = async () => {
//         try {
//             const response = await axios.post("http://localhost:8000/Chatroom/rooms/messages",data);
//             console.log(typeof(response.data.messages));
//             if(!response.data.messages) setMessages([]);
//             else setMessages(response.data.messages);
//         } 
    
//         catch (error) {
//             console.error(error);
//         }
//     };

//     const saveMessages = async () => {
//         try {
//             const response = await axios.post("http://localhost:8000/Chatroom/rooms/messages",data);
//             console.log(response.data.message);
//             console.log(typeof(response.data.messages));
   
//         } 
    
//         catch (error) {
//             console.error(error);
//         }
//     };

//     useEffect(() =>{
//         socket.on('message',(message) =>{
//             const messagess = [...messages, message];
//             setMessages(messagess);
//             console.log(message);
//         })

//         return () => {
//             socket.off('message');
//         }
//     },[]);


//     useEffect(() => {
//         // 메시지 저장 로직
//         saveMessages()
//     }, [roomid]);
//     useEffect(() => {
//         // 메시지 인출 로직
//         fetchmessages();
//     }, [roomid])

//     const handleMessageSubmit = (event) => {
//         event.preventDefault(); // 폼의 기본 동작을 취소합니다.
//         const now = new Date();
//         const formattedTime = now.toLocaleTimeString();
//         const messageId = uuidv4();
//         const message = event.target.Chat.value; 
//         const messageData = {
//             id:messageId,
//             room_id:roomid,
//             message:message,
//             from_id:user.user_id,
//             to_id:'undefined',
//             date:formattedTime
//         }
        
//         const messagess = [...messages, messageData];
//         setMessages(messagess);
//         event.target.Chat.value = '';
        
//         socket.emit('message',messageData);
//     };

//     return(
//         <MessagesContainer onSubmit={handleMessageSubmit}>
//             <MessageList>
//                 <List dataSource={messages} 
//                 className="CustomList"
//                 renderItem={(item) => ( 
//                     <List.Item>
//                         <Message isSend={isSend} message={item}/>
//                     </List.Item>)}>
//                 </List>
//             </MessageList>
//             <Inputbox>
//                 <Chatinput type='text' placeholder='send message' name="Chat" />
//             </Inputbox>
//         </MessagesContainer>
//     );

// }

// const MessagesContainer = styled.form`
//     width : 60vw;
//     height : 95vh;
//     border : 1px solid #241C3B;
//     border-radius: 5px;
//     padding: 0.1rem;
//     margin: 0.5rem;
//     flex-flow: column wrap;
//     background-color: #9AC0DB;
// `

// const Chatinput = styled.input`
//     width : 100%;
//     padding : 1rem;
//     margin : 2rem;
//     border : 1px solid #241C3B;
//     border-radius: 5px;
//     background: #A3A3A3;
//     color : #fff;
//     font-size: 1em;
//     word-break:break-all;
// `

// const Inputbox = styled.div`
//     position: relative;
//     top:3rem; 
//     width: 90%;
// `

// const MessageList = styled.div`
//     .CustomList {
//         overflow: auto;
//         height: 75vh;
//         width: 100%;
  
//     }

//     .CustomList::-webkit-scrollbar {
//         width: 4px;
//     }

//     .CustomList::-webkit-scrollbar-thumb {
//         background-color: #888;
//         border-radius: 4px;
//         height: 60px;
//     }

//     .CustomList::-webkit-scrollbar-track {
//         background-color: #11233D;
//     } 
// `

// export default Room;
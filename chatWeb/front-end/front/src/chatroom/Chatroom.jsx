import styled from 'styled-components';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { List, Avatar, Modal } from 'antd';
import { HiOutlineStatusOffline} from "react-icons/hi";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { MdArrowBack } from "react-icons/md";
import { useDispatch } from 'react-redux';
import  FriendList  from '../Modal/FriendList';
import io from 'socket.io-client';
import axios from 'axios';
import Message from './Message';
import { v4 as uuidv4 } from 'uuid';
import { BiMessageDetail } from "react-icons/bi"


const socket = io('http://localhost:8000');
axios.defaults.withCredentials = true;
function Chatroom()
{
    const [users, setUsers] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [roomData,setRoomData] = useState({});
    const [messages, setMessages] = useState([]);
    const [open, setVisible] = useState(false);
    const [open2, setVisible2] = useState(false);
    const [openGroupList,setOpenGroupList] = useState(false);
    const [user_id, setUserId] = useState('');
    const [onChat,setOnchat] = useState(false);
    const user = useSelector(state => state.user);
    const [friendData,setfriendData] = useState({});
    const messageListRef = useRef(null);
    //let onlineUsers = useSelector(state =>state.onlineUsers);
    const dispetch = useDispatch();
    const profile_url = "https://user-images.githubusercontent.com/39295881/67360481-08f00c00-f5a1-11e9-9704-a846132baf0e.png";
    const Data = {
      user_id:user.user_id,
      friend_id:user_id
    }

    //console.log("나의 정보:",user);
    //console.log("나의 소켓 식별자",socket.id);
    //console.log("나의 세션 아이디",sessionId);

    // 친구 목록 가져오기
    const fetchfriends = async (connectedUser) => {
        try {
            const response = await axios.post('http://localhost:8000/Chatroom',{user_id:user.user_id,currentUsers:connectedUser});
            let userList = [];
            
            for(let i = 0; i < response.data.length; i++)
            {
                let User = { user_name:response.data[i].friend_name, isOnline:response.data[i].isOnline,
                    server_socketId:response.data[i].server_socketId,user_id:response.data[i].friend_id };
                userList[i] = User;
            }
            setUsers(userList);
        }
    
        catch (error) {
            console.error(error);
        }
    };

    // 방 목록 가져오기
    const fetchrooms = async (roomdata) => {
        try {
            const response = await axios.post('http://localhost:8000/Chatroom/rooms',{user_id:user.user_id,roomdata:roomdata});
            setRooms(response.data.roomdata);
        } 
    
        catch (error) {
            console.error(error);
        }
    };

    //친구 추가 요청
    const addfriendOk = async() => {
        try{
            if(Data.friend_id === Data.user_id) alert("추가할 수 없는 아이디입니다");
            else
            {
                const response = await axios.post("http://localhost:8000/Chatroom",Data);
                console.log(response.data.message);
                alert(response.data.message);
                console.log("친구추가 요청!",Data);
                socket.emit('addfriend');
            }
        }
        catch(error){
            console.log(error);
        }
        setVisible(false);
    };
    
    const addfriendCancel = () => {
        setVisible(false);
    };
    
    
    // 방 만들기 요청
    const addChatRoomhandleOk = async() =>{
        setVisible2(false);
        
        const roomId = uuidv4();
        const userList =
        [
            user.user_id,
            friendData.id
        ];

        const roomdata = {
            room_maker_id:user.user_id,
            room_maker_name:user.user_name,
            friend_name:friendData.name,
            room_id:roomId,
            isGroup:false,
            userList:userList,
        };
    
        try
        {
            const response = await axios.post("http://localhost:8000/Chatroom/rooms",roomdata);
            console.log(response.data.message);
            alert(response.data.message);
            socket.emit('addroom',roomdata);
        }
        catch(error){
            console.log(error);
        }
    };

    const addChatRoomhandle = () => {
        setVisible2(false);
    };

    // 친구를 클릭했을 때
    const userCardOnClick = (item) =>{
        console.log("아이템",item);
        const friend = {
            name:item.user_name,
            id:item.user_id
        };
        setfriendData(friend);
        setVisible2(true);
    }

    // 방을 클릭했을 때
    const roomCardOnClick = async(item) =>{
        console.log("아이템",item);
        socket.emit('join',item.room_id,user.user_name);
        setRoomData({room_id:item.room_id, isGroup:item.isGroup });
        scrollToBottom();
        setOnchat(true);
    };


    // 메시지 가져오기
    const fetchmessages = async () => {
        const data = {roomid:roomData.room_id,isSave:false};
        try 
        {
            const response = await axios.post("http://localhost:8000/Chatroom/rooms/messages",data); 
            setMessages(response.data.messages); // 전에 썻던 메시지들을 저장
            console.log("메시지 가져오기 실행",response.data.messages);
        } 
    
        catch (error) {
            console.error(error);
        }
    };

    // 메시지 저장하기
    // const saveMessages = async () => {
    //     const data = {roomid:roomData.room_id,isSave:true,maxid:roomData.max_id,messages:currenMessages};
    //     try{
    //         const response = await axios.post("http://localhost:8000/Chatroom/rooms/messages",data);
    //         //console.log(response.data.message);
    //         console.log("저장한 데이터",response.data.data);  
    //     } 
    
    //     catch (error) {
    //         console.error(error);
    //     }
    // };

    // 메시지 보내기
    const handleMessageSubmit = (event) => {
        event.preventDefault(); // 폼의 기본 동작을 취소합니다.
        const now = new Date();
        const timeString = now.getHours().toString().padStart(2, '0') + ':' +
                           now.getMinutes().toString().padStart(2, '0') + ':' +
                           now.getSeconds().toString().padStart(2, '0');
        const message = event.target.Chat.value; 
        const messageData = {
            //id:roomData.max_id,
            room_id:roomData.room_id,
            message:message,
            from_id:user.user_id,
            to_id:'undefined',
            date: timeString
        };

        const messagess = [...messages, messageData];
        setMessages(messagess);
        socket.emit('message',messageData);
        event.target.Chat.value = '';
    };


    const enterRoom = async() => {
        await fetchmessages();
        scrollToBottom();
    }

    const messageOnClick = () =>{

    };

    const handleIdChange = (e) => {
        const userId = e.target.value;
        setUserId(userId);
    };

    // 친구 아이디 입력창 띄우기
    const InputFriendId = () =>{
        setVisible(!open);
    };

    useEffect(() => {
        socket.on('message', (messageData) => {
            if(user.user_id !== messageData.from_id)
                setMessages([...messages,messageData]); 
        });
    },[messages])

    useEffect(() => {
        enterRoom();
        scrollToBottom();
    }, [roomData.room_id]);

    // 소켓 통신
    useEffect(() =>{
        socket.emit('on',user.user_name,user.user_id,socket.id);
        
        socket.on('on',(connectedUsers,currentRooms) => {
            console.log("on~",users.length);
            fetchfriends(connectedUsers);
            fetchrooms(currentRooms);
        });
    
        socket.on('addfriend',(connectedUsers) => {
           fetchfriends(connectedUsers);
        });
         
        socket.on('addroom',(currentdRooms) => {
            fetchrooms(currentdRooms);
        });

        socket.on('join',(roomdata) => {
            console.log(user.user_name,"가",roomdata.room_maker_name,"에게 조인");
            socket.emit('join',roomdata.room_id,user.user_name);
            fetchrooms();
        });

         socket.on('disconnected',(connectedUsers) => {
            console.log("특정사용자 종료");
            fetchfriends(connectedUsers);
         });

         return () => {
            socket.off('on');
            socket.off('addfriend');
            socket.off('disconnected');
            socket.off('addromm');
            socket.off('join');
            socket.off('message');
          };
    },[]);



    useEffect(() => {
        const handleBeforeUnload = () => {
            //saveMessages();
            socket.emit('disconnect');
        };
    
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
           
        };
    }, []);


    const scrollToBottom = () => 
    {    
        if (messageListRef.current) 
        {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
            console.log("스크롤실행");
        }
      };

    const onbackhandle = () => {
        setRoomData({room_id:null,isGroup:false});
        setOnchat(false);
    }

    const addGroupCancle = () => {
        setOpenGroupList(false)
    }

    const onClickAddGroupRoom = () =>{
        setOpenGroupList(true)
    }


    return(
        <Background>
            
            <FriendsContainer>
                <UserList>
                    <List dataSource={users} 
                    className="CustomList"
                    renderItem={(item) => ( 
                        <List.Item onClick={() => userCardOnClick(item)}>
                            <Cardview>
                                <List.Item.Meta
                                    avatar={<Avatar src={profile_url} />}
                                    title={<CustomTitle>{item.user_name}</CustomTitle>}
                                />
                                {item.isOnline ? <HiOutlineStatusOnline size={30} /> : <HiOutlineStatusOffline size={30} />}
                            </Cardview>
                        </List.Item>)}>
                    </List>
                </UserList>

                <Modal open={open2} onOk={() => addChatRoomhandleOk()} onCancel={addChatRoomhandle }>
                    <p>{friendData.name}님과 1대1 채팅방을 만드시겠습니까?.</p> 
                </Modal>

                <Modal title="친구 추가" open={open} onOk={addfriendOk} onCancel={addfriendCancel}>
                    <Inputbox2>
                        <Idinput placeholder='ID' name="user Id" onChange={handleIdChange}/>
                    </Inputbox2>
                    <p>친구 추가할 아이디를 입력해주세요.</p>
                </Modal>

                <AddButton onClick={InputFriendId}>친구 추가</AddButton>
            </FriendsContainer>

            <MessagesContainer onSubmit={handleMessageSubmit}>
                {onChat ? <Backbutton ><MdArrowBack onClick={onbackhandle} className='MyIcon'/></Backbutton>: <div/>}
                {onChat ?<MessageList Ref={messageListRef}>
                    <List 
                       style={{ borderBottom: 'none' }}
                        dataSource={messages}
                        itemLayout="vertical"
                        className="CustomList"
                        renderItem={(item) => ( 
                            <List.Item 
                                className={item.from_id === user.user_id ? 'customMessage send' : 'customMessage receive'}
                                onClick={() => messageOnClick(item)}
                                // data-issend={item.from_id === user.user_id ? 'true' : 'false'}
                                >
                                <Message item={item} message={item}/>
                            </List.Item>)}
                        locale={{emptyText: <Empty description="현재 채팅방에 입장해 있지 않습니다"/>,}}>
                    </List>
                </MessageList>: <Profile></Profile>}
                {onChat ? <Inputbox><Chatinput type='text' placeholder='send message' name="Chat" /></Inputbox> : <div/>}
            </MessagesContainer>

            <RoomsContainer>
                <RoomList>
                    <List dataSource={rooms} 
                    className="CustomList"
                    renderItem={(item) => ( 
                        <List.Item onClick={() => roomCardOnClick(item)}>
                            <Cardview>
                            <List.Item.Meta
                                    avatar={<BiMessageDetail size={30}/>}
                                    title={<CustomTitle>{item.isGroup ?  '단체 채팅방' : '1대1 대화방'}</CustomTitle>}
                            />
                            </Cardview>
                        </List.Item>)}>
                    </List>
                </RoomList>
                <AddButton onClick={onClickAddGroupRoom}>그룹 채팅방 추가</AddButton>
                <FriendList friend={users} openf={addGroupCancle} open={openGroupList} user={user} socket={socket}/>
            </RoomsContainer>

        </Background>
    );


}


const Background = styled.div `
    overflow: hidden;
    width : 100%;
    height : 100%;
    background : #131324;
    display : flex;
    flex-direction : row;
    align-items : center;
`

const Inputbox = styled.div`
    position: relative;
    top:0.1rem; 
    width: 90%;
`

const Idinput = styled.input`
    width : 100%;
    padding: 15px;
    margin-top : 2rem;
    border : 1px solid #18181c;
    outline: none;
    border-radius: 5px;
    background: #dcdcdc;
    color : #000;
    font-size: 1em;
`
const Inputbox2 = styled.div`
    position: relative; 
    width: 25vw;
`
const Chatinput = styled.input`
    width : 100%;
    padding : 1rem;
    margin : 2rem;
    border : 1px solid #241C3B;
    border-radius: 5px;
    background: #fff;
    color : #000;
    font-size: 1em;
    word-break:break-all;
    
`
const MessagesContainer = styled.form`
    width : 60vw;
    height : 95vh;
    border : 1px solid #241C3B;
    border-radius: 5px;
    padding: 0.1rem;
    margin: 0.5rem;
    flex-flow: column wrap;
    justify-content: center;
    background-color: #9AC0DB;
`

const FriendsContainer = styled.div`
    width : 20vw;
    height : 95vh;
    background-color: #11233D;
    border : 1px solid #241C3B;
    border-radius: 5px;
    padding: 0.1rem;
    margin: 1rem;
    display: flex;
    flex-flow: column wrap;
    justify-content: end;
    align-items: center;
`

const RoomsContainer = styled.div`
    width : 20vw;
    height : 95vh;
    background-color: #1C243B;
    border : 1px solid #241C3B;
    border-radius: 5px;
    padding: 0.1rem;
    margin: 1rem;
    display: flex;
    flex-flow: column wrap;
    justify-content: end;
    align-items: center;
`

const AddButton = styled.div`
    width: 10rem;
    height: 3rem;
    background-color: #070A24;
    font-size: 1rem;
    margin: 3rem;
    color : white;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Backbutton = styled.div`
    width: 100%;
    height: 2.5rem;
    background-color: #9AC0DB;
    font-size: 1rem;
    color : black;
    //cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    box-shadow: 0px 0.3px 0px 0px black;
    .MyIcon{
        cursor: pointer;
        margin-left: 1rem;
    }
`
const Empty = styled.div`
    width: 40px;
    height: 4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: black;
`
const Cardview = styled.div`
  width: 83%;
  height: 4rem;
  background-color:#ffffff39;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    /* hover 시 적용되는 스타일 */
    background-color: #9186f3;
  }
`

const Profile = styled.div`
    position: relative;
    top: 1rem;
    width: 100px;
    height: 10px;
    background-color: '#8758FF' !important;
    
`
const CustomTitle = styled.span`
    color: white;
    font-size: 0.8rem;
`

const UserList = styled.div`
    .CustomList {
        overflow: auto;
        height: 75vh;
        width: 15vw;
  
    }

    .CustomList::-webkit-scrollbar {
    width: 4px;
    }

    .CustomList::-webkit-scrollbar-thumb {
        background-color: #888;
        border-radius: 4px;
        height: 60px;
    }

    .CustomList::-webkit-scrollbar-track {
        background-color: #11233D;
    } 
`

const RoomList = styled.div`
    .CustomList {
        overflow: auto;
        height: 75vh;
        width: 15vw;
  
    }

    .CustomList::-webkit-scrollbar {
        width: 4px;
    }

    .CustomList::-webkit-scrollbar-thumb {
        background-color: #888;
        border-radius: 4px;
        height: 60px;
    }

    .CustomList::-webkit-scrollbar-track {
        background-color: #11233D;
    } 
`
const MessageList = styled.div`
    .CustomList {
        overflow: auto;
        height: 77vh;
        width: 100%;
        padding: 0.3rem;
    }

    .CustomList::-webkit-scrollbar {
        width: 3.5px;
    }

    .CustomList::-webkit-scrollbar-thumb {
        background-color: #888;
        border-radius: 4px;
        height: 60px;
    }

    .CustomList::-webkit-scrollbar-track {
        background-color: #9AC0DB;
    } 

    .customMessage.send {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }

    .customMessage.receive {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        
    }
`

export default Chatroom;
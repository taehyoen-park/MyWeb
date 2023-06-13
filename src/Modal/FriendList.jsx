import React, { useState, useEffect, useRef } from 'react';
import {  Modal, List, Avatar } from 'antd';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
// }
function FriendList(props){
    const [hoveredItem, setHoveredItem] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(false);
    const profile_url = "https://user-images.githubusercontent.com/39295881/67360481-08f00c00-f5a1-11e9-9704-a846132baf0e.png";
    const socket = props.socket;
    // 배열 초기화
    useEffect(() => {
        for(let i = 0; i < props.friend.length; i++)
        {
            props.friend[i].join = false;
        }
    }, []);

    const addGroupChatRoomhandle = async(userList) =>{    
        const roomId = uuidv4();
        const roomdata = {
            room_maker_id:props.user.user_id,
            room_maker_name:props.user.user_name,
            room_id:roomId,
            isGroup:true,
            userList:userList,
        };
    
        try{
            const response = await axios.post("http://localhost:8000/Chatroom/rooms",roomdata);
            
            alert(response.data.message);
            socket.emit('addroom',roomdata);
        }
        catch(error){
            console.log(error);
        }
    };

    const handleItemClick = (item) => {
        if(!item.join) item.join = true;
        else item.join = false;
        console.log(item.join);
        setSelectedItemId(!selectedItemId);
      };

    const handleModalClose = () => {
        props.openf();
    }

    const handleDivMouseOver = () => {
      setHoveredItem(true);
    };
  
    const handleDivMouseLeave = () => {
      setHoveredItem(false);
    };
    
    const onJoinBtn = () => {
        const joinList = [];
        joinList.push(props.user.user_id);
        for(let i = 0; i < props.friend.length; i++)
        {
            if(props.friend[i].join) joinList.push(props.friend[i].user_id);
            // console.log(props.friend[i].user_id);
        }
        addGroupChatRoomhandle(joinList);
        handleModalClose();
        console.log(joinList);
    }
    return(
        <Modal width={280} style={{ top: 30 }}
            title="초대 친구 목록"
            open={props.open}
            onCancel={handleModalClose}
            footer={true}>
         <UserList>
            <List dataSource={props.friend} 
            className="CustomList"
            renderItem={(item) => ( 
                <List.Item className='customitem' 
                    onClick={() => handleItemClick(item)}
                    style={{ backgroundColor: (item.join) ? '#394867' : '#9BA4B5',}}>
                    <List.Item.Meta
                        avatar={<Avatar src={profile_url} />}
                        title={<CustomTitle>{item.user_name}</CustomTitle>}
                    />
                </List.Item>)}>
            </List>
            <JoinButton 
                hovered={hoveredItem}
                onMouseOver={handleDivMouseOver}
                onMouseLeave={handleDivMouseLeave}
                onClick={onJoinBtn}> 
                방 만들기
            </JoinButton>
        </UserList>

        </Modal>
    );
}


const CustomTitle = styled.span`
    color: white;
    font-size: 1rem;
`

const UserList = styled.div`

    .CustomList {
        overflow: auto;
        height: 65vh;
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
        background-color: #fff;
    }
    .customitem{
        width: 98%;
        height: 4rem;
        background-color:#9BA4B5;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        padding-left: 1rem;
        padding-right: 1rem;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 0.4rem;
        &:hover {
            background-color: #9186f3;
        }
    }
`
const JoinButton = styled.div`
    width: 100%;
    height: 3rem;
    background-color: ${props => props.hovered ? '#1C3879' : '#607EAA'};
    font-size: 1rem;
    margin-top: 0.5rem;
    color : white;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
export default FriendList;

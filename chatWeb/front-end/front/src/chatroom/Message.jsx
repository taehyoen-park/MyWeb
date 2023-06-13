import styled from 'styled-components'
import { useSelector } from 'react-redux';
import React from 'react';

function Message(props){
    const user = useSelector(state => state.user);
    const isSend = props.item.from_id === user.user_id;
    const isReceive = props.item.from_id !== user.user_id;

    return(
        <Messaged>
            <Profile>{(props.item.from_id === user.user_id) ?  '' : props.item.from_id} </Profile>
            <Data>
                {isSend ? <Time>{props.item.date}</Time> : <></>}
                 <MessageCard isSend={isSend}>
                    {props.item.message}
                </MessageCard>
                {isReceive ? <Time>{props.item.date}</Time> :<></> }
            </Data>
        </Messaged>
    );
}

const Data = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: end;
`

const Profile = styled.div`
    margin-bottom: 0.5rem;
`
const Messaged = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
`
const MessageCard = styled.div`
    background-color: white;
    color: black;
    /* border : 1px solid blue; */
    box-shadow: 1px 1px 2px 1px black;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: ${props => props.isSend ? '0px' : '10px'};
    border-top-left-radius: ${ props => props.isSend ? '10px' : '0px'};
    padding: 0.4rem;
    margin-left: 0.5rem;
    overflow: hidden;
    max-width: 20rem; 
    max-height: 20rem; 
    word-break:break-all;
    font-size : 1rem ;
`

const Time = styled.div`
    color:#6B728E;
    font-size: 5px;
    margin-left: 0.4rem;
`
export default Message;
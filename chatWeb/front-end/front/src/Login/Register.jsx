import React, {useState} from 'react'
import styled from 'styled-components'
import { useNavigate } from "react-router-dom";
import axios from 'axios'

function Register(){
    const [user_name, setUserName] = useState('');
    const [user_id, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [repeatpassword, setrepeatPassword] = useState('');
    const navigate = useNavigate();

    const handleIdChange = (e) => {
        const userId = e.target.value;
        setUserId(userId);
      };

    const handleNameChange = (e) => {
        const userName = e.target.value;
        setUserName(userName);
      };

    const handlePasswordChange = (e) => {
        const userPassword = e.target.value;
        setPassword(userPassword);
      };

    const handleRepeatPasswordChange = (e) => {
        const repeatPassword = e.target.value;
        setrepeatPassword(repeatPassword);
      };
    
    const onSubmit = async (e) => {
        e.preventDefault();

        const data = {
            user_id,
            user_name,
            password,
            repeatpassword,
        };

        try{
            const response = await axios.post("http://localhost:8000/Register", data);
            if(response.data.isSuccess)
            {
                console.log(response.data.message);
                alert(response.data.message);
                navigate("/");
            }
            else
            {
                console.log(response.data.message);
                alert(response.data.message);
            }
        }
        
        catch(error)
        {
            if (error.response) {
                console.log(error)
                console.log('회원가입을 실패했습니다');
            }
        }
    }

    return(
        <Background>
            <LoginScreen onSubmit={onSubmit}>
                <Name>Register</Name>

                <Inputbox>
                    <Nameinput placeholder='Your ID' name="userID" onChange={handleIdChange}/>
                </Inputbox>
                
                <Inputbox>
                    <Idinput placeholder='name' name="name" onChange={handleNameChange}/> 
                </Inputbox>

                <Inputbox>
                    <Passwordinput placeholder='Password' name="password1" type="password" onChange={handlePasswordChange}/>
                </Inputbox>
                
                <Inputbox>
                    <RPasswordinput placeholder='Repeat Password' name="password2" type="password" onChange={handleRepeatPasswordChange} />
                </Inputbox>

                <LoginButton type="submit" />
            </LoginScreen>
        </Background>

    );
}
const Background = styled.div `
    width : 100vw;
    height : 100vw;
    background : black;
    display : flex;
    flex-direction : column;
    align-items : center;
    padding-top: 5rem;
`
const LoginScreen = styled.form` 
    width : 30vw;
    height : 50vw;
    display : flex;
    flex-direction : column;
`

const Name = styled.div`
    color : white;
    font-size: 4em;
`
const Inputbox = styled.div`
    position: relative; 
    width: 100%;
`

const Idinput = styled.input`
    width : 100%;
    padding: 15px;
    margin-top : 2rem;
    border : 1px solid #18181c;
    outline: none;
    border-radius: 5px;
    background: #18181c;
    color : #fff;
    font-size: 1em;
`

const Passwordinput = styled.input`
    width : 100%;
    padding : 15px;
    margin-top : 2rem;
    border : 1px solid #18181c;
    outline: none;
    border-radius: 5px;
    background: #18181c;
    color : #fff;
    font-size: 1em;
`

const Nameinput = styled.input`
    width : 100%;
    padding : 15px;
    margin-top : 2rem;
    border : 1px solid #18181c;
    outline: none;
    border-radius: 5px;
    background: #18181c;
    color : #fff;
    font-size: 1em;
`

const RPasswordinput = styled.input`
    width : 100%;
    padding : 15px;
    margin-top : 2rem;
    border : 1px solid #18181c;
    outline: none;
    border-radius: 5px;
    background: #18181c;
    color : #fff;
    font-size: 1em;
`

const LoginButton = styled.input`
    width: 10rem;
    height: 3rem;
    background-image: linear-gradient(to right,#00F260 ,#0575E6);
    box-shadow: 0 4px 15px 0 rgba(236, 116, 149, 0.75);
    font-size: 1rem;
    margin-top: 3rem;
    color : white;
    border-radius: 10px;
    cursor: pointer;
`


export default Register;
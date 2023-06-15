import React, {useState} from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { login } from '../reducers/userAction'
import axios from 'axios'
axios.defaults.withCredentials = true;
function Login(){
    const [userid, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleIdChange = (e) => {
        const userId = e.target.value;
        setUserId(userId);
      };
    
    const handlePasswordChange = (e) => {
        const userPassword = e.target.value;
        setPassword(userPassword);
      };

    const handlelogin = async (e) => {
        e.preventDefault();
        try {
            
            const response = await axios.post('http://localhost:8000', { userid, password});
            console.log(response.data.message);
            if(response.data.isSuccess){
                const username = response.data.userdata.user_name;
                const userid = response.data.userdata.user_id;
                const sessionid = response.data.userdata.sessionId;
                dispatch(login({ username,userid}));
                navigate('/Chatroom');
            }
                
        } catch (error) {
          console.error(error);
        }
      };

    return(
        <Background>
            <LoginScreen  onSubmit={handlelogin}>
                <Name>Login</Name>

                <Inputbox>
                    <Idinput placeholder='ID' name="user Id" onChange={handleIdChange}/>
                </Inputbox>

                <Inputbox>
                    <Passwordinput type="password" placeholder='Password' name="password" onChange={handlePasswordChange}/>
                </Inputbox>

                <ButtonTab>
                    <LoginButton type='submit'>Login</LoginButton>
                    <Link to="./Register"><SignUpButton>Sign up</SignUpButton></Link>
                </ButtonTab>
            </LoginScreen>
        </Background>

    );
}

const Background = styled.div `
    width : 100%;
    height : 80.5vh;
    background : black;
    display : flex;
    flex-direction : column;
    align-items : center;
    padding-top: 10rem;
    margin-top: 0.3rem;
`
const LoginScreen = styled.form` 
    width : 30vw;
    height : 30vw;
    display : flex;
    flex-direction : column;
    background-color: black;
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

const LoginButton = styled.button`
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

const SignUpButton = styled.button`
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

const ButtonTab = styled.div`
  display: flex;
  justify-content: space-between;  
  width: 25rem;
`;

export default Login;
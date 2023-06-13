import React from "react";
import styles from './Skill.module.css';
import { FaHammer } from 'react-icons/fa';

export default function skill(){
  
  return(
    <div className={styles.skill}>
        <h1><FaHammer/>{" "}기술</h1>
        <div className={styles.skills}>
          <FrontEnd/>
          <BackEnd/>
          <DeployMent/>
          <VersionControl/>
          <MobileApp/>
          <Certificate/>
        </div>
    </div>
  )
}


function FrontEnd(){
  return(
    <>
      <div className={styles.frontend}>
        <p>FrontEnd</p><hr></hr>
        <img src={process.env.PUBLIC_URL + '/image/htmal'}/>
      </div>
    </>
  );
}

function BackEnd(){
  return(
    <>
      <div className={styles.backend}>
        <p>backEnd</p><hr></hr>
        <img src={process.env.PUBLIC_URL + '/image/backend.png'}/>
      </div>
    </>
  );
}

function  MobileApp(){
  return(
    <>
      <div className={styles.MobileApp}>
        <p>Mobile App</p><hr></hr>
        <img src={ process.env.PUBLIC_URL + '/image/Androidstudio.png' } alt="버전관리"/>
      </div>
    </>
  );
}

function VersionControl(){
  return(
    <>
      <div className={styles.VersionControl}>
        <p>Version Control</p><hr></hr>
        <img src={ process.env.PUBLIC_URL + '/image/version3.png' } alt="버전관리"/>
      </div>
    </>
  );
}

function DeployMent(){
  return(
    <>
        <div className={styles.Deployment}>
        <p>Deployment</p><hr></hr>
      </div>
    </>
  );
}

function Certificate(){
  return(
    <>
      <div className={styles.Certificate}>
        <p>Certificate</p><hr></hr>
      </div>
    </>
  );
}


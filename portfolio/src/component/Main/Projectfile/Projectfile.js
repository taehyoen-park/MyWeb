import React, { useEffect, useState } from "react";
import styles from './Projectfile.module.css';
import { FaFileCode } from 'react-icons/fa';
import next from '../../../next.svg'
import prev from '../../../prev.svg'


export default function Projectfile(){
  const [Pj,SetPj] = useState([ Pj1(),Pj2()]);
  const [Pjindex,SetIndex] = useState(0);
  const Maxpj = 1;


  const Next = () =>{
    const CurrentIndex = Pjindex;
    if(CurrentIndex === Maxpj)
    {
      SetIndex(0);
    }
    else
    {
     SetIndex(CurrentIndex + 1);
    }
    
  }

  const Prev = () =>{
    const CurrentIndex = Pjindex;
    if(CurrentIndex === 0)
    {
      SetIndex(0);
    }
    else
    {
     SetIndex(CurrentIndex - 1);
    }
  }

  const check = () =>{
    const CurrentIndex = Pjindex;
    if(CurrentIndex === 0 || CurrentIndex === Maxpj)
    {

    }
  }
  return(
    <div className={styles.project}>
        <h1 ><FaFileCode/>{" " + "프로젝트"}</h1>
        <div className={styles.swiper}>
          <div className={styles.swiperButtonPrev} onClick={ Prev } onMouseOver={ check }><img src={prev}></img></div>
          { Pj[Pjindex] }
          <div className={styles.swiperButtonNext} onClick={ Next } onMouseOver={ check }><img src={next}></img></div>
        </div>
    </div>
  )
}

function Pj1(){
  return(
    <div className={styles.pj1}>

      <div className={styles.pjimg}>
        <img src={ process.env.PUBLIC_URL + '/image/pj1-1.jpg' } alt=""></img>
        <img src={ process.env.PUBLIC_URL + '/image/pj1-2.png' } alt=""></img>
        <img src={ process.env.PUBLIC_URL + '/image/pj1-3.png' } alt=""></img>
      </div>

      <div className={styles.pjintro}>
        
          <p><b>팀 프로젝트</b></p>
          <p><b>사용도구</b>: Androidstudio,firebase,unity,gituhb</p>
          <p><b>사용언어</b>: java,c#</p>
          <p><b>포인트 기능</b>: github,firebase</p>
          <a><b>프로젝트 설명</b>: K해커톤 대회에서 소프트웨어 이사장상(장려상)을 수상한 작품이다.또한 플레이
          스토어 등록까지 해보았다.이 프로젝트는 안드로이드 스튜디오와 유니티를 사용해서 유기견을 줄이기 위해 
          반려견을 키우기전 이 어플을 통해 사용자에게 반려견에 대한 오해를 풀어주는 어플이다. 
          또한 키우게 된다면 게시판과 정보함을 통해 올바르게 키울 수 있는 방법 제공하고 게시판에서 전문가와 소통을 통해 여러 정보를얻을 수 있다.
          본인(박태현)은 이 프로젝트에서 <b>파이어베이스</b>의 <b>리얼타임 데이터베이스</b>를 다루는 법을 공부하고 동시에 자바도 함께 공부할 수
          있었다.파이어 베이스를 사용해 회원등록,로그인 기능을 만들어서 사용하였다 또 처음으로 팀원들과 <b>깃허브를 
          통해 협업</b>을 해보면서 여러가지 경험을 하고 성장을 할 수 있었던 계기였다.</a>

      </div>
    </div>
  );
}

function Pj2(){
  return(
    <div className={styles.pj2}>
    <div className={styles.pjimg}>

    </div>
    <div className={styles.pjintro}>
      <p><b>개인 프로젝트</b></p>
      <p><b>사용도구</b>: </p>
      <p><b>사용언어</b>: </p>
      <p><b>포인트 기능</b>:</p>
      <a><b>프로젝트 설명</b>: </a>
    </div>
    </div>
  )
}

function Pj3(){
  return(
    <div className={styles.pj3}>
    <div className={styles.pjimg}></div>
    <div className={styles.pjintro}></div>
    </div>
  )
}

function Pj4(){
  return(
    <div className={styles.pj4}>
    <div className={styles.pjimg}></div>
    <div className={styles.pjintro}></div>
    </div>
  )
}















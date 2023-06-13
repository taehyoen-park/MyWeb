import React from "react"
import { FaHouseUser } from 'react-icons/fa';
import styles from './Archiving.module.css';

export default function archiving(){
  
  return(
    <div className={styles.archiving}>
        <h1><FaHouseUser/>{" "}방문하기</h1>
        <div className={styles.archivingList}>

            <div className={styles.archivingNote1}>
                <img src={process.env.PUBLIC_URL + '/image/github.png'}/>
                <a href="https://github.com/taehyoen-park" >소스코드 저장소</a>
                <ul>
                    <li><b>여러 언어</b>를 공부한 소스 코드</li><br></br>
                    <li><b>알고리즘</b> 및 <b>자료구조 </b>공부한 소스 코드</li><br></br>
                    <li><b>온라인 저지</b> 문제 소스 코드</li><br></br>
                    <li><b>여러 프로그램,웹앱 프로젝트</b> 소스 코드</li>
                </ul>
            </div>

            <div className={styles.archivingNote2}>
                <img src={process.env.PUBLIC_URL + '/image/tistory.png'}/><br></br>
                <a href="https://taehyeon-park.tistory.com/" >공부 및 지식 공유 블로그</a>
                <ul>
                    <li></li><br></br>
                    <li></li><br></br>
                    <li></li>
                </ul>
            </div>

            <div className={styles.archivingNote3}>
                <img src={process.env.PUBLIC_URL + '/image/baekjoon.png'}/><br></br>
                <a href="https://www.acmicpc.net/user/pjbae2007" >온라인 저지 사이트</a>
                <ul>
                    <li>학부 시절부터 풀어온 온라인 문제들</li><br></br>
                    <li><a href="https://solved.ac/profile/pjbae2007" >여러 문제를 통한 분석표</a></li>
                </ul>
            </div>
        </div>
    </div>

  )
}
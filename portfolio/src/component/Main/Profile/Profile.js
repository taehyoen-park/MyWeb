import React from "react"; 
import styles from './Profile.module.css';
import { FaPhoneAlt } from 'react-icons/fa';
import { FaPen } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { FaEnvelope } from 'react-icons/fa';
import { FaCalendar } from 'react-icons/fa';
import { FaAddressCard } from 'react-icons/fa';

export default function profile(){

  return(
    <div className={styles.profile}>
      <h1 ><span><FaAddressCard/>{" "}프로필</span></h1>
      <div className={styles.intro}>

        <div className={styles.intro1}>
          <ul>
            <li className={styles.profileKey}><span><FaUser/>이름:{" "+"박태현"}</span></li><br/>
            <li className={styles.profileKey}><span><FaPhoneAlt/>연락처:{" "+"010-6341-5289"}</span></li><br/>
            <li className={styles.profileKey}><span><FaCalendar/>생년월일:{" "+ "2001-01-03"}</span></li><br/>
            <li className={styles.profileKey}><span><FaEnvelope/>이메일:{" "+"pjbae2007@gmail.com"}</span></li><br/>
          </ul>
        </div> 

        <div className={styles.intro2}>  
          <div>
            <p>안녕하세요 끝까지 고민하고 최선을 다하는 개발자 박태현입니다.</p>
            <p>포기하지 않고 문제 해결능력을 키워가며 최선을 다하겠습니다.</p>
            <p>사람들에게 편리함과 즐거움을 주는 개발자가 되고싶습니다.</p>
          </div>
        </div>

      </div>
    </div>
  )
}
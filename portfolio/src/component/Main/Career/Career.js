import React from "react";
import styles from './Career.module.css';
import { FaBriefcase } from 'react-icons/fa';

export default function career(){
  
  return(
        <div className={styles.career}>
            <h1 ><FaBriefcase/>{" "}경력</h1>
            <div className={styles.careerNote1}>
              2022.11


            </div>
        </div>

  )
}
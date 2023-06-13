import React from "react";
import { useState } from "react";
import styles from './Header.module.css';

export default function Header(){
  const profile = document.getElementsByClassName(".profile").offsetTop;
  const [CoordY,setCoordY] = useState([profile, 950, 1900, 3082, 3732,0]);
  const [color,setColor] = useState([false,false,false,false,false,false]);

  console.log(profile);
  const ToSection = (index) =>{
    window.scrollTo({
      top: CoordY[index],
      behavior: "smooth",
    })
  }
  

  const setcolor = (index) =>{
    let num = [false,false,false,false,false,false];
    num[index] = true;
    setColor(num); 
  }
  const outcolor = () =>{
    let num = [false,false,false,false,false,false];
    setColor(num);
  }

  return(

      <div className={styles.blackNav}>
        <div onMouseOver={ () => setcolor(5) } onMouseOut={ outcolor }  
          onClick={ () => ToSection(5) }  className={(color[5] ? styles.logo:' ')}><a>Developer Portfolio</a></div>
  
        <nav>
          <ul className={styles.list }>
            <li onMouseOver={ () => setcolor(0) } onMouseOut={ outcolor } 
              onClick={ () => ToSection(0) } className={(color[0] ? styles.nav1 : ' ')}> 프로필</li>

            <li onMouseOver={ () => setcolor(1) } onMouseOut={ outcolor } 
              onClick={ () => ToSection(1) } className={(color[1] ? styles.nav2 : ' ')}> 기술</li>

            <li onMouseOver={ () => setcolor(2) } onMouseOut={ outcolor } 
              onClick={ () => ToSection(2) } className={(color[2] ? styles.nav3 : ' ')}> 프로젝트</li>

            <li onMouseOver={ () => setcolor(3) } onMouseOut={ outcolor }
              onClick={ () => ToSection(3) } className={(color[3] ? styles.nav4 : ' ')}> 방문하기</li>

            <li onMouseOver={ () => setcolor(4) } onMouseOut={ outcolor }
              onClick={ () => ToSection(4) } className={(color[4] ? styles.nav5 : ' ')}> 경력</li>
          </ul>
        </nav>
    </div>

  )
}

import React  from "react"
import styles from './Main.module.css';
import Archiving from './Archiving/Archiving'
import Career from './Career/Career'
import Skill from './Skill/Skill'
import Projectfile from './Projectfile/Projectfile'
import Profile from './Profile/Profile'


export default function Main(){

  return(
    <main className={styles.Main}>
      <div className={styles.backgroundClass}>
        <div className={styles.backgroundtext}>
          <a>개발자 포트폴리오</a><br/>
          <a>-박태현-</a>
        </div>  
      </div>
      <br/>

      <div className={styles.page}><Profile /></div><br/>
      <div className={styles.page}><Skill/></div><br></br>
      <div className={styles.page}><Projectfile /></div><br></br>
      <div className={styles.page}><Archiving /></div><br/>
      <div className={styles.page}><Career /></div>

    </main>
  )
}


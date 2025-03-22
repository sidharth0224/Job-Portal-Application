import React, { useContext } from 'react'
import {Context} from "../../main"
import {Link} from "react-router-dom"
function Footer() {
  const {isAuthorized}  = useContext(Context)
  return (
    <footer className= {isAuthorized ? "footerShow" : "footerHide"}>
<div>&copy; All Rights Reserved by TalentLoop</div>
    </footer>
    
  )
}

export default Footer
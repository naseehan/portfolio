import React from 'react'
import song from './rick.mp3'
const Socials = ({color, secColor}) => {

const handleClick = (e) => {
  // e.preventDefault()
  let sound = new Audio(song)
  sound.play().catch(error => {
    console.log("Error playing audio", error);
  })
}


  return (
    <div className="socials">
    <a href="https://www.facebook.com/naseehnjk.messi.10/">
      {/* <i className="fa-brands fa-facebook-f"></i> */}
      <lord-icon
        src="https://cdn.lordicon.com/mpigogwa.json"
        trigger="loop"
        delay="1500"
        stroke="bold"
        state="hover-rotate"
         colors={`primary:${color},secondary:${color},tertiary:${color}`}
        style={{ width: "30px", height: "30px" }}
      ></lord-icon>
    </a>
    <a href="https://www.instagram.com/naseeh10/">
      {/* <i className="fa-brands fa-instagram"></i> */}
      <lord-icon
        src="https://cdn.lordicon.com/frnztegr.json"
        trigger="loop"
        delay="1500"
        stroke="bold"
        state="hover-rotate"
        colors={`primary:${color},secondary:${color},tertiary:${color},quaternary:${color},quinary:${color},senary:${color}`}
        style={{ width: "30px", height: "30px" }}
      ></lord-icon>
    </a>
    <a href="https://github.com/naseehan">
      {/* <i className="fa-brands fa-github"></i> */}
      <lord-icon
        src="https://cdn.lordicon.com/yedgackm.json"
        trigger="loop"
        delay="1500"
        stroke="bold"
        state="hover-rotate"
        colors={`primary:${color},secondary:${color},tertiary:${secColor}`}
        style={{ width: "30px", height: "30px" }}
      ></lord-icon>
    </a>
    <a href="https://www.linkedin.com/in/naseeh-an-a4951b240/">
      {/* <i className="fa-brands fa-linkedin-in"></i> */}
      <lord-icon
        src="https://cdn.lordicon.com/mgampcwp.json"
        trigger="loop"
        delay="1500"
        stroke="bold"
        state="hover-rotate"
        colors={`primary:${color},secondary:${color},tertiary:${color}`}
        style={{ width: "30px", height: "30px" }}
      ></lord-icon>
    </a>
    <a onClick={(e) =>handleClick()}>
      {/* <i className="fa-brands fa-linkedin-in"></i> */}
      <lord-icon
    src="https://cdn.lordicon.com/poseeyvv.json"
    trigger="loop"
    delay="0"
    stroke="bold"
    state="loop-roll"
    colors={`primary:${secColor},secondary:${color},tertiary:${secColor}`}
    style={{ width: "30px", height: "30px" }}
></lord-icon>
    </a>
  </div>
  )
}

export default Socials

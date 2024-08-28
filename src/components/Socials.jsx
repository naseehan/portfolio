import React from 'react'

const Socials = ({color, secColor}) => {

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
  </div>
  )
}

export default Socials

import React from 'react'

function Contact() {
  return (
    <section className="contact-section">
        <div className="contact-container">
            <div className="get-in-touch">
                <h3>Get in Touch</h3>

                <div className="map">

                </div>
<div className="contact-form">
    
        <input type="text" placeholder='Name' />
        <input type="email" name="" id=""  placeholder='Email'/>
        <textarea name="" id="" cols="30" rows="10">Message</textarea>
        <button>Send message</button>
</div>
            </div>
        </div>
    </section>
  )
}

export default Contact
import React from 'react'

function Services() {


  return (
    <section className="service-section">
        <div className="service-container">
            <h2>What I Do</h2>
            <div className="my-services">
                <div className='each-service'>
                    <div className='number'>
                        01
                    </div>
                    <h3>Web Design</h3>
                    <p>
                        As a web designer, my goal is to create visually appealing, 
                        user-friendly websites that help my clients achieve their online objectives. I specialize 
                        in designing websites that are 
                        not only aesthetically pleasing but also functional and easy to navigate.
                    </p>
                </div>

                <div className='each-service'>
                    <div className='number'>
                        02
                    </div>
                    <h3>Web Development</h3>
                    <p>
                    When it comes to development, I use the latest web technologies and coding languages to 
                    ensure that all of my websites are fast, efficient, and responsive. I also pay close attention 
                    to details like user experience,
                     security, and accessibility to ensure that all users can access and use the website with ease.
                    </p>
                </div>



                <div className='each-service'>
                    <div className='number'>
                        03
                    </div>
                    <h3>Content Writing</h3>
                    <p>My content writing process involves understanding your brand, your target audience, and your marketing goals. 
                        I conduct thorough research to ensure that the content I create is accurate, relevant, and informative. I also 
                        pay close attention to your brand voice and tone to ensure that 
                        the content I create aligns with your brand values and messaging.</p>
                </div>

                </div> 

<div className="facts">
    <h3>Fun Facts</h3>
    <div className="fun-facts">
        <div className='each-fact'>
            <span>20+</span>
            <p>projects finished</p>
        </div>
        <div className='each-fact's> 
            <span>3k+</span>
            <p>Lines of code</p>
        </div>
    </div>
</div>

        </div>
    </section>
  )
}

export default Services
import { TypeAnimation } from "react-type-animation"

function Home() {

 

  return (
    <section className="home-section">
        <div className="home-container">
            <div className="avatar">
            <div className="home-img">
            </div>
            </div>
            <div className="home-description">
                <h1>Naseeh AN</h1>
                <TypeAnimation  sequence={[
                    'Developer',
                    2000,
                    'Designer',
                    2000
                ]}
                speed={50}
                repeat={Infinity}
                />
                <p>Full Stack web developer based in India. From the world of English literature 
                    to lines of code on a web page, I love combining the worlds of logic and creative design 
                    to make eye-catching, accessible, and user friendly websites and applications.</p>
                <div className="socials">
                    
                    <a href="https://www.facebook.com/naseehnjk.messi.10/">
                <i class="fa-brands fa-facebook-f"></i>
                </a>
                <a href="https://www.instagram.com/naseeh10/">
                <i class="fa-brands fa-instagram"></i>
                </a>
                <a href="https://github.com/naseehan">
                <i class="fa-brands fa-github"></i>
                </a>
                <a href="https://www.linkedin.com/in/naseeh-an-a4951b240/">
                <i class="fa-brands fa-linkedin-in"></i>
                </a>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Home

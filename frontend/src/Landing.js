import React, { Component } from 'react';

class Landing extends Component {

    render() {
        return (
            <div>
        <nav className="navbar navbar-expand-lg fixed-top" id="mainNav">
        <div className="container">
          <a className="navbar-brand js-scroll-trigger" href="#page-top">Open Parking</a>
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link js-scroll-trigger" href="#about">Project</a>
              </li>
              <li className="nav-item">
                <a className="nav-link js-scroll-trigger" href="#team">Team</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  
      <header className="masthead text-center text-white d-flex">
        <div className="container my-auto">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <h1 className="text-uppercase">
                <strong>Open Parking</strong>
              </h1>
              <hr/>
            </div>
            <div className="col-lg-8 mx-auto">
            <div className="overlay-field">
              <p id="black-text" className="text-faded mb-5 ">Visualizing the availibility of Dutch parking data</p>
              </div>
              <a className="btn btn-primary btn-xl js-scroll-trigger" href="#about">Explore the data</a>
            </div>
          </div>
        </div>
      </header>
  
      <section className="bg-primary" id="about">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="section-heading text-white">What is this project?</h2>
              <hr className="light my-4" />
              <p className="text-faded mb-4">Open Parking is a web-visualisation of parking data in the Netherlands. Cities, private companies and other interested parties can easily find out which city provides the best data and which cities/facilities are lacking in that department. With this web-visualisation, we can also show the many uses of open data.
                  The user will be able to easily check real-time data about parking facilities all over the Netherlands and search for the data of specific parking facilities.
              </p>
              <a className="btn btn-light btn-xl js-scroll-trigger" href="#services">Get Started!</a>
            </div>
          </div>
        </div>
      </section>
  
  
      <section className="bg-dark text-white" id="team">
        <div className="container text-center">
          <h2 className="mb-4">Meet the team</h2>
              <p className="text-faded mb-4">
                  Open Parking is a project made by a team of 4 students during Open Summer of Code 2018.
                  <div className="container">
                  
                  <div className="grid-x grid-padding-x align-center">
                  
  
                  <article className="small-6 medium-4 large-3 cell headshot-detail">
                      <img src="img/headshots/alexander_vandoren.jpg" alt="Picture of Alexander Vandoren" />
                      <h2 className="h4">Alexander <br/> Vandoren</h2>
                      <div className="student-social">
                      <a href="https://www.linkedin.com/in/alexander-v-370883129/" target="_blank"><i className="fas fa-linkedin"></i></a>
                      <a href="https://github.com/Zenigame2" target="_blank"><i className="fas fa-github"></i></a>
                      </div>
                  </article>
                  
                                  
                  <article className="small-6 medium-4 large-3 cell headshot-detail">
                      <img src="img/headshots/ward_haeck.jpg" alt="Picture of Ward Haeck" />
                      <h2 className="h4">Ward<br/>Haeck</h2>
                      <div className="student-social">
                      <a href="https://www.linkedin.com/in/ward-haeck-498166150/" target="_blank"><i className="fas fa-linkedin"></i></a>
                      </div>
                  </article>
                  
                  <article className="small-6 medium-4 large-3 cell headshot-detail">
                      <img src="img/headshots/ivan_sladkov.jpg" alt="Picture of Ivan Sladkov" />
                      <h2 className="h4">Ivan<br/>Sladkov</h2>
                      <div className="student-social">
                      <a href="https://github.com/IvanSladkov" target="_blank"><i className="fas fa-github"></i></a>
                      </div>
                  </article>
                  
                  
                  <article className="small-6 medium-4 large-3 cell headshot-detail">
                      <img src="img/headshots/theo_verhelst.jpg" alt="Picture of Theo Verhelst" />
                      <h2 className="h4">Theo<br/>Verhelst</h2>
                      <div className="student-social">
                      <a href="https://github.com/TheoVerhelst" target="_blank"><i className="fas fa-github"></i></a>
                      </div>
                  </article>
                  
                  <article className="small-6 medium-4 large-3 cell headshot-detail">
                      <img src="img/headshots/pieter_vander_vennet.jpg" alt="Picture of Pieter Vander Vennet" />
                      <h2 className="h4">Pieter<br/>Vander Vennet</h2>
            
                  </article>
                  
                  </div>
                  </div>
              </p>
        </div>
      </section>
  
  
  

      <script src="vendor/jquery/jquery.min.js"></script>
      <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  
   
      <script src="vendor/jquery-easing/jquery.easing.min.js"></script>
      <script src="vendor/scrollreveal/scrollreveal.min.js"></script>
      <script src="vendor/magnific-popup/jquery.magnific-popup.min.js"></script>
  
   
      <script src="js/creative.min.js"></script>
  
    
      <footer>
  
          <div className="container text-center">
          <p>www.openparking.nl</p> 
          </div>
      
      </footer>
      </div>)
    }

}
export default Landing;
import React, { Component } from 'react';
import './App.css';
import Landing from './Landing'
import SideBar from './SideBar/SideBar';
import MainContent from './Content/MainContent'
import MainNav from './MainNav/MainNav';
import  {Container} from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  constructor(props){
    super(props);
    //this.handleNavigation = this.handleNavigation.bind(this)
    this.state = { mainContent: "init",
                    visFacilities: ["parkAndRide", "terrain", "garage", "carpool", "onstreet", "otherPlaces"],
                    information: {},
                    extras: ["noDynamic", "private", "public"]
  }

  }

  onChangeVisFacilities(values){
    this.setState({
      visFacilities: values
    })

  }
  onChangeInformation(values){
      this.setState({
          information: values
      })
  }
  onChangeExtras(values){
      this.setState({
          extras: values
      })
  }

  goMap(){
    this.setState({ "mainContent": "map"

    })
  }

  render() {
    let thiss = this;
    let content = 
   ( <div>
            <SideBar onChangeVisFacilities={this.onChangeVisFacilities.bind(this)} onChangeInformation={this.onChangeInformation.bind(this)} onChangeExtras={this.onChangeExtras.bind(this)} />
            <MainContent tab={this.state.mainContent} filters={{"visFacilities": this.state.visFacilities, "information": this.state.information, "extras": this.state.extras
                                                                  }} />
            </div>)

    if(this.state.mainContent === "init"){
      content = <Landing onProceed={this.goMap.bind(this)  }/>
    }
    return (
      <div className="App">

      {content}

      </div>
    );
  }
}

export default App;
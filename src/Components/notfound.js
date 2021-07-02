import React from "react";
import firebase from "./firebaseConfig.js";
import "../App.css";


export default class NotFound extends React.Component{

    constructor(){
        super();

        this.state = {
            username: ""
        }
    }

    componentDidMount(){
        var username = window.location.href.split("?")[1];
        this.setState({username})
    }


    render(){
        return(
            <div className="app">
            <nav className="header">
                <h1 className="logotext">devtemple</h1>
            </nav>

            <br/>

            <div className="sell">
                <center>
                    <h2>Can't Find User<br/>"{this.state.username}"</h2><br/><br/>
                    <p className="sellcopy">
                        Aaand that's not necessarily a bad thing... I mean you can have the username if you want.
                        <br/><br/>
                        In a way you are kind of lucky, depending on how you look at things. Or we messed up.
                    </p>
                </center>
            </div>
                <br/>
          
            <br/>
            <center>
            <button className="promobutton" onClick={()=>{window.location.href = "/?"+this.state.username}}>
                        Create Your Profile
                    </button>
            </center>
            </div>
        );
    }
}

import React from "react";
import firebase from "./firebaseConfig";
import Loader from "./loader.gif";


export default class View extends React.Component{
    constructor(){
        super();
        this.state = {
            user: {},
            username: ""
        }
    }

    componentDidMount(){
        var username = window.location.href.split("?")[1];
        var logstatus = localStorage.getItem("loggedIn");
        if(logstatus){
            document.getElementsByClassName("promobutton")[0].style.display = "none";
        }
        this.setState({username: username})
        firebase.database().ref("dt_users/"+username).once("value", data => {
            var result = data.val();
            if(!result){
                this.noUserFound(username);
            }else{
                this.showUserDetails(result);
                document.getElementsByClassName("loader")[0].style.display = "none";
            }
        });
    }

    showUserDetails(user_data){
        this.setState({user: user_data});
    }

    noUserFound(username){
        window.location.href = "/nouser?"+username;
    }

    render(){
        var stack = this.state.user.stack;
        if(stack !== undefined){
            var userStack = this.state.user.stack.map((lang)=>{
                var smatrix = lang.matrix;
                var width = smatrix.split(" - ")[1].replace("%","");
                console.log(width)
    
                return(
                    <div className="listitemstack" key={lang.lang}><br/>
                        <h3>{lang.lang}</h3>
                        <div className="matrixparent">
                            <div className="matrixchild" style={{width: parseInt(width)+"%"}}>
                                <span className="matrixtext">{lang.matrix}</span>
                            </div>
                        </div>
                    </div>
                );
            });
        }

        var links = this.state.user.links;
        if(links !== undefined){
            var userLinks = this.state.user.links.map((link)=>{
                return(
                    <div className="listitemlink" key={link.link} onClick={()=>{window.open(link.link)}}><br/>
                        <img className="cursor" src="https://images.vexels.com/media/users/3/158105/isolated/preview/22becce14efa74bc6c83bec78f9d9b1e-pixel-hand-cursor-icon.png"/>
                        <h3>{link.title}<br/><small>{link.link}</small></h3>
                    </div>
                );
            });
        }

        var projects = this.state.user.projects;
        if(projects !== undefined){
            var userProjects = this.state.user.projects.map((project)=>{
                return(
                    <div className="listitemlink" key={project.link} onClick={()=>{window.open(project.link)}}><br/>
                        <img className="cursor" style={{transform: "rotate(90deg)", marginLeft: "20px"}} src="https://images.vexels.com/media/users/3/158105/isolated/preview/22becce14efa74bc6c83bec78f9d9b1e-pixel-hand-cursor-icon.png"/>
                        <h3>{project.title}<br/><small>{project.link}</small></h3>
                    </div>
                );
            });
        }

        return(
            <div className="app">
                <center>
               <div className="heroprofile"><br/>
                    <div className="piccontainer">
                        <img src="https://www.dellamas.store/wp-content/uploads/2019/01/llama-con-montura-sin-fondo.png"/>
                    </div><br/>
                    <h4><span className="qmarkdeco">?</span><span className="uname">{this.state.username}</span></h4>
                </div>
                    <br/>
                    </center>
                <div className="profileinfo" style={{minHeight: window.screen.height-20+"px"}}>
                    <br/>
                    <center>
                        <h4>{this.state.user.fname} {this.state.user.sname}<br/>
                        <small style={{color: "#555", fontSize: ".8em"}} onClick={()=>{window.open("mailto:"+this.state.user.email)}}>{this.state.user.email}</small>
                        </h4>
                    </center>
                    <br/>
                    <h5>Stack</h5>
                    <div className="pullup">
                    {userStack}
                    </div>

                    <br/>
                    <h5>Dev Profiles</h5>
                    <div className="pullup">
                    {userLinks}
                    </div>

                    <br/>
                    <h5>Dev Projects</h5>
                    <div className="pullup">
                    {userProjects}
                    </div><br/><br/>
                    <center>
                    <small>Last Updated: {this.state.user.updateDate}</small>

                    <button className="promobutton" onClick={()=>{window.location.href = "/"}}>
                        Create Your Profile
                    </button>
                    </center>
                </div>
                <div className="loader">
                    <center>
                        <img className="loadgif" src={Loader}/><br/>
                        <span className="loadtext">Just a sec...</span>
                    </center>
                </div>
            </div>
        );
    }

}

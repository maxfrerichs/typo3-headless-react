import './App.css';
import React, {Component} from 'react';
import Router from './api/router';
import config from './config.json';

class App extends Component {

    constructor() {
        super();
        this.state = {
            routes: [],
            apiStatus: '',
        }
    }
    componentDidMount = async () => {
        let url =  config.apiRoot + config.apiParams;
        let response = await fetch(url, {
            method: "get"
        });
        let pageData = await response.json();
        let navData = pageData["navigation"][0]["children"]; 
        this.setState(() => {
            return {
                routes: navData
            }
        }); 
    }

    loadPage = async (event) => {
        event.preventDefault();
        let url = event.target.href.substring(
            window.location.origin.length, 
            event.target.href.length 
        );
        let pageResponse = await fetch((config.apiRoot + url), {
            method: "get"
        });
        let pageData = await pageResponse.json();
        window.history.pushState('page2', 'Title', event.target.href);
        console.log(pageData);
    }

    render() {

        let navList = this.state.routes;
        let router = new Router('defaultRouter', this.state.routes);
        let currentLocation = window.location.pathname;

        if(currentLocation === "/") {

        }

        return (
                <nav>
                {
                    navList.map((navElement, key) => {
                        return <li className="nav-element" key={key}><a href={navElement.link} onClick={this.loadPage}>{navElement.title}</a></li>
                    })
                }
                </nav>
        )
    }
}



export default App;

import './App.css';
import React, {Component} from 'react';

class App extends Component {

    constructor() {
        super();
        this.state = {
            routes: []
        }
    }
    componentDidMount = async () => {
        let url = 'http://localhost/typo3-headless/?type=834';
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
        console.log(this.state.routes);
    }


    render() {
        let navList = this.state.routes;

        return (
                <nav>
                {
                    navList.map((navElement, key) => {
                        return <li className="nav-element" key={key}><a href={navElement.link}>{navElement.title}</a></li>
                    })
                }
                </nav>
        )
    }
}



export default App;

import React from 'react';
import './App.css';

import './bootstrap/css/bootstrap.min.css'
import './bootstrap/css/sticky-footer-navbar.css'

import Footer from './components/Footer.js'
import Navbar from './components/Menu.js'
import UserList from './components/User.js'
import axios from 'axios'


class App extends React.Component {

   constructor(props) {
       super(props)
       this.state = {
           navbarItems: [
                {name: 'Users', href: '/'},
            ],
           'users': []
       }
   }

   componentDidMount() {
       // const users = [
       //     {
       //         'first_name': 'Фёдор',
       //         'last_name': 'Достоевский',
       //         'username':'sdads'
       //     },
       //     {
       //         'first_name': 'Александр',
       //         'last_name': 'Грин',
       //         'username':'ssdasdas'
       //     },
       // ]


       axios.get('http://127.0.0.1:8000/api/user/')
       .then(response => {
           const users = response.data
               this.setState(
               {
                   'users': users
               }
           )
       }).catch(error => console.log(error))

   }

    render() {
        return (
            <div>
                <header>
                    <Navbar navbarItems={this.state.navbarItems}/>
                </header>
                <main role="main" class="flex-shrink-0">
                    <div className="container">
                        <UserList users={this.state.users}/>
                    </div>
                </main>
                <Footer/>
            </div>


        )
    }
}


export default App;


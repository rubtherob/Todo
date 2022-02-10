import React from 'react';
import './App.css';
import UserList from './components/user.js'
import axios from 'axios'


class App extends React.Component {

   constructor(props) {
       super(props)
       this.state = {
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

   render () {
       return (
           <div>
               <UserList users={this.state.users} />
           </div>
       )
   }
}


export default App;


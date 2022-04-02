import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import './bootstrap/css/bootstrap.min.css'
import './bootstrap/css/sticky-footer-navbar.css'
import Footer from './components/Footer.js'
import Navbar from './components/Menu.js'
import UserList from './components/User.js'
import {ProjectList, ProjectDetail} from './components/Project.js'
import TodoList from './components/Todos.js'
import axios from 'axios'
import LoginForm from './components/Auth.js'
import Cookies from 'universal-cookie';
import TodoForm from "./components/TodoForm";



const DOMAIN = 'http://127.0.0.1:8000/api/'
const get_url = (url) => `${DOMAIN}${url}`


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            navbarItems: [
                {name: 'Users', href: '/'},
                {name: 'Projects', href: '/projects'},
                {name: 'TODOs', href: '/todos'},
            ],
            users: [],
            projects: [],
            project: {},
            todos: [],
            token: '',
        }
    }

    createTodo(text, user, project){

        const headers = this.get_headers()
        const data = {text:text, creator:user[0], project:project[0]}
        axios.post('http://127.0.0.1:8000/api/todos/',data,{headers}).then(

            response => {

                this.load_data()
            }
        ).catch(error => {
            console.log(error)
            this.setState({books:[]})
        })
    }

    deleteTodos(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/todos/${id}`, {headers})
            .then(response => {
                this.load_data()
            }).catch(error => console.log(error))
    }

    deleteProjects(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers})
            .then(response => {
                this.load_data()
            }).catch(error => console.log(error))
    }


    load_data(){
        const headers = this.get_headers()
        console.log(headers)
        axios.get(get_url('users/', {headers}))
            .then(response => {
                this.setState({users: response.data})
            }).catch(error => console.log(error))


        axios.get(get_url('projects/', {headers}))
            .then(response => {
                this.setState({projects: response.data})
            }).catch(error => console.log(error))

        axios.get(get_url('todos/', {headers}))
            .then(response => {
                this.setState({todos: response.data})
            }).catch(error => console.log(error))
    }



    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token},()=>this.load_data())
    }

    is_authenticated() {
        return this.state.token != ''
    }

    logout() {
        this.set_token('')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, ()=>this.load_data())
    }

    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {
            username: username,
            password: password
        }).then(response => {
            console.log(response.data)
            this.set_token(response.data['token'])
        }).catch(error => console.log(error))
    }

    get_headers() {
        let headers = {

            'Content-Type':'application/json'
        }
        if(this.is_authenticated()){
            console.log(`Token ${this.state.token}`)
            headers['Authorization'] = `Token ${this.state.token}`
        }
        return headers
    }


    getProject(id) {

        axios.get(get_url(`projects/${id}/`))
            .then(response => {
                this.setState({project: response.data})
            }).catch(error => console.log(error))
    }


    componentDidMount() {
        this.get_token_from_storage()
        // this.load_data()
    }


    render() {
        return (
            <Router>
                <header>
                    <Navbar navbarItems={this.state.navbarItems}/>
                    <li>{this.is_authenticated()?<button onClick={()=> this.logout()}>Logout</button>:
                                <Link to='/login'> Login </Link>}
                    </li>
                </header>
                <main role="main" className="flex-shrink-0">
                    <div className="container">
                        <Switch>
                            <Route exact path='/'>
                                <UserList users={this.state.users}/>
                            </Route>
                            <Route exact path='/projects'>
                                <ProjectList projects={this.state.projects} deleteProjects={(id)=> this.deleteProjects(id)}/>
                            </Route>
                            <Route exact path='/todos'>
                                <TodoList items={this.state.todos} deleteTodos={(id)=> this.deleteTodos(id)}/>
                            </Route>
                            <Route exact path='/todos/create' component={() => <TodoForm projects={this.state.projects} users={this.state.users}
                                                                              createTodo={(text, user, project)=> this.createTodo(text, user, project)}/>}/>
                            <Route exact path="/project/:id">
                                <ProjectDetail getProject={(id) => this.getProject(id)}
                                                                                item={this.state.project}/>
                            </Route>
                            <Route exact path='/login' component={() => <LoginForm get_token={(username, password) => this.get_token(username, password)}/>} />
                        </Switch>
                    </div>
                </main>
                <Footer/>
            </Router>


        )
    }
}


export default App;

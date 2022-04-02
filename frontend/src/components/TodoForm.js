import React from 'react'


class TodoForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {text: 's', user: [], project:[]}
    }

    handleChange(event)
    {
        this.setState(
            {
                [event.target.text]: event.target.value,

            }
        )
    }

    handleProjectChange(event){
        if(!event.target.selectedOptions){
            this.setState({
                'projects':[]
            })
            return;
        }

        let  projects = []
        for (let i = 0; i < event.target.selectedOptions.length;i++){
            projects.push(event.target.selectedOptions.item(i).value)

        }
        this.setState({
            'project': projects
        })
    }

    handleUserChange(event){
        if(!event.target.selectedOptions){
            this.setState({
                'users':[]
            })
            return;
        }

        let  users = []
        for (let i = 0; i < event.target.selectedOptions.length;i++){
            users.push(event.target.selectedOptions.item(i).value)
        }
        this.setState({
            'user': users
        })
    }

    handleSubmit(event) {
        this.props.createTodo(this.state.text, this.state.user, this.state.project)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="text">text</label>
                    <input type="text" className="form-control" name="text"
                           value={this.state.text} onChange={(event)=>this.handleChange(event)} />
                </div>
                <select name="user" multiple onChange={(event) => this.handleUserChange(event)}>
                    {this.props.users.map((item) => <option value={item.id}> {item.username} </option>)}
                </select>
                <select name="project" multiple onChange={(event) => this.handleProjectChange(event)}>
                    {this.props.projects.map((item) => <option value={item.id}> {item.name} </option>)}
                </select>
                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        );
    }
}
export default TodoForm

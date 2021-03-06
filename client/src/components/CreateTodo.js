import { connect } from 'react-redux';
import React, {Component} from 'react';

import * as actions from '../actions';


class CreateTodo extends Component{

    constructor(props){
        super(props);
        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
        this.onChangeTodoPriority    = this.onChangeTodoPriority.bind(this);
        this.onSubmit                = this.onSubmit.bind(this);

        this.state = {
            todo_description : '',
            todo_responsible : '',
            todo_priority    : '',
            todo_completed   : false,
        }
    }

    onChangeTodoDescription(e){
        this.setState({
            todo_description : e.target.value
        });
    }
    onChangeTodoResponsible(e){
        this.setState({
            todo_responsible : e.target.value
        });
    }
    onChangeTodoPriority(e){
        this.setState({
            todo_priority : e.target.value
        });
    }
    async onSubmit(e){
        e.preventDefault();
        // console.log(`Form Submited`);
        // console.log(`Todo Description   : ${this.state.todo_description}`);
        // console.log(`Todo Responsible   : ${this.state.todo_responsible}`);
        // console.log(`Todo Priority      : ${this.state.todo_priority}`);
        // console.log(`Todo Complete      : ${this.state.todo_completed}`);

        const newTodo = {
            description : this.state.todo_description,
            responsible : this.state.todo_responsible,
            priority    : this.state.todo_priority,
            completed   : this.state.todo_completed,
        }

        const save = await this.props.createTodo(newTodo);        
        // console.log("save",save);
        
        this.setState({
            todo_description : '',
            todo_responsible : '',
            todo_priority    : '',
            todo_completed   : false,
        });

        if(save.success){
                this.props.history.push('/dashboard');            
        }
    }
    render(){
        return(
            <div style={{marginTop: 20}}>
        {console.log(this.props)}
                
                <h3>Create New Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                               className="form-control"
                               value    = {this.state.todo_description}
                               onChange = {this.onChangeTodoDescription} />
                        <label>Responsible: </label>
                        <input type="text"
                               className="form-control"
                               value    = {this.state.todo_responsible}
                               onChange = {this.onChangeTodoResponsible} />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className   ="form-check-input"
                                    type        ="radio"
                                    name        ="priorityOptions"
                                    value       ="Low"
                                    checked     ={this.state.todo_priority=="Low"}
                                    onChange    ={this.onChangeTodoPriority}/>
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className   ="form-check-input"
                                    type        ="radio"
                                    name        ="priorityOptions"
                                    value       ="Medium"
                                    checked     ={this.state.todo_priority=="Medium"}
                                    onChange    ={this.onChangeTodoPriority}/>
                            <label className="form-check-label"> Medium </label>
                            </div>
                        <div className="form-check form-check-inline">
                            <input  className   ="form-check-input"
                                    type        ="radio"
                                    name        ="priorityOptions"
                                    value       ="High"
                                    checked     ={this.state.todo_priority=="High"}
                                    onChange    ={this.onChangeTodoPriority}/>
                            <label className="form-check-label"> High </label>
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Todo" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}

export default connect(null, actions)(CreateTodo)
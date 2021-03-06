import React, { Component } from "react";
import {AddForm} from "../AddForm/AddForm";
import FindForm from "../FindForm/FindForm";
import shortid from "shortid";
import './Phonebook.css';
import { CSSTransition } from "react-transition-group";


export default class Phonebook extends Component {
  state = {
    addFormName: "",
    findSearch: "",
    number: "",
    list: [],
    error : false,
    title : false,
    filteredList : []
  };
  componentDidMount() {
    this.setState({
      title:true
    })
    if (JSON.parse(localStorage.getItem("list")))
      this.setState({
        list: JSON.parse(localStorage.getItem("list")),
      });
  }
 
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  reset = () => {
    this.setState({
      addFormName: "",
      number: "",
    findSearch: "",
    });
  };
  delete = async (e) => {
    const elId = e.target.parentElement.id;
    const updatedList = this.state.list.filter((el) => el.id !== elId);
    await this.setState({
      list: updatedList,
    });
    await this.setState({
      filteredList : this.updateFilterList(this.state.findSearch)
    })
    await localStorage.setItem("list", JSON.stringify(this.state.list));
  };
  addSubmit = async (e) => {
    e.preventDefault();
  const alreadyAdd =  this.state.list.find(el => el.number === this.state.number || el.name === this.state.addFormName.trim());
  if(!alreadyAdd){
    await this.setState((state) => ({
        list: [
          {
            id: shortid.generate(),
            name: this.state.addFormName,
            number: this.state.number,
          },
          ...state.list,
        ],
      }));
      await this.setState({
        filteredList : this.updateFilterList(this.state.findSearch)
      })
      await localStorage.setItem("list", JSON.stringify(this.state.list));
  }
  else{
   await this.setState({
      error : true
    })
   await setTimeout(() =>{
      this.setState({
        error : false
      })
    },3000)
  }
  this.reset();
  };

  updateFilterList=(query) =>{
   return this.state.list.filter((el) =>
      el.name.toLowerCase().includes(query.trim().toLowerCase())
    )
  }

  filterChange = async (e) =>{
    await this.setState({
      [e.target.name]: e.target.value,
      filteredList :  this.updateFilterList(e.target.value)
    });
  }

  render() {
    const { addFormName, findSearch, number, filteredList,error,list ,title} = this.state;
    return (
      <section className="section">
        <CSSTransition
          in={title}
          classNames="title"
          timeout={{
            enter: 500,
            exit: 250,
          }}
          mountOnEnter
          unmountOnExit
        >
         <h2 className="title ">Phonebook</h2>
        </CSSTransition>

         <CSSTransition
          in={error}
          classNames="alert"
          timeout={{
            enter: 250,
            exit: 250,
          }}
          mountOnEnter
          unmountOnExit
        >
                <div className="alerts">Сontact is already taken!</div>        
        </CSSTransition>

         
          <AddForm
          nameValue={addFormName}
          numberValue={number}
          onChange={this.handleChange}
          onSubmit={this.addSubmit}
        />
        <FindForm
          value={findSearch}
          onChange={this.filterChange}
          list={list}
          filteredList={filteredList}
          onDelete={this.delete}
          reset={this.reset}
        />
      </section>
    );
  }
}

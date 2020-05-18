import ContactItem from "../ContactItem/ContactItem";
import "./FindForm.css";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import React, { Component } from "react";
import PropTypes from "prop-types"; // ES6

export default class FindForm extends Component {
  state = {
    alert: false,
  };
  componentDidUpdate() {
    if (this.props.list.length > 1 && this.state.alert === false) {
      this.setState({
        alert: true,
      });
    }
    if (this.props.list.length < 2 && this.state.alert === true) {
      this.setState({
        alert: false,
      });
    }
  }

  render() {
    const { value, onChange, list,filteredList, onDelete } = this.props;
   
    return (
      <div>
        <TransitionGroup>
          {this.state.alert && (
            <CSSTransition
              in={this.state.alert}
              timeout={200}
              classNames="item"
            >
              <input
                className="inputSearch"
                type="text"
                placeholder="Enter name"
                value={value}
                onChange={onChange}
                name="findSearch"
              />
            </CSSTransition>
          )}
        </TransitionGroup>

        <TransitionGroup component="ul" className="list">
           {filteredList.length === 0 && value==='' ? list.map((el) => {
                return (
                  <CSSTransition key={el.id} timeout={200} classNames="item">
                    <ContactItem el={el} onDelete={onDelete} />
                  </CSSTransition>
                );
              })
            :
            filteredList.map((el) => {
              return (
                <CSSTransition key={el.id} timeout={200} classNames="item">
                  <ContactItem el={el} onDelete={onDelete} />
                </CSSTransition>
              );
            })} 

        </TransitionGroup>
      </div>
    );
  }
}

FindForm.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
};

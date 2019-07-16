import React, {Component} from 'react';

class Input extends Component {

  constructor(props){
    super(props);

    // 绑定this
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleAddBtnClick = this.handleAddBtnClick.bind(this);

  }

  // Input输入框内发生变化的事件
  handleInputChange(event){
    this.props.inputChange(event);
  }

  // 在input输入框按回车的事件
  handleKeyDown(event){
    this.props.keyDown(event);
  }
  // 点击添加按钮的事件
  handleAddBtnClick(){
    this.props.addBtnClick();
  }

  render () {
    return (
      <div className="input_wrapper">
        <input className="input" value={this.props.inputValue} onKeyDown={this.handleKeyDown} onChange={this.handleInputChange}></input>
        <button className="add_button" onClick={this.handleAddBtnClick}>添加</button>
      </div>
    );
  }
}

export default Input;
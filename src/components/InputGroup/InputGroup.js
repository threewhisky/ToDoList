import React, {Component} from 'react';
import { Input, Button, Icon } from 'antd';
import 'antd/dist/antd.css';
import './InputGroup.css';


class InputGroup extends Component {

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
        <Input 
          className="input" 
          prefix={<Icon type="plus" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="添加ToDo，按回车或点击添加按钮即可保存"
          value={this.props.inputValue} 
          onKeyDown={this.handleKeyDown} 
          onChange={this.handleInputChange} 
        />
        <Button 
          className="add_button" 
          type="primary" 
          icon="plus"
          onClick={this.handleAddBtnClick}
        >添加</Button>
      </div>
    );
  }
}

export default InputGroup;
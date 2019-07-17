import React, {Component} from 'react';
import { Checkbox, Button } from 'antd';
import 'antd/dist/antd.css';
import './Item.css';

class Item extends Component {

  constructor(props){
    super(props);

    // 绑定this
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleItemDblClick = this.handleItemDblClick.bind(this);
    this.handleDelBtnClick = this.handleDelBtnClick.bind(this);
  }

  // 点击checkout选择框的事件
  handleCheckboxChange(index){
    this.props.function.checkboxChange(index);
  }

  // 双击待办事项以编辑的事件
  handleItemDblClick(index){
    this.props.function.itemDblClick(index);
  }

  // 点击删除按钮的事件
  handleDelBtnClick(index){
    this.props.function.delBtnClick(index);
  }


  render () {
    const item = this.props.item;
    const index = this.props.index;
    return (
      
      <div className='item_wrapper' key={index}>
        <li className='item' id={'li-'+index}>
          <div className='item_left'>
            <Checkbox 
              className='item_checkbox' 
              checked={item.checked} 
              onChange={()=>this.handleCheckboxChange(index)}
            />
            <p className='item_content' id={'p-'+index} onDoubleClick={()=>this.handleItemDblClick(index)}>{item.title}</p>
          </div>
          <div className='item_right'>
            <Button className="item_button item_right" type="danger" onClick={()=>this.handleDelBtnClick(index)}>删除</Button>
          </div>
        </li>
      </div>
    );
  }
}

export default Item;
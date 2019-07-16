import React, {Component} from 'react';

class ToDoItemList extends Component {

  constructor(props){
    super(props);

    // 绑定this
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleItemDblClick = this.handleItemDblClick.bind(this);
    this.handleDelBtnClick = this.handleDelBtnClick.bind(this);
  }

  // 点击checkout选择框的事件
  handleCheckboxChange(index){
    this.props.checkboxChange(index);
  }

  // 双击待办事项以编辑的事件
  handleItemDblClick(index){
    this.props.itemDblClick(index);
  }

  // 点击删除按钮的事件
  handleDelBtnClick(index){
    this.props.delBtnClick(index);
  }


  render () {
    return (
      <div className="to_do_wrapper">
        <h3>待完成的事项</h3>
        <ul className="to_do_list">
          {
            this.props.itemList.map((item, index) => {
              if(!item.checked){
                return (
                  <div className='item_wrapper' key={index}>
                    <li className='item' id={'li-'+index}>
                      <input className='item_checkbox' type='checkbox' checked={item.checked} onChange={()=>this.handleCheckboxChange(index)}></input>
                      <p className='item_content' id={'p-'+index} onDoubleClick={()=>this.handleItemDblClick(index)}>{item.title}</p>
                      <button className="item_button" onClick={()=>this.handleDelBtnClick(index)}>删除</button>
                    </li>
                  </div>
                );
              }else{
                return true;  //因为map遍历需要每个值都有返回的东西，防止警告产生
              }
            })
          }
        </ul>
      </div>
    );
  }
}

export default ToDoItemList;
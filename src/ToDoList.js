import React from 'react';
import './ToDoList.css';
import Header from './components/Header/Header';


class ToDoList extends React.Component {

  constructor(props){
    super(props);
    const itemList = JSON.parse(window.localStorage.getItem('itemList')) || [] ;
    // const completeList = JSON.parse(window.localStorage.getItem('completeList')) || [] ;
    this.state = {
      itemList,
      // completeList,
      inputValue: ''
    };
  }

  // Input输入框内发生变化的事件
  handleInputChange(event){
    const e = event || window.event;
    this.setState({
      inputValue: e.target.value
    })
  }

  // 添加待办事项（点击按钮和按回车触发）
  appendToDo(){
    if(this.state.inputValue === ''){
      alert('待办事项不能为空');
      return;
    }
    const itemList = [...this.state.itemList, {title:this.state.inputValue, checked: false}];
    this.setState({
      itemList,
      inputValue: ''
    })
    window.localStorage.setItem('itemList', JSON.stringify(itemList)); //本地储存待办事项
  }
  // 点击添加按钮的事件
  handleBtnClick(){
    this.appendToDo();
  }
  // 在input输入框按回车的事件
  handleKeyDown(event){
    const e = event || window.event;
    if(e.keyCode === 13){
      this.appendToDo();
    }
  }

  // 点击删除按钮的事件
  handleDelBtnClick(index){
    const itemList = [...this.state.itemList];
    itemList.splice(index,1);
    this.setState({itemList});
    window.localStorage.setItem('itemList', JSON.stringify(itemList)); //本地储存待办事项
  }

  // 双击待办事项编辑的事件
  handleItemClick(index){
    const p = document.getElementById('p-' + index);
    const content = p.innerHTML;
    p.innerHTML="<input id='input-" + index + "' value='" + content +"' />";
    const input = document.getElementById('input-' + index);
    input.setSelectionRange(0, input.value.length);
    input.focus();
    input.ondblclick = (event) => {
      const e = event || window.event;
      if(e.stopPropagation) {
				e.stopPropagation();
			}else {
				e.cancelBubble = true;
      }
    } //阻止双击input框冒泡
    input.onblur = () => {
      if(input.value.length === 0){
        p.innerHTML = content;
        alert("待办事项内容不能为空");
      }else{
        const itemList = [...this.state.itemList];
        itemList.splice(index, 1, {title: input.value, checked: false});
        p.innerHTML=[input.value];
        this.setState({itemList});
        window.localStorage.setItem('itemList', JSON.stringify(itemList)); //本地储存待办事项
      }
    }
  }

  // 点击checkout选择框的事件
  handleCheckbox(index){
    const itemList = this.state.itemList;
    itemList[index].checked = !itemList[index].checked;
    this.setState({itemList});
    window.localStorage.setItem('itemList', JSON.stringify(itemList)); //本地储存待办事项
    
  }

  render () {
    return (
      <div className="wrapper">

        {/* 标题组件 */}
        <Header></Header>

        {/* 下面是 输入框 组件 */}
        <input className="input" onKeyDown={this.handleKeyDown.bind(this)} value={this.state.inputValue} onChange={this.handleInputChange.bind(this)}></input>
        <button className="add_button" onClick={this.handleBtnClick.bind(this)}>添加</button>

        {/* 下面是 待完成的事项 组件 */}
        <h3>待完成的事项</h3>
        <ul className="to_do_list">
          {
            this.state.itemList.map((item, index) => {
              if(!item.checked){
                return (
                  <div className='item_wrapper' key={index}>
                    <li className='item' id={'li-'+index}>
                      <input className='item_checkbox' type='checkbox' checked={item.checked} onChange={this.handleCheckbox.bind(this, index)}></input>
                      <p className='item_content' id={'p-'+index} onDoubleClick={this.handleItemClick.bind(this, index)}>{item.title}</p>
                      <button className="item_button" onClick={this.handleDelBtnClick.bind(this, index)}>删除</button>
                    </li>
                  </div>
                );
              }else{
                return true;  //因为map遍历需要每个值都有返回的东西
              }
            })
          }
        </ul>

        {/* 下面是 已完成的事项 组件 */}
        <h3>已完成的事项</h3>
        <ul className="complete_list">
          {
            this.state.itemList.map((item, index) => {
              if(item.checked){
                return (
                  <div className='item_wrapper' key={index}>
                    <li className='item' id={'li-'+index}>
                      <input className='item_checkbox' type='checkbox' checked={item.checked} onChange={this.handleCheckbox.bind(this, index)}></input>
                      <p className='item_content' id={'p-'+index} onDoubleClick={this.handleItemClick.bind(this, index)}>{item.title}</p>
                      <button className="item_button" onClick={this.handleDelBtnClick.bind(this, index)}>删除</button>
                    </li>
                  </div>
                );
              }else{
                return true;  //因为map遍历需要每个值都有返回的东西
              }
            })
          }
        </ul>

      </div>
      
      
    );
  }
}

export default ToDoList;

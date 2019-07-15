import React from 'react';
import './ToDoList.css';
import Header from './components/Header/Header';


class ToDoList extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      list: [
        '第一条待办事项',
        '第二条待办事项',
        '第三条待办事项'
      ],
      inputValue: ''
    };
  }

  // Input输入框内发生变化的时间
  handleInputChange(e){
    this.setState({
      inputValue: e.target.value
    })
  }

  // 点击添加按钮的事件
  handleBtnClick(){
    if(this.state.inputValue === ''){
      alert('待办事项不能为空');
      return;
    }
    this.setState({
      list: [...this.state.list, this.state.inputValue],
      inputValue: ''
    })
  }

  // 点击删除按钮的事件
  handleDelBtnClick(index){
    const list = [...this.state.list];
    list.splice(index,1);
    this.setState({list});
  }

  //点击待办事项编辑的事件
  handleItemClick(index){
    const li = document.getElementById('li-' + index);
    const content = li.innerHTML;
    li.innerHTML="<input id='input-" + index + "' value='" + content +"' />";
    const input = document.getElementById('input-' + index);
    input.setSelectionRange(0,input.value.length);
    input.focus();
    input.onclick = (event) => {
      if(event.stopPropagation) {
				event.stopPropagation();
			}else {
				event.cancelBubble = true;
      }
    }
    input.onblur = () => {
      if(input.value.length === 0){
        li.innerHTML = content;
        alert("待办事项内容不能为空");
      }else{
        const list = [...this.state.list];
        list.splice(index, 1, input.value);
        li.innerHTML=[input.value];
        this.setState({list});
      }
    }
  }

  render () {
    return (
      <div className="wrapper">

        {/* 标题组件 */}
        <Header></Header>

        {/* 下面是 输入框 组件 */}
        <input className="input" value={this.state.inputValue} onChange={this.handleInputChange.bind(this)}></input>
        <button className="add_button" onClick={this.handleBtnClick.bind(this)}>添加</button>

        {/* 下面是 正在进行 组件 */}
        <ul className="list">
          {
            this.state.list.map((item, index) => {
              return (
                <div className='item_wrapper' key={index}>
                  <li className='item' id={'li-'+index} onClick={this.handleItemClick.bind(this, index)}>{item}</li>
                  <button className="item_button" onClick={this.handleDelBtnClick.bind(this, index)}>删除</button>
                </div>
              );
            })
          }
        </ul>

      </div>
      
      
    );
  }
}

export default ToDoList;

import React from 'react';
// 引入antdUI插件
import { Layout, Button } from 'antd';
import 'antd/dist/antd.css';

import './ToDoList.css';
import Header from './components/Header/Header';
import InputGroup from './components/InputGroup/InputGroup';
import ItemList from './components/ItemList/ItemList';


const { Content, Footer } = Layout;

class ToDoList extends React.Component {

  constructor(props){
    super(props);
    const itemList = JSON.parse(window.localStorage.getItem('itemList')) || [] ;
    this.state = {
      itemList,
      inputValue: ''
    };

    //绑定this
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleAddBtnClick = this.handleAddBtnClick.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleItemDblClick = this.handleItemDblClick.bind(this);
    this.handleDelBtnClick = this.handleDelBtnClick.bind(this);
    this.handleClearAllBtn = this.handleClearAllBtn.bind(this);
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
  // 在input输入框按回车的事件
  handleKeyDown(event){
    const e = event || window.event;
    if(e.keyCode === 13){
      this.appendToDo();
    }
  }
  // 点击添加按钮的事件
  handleAddBtnClick(){
    this.appendToDo();
  }

  // 点击checkout选择框的事件
  handleCheckboxChange(index){
    const itemList = this.state.itemList;
    itemList[index].checked = !itemList[index].checked;
    this.setState({itemList});
    window.localStorage.setItem('itemList', JSON.stringify(itemList)); //本地储存待办事项
  }

  // 双击待办事项以编辑的事件
  handleItemDblClick(index){
    const p = document.getElementById('p-' + index);
    let content = p.innerHTML;
    content = content.replace(/'/g,"‘"); //防止用户输入英语单引号时出现bug删除数据，替换为全角的单引号。
    p.innerHTML="<input class='ant-input style={height: 20px} type='text' id='input-" + index + "' value='" + content +"' />";
    const input = document.getElementById('input-' + index);
    input.setSelectionRange(0, input.value.length);
    input.focus();
    input.ondblclick = (event) => { //阻止双击input框事件冒泡到p标签
      const e = event || window.event;
      if(e.stopPropagation) {
				e.stopPropagation();
			}else {
				e.cancelBubble = true;
      }
    }
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

  // 点击删除按钮的事件
  handleDelBtnClick(index){
    const itemList = [...this.state.itemList];
    itemList.splice(index,1);
    this.setState({itemList});
    window.localStorage.setItem('itemList', JSON.stringify(itemList)); //本地储存待办事项
  }

  // 点击清空所有事项按钮的事件
  handleClearAllBtn(){
    const itemList =[];
    this.setState({itemList});
    window.localStorage.setItem('itemList', JSON.stringify(itemList)); //本地储存待办事项
  }


  render () {
    return (
      <div className="wrapper">
        <Layout className="layout">
          {/* 标题组件 */}
          <Header />

          <div className="content_wrapper">
            <Content style={{ padding: '0 50px' }}>

              {/* 下面是 输入框 组件 */}
              <InputGroup 
                inputValue={this.state.inputValue}
                inputChange={this.handleInputChange}
                keyDown={this.handleKeyDown}
                addBtnClick={this.handleAddBtnClick}
              />

              {/* 下面是 待完成的事项 组件 */}
              <div className='to_do_wrapper'>
                <div className='to_do_group'>
                  <ItemList 
                    itemList={this.state.itemList}
                    checkboxChange={this.handleCheckboxChange}
                    itemDblClick={this.handleItemDblClick}
                    delBtnClick={this.handleDelBtnClick}
                    listHeader='正在进行的事项'
                    itemChecked={false}
                  />
                </div>
              </div>

              {/* 下面是 已完成的事项 组件 */}
              <div className='complete_wrapper'>
                <div className='complete_group'>
                  <ItemList 
                    itemList={this.state.itemList}
                    checkboxChange={this.handleCheckboxChange}
                    itemDblClick={this.handleItemDblClick}
                    delBtnClick={this.handleDelBtnClick}
                    listHeader='已完成的事项'
                    itemChecked={true}
                  />
                </div>
              </div>

            </Content>
          </div>
          <div className="clear_all_item">
            <Button className="clear_all_btn" onClick={this.handleClearAllBtn} type="danger">清空所有事项</Button>
          </div>

          <Footer style={{ textAlign: 'center' }}>threewhisky Design ©2019 Created by   
            <span style={{color:'#000', fontSize: '16px'}}> 杨海</span>
          </Footer>
          
        </Layout>


        

      </div>   
      
    );
  }
}

export default ToDoList;

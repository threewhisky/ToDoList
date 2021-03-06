import React, {Component, Fragment} from 'react';
import Item from '../Item/Item';
import './ItemList.css';

class ItemList extends Component {

  render () {
    const itemChecked = this.props.itemChecked;
    return (
      <Fragment>
        <h3 className="item_list_title">{this.props.listHeader}</h3>
        <ol className="item_list">
          {
            this.props.itemList.map((item, index) => {
              // 区分 正在进行列表 和 已完成列表
              let itemCheckedKey;
              if(!itemChecked){
                itemCheckedKey = !item.checked;
              }else{
                itemCheckedKey = item.checked;
              }

              if(itemCheckedKey){
                return (
                  <Item 
                    item={item}
                    index={index}
                    function={this.props}
                    key={index}
                  />
                );
              }else{
                return true;  //因为map遍历需要每个值都有返回的东西，防止警告产生
              }
            })
          }
        </ol>
      </Fragment>

    );
  }
}

export default ItemList;
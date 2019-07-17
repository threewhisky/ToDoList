import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ToDoList from './ToDoList';
import * as serviceWorker from './serviceWorker';

// 引入antdUI样式文件
import 'antd/es/date-picker/style/css';

ReactDOM.render(<ToDoList />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

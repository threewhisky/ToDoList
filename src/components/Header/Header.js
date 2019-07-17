import React from 'react';
import './Header.css';

class Header extends React.Component {
    render () {
        return (
            <h2 className="header_title">ToDoList（待办事项）</h2>
        );
    }
}

export default Header;
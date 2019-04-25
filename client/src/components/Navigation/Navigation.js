import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 
import down from '../images/down.png';
import up from '../images/up.png';


import AuthContext from '../../contexts/AuthContext';
import AuthDropdown from '../../components/AuthDropdown/AuthDropdown';

class Navigation extends Component {
  static contextType = AuthContext;

  state = {
    collapsed: true
  }

  toggleCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  
  render() {
    const { user } = this.context;
    const { collapsed } = this.state;
    const targetClass = `collapse navbar-collapse ${!collapsed && 'show'}`;
    const togglerClass = `navbar-toggler ${collapsed && 'collapsed'}`;

    return (
      <div className='Navigation' id="nav">
        <nav className='navbar navbar-expand-lg navbar-light bg-light mb-3'>
          <Link className='navbar-brand' to='#'><span>Jul</span>
          <img className="downarrow" src={down} alt="down" />
          <span>e</span>
          <img className="uparrow" src={up} alt="up" />
          </Link>
          <button className={togglerClass} onClick={this.toggleCollapse} data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>

          <div className={targetClass} id='navbarSupportedContent'>
            <ul className='navbar-nav mr-auto'>
              <li className='nav-item'>
                <Link className='nav-link' to='/' onClick={this.toggleCollapse}>Home</Link>
              </li>
            </ul>
            <ul className='navbar-nav'>
              {user
                ? <AuthDropdown onClick={this.toggleCollapse} />
                : <div>
                    <li className='nav-item'><Link className='nav-link' to='/login' onClick={this.toggleCollapse}>Login</Link></li>
                    <li className='nav-item'><Link className='nav-link' to='/register' onClick={this.toggleCollapse}>Register</Link></li>
                  </div>}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navigation;

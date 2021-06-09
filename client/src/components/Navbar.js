import React, {useContext} from 'react'
// import 'bootstrap/dist/css/bootstrap.css';
import {NavLink} from 'react-router-dom';
import logo from '../images/brand.png'
import {UserContext} from '../App';

const Navbar = () => {
    const {state, dispatch} = useContext(UserContext);

    const RenderMenu = () => {
        if(state){
            return(
                <>
                    <li className="nav-item active">
                            <NavLink exact activeClassName="menu_active" className="nav-link active" to="/">Home <span className="sr-only">(current)</span></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="menu_active" className="nav-link" to="/about">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="menu_active" className="nav-link" to="/contact">Contact</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="menu_active" className="nav-link" to="/logout">Logout</NavLink>
                        </li>
                </>
            )
        }else{
            return(
                <>
                    <li className="nav-item active">
                            <NavLink exact activeClassName="menu_active" className="nav-link active" to="/">Home <span className="sr-only">(current)</span></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="menu_active" className="nav-link" to="/about">AboutMe</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="menu_active" className="nav-link" to="/contact">Contact</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="menu_active" className="nav-link" to="/login">Login</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="menu_active" className="nav-link" to="/signup">Registration</NavLink>
                        </li>
                </>
            )
        }
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink className="navbar-brand" to="/">
                    <img className = "logo_style" src={logo} alt="logo"/>
                </NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">

                    <RenderMenu/>

                        {/* <li className="nav-item active">
                            <NavLink exact activeClassName="menu_active" className="nav-link active" to="/">Home <span className="sr-only">(current)</span></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="menu_active" className="nav-link" to="/about">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="menu_active" className="nav-link" to="/contact">Contact</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="menu_active" className="nav-link" to="/login">Login</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="menu_active" className="nav-link" to="/signup">Registration</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="menu_active" className="nav-link" to="/logout">Logout</NavLink>
                        </li> */}
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar

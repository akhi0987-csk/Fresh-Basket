import React, { useState } from 'react' 
import './Navbar.css'
import logo from '../Assets/DatasetImg(CS)/logos/app.logo.jpg'
import icon from '../Assets/DatasetImg(CS)/logos/shpping_icon.jpg'
import { Link } from 'react-router-dom'


const Navbar = () => {

    const[menu,setMenu]= useState("shop")
    return(
        <div className='navbar'>
            <div className='nav-logo'>
                <img src={logo}  alt="" />
                <p>FRESH BASKET</p>
            </div>
            <ul className='nav-menu'>
                <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration: 'none'}} to='/shop'>Home</Link>{menu==="shop"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("groceries")}}><Link style={{textDecoration: 'none'}} to='/groceries'>Shop</Link>{menu==="groceries"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("veggies")}}><Link style={{textDecoration: 'none'}} to='/veggies'>Veggies</Link>{menu==="veggies"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("fruits")}}><Link style={{textDecoration: 'none'}} to='/fruits'>Fruits</Link>{menu==="fruits"?<hr/>:<></>}</li>
            </ul>
            <div className='nav-login-cart'>
            <Link to='/cart'><img src={icon} alt='' /></Link>
                <Link to='/login'><button>Login</button></Link>
                <Link to='./chatbot'><button>HELP</button></Link>

            </div>

        </div>
    )
}

export default Navbar

import React from 'react'
import Link from '../Link/Link'
import './Navigation.css'

const Navigation = () => {
  return (
    <nav className='nav_bar--container'>
      <div className='nav_bar--items'>
        <div className='nav_bar--logo'>
          <Link href="https://roxiler.com" className=''><img src="https://roxiler.com/wp-content/uploads/2022/03/Logo.svg"  width={"171px"}/></Link>
        </div>
        <div className='nav_bar--router'>
          <Link href="#" className="link--home"><h1>Home</h1></Link>
          <Link href="#1" className="link--home"><h1>About</h1></Link>
          <Link href="#2" className="link--home"><h1>Contact Us</h1></Link>
        </div>
      </div>
    </nav>
  )
}

export default Navigation

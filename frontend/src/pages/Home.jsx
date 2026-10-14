import React from 'react'
import '../styles/Home.scss'
import {assets} from '../assets/assets'
import { NavLink } from 'react-router-dom'

const Home = () => {
  return (
    <main className='main'>

      <div className='outer'>

        <img className='boy-img' src={assets.boy} alt="" />

        <div className='right-inner'>

          <img className='logo' src={assets.logo} alt="" />

          <p className='heading'>CREATE</p>

          <p className='description'>
            Connect , Share , make friends. <br />  Contribute to society...
          </p>

          <NavLink to="/register">
            <a href="#work" className="view-work-btn">
              SIGN IN
              <span>↗</span>
            </a>
          </NavLink>

        </div>

        <div className='left-inner'>

        </div>

      </div>

    </main>
  )
}

export default Home

import React from 'react'
import Sidebar from './Sidebar'
import './Appbar.css'
import { Link } from 'react-router-dom'
import { Icon } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
const Appbar = ({ user, setUser, username, setUsername }) => {
	return (
		<div className='appbar'>
			<div className='slider'>
				<Sidebar setUsername={setUsername} />
				<Link to='/' className='home'>
					<b>Quiz</b>
				</Link>
			</div>
			<div className='appbar-user'>
				<Icon>
					<AccountCircle />
				</Icon>
				<p>{user.name}{username}</p>
			</div>
		</div>
	)
}

export default Appbar

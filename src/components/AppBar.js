import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import Sidebar from './Sidebar'
import './AppBar.css'

const AppBar = ({ setUsername, setPath, user, setUser, logout }) => {
	return (
		<div className='appBar'>
			<div className='slider'>
				<Sidebar setUsername={setUsername} setPath={setPath} setUser={setUser} user={user} logout={logout} />
				<Link to={!!user ? '/admin/dashboard' : '/dashboard'} className='home'>
					<b>Quiz</b>
				</Link>
			</div>
			<div className='appBar-user' style={{ marginRight: '80px' }}>
				<div id='row' style={{ height: '100%' }}>
					{!!user && <div style={{ marginRight: '10px', paddingTop: '10px' }}>
						<Icon>
							<AccountCircle />
						</Icon>
					</div>}
					<div className='vertical-center'>
						<div>{user}</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AppBar

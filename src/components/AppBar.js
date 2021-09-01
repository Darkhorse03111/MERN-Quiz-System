import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import './AppBar.css'
import Sidebar from './Sidebar'
import firebase from '../firebase/firebase'
const AppBar = ({ setUsername }) => {
	const user = localStorage.getItem('user')
	return (
		<div className='appBar'>
			<div className='slider'>
				<Sidebar setUsername={setUsername} />
				<Link to='/dashboard' className='home'>
					<b>Quiz</b>
				</Link>
			</div>
			<div className='appBar-user' style={{ marginRight: '80px' }}>
				<div id='row' style={{ height: '100%' }}>
					{!firebase.auth().currentUser && <Link to='/admin' className='admin vertical-center'>
						<b>Admin</b>
					</Link>
					}
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

import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Icon } from '@material-ui/core'
import './Sidebar.css'
import firebase from '../firebase/firebase'

import {
	CreateNewFolder,
	Dashboard,
	ExitToApp,
	MeetingRoom,
	MenuOpenRounded,
	MenuRounded,
} from '@material-ui/icons'

function Sidebar({ setUsername, setPath }) {
	const [signOut, setSignOut] = useState(false)
	const SidedbarData = [
		{
			title: 'Dashboard',
			path: '/dashboard',
			icon: <Dashboard />,
			CName: 'nav-text',
		},
		{
			title: 'Join Quiz',
			path: '/join-quiz',
			icon: <MeetingRoom />,
			CName: 'nav-text',
		},
		{
			title: 'Create Quiz',
			path: '/create-quiz',
			icon: <CreateNewFolder />,
			CName: 'nav-text',
		},
	]
	const [sidebar, setSidebar] = useState(false)
	const showSidebar = () => setSidebar(!sidebar)
	if (signOut) {
		if (!!firebase.auth().currentUser) {
			firebase.auth().signOut()
		}
		else {
			localStorage.removeItem('username')
			localStorage.removeItem('id')
		}
		setUsername('')
		return <Redirect to='/' />
	}

	return (
		<div>
			<Icon className='menu-bars' onClick={e => showSidebar()}>
				<MenuRounded />
			</Icon>
			<nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
				<ul className='nav-menu-items' onClick={e => showSidebar()}>
					<li className='navbar-toggle'>
						<Icon>
							<MenuOpenRounded fontSize='large' />
						</Icon>
					</li>
					{SidedbarData.map((item, index) => {
						return (index < 2 || !!firebase.auth().currentUser) && (
							<li key={index} className='nav-text'>
								<Link to={item.path}>
									<Icon style={{ height: '40px' }}>{item.icon}</Icon>
									<span className='nav-item-title'>{item.title}</span>
								</Link>
							</li>
						)
					})}
					{/* Sign Out Button */}
					{
						(!!firebase.auth().currentUser || !!localStorage.getItem('username')) && <li className='nav-text sign-out' style={{ display: 'flex', justifyContent: 'left' }}>
							<button
								onClick={() => setSignOut(true)}>
								<Icon style={{ height: '40px' }}	>
									<ExitToApp />
								</Icon>
								<span className='nav-item-title'>{'SignOut'}</span>
							</button>
						</li>
					}
				</ul>
			</nav>
		</div>
	)
}

export default Sidebar
/*
if (!!(firebase.auth().currentUser) || index === 1)
							return (
								<li key={index} className='nav-text'>
									<Link to={item.path}>
										<Icon>{item.icon}</Icon>
										<span className='nav-item-title'>{item.title}</span>
									</Link>
								</li>
							)
*/
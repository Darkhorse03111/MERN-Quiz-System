import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Modal } from '@material-ui/core'
import './AddQuestionModal.css'

const useStyles = makeStyles((theme) => ({
  root: {
    // margin: "10px",
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 0,
    width: '90%',
    borderRadius: '10px',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))

export default function UsernameModal({ setUsername }) {
  const classes = useStyles()
  const [open, setOpen] = useState(true)
  const [path, setPath] = useState('')
  const [username, setName] = useState('')

  useEffect(() => {
  }, [open])
  const addQuestionCallBack = async () => {
    // Error Handling
    if (username) {
      const res = await fetch('/API/users/login', {
        method: 'POST',
        body: JSON.stringify({ name: username }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      localStorage.setItem('username', username)
      localStorage.setItem('id', res.id)
      setUsername(username)
      setPath('/')
    }
  }

  if (!!(localStorage.getItem('username'))) {
    return <Redirect push to='/' />
  }

  if (!!path) {
    return <Redirect push to={path} />
  }

  return (
    <div className='one-time-dashboard'>
      <div id='dashboard-content'>
        <div className='dash-btns'>
          <h1 className='white'>
            <b>Quiz</b>
          </h1>
          <button className='button one-time-button'>
            Dashboard
          </button>
          <button className='button one-time-button'>
            Create Quiz
          </button>
          <button className='button one-time-button'>
            Join Quiz
          </button>
        </div>
        <div className='blob-svg'>
          <svg
            className='blob-1'
            viewBox='0 0 200 200'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fill='#D81E5B'
              d='M55.6,-59.6C71.1,-53.2,82.1,-34.8,85.2,-15.3C88.2,4.2,83.3,24.7,73,41.7C62.7,58.6,46.8,72,29.8,75.4C12.7,78.9,-5.7,72.5,-21.3,64.3C-36.8,56.1,-49.6,46,-55.3,33.3C-61,20.6,-59.6,5.2,-56.6,-9.6C-53.6,-24.4,-48.8,-38.4,-39.1,-45.8C-29.4,-53.2,-14.7,-53.8,2.7,-57C20,-60.2,40.1,-65.9,55.6,-59.6Z'
              transform='translate(100 100)'
            />
          </svg>

          <svg
            className='blob-3'
            viewBox='0 0 200 200'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fill='#F7C550'
              d='M37.2,-46.1C50.9,-32.8,66.5,-23.6,68.1,-12.3C69.8,-0.9,57.5,12.6,48.4,27.5C39.3,42.4,33.3,58.7,22.7,62.7C12.1,66.7,-3,58.3,-21.7,54C-40.3,49.6,-62.5,49.2,-72.9,38.5C-83.4,27.8,-82.2,6.8,-75.6,-10.4C-69.1,-27.5,-57.2,-40.7,-43.7,-54C-30.2,-67.3,-15.1,-80.6,-1.7,-78.6C11.8,-76.6,23.5,-59.3,37.2,-46.1Z'
              transform='translate(100 100)'
            />
          </svg>
        </div>

        <Modal
          aria-labelledby='transition-modal-title'
          aria-describedby='transition-modal-description'
          className={classes.modal}
          open={open}
          disableEnforceFocus={true}
        >
          <div className={classes.paper}>
            <div className='questionCard'>
              <div id='title'>Name:</div>
              <input
                type='text'
                autoFocus
                value={username}
                onChange={(e) => setName(e.target.value)}
                className='input-text question'
                placeholder='Type Name Here'
              />
            </div>
            <div className={classes.buttons}>
              <button
                // disabled={!(optionsArray.length && titleField.length)}
                className='button'
                color='secondary'
                variant='contained'
                onClick={addQuestionCallBack}
              >
                Enter
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  )
}

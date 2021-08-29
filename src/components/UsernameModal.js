import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Modal } from '@material-ui/core'
import { Row, Col, InputGroup, FormControl } from 'react-bootstrap'
import './AddQuestionModal.css'

export default class UsernameModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username:'',
      password:''
    }
  }
  login = async username => {
    const res = await fetch('/API/users/login', {
      method: 'POST',
      body: JSON.stringify({ name: username }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const body = await res.json()
    localStorage.setItem('username', username)
    localStorage.setItem('id', body.id)
    this.props.setUsername(username)
    // setPath('/join-quiz')
  }

  render() {
    const {username, password} = this.state
    const {open} = this.props
    const classes = {
      modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        // backgroundColor: theme.palette.background.paper,
        // boxShadow: theme.shadows[5],
        // padding: theme.spacing(2, 4, 3),
        outline: 0,
        width: '90%',
        borderRadius: '10px',
      },
      buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
      }
    }
    let img = []
    for (let i = 2; i < 11; ++i) {
      img.push(i)
    }
    return <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      style={classes.modal}
      // style={{ width: '360px', margin: 'auto' }}
      open={true}
      disableEnforceFocus={true}
    >
      <Row>
        <Col lg='auto' md='auto' sm='auto' style={{ backgroundColor: '#294634', width: '150px', paddingLeft: '15px', paddingRight: '15px', borderRadius: '10px' }}>
          <img
            style={{ width: '50px', marginLeft: '35px', marginRight: '35px', marginTop: '20px', marginBottom: '20px' }}
            src="/Quiz/logo/admin_login_logo.png"
            className="rounded"
            alt=""
          />
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              style={{ height: '20px' }}
              value={username}
              onChange = {e => this.setState({username:e.target.value})}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Password"
              aria-label="Password"
              type="password"
              aria-describedby="basic-addon1"
              style={{ height: '20px' }}
              value={password}
              onChange = {e => this.setState({password:e.target.value})}
            />
          </InputGroup>
          <button className="btn" style={{ backgroundColor: '#A17F50', color: '#fff', width: '100%', marginTop: '15px', marginBottom: '25px', height: '20px', borderRadius: '10px', paddingTop: '0px', fontSize: '12px' }} onClick={e => this.login(username)}>ENTER</button>
        </Col>
        <Col lg='auto' md='auto' sm='auto' style={{ width: '210px', backgroundColor: '#fff' }}>
          <div style={{ textAlign: 'center', color: '#294634', marginTop: '20px', marginBottom: '20px' }}>CHOOSE AVATAR</div>
          <div style={{padingLeft:'10px'}}>
          {
            img.map(im => <img
              src={`/Quiz/Avatar/${im}.png`}
              style={{marginLeft:'5px', marginRight:'5px'}}
              className="rounded"
              alt=""
            />)
          }
          </div>
        </Col>
      </Row>
    </Modal>
  }
}
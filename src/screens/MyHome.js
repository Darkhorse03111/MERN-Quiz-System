import React, { Component } from 'react'
import { Carousel } from 'react-bootstrap'

export default class MyHome extends Component {
  render() {
    const height = window.innerHeight, width = window.innerWidth
    return <Carousel style={{ marginTop: '70px' }}>
      <Carousel.Item interval={1000}>
        <img
          className="d-block img-fluid mx-auto my-auto"
          src="/Quiz/1495315685183.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500} style={{ height: '100%' }}>
        <img
          className="d-block img-fluid mx-auto my-auto"
          style={{ maxWidth: `${width}px`, maxHeight: `${height}px` }}
          src="/Quiz/banner-23.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={{ height: '100%' }}>
        <img
          className="d-block img-fluid mx-auto my-auto"
          style={{ height: '100%' }}
          src="/Quiz/education-technology-and-school-children.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  }
}
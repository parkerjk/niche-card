
import React, { useState, useEffect, useRef } from 'react';
import { Container, Form, Button, Row, Col, Card, Spinner, Modal, Pagination } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import pkPic from '../assets/PK_Picture.jpeg'
import oliverPic from '../assets/Oliver_pic.jpeg'

export default function About() {
      return <Container id="about-page" className="py-5">
            <div className="d-flex justify-content-center">
                    <h1 className="outfit-niche-header" style={{marginTop: '20px', marginBottom: '20px'}}>About <strong>Niche</strong>Card</h1>
            </div>
            <div style={{textAlign: 'center', marginBottom: '40px', color: 'white'}}>
                <h2>What?</h2>
                <p>NicheCard is a AI web app that does more than compare credit cards. It analyzes and breaks down the full range of rewards and benefits of the users collection of cards</p>
            </div>
            <div style={{textAlign: 'center', marginBottom: '40px', color: 'white'}}>
                <h2>Why?</h2>
                <p>Every credit card has unique rewards and use cases. 
                    This tool is for hardcore credit hackers who want to 
                    maximize their rewards and cashback by optimizing their use of credit cards. 
                    Using two API's to collect and analyze 170+ of the most popular credit cards makes NicheCard the perfect 
                    place to find cards that will make you money and fill in niche categories that your current cards don't cover.</p>
            </div>
            <div style={{textAlign: 'center', marginBottom: '40px', color: 'white'}}>
                <h2>How?</h2>
                <p>Add the cards in your collection at the main page, then navigate to MyCards and run the NicheAI analyzer</p>
            </div>
            <div style={{textAlign: 'center', marginBottom: '40px', color: 'white'}}>
                <h2>About Us</h2>
                <Row style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
                <img src={pkPic} alt="A picture of PK" style={{width: '40%', height: '350px'}}/>
                <img src={oliverPic} alt="A picture of Oliver" style={{width: '40%', height: '350px'}}/>
                </Row>
            </div>
        </Container>
}
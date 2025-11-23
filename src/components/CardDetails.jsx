import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { Container, Form, Button, Row, Col, Card, Spinner, Modal, Pagination } from 'react-bootstrap';
import '../App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
export default function CardDetails() {
    const location = useLocation();
    const navigate = useNavigate();

    const card = location.state?.card || {
        name: "Unknown Card",
        cardId: "N/A",
        issuer: "Unknown",
        imageUrl: ""
    }
  
    return <Container className="py-5">
        <Card className="shadow-sm h-100 border-0 bg-light">
                <Card.Body className="d-flex flex-column">
                  <Col style={{textAlign: 'center'}}>
                    <Card.Title style={{fontSize: "36px"}}>{card.name}</Card.Title>
                    <Card.Img style={{height: '350px', width: '50%', marginBottom: '10px'}} src={`https://www.offeroptimist.com${card.imageUrl}`}/>
                  <Card.Text style={{fontSize: "20px"}}><strong>Issuer: </strong>{card.issuer.replaceAll("_", " ")}</Card.Text>
                  <Card.Text style={{fontSize: "20px"}}><strong>Annual Fee:</strong> ${card.annualFee.toFixed(2)}</Card.Text>
                  <Card.Text style={{fontSize: "20px"}}><strong>Universal Cash Back:</strong> {card.universalCashbackPercent}%</Card.Text>
                  {
                    card?.credit?.[0] ? <Card.Text style={{fontSize: "20px"}}>{card.credit[0]}</Card.Text> : <></>
                  }
                  {
                    card.offers ? <Card.Text style={{fontSize: "20px"}}><strong>Minimum Spend:</strong> ${card.offers[0].spend.toFixed(2)}</Card.Text> : <></>
                  }
                  {
                    card.isBusiness ? <Card.Text style={{fontSize: "20px"}}>Business Card</Card.Text> : <Card.Text style={{fontSize: "20px"}}>Not a Business Card</Card.Text>
                  }
                  </Col>
                </Card.Body>
              </Card>
    </Container>
}
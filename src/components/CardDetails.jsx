import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { Container, Form, Button, Row, Col, Card, Spinner, Modal, Pagination } from 'react-bootstrap';

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
                  <Card.Img variant="top" src={`https://www.offeroptimist.com${card.imageUrl}`}/>
                  <Card.Title className="text-dark">{card.name}</Card.Title>
                  <Card.Text className="text-muted">Issuer: {card.issuer}</Card.Text>
                  <Card.Text className="text-muted">Annual Fee: ${card.annualFee.toFixed(2)}</Card.Text>
                  <Card.Text className="text-muted">Universal Cash Back: {card.universalCashbackPercent}%</Card.Text>
                  {
                    card?.credit?.[0] ? <Card.Text className="text-muted">{card.credit[0]}</Card.Text> : <></>
                  }
                  {
                    card.isBusiness ? <Card.Text className="text-muted">This is a Business Card</Card.Text> : <Card.Text className="text-muted">This is not a Business Card</Card.Text>
                  }
                  {
                    card.offers ? <Card.Text className="text-muted">Minimum Spend ${card.offers[0].spend.toFixed(2)}</Card.Text> : <></>
                  }
                </Card.Body>
              </Card>
    </Container>
}
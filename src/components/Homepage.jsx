import '../App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col, Card, Spinner, Modal, Pagination } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

export default function Homepage() {
    const [cardList, setCardList] = useState([]); // List of all card information
    const [favoriteCards, setFavoriteCards] = useState(JSON.parse(sessionStorage.getItem("favorites")));
    let favoriteCard = JSON.parse(sessionStorage.getItem("favorites"));
    

    // Fetch request to pull all card information from API
    useEffect(() => {
      document.body.style.backgroundColor = 'black';
        fetch("https://raw.githubusercontent.com/andenacitelli/credit-card-bonuses-api/main/exports/data.json", {
        })
          .then((res) => res.json())
          .then(data => {
            console.log(data)
            setCardList(data)
          })
          .catch(error => console.error("Error fetching card information:", error));
      }, []);
      return <Container className="py-5">
        <Row>
          {/* bootstrap row for structuring course cards in a responsive grid */}
          {cardList.map((card, index) => (
            <Col key={index} xs={12} md={6} lg={4} xl={3} className="mb-4">
              <Card className="shadow-sm h-100 border-0 bg-light">
                <Card.Body className="d-flex flex-column">
                  <Card.Img variant="top" src={`https://www.offeroptimist.com${card.imageUrl}`}/>
                  <Card.Title className="text-dark">{card.name}</Card.Title>
                  <Card.Text className="text-muted">Issuer: {card.issuer}</Card.Text>
                  <Button
                    as={Link}
                    to={`/card/${card.cardId}`}
                    state={{card}}
                    variant="outline-dark mt-auto">
                    View Details
                  </Button>
                  {
                    favoriteCards && favoriteCards.includes(card) ?
                    <Button variant="outline-dark mt-auto" disabled="true" onClick={() => {}}>Added to my Cards</Button>
                    : <Button variant="outline-dark mt-auto" onClick={() => {
                      if (sessionStorage.getItem("favorites")) {
                          favoriteCard.push(card);
                          setFavoriteCards(favoriteCard)
                      } else {
                          favoriteCard = [card];
                          setFavoriteCards(favoriteCard)
                      }
                      sessionStorage.setItem("favorites", JSON.stringify(favoriteCard));
                      }}>Add to my Cards</Button>
                  }
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
}
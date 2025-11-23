import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";

export default function MyCards() {
    const [responseText, setResponseText] = useState("");
    const [favoriteCards, setFavoriteCards] = useState(
        JSON.parse(sessionStorage.getItem("favorites")) || []
    );

    function printByLetter(text) {
        // Split text into array of letters
        const letters = text.split("");
        const element = document.getElementById("ai-response");
        
        for (let i = 0; i < letters.length; i++) {
            setTimeout(() => {
                if (letters[i] === "<") {
                    i += 3;
                    element.textContent += "<br>";
                } else {
                    element.textContent += letters[i];
                }
            }, 5 * i);
        }
    }

    const fetchResponse = async () => {
        const element = document.getElementById("ai-response");
        element.textContent = ""; // Clear previous text
        if (favoriteCards.length > 0) {
            try {
                const res = await fetch("http://localhost:3001/api/compare", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ input: favoriteCards })
                });

                if (res.ok) {
                    const data = await res.json();
                    element.innerHTML = data.text;
                    //printByLetter(data.text);
                    //setResponseText(data.text);
                } else {
                    console.error("Failed to fetch response from backend");
                }
            } catch (error) {
                console.error("Network error:", error);
            }
        } else {
            element.text = ""; // clear when no cards
        }
    };

    const removeCard = (cardId) => {
        const updated = favoriteCards.filter(card => card.cardId !== cardId);
        sessionStorage.setItem("favorites", JSON.stringify(updated));
        setFavoriteCards(updated);
    };

    return (
        <Container className="py-5">

            <Row>
                {favoriteCards.length > 0 ? (
                    favoriteCards.map((card, index) => (
                        <Col key={index} xs={12} md={6} lg={4} xl={3} className="mb-4">
                            <Card className="shadow-sm h-40 border-0 bg-light">
                                <Card.Body className="d-flex flex-column">
                                    <Card.Img
                                        variant="top"
                                        src={`https://www.offeroptimist.com${card.imageUrl}`}
                                        style={{ width: "100%", height: "250px" }}
                                    />
                                    <Card.Title className="text-dark">{card.name}</Card.Title>
                                    <Card.Text className="text-muted">
                                        Issuer: {card.issuer}
                                    </Card.Text>
                                    <Card.Text className="text-muted">Annual Fee: ${card.annualFee.toFixed(2)}</Card.Text>
                                    <Card.Text className="text-muted">Universal Cash Back: {card.universalCashbackPercent}%</Card.Text>
                                    <Button
                                        variant="outline-dark mt-auto"
                                        onClick={() => removeCard(card.cardId)}
                                    >
                                        Remove from my Cards
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <div className="text-center mb-3">
                        <h5 className="text-light">You have no cards added</h5>
                    </div>
                )}
            </Row>

            <div className="d-flex justify-content-center">
                <Button variant="primary" onClick={fetchResponse}>
                    Get NicheAI Breakdown
                </Button>
            </div>
            
            <div className="text-center my-5">
                <h1 className="fw-bold text-white">NicheAI Breakdown</h1>
                <div
                    className="border rounded p-4 mt-3"
                    style={{ backgroundColor: "black", color: "white" }}
                >
                    <p id="ai-response"></p>
                </div>
            </div>
        </Container>
    );
}
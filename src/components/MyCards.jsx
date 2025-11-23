import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import { PuffLoader } from "react-spinners";
import '../Nav.css'

export default function MyCards() {
    //const [responseText, setResponseText] = useState("");
    const [favoriteCards, setFavoriteCards] = useState(
        JSON.parse(sessionStorage.getItem("favorites")) || []
    );
    const [loading, setLoading] = useState(false);

    const fetchResponse = async () => {
        const element = document.getElementById("ai-response");
        //const loader = document.getElementById("loader");
        //loader.loading = true;
        setLoading(true);
        element.textContent = ""; // Clear previous text
        if (favoriteCards.length > 0) {
            try {
                const res = await fetch("https://niche-card.onrender.com/api/compare", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ input: favoriteCards })
                });

                if (res.ok) {
                    const data = await res.json();
                    element.innerHTML = data.text;
                } else {
                    console.error("Failed to fetch response from backend");
                }
            } catch (error) {
                console.error("Network error:", error);
            }
        } else {
            element.text = ""; // clear when no cards
        }
        setLoading(false);
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
                                        style={{ width: "100%", height: "200px" }}
                                    />
                                    <Card.Title className="card-name">{card.name}</Card.Title>
                                    <Card.Text className="text-muted">
                                        <strong>Issuer:</strong> {card.issuer.replaceAll("_", " ")}
                                    </Card.Text>
                                    <Card.Text className="text-muted"><strong>Annual Fee:</strong> ${card.annualFee.toFixed(2)}</Card.Text>
                                    <Card.Text className="text-muted"><strong>Universal Cash Back:</strong> {card.universalCashbackPercent}%</Card.Text>
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
                
                <Button className="niche-button" disabled={favoriteCards.length === 0} onClick={fetchResponse}>
                    Get <strong>Niche</strong>AI Breakdown
                </Button>
            </div>
            
            <div className="text-center my-5">
                <h1 className="fw-bold text-white">NicheAI Breakdown</h1>
                <div className="d-flex justify-content-center">
                    <PuffLoader id="loader" color="#00eeffff" size={60} speedMultiplier={3} loading={loading} />
                </div>
                <div
                    className="border rounded p-4 mt-3 mx-auto"
                    style={{ backgroundColor: "black", color: "white", maxWidth: "1200px" }}
                >
                    <p id="ai-response"></p>
                </div>
            </div>
        </Container>
    );
}
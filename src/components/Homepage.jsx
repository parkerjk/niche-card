import '../App.css';
import { useState, useEffect, useRef } from 'react';
import { Container, Form, Button, Row, Col, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

export default function Homepage() {
    const [cardList, setCardList] = useState([]); // List of all card information
    const [displayCards, setDisplayCards] = useState([]);
    //const [favoriteCards, setFavoriteCards] = useState(JSON.parse(sessionStorage.getItem("favorites")));
    const [favoriteIDs, setFavoriteIDs] = useState(JSON.parse(sessionStorage.getItem("favoriteIDs")));
    let favoriteCard = JSON.parse(sessionStorage.getItem("favorites")) || [];
    let favoriteID = JSON.parse(sessionStorage.getItem("favoriteIDs")) || [];

    const searchInput = useRef(""); // Stores search bar input

    // Fetch request to pull all card information from API
    useEffect(() => {
      document.body.style.backgroundColor = 'black';
        fetch("https://raw.githubusercontent.com/andenacitelli/credit-card-bonuses-api/main/exports/data.json", {
        })
          .then((res) => res.json())
          .then(data => {
            console.log(data)
            setCardList(data)
            setDisplayCards(data)
          })
          .catch(error => console.error("Error fetching card information:", error));
      }, []);

      const handleSearch = (e) => {
        e.preventDefault();
        setDisplayCards(cardList.filter(card => {
          if (searchInput.current.value.trim().toLowerCase() === "") {
            return card
          } else if (card.name.trim().toLowerCase().includes(searchInput.current.value.trim().toLowerCase())) {
            return card
          } else if (card.issuer.trim().toLowerCase().includes(searchInput.current.value.trim().toLowerCase())) {
            return card
          }
        }))
      }

      const businessCheckbox = document.getElementById('business-checkbox');
      businessCheckbox?.addEventListener('change', (event) => {
        if(event.target.checked) {
          setDisplayCards(cardList.filter(card => card.isBusiness));
        } else {
          setDisplayCards(cardList);
        }
      });

      return <Container className="py-5">
        <Row style={{alignItems:"center"}}>
        <Col md={5} style={{marginBottom: '20px'}}>
          <Form onSubmit={handleSearch}>
            <div className="input-group shadow">
              <Form.Control type="text" placeholder="Search cards..." ref={searchInput} className="border-0 bg-light" />
              <Button type="submit" variant="dark">Search</Button>
            </div>
          </Form>
        </Col>
        <Col>
        <Form id='business-checkbox' style={{color: 'white'}}>
            {['checkbox'].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  type={type}
                  id={`inline-${type}-1`}
                  label={`Display Business Cards Only`}
                />
              </div>
            ))}
          </Form>
        </Col>
        <Col>
        </Col>
        <Col>
          <p style={{color: 'white'}}>Displaying {displayCards.length} Cards</p>
        </Col>
        </Row>
        <Row>
          {/* bootstrap row for structuring course cards in a responsive grid */}
          {displayCards.map((card, index) => (
            <Col key={index} xs={12} md={6} lg={4} xl={3} className="mb-4">
              <Card className="shadow-sm h-100 border-0 bg-light">
                <Card.Body className="d-flex flex-column">
                  <Card.Img variant="top" src={`https://www.offeroptimist.com${card.imageUrl}`}/>
                  <Card.Title className="card-name">{card.name}</Card.Title>
                  <Card.Text className="text-muted"><strong>Issuer:</strong> {card.issuer.replaceAll("_", " ")}</Card.Text>
                  <Card.Text className="text-muted"><strong>Annual Fee:</strong> ${card.annualFee.toFixed(2)}</Card.Text>
                  <Card.Text className="text-muted"><strong>Universal Cash Back:</strong> {card.universalCashbackPercent}%</Card.Text>
                  <Button
                    style={{marginBottom: '4px'}}
                    as={Link}
                    to={`/card/${card.cardId}`}
                    state={{card}}
                    variant="outline-dark mt-auto">
                    View Details
                  </Button>
                  {
                    favoriteIDs && favoriteIDs.includes(card.cardId) ?
                    <Button variant="outline-dark mt-auto" disabled='true' onClick={() => {}}>Added to my Cards</Button>
                    : <Button variant="outline-dark mt-auto" onClick={() => {
                          favoriteCard.push(card);
                          favoriteID.push(card.cardId);
                          console.log(favoriteID)
                          setFavoriteIDs(favoriteID);
                          //setFavoriteCards(favoriteCard);
                      sessionStorage.setItem("favorites", JSON.stringify(favoriteCard));
                      sessionStorage.setItem("favoriteIDs", JSON.stringify(favoriteID));
                      }}>Add to my Cards</Button>
                  }
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
}
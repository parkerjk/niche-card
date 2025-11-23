import { useLocation } from 'react-router-dom';
import { Container, Col, Card} from 'react-bootstrap';
import '../App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
export default function CardDetails() {
    const location = useLocation();
    //const navigate = useNavigate();

    let annualFeeScore = <strong></strong>
    let cashBackScore = <strong></strong>

    const card = location.state?.card || {
        name: "Unknown Card",
        cardId: "N/A",
        issuer: "Unknown",
        imageUrl: ""
    }

    if(card.annualFee < 95) {
      annualFeeScore = <strong style={{color: 'green'}}>Low</strong>
    } else if (card.annualFee < 200){
      annualFeeScore = <strong style={{color: 'orange'}}>Acceptable</strong>
    } else {
      annualFeeScore = <strong style={{color: 'red'}}>High</strong>
    }
    if(card.universalCashbackPercent < 1) {
      cashBackScore = <strong style={{color: 'red'}}>Low</strong>
    } else if (card.universalCashbackPercent < 1.5){
      cashBackScore = <strong style={{color: 'orange'}}>Acceptable</strong>
    } else {
      cashBackScore = <strong style={{color: 'green'}}>High</strong>
    }
  
    return <Container className="py-5">
        <Card className="shadow-sm h-100 border-0 bg-light">
                <Card.Body className="d-flex flex-column">
                  <Col style={{textAlign: 'center'}}>
                    <Card.Title className="card-name" style={{fontSize: "36px"}}>{card.name}</Card.Title>
                    <Card.Img style={{height: '350px', width: '50%', marginBottom: '10px'}} src={`https://www.offeroptimist.com${card.imageUrl}`}/>
                  <Card.Text style={{fontSize: "20px"}}><strong>Issuer: </strong>{card.issuer.replaceAll("_", " ")}</Card.Text>
                  <Card.Text style={{fontSize: "20px"}}><strong>Annual Fee:</strong> ${card.annualFee.toFixed(2)}  {annualFeeScore}</Card.Text>
                  <Card.Text style={{fontSize: "20px"}}><strong>Universal Cash Back:</strong> {card.universalCashbackPercent}%  {cashBackScore}</Card.Text>
                  {
                    card?.credits[0] ? <Card.Text style={{fontSize: "20px"}}><strong>Credits:</strong> {card.credits[0].description}</Card.Text> : <Card.Text style={{fontSize: "20px"}}><strong>Credits:</strong> None</Card.Text>
                  }
                  {
                    card.offers.spend ? <Card.Text style={{fontSize: "20px"}}><strong>Minimum Spend:</strong> ${card.offers[0].spend.toFixed(2)}</Card.Text> : <></>
                  }
                  {
                    card.isBusiness ? <Card.Text style={{fontSize: "20px"}}>Business Card</Card.Text> : <Card.Text style={{fontSize: "20px"}}>Not a Business Card</Card.Text>
                  }
                  {
                    card.url ? <Card.Text style={{fontSize: "20px"}}><a href={card.url}>Go to the Card Website</a></Card.Text> : <></>
                  }
                  </Col>
                </Card.Body>
              </Card>
    </Container>
}
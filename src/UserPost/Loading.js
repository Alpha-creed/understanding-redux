import React from 'react'
import { Card, Spinner } from 'react-bootstrap';

const LoadingCard = ({count}) => {
  const cards = ()=>{
    let totalCards = [];

    for(let i=0;i<count;i++){
      totalCards.push(
        <Card style={{width:'18rem'}} key={i}>
          <Card.Body>
        <Card.Title>
          <Spinner animation="grow" size="sm" /> Loading Card Title...
        </Card.Title>
        <Card.Text>
          <Spinner animation="grow" size="sm" /> Loading Card Text...
        </Card.Text>
        <Card.Text>
          <Spinner animation="grow" size="sm" /> Loading More Content...
        </Card.Text>
      </Card.Body>
        </Card>
      )
    }
    return totalCards;
  }
  return (
    <div className="row pb-5">
      {cards()}
    </div>
  )
}

export default LoadingCard;

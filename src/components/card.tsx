import React from 'react';
import { CardProps } from '../core/dictionary/types';

const Card: React.FC<CardProps> = ({ cardData, openImageOverLay }) => {
  return (
    <div className="card w-100">
      <img
        className="card-img-top"
        src={cardData.thumbnailImageUrl}
        alt={cardData.title}
        draggable="false"
        onClick={() => openImageOverLay(cardData.imageUrl)}
      />
      <div className="card-body">
        <h5 className="card-title">{cardData.title}</h5>
      </div>
    </div>
  );
};

export default Card;

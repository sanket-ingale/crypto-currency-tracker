import React from 'react';
import './Coin.css';

const Coin = (props) => {
  return (
    <div className={`row ${props.index % 2 !== 0 && `grey--bg`}`}>
      <div className='c--logo'>
        <img src={props.image} alt='crypto'/>
        <p className='c--name'>{props.name}</p>
      </div>
      <p className='info'>{props.symbol.toUpperCase()}</p>
      <p className='info num'>{props.currency} {props.current_price}</p>
      <p className='info num'>{props.currency} {props.total_volume.toLocaleString()}</p>
      <p className={`info num ${props.price_change_percentage_24h < 0 ? 'red' : 'green'}`}>{props.price_change_percentage_24h.toFixed(4)}%</p>
      <p className='info num'>
        {props.currency} {props.market_cap.toLocaleString()}
      </p>
    </div>
  );
}

export default Coin;

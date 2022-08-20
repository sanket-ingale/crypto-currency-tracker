import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import Coin from './components/Coin';
import ToTop from './components/ToTop'

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [currency, setCurrency] = useState({name: 'USD', symbol: '$'});
  const [flag, setFlag] = useState(false);
  
  const getCurrencyData = async () => {
    const result = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}&order=market_cap_desc&per_page=100&page=1&sparkline=false`);
    setCoins(result.data);
  }

  const handleChange = event => {
    setSearch(event.target.value);
    setCoins(coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()) || coin.symbol.toLowerCase().includes(search.toLowerCase())));
  }
  
  const handleSortEvent = event => {
    setFlag(!flag);
    if(event.target.name === 'asc'){
      if(event.target.value === 'current_price' ||
          event.target.value === 'total_volume' ||
          event.target.value === 'price_change_percentage_24h' ||
          event.target.value === 'market_cap'){
        setCoins(coins.sort((a, b) => a[event.target.value] - b[event.target.value]));
      } else {
        setCoins(coins.sort((a, b) => a[event.target.value].localeCompare(b[event.target.value])));
      }
    } else {
      if(event.target.value === 'current_price' ||
          event.target.value === 'total_volume' ||
          event.target.value === 'price_change_percentage_24h' ||
          event.target.value === 'market_cap'){
        setCoins(coins.sort((a, b) => b[event.target.value] - a[event.target.value]));
      } else {
        setCoins(coins.sort((a, b) => b[event.target.value].localeCompare(a[event.target.value])));
      }
    }
    console.log(coins);
  }

  const handleBtnEvent = event => {
    console.log(event.target.firstChild);
    setCurrency(prevState => {
      return {
        name: event.target.value,
        symbol: event.target.name
      }
    });
  }
  
  useEffect(()=>{
    getCurrencyData();
    console.log('in useEffect');
    console.log(coins);
  }, [currency]);

  return (
    <div className="app">
      <div className="app--title">Crypto Currency Tracker</div>
      <div className='search'>
        <input type="search" placeholder='Search crypto currencies' onChange={handleChange} value={search}/>
        <button className={`currency--btn ${currency.name === 'USD' && `active`}`} onClick={handleBtnEvent} value="USD" name='$'>USD</button>
        <button className={`currency--btn ${currency.name === 'INR' && `active`}`} onClick={handleBtnEvent} value="INR" name='₹'>INR</button>
        <button className={`currency--btn ${currency.name === 'EUR' && `active`}`} onClick={handleBtnEvent} value="EUR" name='€'>EUR</button>
        <button className={`currency--btn ${currency.name === 'GBP' && `active`}`} onClick={handleBtnEvent} value="GBP" name='£'>GBP</button>
        <button className={`currency--btn ${currency.name === 'JPY' && `active`}`} onClick={handleBtnEvent} value="JPY" name='¥'>JPY</button>
      </div>
      <div className='main--row'>
        <div className='subtitle'>
          Name
          <button className='sort asc' onClick={handleSortEvent} value='name' name='asc'/>
          <button className='sort dsc' onClick={handleSortEvent} value='name'/>
        </div>
        <div>
          Symbol
          <button className='sort asc' onClick={handleSortEvent} value='symbol' name='asc'/>
          <button className='sort dsc' onClick={handleSortEvent} value='symbol'/>
        </div>
        <div>
          Current Price
          <button className='sort asc' onClick={handleSortEvent} value='current_price' name='asc'/>
          <button className='sort dsc' onClick={handleSortEvent} value='current_price'/>
        </div>
        <div>
          Total Volume
          <button className='sort asc' onClick={handleSortEvent} value='total_volume' name='asc'/>
          <button className='sort dsc' onClick={handleSortEvent} value='total_volume'/>
        </div>
        <div>
          Price Change
          <button className='sort asc' onClick={handleSortEvent} value='price_change_percentage_24h' name='asc'/>
          <button className='sort dsc' onClick={handleSortEvent} value='price_change_percentage_24h'/>
        </div>
        <div>
          Market Cap
          <button className='sort asc' onClick={handleSortEvent} value='market_cap' name='asc'/>
          <button className='sort dsc' onClick={handleSortEvent} value='market_cap'/>
        </div>
      </div>
      {coins.map((coin, index) => <Coin key={coin.id} index={index} currency={currency.symbol} {...coin}/>)}
      <ToTop/>
    </div>
  );
}

export default App;
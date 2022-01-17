import React, { useState } from 'react';
import './App.sass';

const api = {
  key: '8af6decb2dd5656ac1e2ce5cbf74b81b',
  base: 'http://api.openweathermap.org/data/2.5/'
}

const App = () => {

  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({});

  // обработчик, который срабатывает, когда нажата клавиша Enter или произошел клик по кнопке с классом .search-btn
  const search = e => {
    if (e.key === 'Enter' || e.target.className === 'weather__search-btn') {
      fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setCity('');
        });
    }
  }

  // форматирование даты
  const format_date = (d) => {
    let months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }

  return (
    <div className={(typeof weather.main != 'undefined') ? ((weather.main.temp > 16) ? 'app app--warm' : 'app') : 'app'}>
      <main className='weather app__weather'>
        <div className='weather__search-box'>
          <input
            type='text'
            className='weather__search-bar'
            placeholder='Поиск...'
            onChange={e => setCity(e.target.value)}
            value={city}
            onKeyPress={search}
          />
          <button onClick={search} className='weather__search-btn'>Search</button>
        </div>
        {(typeof weather.main !== 'undefined') ? (
          <div className='weather__forecast forecast'>
            <div className='forecast__block'>
              <div className='forecast__location'>{weather.name}, {weather.sys.country}</div>
              <div className='forecast__date'>{format_date(new Date())}</div>
            </div>
            <div className='forecast__box'>
              <div className='forecast__temp'>
                {Math.round(weather.main.temp)}°c
              </div>
              <div className='forecast__main'>{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (<div className='сity-not-found'>{weather.cod === "404" ? "City not found, you may have entered an incorrect city name" : "Please enter a valid city name"}</div>)}
      </main>
    </div>
  );
}

export default App;
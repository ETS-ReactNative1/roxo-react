import React, { useEffect, useState, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {

  const [filter, setFilter] = useState('')
  const { onLoadIngredients } = props;
  const inputRef = useRef()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (filter === inputRef.current.value) {
        const query = filter.length === 0
          ? ''
          : `?orderBy="title"&equalTo="${filter}"`;

        fetch('https://ingredients-5-default-rtdb.firebaseio.com/ingredients.json' + query)
          .then(response => response.json())
          .then(responseData => {
            const loadedIngredients = []
            for (const key in responseData) {
              loadedIngredients.push({
                id: key,
                title: responseData[key].title,
                amount: responseData[key].amount
              })
            }
            onLoadIngredients(loadedIngredients)
          })
      }
    }, 1000);

    return () => {
      clearTimeout(timer)
    }

  }, [filter, onLoadIngredients, inputRef])

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" value={filter} ref={inputRef}
            onChange={event => setFilter(event.target.value)} />
        </div>
      </Card>
    </section>
  )
})

export default Search;
import React, {useState} from 'react'

const App = () => {
  const [counter, setCounter] = useState(0);
  const [values, setValues] = useState([]);

  const handleClick = () => {
      setCounter(counter + 1)
      setValues(values.concat(counter))
  }

  return (
    <div className="container">
      hello  {counter} clicks
      <button onClick={handleClick}>
      </button>
      <h1>ATM-4-ME</h1>
    </div>
  )
}

export default App
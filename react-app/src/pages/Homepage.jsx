import {useState, useEffect} from 'react'

function Homepage() {
  const [item, setItem] = useState([]);


  useEffect(() => {
    
  }, [])

  return (
    <div>
      This is Homepage

      <ul>
        {item.map((item, key) => (
          <>
            <li key={key}>{item.name}</li>
            <li>{item.body}</li>
          </>
        ))}
      </ul>
    </div>
  )
}

export default Homepage

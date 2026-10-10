import { useState, useEffect } from 'react'
import './App.css'

function App() {
const [hakusana, setHakusana] = useState('')
const [rodut, setRodut] = useState([])
{/*APIn liittäminen*/}
useEffect(() => {
  async function haeRodut() {
    const vastaus = await fetch('https://dogapi.dog/api/v2/breeds?page%5Bsize%5D=1000')
    const data = await vastaus.json()
    console.log(data.data)
    setRodut(data.data)
  }
  haeRodut()
}, [])

  return (
    <>
      <section id="center">
        <div>
          <h1>Koirarotuhaku</h1>
          <p>
            Hae koirarotuja, valitse suosikkisi ja vertaile niiden ominaisuuksia.
          </p>
        </div>
        {/*hakukenttä*/}
        <input          
          type="text"
          placeholder="Hae koirarotua..."
          value={hakusana}
          onChange={(tapahtuma) => setHakusana(tapahtuma.target.value)}
        />
        <p>
          Hakusana: {hakusana}
        </p>
        {/*hakutulokset*/}
        <ul>
          {rodut
            .filter((rotu) => rotu.attributes.name.toLowerCase().includes(hakusana.toLowerCase()))
            .map((rotu) => (
              <li key={rotu.id}>
                <h3>{rotu.attributes.name}</h3>
              </li>
            ))}
        </ul>
      </section>
      
      
    </>
  )
}

export default App

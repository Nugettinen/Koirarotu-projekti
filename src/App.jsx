import { useState, useEffect } from 'react'
import './App.css'

function App() {
const [hakusana, setHakusana] = useState('')
const [rodut, setRodut] = useState([])
const [valittuRotu, setValittuRotu] = useState(null)
const suodatetutRodut = rodut.filter((rotu) =>
  rotu.attributes.name.toLowerCase().includes(hakusana.toLowerCase())
)
{/*APIn liittäminen*/}
useEffect(() => {
  async function haeRodut() {
    const vastaus = await fetch('https://dogapi.dog/api/v2/breeds?page%5Bsize%5D=1000')
    const data = await vastaus.json()
    console.log(data.data[0])
    setRodut(data.data)
  }
  haeRodut()
}, [])

{/*TOINEN SCREEN:Valitun koirarodun näyttäminen*/}
if (valittuRotu !== null) {
  console.log(valittuRotu)
  return (
    <section>
      <h1>{valittuRotu.attributes.name}</h1>
      <img 
                src={valittuRotu.attributes.images[0].thumb}
                alt={valittuRotu.attributes.name}
              />
      <p> Elinikä: {valittuRotu.attributes.life.min} - {valittuRotu.attributes.life.max} vuotta </p>
      <p> Uroksen paino: {valittuRotu.attributes.male_weight.min} - {valittuRotu.attributes.male_weight.max} kg </p>
      <p> Nartun paino: {valittuRotu.attributes.female_weight.min} - {valittuRotu.attributes.female_weight.max} kg </p>
      <p> Uroksen säkäkorkeus: {valittuRotu.attributes.male_height.min} - {valittuRotu.attributes.male_height.max} cm </p>
      <p> Nartun säkäkorkeus: {valittuRotu.attributes.female_height.min} - {valittuRotu.attributes.female_height.max} cm </p>
      <p> Alkuperä: {valittuRotu.attributes.origin.country}, {valittuRotu.attributes.origin.region} {valittuRotu.attributes.origin.era}</p>
      <p> Turkin väri: {valittuRotu.attributes.coat.colors.join(', ')} </p>
      <p> Turkin pituus: {valittuRotu.attributes.coat.length}</p> 
      <p> Turkin tyyppi: {valittuRotu.attributes.coat.type}</p>
      <p> Onko rotu hypoallergeeninen: {valittuRotu.attributes.hypoallergenic ? 'Kyllä' : 'Ei'}</p>
      <p> Muuta: {valittuRotu.attributes.description}</p>
      <button onClick={() => setValittuRotu(null)}>Takaisin</button>
      </section>)}

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
          Hakutulokset: {suodatetutRodut.length} kpl
        </p>
        {/*hakutulokset*/}
        <ul className="rotu-taulukko">
          {suodatetutRodut.map((rotu) => (
            <li key={rotu.id}
              onClick={() => setValittuRotu(rotu)}
            >
              <img 
                src={rotu.attributes.images[0].thumb}
                alt={rotu.attributes.name}
              />
              <h3>{rotu.attributes.name}</h3>
            </li>
          ))}
        </ul>
        {suodatetutRodut.length === 0 && hakusana !== '' && (
          <p>Ei hakutuloksia</p>
        )}
      </section>
      
      
    </>
  )
}

export default App

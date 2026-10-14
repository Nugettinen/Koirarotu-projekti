import { useState, useEffect } from 'react'
import './App.css'

function App() {
const [virhe, setVirhe] = useState(null)
const [hakusana, setHakusana] = useState('')
const [rodut, setRodut] = useState([])
const [valittuRotu, setValittuRotu] = useState(null)
const [suosikit, setSuosikit] = useState([])
const [naytaSuosikit, setNaytaSuosikit] = useState(false)
const suodatetutRodut = rodut.filter((rotu) =>
  rotu.attributes.name.toLowerCase().includes(hakusana.toLowerCase())
)
{/*APIn liittäminen*/}
useEffect(() => {
  async function haeRodut() {
    try {
    const vastaus = await fetch('https://dogapi.dog/api/v2/breeds?page%5Bsize%5D=1000')
    if (!vastaus.ok) {
      throw new Error('API-pyyntö epäonnistui')}
    const data = await vastaus.json()
    setRodut(data.data)
  } catch (error) {
    setVirhe('Virhe tietojen lataamisessa')
  }
  }
  haeRodut()
}, [])

{/*TOINEN SCREEN:Valitun koirarodun näyttäminen*/}
if (valittuRotu !== null) {
  const onkoSuosikki = suosikit.some((rotu) => rotu.id === valittuRotu.id)
  return (
    <section>
      {virhe && <p>{virhe}</p>}
      <h1>{valittuRotu.attributes.name}</h1>
      <button onClick={() => {
        if (suosikit.some((rotu) => rotu.id === valittuRotu.id)) {
          setSuosikit(suosikit.filter((rotu) => rotu.id !== valittuRotu.id))
        } else {setSuosikit([...suosikit, valittuRotu])}
      }}>
        {onkoSuosikki ? '★' : '☆' }</button>

      {/*Etusivu-nappi ja vertailusivu-nappi*/}
      <button onClick={() => {
                          setValittuRotu(null)
                          setNaytaSuosikit(false)}}>
                          Etusivu 
                          </button>
      <button onClick={() => {
                          setNaytaSuosikit(true)
                          setValittuRotu(null)}}>
                          Vertailu
                          </button>
      <img 
                src={valittuRotu.attributes.images[0].thumb}
                alt={valittuRotu.attributes.name}
              />
      {/*Näytetään valitun koirarodun ominaisuudet*/}        
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
      </section>)}

{/*KOLMAS SCREEN: Suosikkien listaus ja vertailu*/}
if (naytaSuosikit) {
  return (
    <section>
      {virhe && <p>{virhe}</p>}
      <h1>Suosikki rodut</h1>
      <button onClick={() => setNaytaSuosikit(false)}>Etusivu</button>
      {suosikit.length === 0 ? 
      (<p>Ei suosikkirotuja valittuna</p>) 
      :(
      <table>
        <thead className="suosikki-otsikko">
          <tr>
            <th>Rotu</th>
            <th>Elinikä</th>
            <th>Uroksen<br />paino</th>
            <th>Nartun<br />paino</th>
            <th>Uroksen<br />säkäkorkeus</th>
            <th>Nartun<br />säkäkorkeus</th>
            <th>Hypo-<br />allergeeninen</th>
          </tr>
        </thead>
        <tbody className="suosikki-taulukko">
          {suosikit.map((rotu) => (
            <tr key={rotu.id} onClick={() => setValittuRotu(rotu)}>
              <td className="rotu-solu">
                <img 
                  src={rotu.attributes.images[0].thumb}
                  alt={rotu.attributes.name}
                  className="suosikki-kuva"
                />
                <span>{rotu.attributes.name}</span>
              </td>
              <td>{rotu.attributes.life.min} - {rotu.attributes.life.max} vuotta</td>
              <td>{rotu.attributes.male_weight.min} - {rotu.attributes.male_weight.max} kg</td>
              <td>{rotu.attributes.female_weight.min} - {rotu.attributes.female_weight.max} kg</td>
              <td>{rotu.attributes.male_height.min} - {rotu.attributes.male_height.max} cm</td>
              <td>{rotu.attributes.female_height.min} - {rotu.attributes.female_height.max} cm</td>
              <td>{rotu.attributes.hypoallergenic ? 'Kyllä' : 'Ei'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </section>
  )
}
{/*ENSIMMÄINEN SCREEN: Hakutulosten näyttäminen*/}
  return (
    <>
    {virhe && <p>{virhe}</p>}
      <section id="center">
        <div>
          <h1>Koirarotuhaku</h1>
          <p>
            Hae koirarotuja, valitse suosikkisi ja vertaile niiden ominaisuuksia.
          </p>
        </div>
        <button onClick={() => setNaytaSuosikit(true)}>
          Näytä suosikit
          </button>
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

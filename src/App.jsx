import { useState, useEffect } from 'react'
import './App.css'
import Etusivu from './Etusivu.jsx'
import Rotuprofiili from './Rotuprofiili.jsx'
import Vertailu from './Vertailu.jsx'

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
  return (
    <Rotuprofiili 
      valittuRotu={valittuRotu}
      virhe={virhe}
      suosikit={suosikit}
      setSuosikit={setSuosikit}
      setValittuRotu={setValittuRotu}
      setNaytaSuosikit={setNaytaSuosikit}
    />
  )
}

{/*KOLMAS SCREEN: Suosikkien listaus ja vertailu*/}
if (naytaSuosikit) {
  return (
    <Vertailu 
      virhe={virhe}
      suosikit={suosikit}
      setValittuRotu={setValittuRotu}
      setNaytaSuosikit={setNaytaSuosikit}
    />
  )
}
      

{/*ENSIMMÄINEN SCREEN: Etusivu, jossa hakukenttä ja hakutulokset*/}
return (
  <Etusivu 
    virhe={virhe}
    hakusana={hakusana}
    setHakusana={setHakusana}
    suodatetutRodut={suodatetutRodut}
    setValittuRotu={setValittuRotu}
    setNaytaSuosikit={setNaytaSuosikit}
  />
)
} 

export default App

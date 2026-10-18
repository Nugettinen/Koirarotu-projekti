import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useParams } from 'react-router-dom'
import './App.css'
import Etusivu from './Etusivu.jsx'
import Rotuprofiili from './Rotuprofiili.jsx'
import Vertailu from './Vertailu.jsx'

function App() {
const navigate = useNavigate()
const [virhe, setVirhe] = useState(null)
const [hakusana, setHakusana] = useState('')
const [rodut, setRodut] = useState([])
const [lataa, setLataa] = useState(true)
const [suosikit, setSuosikit] = useState([])
const suodatetutRodut = rodut.filter((rotu) => rotu.attributes.name.toLowerCase().includes(hakusana.toLowerCase()))

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
    finally {
      setLataa(false)}
  }
  haeRodut()
}, [])

{/*TOINEN SCREEN:Valitun koirarodun näyttäminen*/}
return (
  <Routes>
    <Route
      path="/"
      element={
        <Etusivu
          virhe={virhe}
          hakusana={hakusana}
          setHakusana={setHakusana}
          suodatetutRodut={suodatetutRodut}
          onValitseRotu={(rotu) => navigate(`/rotu/${rotu.id}`)}
          onAvaaSuosikit={() => navigate('/suosikit')}
        />
      }
    />
    <Route
      path="/rotu/:id"
      element={
        <RotuReitti
          rodut={rodut}
          virhe={virhe}
          lataa={lataa}
          suosikit={suosikit}
          setSuosikit={setSuosikit}
          onEtusivu={() => navigate('/')}
          onVertailu={() => navigate('/suosikit')}
        />
      }
    />
        <Route
      path="/suosikit"
      element={
        <Vertailu
          virhe={virhe}
          suosikit={suosikit}
          onEtusivu={() => navigate('/')}
          onValitseRotu={(rotu) => navigate(`/rotu/${rotu.id}`)}
        />
      }
    />
  </Routes>
)
}


function RotuReitti({ rodut, virhe, lataa, suosikit, setSuosikit, onEtusivu, onVertailu }) {
  const { id } = useParams()
  const valittuRotu = rodut.find((rotu) => rotu.id === id)

  if (!valittuRotu) {
    if (virhe) {
      return <p> {virhe}</p>
    }
    if (lataa) {
    return <p>Ladataan rodun tietoja...</p>
    }
    return <p>Rotua ei löytynyt.</p>
  }

  return (
    <Rotuprofiili
      valittuRotu={valittuRotu}
      virhe={virhe}
      suosikit={suosikit}
      setSuosikit={setSuosikit}
      onEtusivu={onEtusivu}
      onVertailu={onVertailu}
    />
  )
}
export default App

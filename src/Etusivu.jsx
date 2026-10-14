function Etusivu({ virhe, hakusana, setHakusana, suodatetutRodut, setValittuRotu, setNaytaSuosikit }) {

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
  )}

  export default Etusivu

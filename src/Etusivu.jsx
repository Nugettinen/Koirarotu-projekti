function Etusivu({ virhe, hakusana, setHakusana, suodatetutRodut, onValitseRotu, onAvaaSuosikit }) {

return (
    <>
    {virhe && <p>{virhe}</p>}
      <section id="center" className="container py-4">
        <div>
          <h1>Koirarotu-haku</h1>
          <p>
            Hae koirarotuja, valitse suosikkisi ja vertaile niiden ominaisuuksia.
          </p>
        </div>
        <button className="btn btn-outline-secondary mb-3" 
        onClick={() => onAvaaSuosikit()}>
          Näytä suosikit
          </button>
        {/*hakukenttä*/}
        <input 
          className="form-control mb-3"         
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
              onClick={() => onValitseRotu(rotu)}
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

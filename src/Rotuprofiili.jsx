function Rotuprofiili({valittuRotu,virhe,suosikit,setSuosikit,onEtusivu,onVertailu}) 
{
  const onkoSuosikki = suosikit.some((rotu) => rotu.id === valittuRotu.id)

  return (
    <section className="container py-4 rotu-profiili" >
      {virhe && <p>{virhe}</p>}
      <h1 className="rotu-profiili-otsikko">
        {valittuRotu.attributes.name}</h1>
      <div className="d-flex justify-content-center gap-2">
      <button className="btn btn-outline-secondary rotuprofiili-nappi" onClick={() => {
        if (suosikit.some((rotu) => rotu.id === valittuRotu.id)) {
          setSuosikit(suosikit.filter((rotu) => rotu.id !== valittuRotu.id))
        } else {setSuosikit([...suosikit, valittuRotu])}
      }}>
        {onkoSuosikki ? '★' : '☆' }</button>

      {/*Etusivu-nappi ja vertailusivu-nappi*/}
      <button className="btn btn-outline-secondary rotuprofiili-nappi" onClick={() => {
                        onEtusivu()}}>
                          Etusivu 
                          </button>
      <button className="btn btn-outline-secondary rotuprofiili-nappi" onClick={() => {
                        onVertailu()}}>
                          Vertailu
                          </button>
      </div>                    
      <img 
                src={valittuRotu.attributes.images[0].thumb}
                alt={valittuRotu.attributes.name}
                className="rotu-profiili-kuva"
              />
      {/*Näytetään valitun koirarodun ominaisuudet*/}        
      <p className="rotu-profiili-teksti"> Elinikä: {valittuRotu.attributes.life.min} - {valittuRotu.attributes.life.max} vuotta </p>
      <p className="rotu-profiili-teksti"> Uroksen paino: {valittuRotu.attributes.male_weight.min} - {valittuRotu.attributes.male_weight.max} kg </p>
      <p className="rotu-profiili-teksti"> Nartun paino: {valittuRotu.attributes.female_weight.min} - {valittuRotu.attributes.female_weight.max} kg </p>
      <p className="rotu-profiili-teksti"> Uroksen säkäkorkeus: {valittuRotu.attributes.male_height.min} - {valittuRotu.attributes.male_height.max} cm </p>
      <p className="rotu-profiili-teksti"> Nartun säkäkorkeus: {valittuRotu.attributes.female_height.min} - {valittuRotu.attributes.female_height.max} cm </p>
      <p className="rotu-profiili-teksti"> Alkuperä: {valittuRotu.attributes.origin.country}, {valittuRotu.attributes.origin.region} {valittuRotu.attributes.origin.era}</p>
      <p className="rotu-profiili-teksti"> Turkin väri: {valittuRotu.attributes.coat.colors.join(', ')} </p>
      <p className="rotu-profiili-teksti"> Turkin pituus: {valittuRotu.attributes.coat.length}</p> 
      <p className="rotu-profiili-teksti"> Turkin tyyppi: {valittuRotu.attributes.coat.type}</p>
      <p className="rotu-profiili-teksti"> Onko rotu hypoallergeeninen: {valittuRotu.attributes.hypoallergenic ? 'Kyllä' : 'Ei'}</p>
      <p className="rotu-profiili-teksti"> Muuta: {valittuRotu.attributes.description}</p>
      </section>
  )
}

export default Rotuprofiili
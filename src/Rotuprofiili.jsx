function Rotuprofiili({valittuRotu,virhe,suosikit,setSuosikit,setValittuRotu,setNaytaSuosikit}) 
{
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
      </section>
  )
}

export default Rotuprofiili
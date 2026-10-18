function Vertailu({ virhe, suosikit, onEtusivu, onValitseRotu }) {

    return (
            <section className="container py-4">
            {virhe && <p>{virhe}</p>}
            <h1>Suosikki rodut</h1>
            <p>
            Vertaile suosikkirotujesi keskeisiä ominaisuuksia.
            </p>
            <button className="btn btn-outline-secondary rotuprofiili-nappi" onClick={() => onEtusivu()}>Etusivu</button>
            {suosikit.length === 0 ? 
            (<p>Ei suosikkirotuja valittuna</p>) 
            :(
            <div className="table-container">
            <table className="table table-striped">
                <thead className="suosikki-otsikko">
                <tr>
                    <th>Rotu</th>
                    <th>Elinikä</th>
                    <th>Uroksen<br />paino</th>
                    <th className="nartun-tiedot" >Nartun<br />paino</th>
                    <th>Uroksen<br />säkäkorkeus</th>
                    <th className="nartun-tiedot" >Nartun<br />säkäkorkeus</th>
                    <th>Hypo-<br />allergeeninen</th>
                </tr>
                </thead>
                <tbody className="suosikki-taulukko">
                {suosikit.map((rotu) => (
                    <tr key={rotu.id} onClick={() => onValitseRotu(rotu)}>
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
                    <td className="nartun-tiedot" >{rotu.attributes.female_weight.min} - {rotu.attributes.female_weight.max} kg</td>
                    <td>{rotu.attributes.male_height.min} - {rotu.attributes.male_height.max} cm</td>
                    <td className="nartun-tiedot" >{rotu.attributes.female_height.min} - {rotu.attributes.female_height.max} cm</td>
                    <td>{rotu.attributes.hypoallergenic ? 'Kyllä' : 'Ei'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
            )}
            </section>


  )
}

export default Vertailu
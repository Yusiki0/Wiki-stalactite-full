import { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import '../styles/pokedex.css';

interface Pokemon {
  number: number;
  name: string;
  types: string[];
}

export const Pokedex = () => {
  const intl = useIntl();
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  useEffect(() => {
    const pokemons: Pokemon[] = [
      { number: 1, name: 'Cherbi', types: ['Plante', 'Glace'] },
      { number: 2, name: 'Sylveris', types: ['Plante', 'Glace'] },
      { number: 3, name: 'Bouccolère', types: ['Plante', 'Glace'] },
      { number: 4, name: 'Feuriglou', types: ['Feu', 'Glace'] },
      { number: 5, name: 'Pyroflair', types: ['Feu', 'Glace'] },
      { number: 6, name: 'Flambraze', types: ['Feu', 'Glace'] },
      { number: 7, name: 'Lébullio', types: ['Eau', 'Glace'] },
      { number: 8, name: 'Larmyce', types: ['Eau', 'Glace'] },
      { number: 9, name: 'Larméclat', types: ['Eau', 'Glace'] },
      { number: 10, name: 'Chenipan de Citados', types: ['Glace'] },
      { number: 11, name: 'Chrysacier de Citados', types: ['Glace'] },
      { number: 12, name: 'Papilusion de Citados', types: ['Glace', 'Ténèbres'] },
      { number: 13, name: 'Aspicot', types: ['Insecte', 'Poison'] },
      { number: 14, name: 'Coconfort', types: ['Insecte', 'Poison'] },
      { number: 15, name: 'Dardargnan', types: ['Insecte', 'Poison'] },
      { number: 16, name: 'Héricendre de Citados', types: ['Glace'] },
      { number: 17, name: 'Feurisson de Citace', types: ['Glace'] },
      { number: 18, name: 'Typhlosion de Citados', types: ['Glace', 'Combat'] },
      { number: 19, name: 'Miaouss de Citados', types: ['Glace'] },
      { number: 20, name: 'Persian de Citados', types: ['Glace'] },
      { number: 21, name: 'Alcari', types: ['Glace'] },
      { number: 22, name: 'Alkelen', types: ['Glace'] },
      { number: 23, name: 'Alkerex', types: ['Glace', 'Combat'] },
      { number: 24, name: 'Goupix d\'Alola', types: ['Glace'] },
      { number: 25, name: 'Feunard d\'Alola', types: ['Glace', 'Fée'] },
      { number: 26, name: 'Togedemaru', types: ['Électrik', 'Acier'] },
      { number: 27, name: 'Keunotor', types: ['Normal'] },
      { number: 28, name: 'Castorno', types: ['Normal', 'Eau'] },
      { number: 29, name: 'Laporeille', types: ['Normal'] },
      { number: 30, name: 'Lockpin', types: ['Normal'] },
      { number: 31, name: 'Tarsal', types: ['Psy', 'Fée'] },
      { number: 32, name: 'Kirlia', types: ['Psy', 'Fée'] },
      { number: 33, name: 'Gardevoir', types: ['Psy', 'Fée'] },
      { number: 34, name: 'Gallame', types: ['Psy', 'Combat'] },
      { number: 35, name: 'Polarhume', types: ['Glace'] },
      { number: 36, name: 'Polagriffe', types: ['Glace'] },
      { number: 37, name: 'Sorbébé', types: ['Glace'] },
      { number: 38, name: 'Sorboul', types: ['Glace'] },
      { number: 39, name: 'Sorbouboul', types: ['Glace'] },
      { number: 40, name: 'Cadoizo', types: ['Glace', 'Vol'] },
      { number: 41, name: 'Mimigal', types: ['Insecte', 'Poison'] },
      { number: 42, name: 'Migalos', types: ['Insecte', 'Poison'] },
      { number: 43, name: 'Mystherbe', types: ['Plante', 'Poison'] },
      { number: 44, name: 'Ortide', types: ['Plante', 'Poison'] },
      { number: 45, name: 'Rafflesia', types: ['Plante', 'Poison'] },
      { number: 46, name: 'Flabébé', types: ['Fée'] },
      { number: 47, name: 'Floette', types: ['Fée'] },
      { number: 48, name: 'Florges', types: ['Fée'] },
      { number: 49, name: 'Moumouton', types: ['Normal'] },
      { number: 50, name: 'Moumouflon', types: ['Normal'] },
      { number: 51, name: 'Insolourdo', types: ['Normal'] },
      { number: 52, name: 'Ramoloss', types: ['Eau', 'Psy'] },
      { number: 53, name: 'Flagadoss', types: ['Eau', 'Psy'] },
      { number: 54, name: 'Cradopaud', types: ['Poison', 'Combat'] },
      { number: 55, name: 'Coatox', types: ['Poison', 'Combat'] },
      { number: 56, name: 'Canarticho', types: ['Normal', 'Vol'] },
      { number: 57, name: 'Rocabot', types: ['Roche'] },
      { number: 58, name: 'Lougaroc (Diurne)', types: ['Roche'] },
      { number: 59, name: 'Onix', types: ['Roche'] },
      { number: 60, name: 'Météno', types: ['Roche', 'Vol'] },
      { number: 61, name: 'Amagara', types: ['Roche', 'Sol'] },
      { number: 62, name: 'Dragmara', types: ['Roche', 'Glace'] },
      { number: 63, name: 'Maracachi', types: ['Plante'] },
      { number: 64, name: 'Blizzi', types: ['Plante', 'Glace'] },
      { number: 65, name: 'Blizzaroi', types: ['Plante', 'Glace'] },
      { number: 66, name: 'Arakdo', types: ['Insecte', 'Eau'] },
      { number: 67, name: 'Maskadra', types: ['Insecte', 'Eau'] },
      { number: 68, name: 'Cheniti', types: ['Insecte'] },
      { number: 69, name: 'Cheniselle', types: ['Insecte', 'Plante'] },
      { number: 70, name: 'Papilord', types: ['Insecte', 'Vol'] },
      { number: 71, name: 'Sabelette d\'Alola', types: ['Glace', 'Acier'] },
      { number: 72, name: 'Sablaireau d\'Alola', types: ['Glace', 'Acier'] },
      { number: 73, name: 'Solochi de Citados', types: ['Glace'] },
      { number: 74, name: 'Diamat de Citados', types: ['Glace'] },
      { number: 75, name: 'Trioxhydre de Citados', types: ['Glace', 'Ténèbres'] },
      { number: 76, name: 'Otaria', types: ['Eau'] },
      { number: 77, name: 'Lamantine', types: ['Eau', 'Glace'] },
      { number: 78, name: 'Obalie', types: ['Glace', 'Eau'] },
      { number: 79, name: 'Phlogeur', types: ['Glace', 'Eau'] },
      { number: 80, name: 'Kaimorse', types: ['Glace', 'Eau'] },
      { number: 81, name: 'M. Mime de Galar', types: ['Glace', 'Psy'] },
      { number: 82, name: 'M. Glaquette', types: ['Glace', 'Psy'] },
      { number: 83, name: 'Osselait', types: ['Sol'] },
      { number: 84, name: 'Ossatueur', types: ['Sol'] },
      { number: 85, name: 'Wattouat', types: ['Électrik'] },
      { number: 86, name: 'Lainergie', types: ['Électrik'] },
      { number: 87, name: 'Pharamp', types: ['Électrik'] },
      { number: 88, name: 'Smogo', types: ['Poison'] },
      { number: 89, name: 'Smogogo', types: ['Poison'] },
      { number: 90, name: 'Goinfrex', types: ['Normal'] },
      { number: 91, name: 'Ronflex', types: ['Normal'] },
      { number: 92, name: 'Baudrive', types: ['Spectre', 'Vol'] },
      { number: 93, name: 'Grodrive', types: ['Spectre', 'Vol'] },
      { number: 94, name: 'Farfuret', types: ['Ténèbres', 'Glace'] },
      { number: 95, name: 'Dimoret', types: ['Ténèbres', 'Glace'] },
      { number: 96, name: 'Stalgamin', types: ['Glace'] },
      { number: 97, name: 'Oniglali', types: ['Glace'] },
      { number: 98, name: 'Momartik', types: ['Glace', 'Spectre'] },
      { number: 99, name: 'Crabagarre', types: ['Combat'] },
      { number: 100, name: 'Crabominable', types: ['Combat', 'Glace'] },
      { number: 101, name: 'Dedenne', types: ['Électrik', 'Fée'] },
      { number: 102, name: 'Draby', types: ['Dragon'] },
      { number: 103, name: 'Drackhaus', types: ['Dragon'] },
      { number: 104, name: 'Drattak', types: ['Dragon', 'Vol'] },
      { number: 105, name: 'Bekaglaçon', types: ['Glace'] },
      { number: 106, name: 'Lippouti', types: ['Glace', 'Psy'] },
      { number: 107, name: 'Lippoutou', types: ['Glace', 'Psy'] },
      { number: 108, name: 'Férosinge', types: ['Combat'] },
      { number: 109, name: 'Colossinge', types: ['Combat'] },
      { number: 110, name: 'Malosse', types: ['Ténèbres', 'Feu'] },
      { number: 111, name: 'Démolosse', types: ['Ténèbres', 'Feu'] },
      { number: 112, name: 'Grainipiot', types: ['Plante'] },
      { number: 113, name: 'Pifeuil', types: ['Plante', 'Ténèbres'] },
      { number: 114, name: 'Tengalice', types: ['Plante', 'Ténèbres'] },
      { number: 115, name: 'Caninos', types: ['Feu'] },
      { number: 116, name: 'Arcanin', types: ['Feu'] },
      { number: 117, name: 'Passerouge', types: ['Feu', 'Vol'] },
      { number: 118, name: 'Braisillon', types: ['Feu', 'Vol'] },
      { number: 119, name: 'Flambusard', types: ['Feu', 'Vol'] },
      { number: 120, name: 'Poussifeu', types: ['Feu'] },
      { number: 121, name: 'Galifeu', types: ['Feu', 'Combat'] },
      { number: 122, name: 'Braségali', types: ['Feu', 'Combat'] },
      { number: 123, name: 'Darumarond de Galar', types: ['Glace'] },
      { number: 124, name: 'Darumacho de Galar', types: ['Glace'] },
      { number: 125, name: 'Mimiqui de Citados', types: ['Glace'] },
      { number: 126, name: 'Fantyrm', types: ['Dragon', 'Spectre'] },
      { number: 127, name: 'Dispareptil', types: ['Dragon', 'Spectre'] },
      { number: 128, name: 'Lanssorien', types: ['Dragon', 'Spectre'] },
      { number: 129, name: 'Moufouette', types: ['Poison', 'Ténèbres'] },
      { number: 130, name: 'Moufflair', types: ['Poison', 'Ténèbres'] },
      { number: 131, name: 'Marcacrin', types: ['Glace', 'Sol'] },
      { number: 132, name: 'Cochignon', types: ['Glace', 'Sol'] },
      { number: 133, name: 'Mammochon', types: ['Glace', 'Sol'] },
      { number: 134, name: 'Grelaçon', types: ['Glace'] },
      { number: 135, name: 'Séracrawl', types: ['Glace'] },
      { number: 136, name: 'Vivaldaim', types: ['Normal', 'Plante'] },
      { number: 137, name: 'Haydaim', types: ['Normal', 'Plante'] },
      { number: 138, name: 'Racaillou', types: ['Roche', 'Sol'] },
      { number: 139, name: 'Gravalanch', types: ['Roche', 'Sol'] },
      { number: 140, name: 'Grolem', types: ['Roche', 'Sol'] },
      { number: 141, name: 'Minidraco', types: ['Dragon'] },
      { number: 142, name: 'Draco', types: ['Dragon'] },
      { number: 143, name: 'Dracolosse', types: ['Dragon', 'Vol'] },
      { number: 144, name: 'Riolu', types: ['Combat'] },
      { number: 145, name: 'Lucario', types: ['Combat', 'Acier'] },
      { number: 146, name: 'Coupenotte', types: ['Dragon'] },
      { number: 147, name: 'Incisache', types: ['Dragon'] },
      { number: 148, name: 'Tranchodon', types: ['Dragon'] },
      { number: 149, name: 'Goélise', types: ['Eau', 'Vol'] },
      { number: 150, name: 'Bekipan', types: ['Eau', 'Vol'] },
      { number: 151, name: 'Évoli de Citados', types: ['Spectre'] },
    ];
      setPokemonList(pokemons);
  }, []);

  const typeColors: Record<string, string> = {
    Plante: '#78C850',
    Feu: '#F08030',
    Eau: '#6890F0',
    Électrik: '#F8D030',
    Glace: '#98D8D8',
    Combat: '#C03028',
    Poison: '#A040A0',
    Sol: '#E0C068',
    Vol: '#A890F0',
    Psy: '#F85888',
    Ténèbres: '#705848',
    Dragon: '#7038F8',
    Fée: '#EE99AC',
    Normal: '#A8A878',
    Acier: '#B8B8D0',
    Roche: '#B8A038',
    Spectre: '#705898',
    Insecte: '#A8B820',
  };

  return (
    <div className="pokedex-page">
      <div className="pokedex-header">
        <h1>{intl.formatMessage({ id: 'pokedex.headerTitle' })}</h1>
        <p>{intl.formatMessage({ id: 'pokedex.headerDesc' })}</p>
      </div>
      <table className="pokedex-table">
        <thead>
          <tr>
            <th>{intl.formatMessage({ id: 'pokedex.table.number' })}</th>
            <th>{intl.formatMessage({ id: 'pokedex.table.name' })}</th>
            <th>{intl.formatMessage({ id: 'pokedex.table.types' })}</th>
          </tr>
        </thead>
        <tbody>
          {pokemonList.map((pokemon) => (
            <tr key={pokemon.number}>
              <td>
                <span className="pokemon-number">
                  #{pokemon.number.toString().padStart(3, '0')}
                </span>
              </td>
              <td>
                <span className="pokemon-name">
                  {intl.formatMessage({ id: `pokedex.pokemon.${pokemon.number}.name` }, { defaultMessage: pokemon.name })}
                </span>
              </td>
              <td>
                <div className="pokemon-types">
                  {pokemon.types.map((type) => (
                    <span
                      key={type}
                      className="pokemon-type"
                      style={{ backgroundColor: typeColors[type] || '#777' }}
                    >
                      {intl.formatMessage({ id: `type.${type}` }, { defaultMessage: type })}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

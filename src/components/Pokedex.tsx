import { useState, useEffect } from 'react';
import '../styles/pokedex.css';

interface Pokemon {
  number: number;
  name: string;
  types: string[];
  image?: string; // URL de l'icône officielle si disponible
}

export const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  useEffect(() => {
    // Ici on met les Pokémon/fakemon
    const pokemons: Pokemon[] = [
      { number: 1, name: 'Cherbi', types: ['Plante', 'Glace'], image: '' },
      { number: 2, name: 'Cornegivre', types: ['Plante', 'Glace'], image: '' },
      { number: 3, name: 'Bouccolère', types: ['Plante', 'Glace'], image: '' },
      // … ajoute tous les autres pokémon/fakemon ici
      { number: 151, name: 'Évoli de Citados', types: ['Spectre'] }
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
        <h1>Pokédex de Citados</h1>
        <p>Découvrez tous les Pokémon et formes régionales de la région de Citados.</p>
      </div>
      <div className="pokedex-grid">
        {pokemonList.map(pokemon => (
          <div key={pokemon.number} className="pokemon-card">
            <div className="pokemon-image">
              {pokemon.image ? <img src={pokemon.image} alt={pokemon.name} /> : <div className="placeholder">❓</div>}
            </div>
            <div className="pokemon-info">
              <span className="pokemon-number">#{pokemon.number}</span>
              <h3 className="pokemon-name">{pokemon.name}</h3>
              <div className="pokemon-types">
                {pokemon.types.map(type => (
                  <span key={type} className="pokemon-type" style={{ backgroundColor: typeColors[type] || '#777' }}>
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

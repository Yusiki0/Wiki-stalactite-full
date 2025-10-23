import React, { JSX } from 'react';

type CreditGroup = {
  title: string;
  items: string[];
};

const credits: CreditGroup[] = [
  { title: 'Main Supporter', items: ['Pokémon Workshop'] },
  { title: 'Créateur de Pokémon Stalactite', items: ['Yusiki'] },
  { title: 'Aide Proche', items: ['Kit', 'Flo', 'Alessio', 'Dark Rider'] },
  { title: 'Soutien de première heure', items: ['Kazzyx', 'Flolo'] },
  { title: 'Concept Art', items: ['Maytarri', 'Nastimz', 'Flolo', 'Jellal_F', 'Carnavaliaa', 'eysselia', 'ArthurOufGuedin', 'The Cool Artist', 'Girasol'] },
  { title: 'Pixel Art', items: ['Halpharox', 'Revali', 'Flolo', 'Mathieu', 'Dracoyan', 'Cosmo'] },
  { title: 'Aide développement', items: ['Ayfoth'] },
  { title: 'Scénario', items: ['Noé alias Tyberiom'] },
  { title: 'Aide level design', items: ['Wujek'] },
  { title: 'Metagame - BDD', items: ['Wujek'] },
  { title: 'Idées', items: ['Dashiruba', 'SpikeXsqual', 'Tyfloflo'] },
];

const ressourcesGraphiques = [
  'peekychew || alucus', 'ultimatetraveler || hek el grande', 'alphacerz || princess-phoenix', 'Pablus94 || Alistair Tileset', 'Rayquaza-dot || Citrine Tileset', 'Evolina Tileset || Epicday', 'zetavares852 || Akizakura16', 'Magiscraft || Saurave', 'rhevarhe_duh || ShinyLugia249', 'POKEM4NlAC || Phyromatical', 'EVoLiNa || SirLinfey', 'Sayfdine || Soul', 'Girasol || Kyle-Dove', 'necrolichmon || KleinStudio', 'Essentials || Eurons', 'The-Red-eX || LOX', 'LeMarron || ChaoticCherryCake', 'Slaqueen || Zeo254', 'ditto209 || Slaqueen', 'SpriteMight || SirMalo', 'aveontrainer'
];

const music = ['Zame || ND Music'];
const animatedSprites = ['BluebirdDxD || Zhec', 'Xarrin || Invatorzen', 'Aelysya'];
const spanishPluginContribs = [
  'Tenshi of War || DPertierra', 'Skyflyer|| Hellfire_raptor', 'Antiant || AshnixsLaw', 'AyanoCloud || Azrita', 'BR0DE0 || Caruban', 'Creobnil || DanEx', 'Diegotoon20 || dimbly', 'ekurepu || Ebaru', 'EricLostie || Falcon7', 'Federico97 ez || Fleimer', 'Franark122k || Hellfire0raptor', 'HM100 || HyperactiveFlummi', 'iametrine || Involuntary-Twitch', 'ItsYugen || jinta', 'justnyxnow || KingOfThe-X-Roads', 'kiriaura || Legit Username', 'localghost || lucasomi', 'MallowOut || mangalos810', 'MCH4R1Z4RD || N-Kin', 'NoelleMBrooks || Noobiess', 'Nolo33 || OldSoulja', 'OmegalingYT || PKMarioG', 'PomPomKing || Poki Papillon', 'PumpkinPastel || RetroNC', 'RadicalCharizard || seleccion', 'SelenaArmorclaw || SkidMarc25', 'Snivy101 || Sopita_Yorita', 'SoulWardenInfinity || TheAetherPlayer', 'TheCynicalPoet || Typhlito', 'uppababy'
];

const CreditListRenderer = ({ items }: { items: string[] }) => {
  const allNames = items.flatMap(item => item.split(/\s*\|\|\s*/)); // Sépare par '||' avec ou sans espaces

  const renderName = (name: string) => {
    if (name === 'Pokémon Workshop') {
      return (
        <a href="https://pokemonworkshop.com" target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:text-slate-900 hover:underline">
          {name}
        </a>
      );
    }
    return <span className="text-slate-700">{name}</span>;
  };

  return (
    <div className="flex flex-wrap gap-x-2 gap-y-1 leading-relaxed">
      {allNames.map((name, index) => (
        <React.Fragment key={`${name}-${index}`}>
          {renderName(name)}
          {index < allNames.length - 1 && (
            <span className="text-slate-400" aria-hidden="true">•</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default function CreditsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center"> {/* Augmentation de la marge basse */}
          <h1 className="text-5xl font-extrabold tracking-tight mb-3">Crédits</h1> {/* Police plus grande */}
          <p className="text-lg text-slate-600">
            Merci à toutes et tous pour votre contribution. Cette page liste les personnes ayant aidé
            au développement, à l'art et aux ressources.
          </p>
        </header>

        {/* Section principale des crédits (style "pilules" inchangé, car il est bon) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {credits.map((group) => (
            <article key={group.title} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-lg font-semibold mb-3 text-slate-800">{group.title}</h2>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((i) => (
                  <li key={i} className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-sm font-medium shadow-xs">{i}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        {/* Section des ressources (style "flux de noms" amélioré) */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Ressources graphiques - Pokémon Stalactite</h3>
              {/* === CHANGEMENT ICI === */}
              <CreditListRenderer items={ressourcesGraphiques} />
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Music</h3>
              {/* === CHANGEMENT ICI === */}
              <CreditListRenderer items={music} />
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Animated Front & Back Sprites pack</h3>
              {/* === CHANGEMENT ICI === */}
              <CreditListRenderer items={animatedSprites} />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="sticky top-24 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"> {/* top-24 au lieu de top-20 */}
              <h4 className="text-lg font-semibold mb-3">Contributors - Plugin espagnol</h4> {/* Police un peu plus grande */}
              <div className="h-64 overflow-auto text-sm">
                {/* === CHANGEMENT ICI === */}
                <CreditListRenderer items={spanishPluginContribs} />
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h4 className="text-lg font-semibold mb-2">Remerciements spéciaux</h4> {/* Police un peu plus grande */}
              <p className="text-sm text-slate-700">
                Si vous voyez un oubli ou souhaitez que votre pseudo soit modifié, contactez l'équipe de développement.
              </p>
            </div>
          </aside>
        </section>

        <footer className="mt-16 text-center text-sm text-slate-500"> {/* Augmentation de la marge haute */}
          <p>Pokémon et tout contenu officiel Pokémon sont la propriété de leurs détenteurs respectifs. Ce fangame est une œuvre de fans et n'est pas affilié à Nintendo, Game Freak ou The Pokémon Company.</p>
        </footer>
      </div>
    </main>
  );
}
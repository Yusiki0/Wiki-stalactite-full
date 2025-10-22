import React from 'react';

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

export default function CreditsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900 py-24 px-4"> {/* py-24 au lieu de py-12 pour descendre le contenu */}
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">Crédits</h1>
          <p className="text-slate-600">Merci à toutes et tous pour votre contribution. Cette page liste les personnes ayant aidé au développement, à l'art et aux ressources.</p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {credits.map((group) => (
            <article key={group.title} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-3">{group.title}</h2>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((i) => (
                  <li key={i} className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-sm font-medium shadow-xs">{i}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Ressources graphiques — Pokémon Stalactite</h3>
              <ul className="list-inside list-disc space-y-1 text-slate-700">
                {ressourcesGraphiques.map((r) => <li key={r} className="break-words">{r}</li>)}
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Music</h3>
              <ul className="list-inside list-disc text-slate-700">
                {music.map((m) => <li key={m}>{m}</li>)}
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Animated Front & Back Sprites pack</h3>
              <ul className="list-inside list-disc text-slate-700">
                {animatedSprites.map((s) => <li key={s}>{s}</li>)}
              </ul>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="sticky top-20 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h4 className="text-md font-semibold mb-2">Contributors — Plugin espagnol</h4>
              <div className="h-64 overflow-auto text-sm text-slate-700">
                <ul className="space-y-1">
                  {spanishPluginContribs.map((c) => <li key={c} className="break-words">{c}</li>)}
                </ul>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h4 className="text-md font-semibold mb-2">Remerciements spéciaux</h4>
              <p className="text-sm text-slate-700">Si vous voyez un oubli ou souhaitez que votre pseudo soit modifié, contactez l'équipe de développement.</p>
            </div>
          </aside>
        </section>

        <footer className="mt-10 text-center text-sm text-slate-500">
          <p>Pokémon et tout contenu officiel Pokémon sont la propriété de leurs détenteurs respectifs. Ce fangame est une œuvre de fans et n'est pas affilié à Nintendo, Game Freak ou The Pokémon Company.</p>
        </footer>
      </div>
    </main>
  );
}

import { useIntl } from 'react-intl';
import { useState } from 'react';
import '../styles/credits.css';

type CreditGroup = {
  titleKey: string;
  items: string[];
};

const credits: CreditGroup[] = [
  { titleKey: 'credits.mainSupporter', items: ['Pokémon Workshop'] },
  { titleKey: 'credits.creator', items: ['Yusiki'] },
  { titleKey: 'credits.closeHelp', items: ['Kit', 'Flo', 'Alessio', 'Dark Rider'] },
  { titleKey: 'credits.earlySupport', items: ['Kazzyx', 'Flolo'] },
  { titleKey: 'credits.conceptArt', items: ['Maytarri', 'Nastimz', 'Flolo', 'Jellal_F', 'Carnavaliaa', 'eysselia', 'ArthurOufGuedin', 'The Cool Artist', 'Girasol'] },
  { titleKey: 'credits.pixelArt', items: ['Halpharox', 'Revali', 'Flolo', 'Mathieu', 'Dracoyan', 'Cosmo'] },
  { titleKey: 'credits.devHelp', items: ['Ayfoth'] },
  { titleKey: 'credits.scenario', items: ['Noé alias Tyberiom'] },
  { titleKey: 'credits.levelDesign', items: ['Wujek'] },
  { titleKey: 'credits.metagame', items: ['Wujek'] },
  { titleKey: 'credits.ideas', items: ['Dashiruba', 'SpikeXsqual', 'Tyfloflo'] },
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
  const allNames = items.flatMap((item) => item.split(/\s*\|\|\s*/)); // Sépare par '||' avec ou sans espaces

  const renderName = (name: string) => {
    if (name === 'Pokémon Workshop') {
      return (
        <a href="https://pokemonworkshop.com" target="_blank" rel="noopener noreferrer" className="credit-link">
          {name}
        </a>
      );
    }
    return <span className="credit-name">{name}</span>;
  };

  return (
    <ul className="credit-list-compact">
      {allNames.map((name, index) => (
        <li className="credit-list-item" key={`${name}-${index}`}>
          {renderName(name)}
        </li>
      ))}
    </ul>
  );
};

const ExpandableCreditList = ({ items, previewCount = 6 }: { items: string[]; previewCount?: number }) => {
  const intl = useIntl();
  const [open, setOpen] = useState(false);
  const all = items.flatMap((item) => item.split(/\s*\|\|\s*/));
  const preview = all.slice(0, previewCount);

  return (
    <div>
      <ul className="credit-list-compact">
        {(open ? all : preview).map((name, idx) => (
          <li className="credit-list-item" key={`${name}-${idx}`}>{name}</li>
        ))}
      </ul>

      {all.length > previewCount && (
        <button
          className="read-more-toggle"
          onClick={() => setOpen((s) => !s)}
          aria-expanded={open}
        >
          {open ? intl.formatMessage({ id: 'credits.showLess' }) : intl.formatMessage({ id: 'credits.readMore' })}
        </button>
      )}
    </div>
  );
};

export default function CreditsPage() {
  const intl = useIntl();

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight mb-3">
            {intl.formatMessage({ id: 'credits.headerTitle' })}
          </h1>
          <p className="text-lg text-slate-600">
            {intl.formatMessage({ id: 'credits.headerDesc' })}
          </p>
        </header>

        {/* Section principale des crédits */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {credits.map((group) => (
            <article key={group.titleKey} className="credit-section">
              <h2 className="credit-title">
                {intl.formatMessage({ id: group.titleKey })}
              </h2>
              <ul className="simple-list">
                {group.items.map((i) => (
                  <li key={i} className="simple-list-item">{i}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        {/* Section des ressources */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4">
                {intl.formatMessage({ id: 'credits.resourcesTitle' })}
              </h3>
              <section className="credit-section">
                <h3 className="credit-title">{intl.formatMessage({ id: 'credits.resourcesTitle' })}</h3>
                <ExpandableCreditList items={ressourcesGraphiques} previewCount={6} />
              </section>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4">
                {intl.formatMessage({ id: 'credits.musicTitle' })}
              </h3>
              <section className="credit-section">
                <h3 className="credit-title">{intl.formatMessage({ id: 'credits.musicTitle' })}</h3>
                <CreditListRenderer items={music} />
              </section>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4">
                {intl.formatMessage({ id: 'credits.animatedTitle' })}
              </h3>
              <section className="credit-section">
                <h3 className="credit-title">{intl.formatMessage({ id: 'credits.animatedTitle' })}</h3>
                <CreditListRenderer items={animatedSprites} />
              </section>
            </div>
          </div>

          {/* Sidebar */}
            <aside className="aside-container">
            <section className="sticky top-24 credit-section credit-aside">
                <h4 className="credit-title">{intl.formatMessage({ id: 'credits.pluginContribs' })}</h4>
                <div className="h-64 overflow-auto text-sm">
                  <ExpandableCreditList items={spanishPluginContribs} previewCount={8} />
                </div>
              </section>

              <section className="credit-section">
                <h4 className="credit-title">{intl.formatMessage({ id: 'credits.specialThanks' })}</h4>
                <p className="text-sm text-slate-700">
                  {intl.formatMessage({ id: 'credits.contactNote' })}
                </p>
              </section>
            </aside>
        </section>

        <footer className="mt-16 text-center text-sm text-slate-500">
          <p>{intl.formatMessage({ id: 'credits.footerNote' })}</p>
        </footer>
      </div>
    </main>
  );
}
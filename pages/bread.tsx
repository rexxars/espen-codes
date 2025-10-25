import * as React from 'react'
import {useState, useEffect} from 'react'
import Head from 'next/head'
import {useRouter} from 'next/router'
import type {Image} from '@sanity/types'
import {Layout} from '../components/Layout'
import styles from '../components/Article.module.css'
import {urlForImage} from '../config/sanity'

const image: Image = {
  _type: 'image',
  asset: {
    _type: 'reference',
    _ref: 'image-1bde423cd5b1c303d28c84673aad9b6b82d0be93-769x1024-jpg',
  },
  crop: {
    _type: 'sanity.imageCrop',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  hotspot: {
    _type: 'sanity.imageHotspot',
    x: 0.5,
    y: 0.5097402597402598,
    height: 0.5032467532467529,
    width: 1,
  },
}

const sliceImage: Image = {
  _type: 'image',
  asset: {
    _type: 'reference',
    _ref: 'image-c6dacdbbf74b793a0f8c2335958db9215d0027f0-3024x4032-jpg',
  },
  crop: {
    _type: 'sanity.imageCrop',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  hotspot: {
    _type: 'sanity.imageHotspot',
    x: 0.5,
    y: 0.5,
    height: 0.5957792207792204,
    width: 1,
  },
}

const translations = {
  en: {
    title: 'Bread - Espen.Codes',
    heading: 'Baking Bread',
    intro:
      "Bread is really nice. But the ones you find in the United States tend to be very loafy. I prefer ones that are denser, crispier, where the texture isn't just air and flour, but rather actual seeds and grains.",
    figcaption1: 'A home baked loaf of bread. You should try it!',
    paragraph1:
      "I started baking this bread pictured above. It's not super fancy. There is no sourdough to keep alive. There is no kneading. There is really very little work involved.",
    paragraph2:
      "You might have to go shopping for a bunch of seeds for the first batch here, but once purchased you can make quite a lot of these. I'll calculate the price per bread at some point!",
    statsHeading: 'Stats',
    activeTime: 'Active time spent: ~15 minutes',
    totalTime: 'Time from start to finish: ~3 hours',
    ingredientsHeading: 'Ingredients',
    servings: '(makes 1 smallish loaf)',
    ingredients: [
      '175g whole wheat flour',
      '125g all purpose flour',
      '20g oats',
      '20g sunflower kernels',
      '35g flax seed',
      '25g pumpkin seeds',
      '20g chia seeds',
      '0.5 tbsp salt',
      '1 tbsp honey (can be dropped)',
      '1 packet of dry yeast (~7g)',
      '333 ml water (approx body temperature)',
      'Optional: some dry berries or whatever you might want for extra flavor',
    ],
    instructionsHeading: 'Instructions',
    instructions: [
      'Measure out and throw everything in a bowl.',
      "Mix everything together. I like to use a silicone spatula for this. The dough shouldn't be dry, but it shouldn't be wet either.",
      'Cover the bowl lightly and leave it for at least 1 hour.',
      'Oil the sides and bottom of a loaf pan (I use <a href="https://www.amazon.com/gp/product/B07PJG9WZY/" rel="noopener noreferer">these silicone ones</a>, which are perfectly sized for this recipe).',
      "Pour/scoop the dough into the oiled pan. It'll look like it's far from enough - but the yeast will do its thing, don't worry.",
      'Leave for 1 hour, lightly wrapped.',
      'Preheat the oven to 225°C / 437°F.',
      'Put the pan into the oven and bake for 40 minutes.',
      'Remove the bread, drop it out of the pan.',
      'If you like a crisp crust, flip it upside down into the pan and bake for another ~10 minutes.',
    ],
    figcaption2:
      'Two slices of home baked bread with brown goat cheese, sour cream and blueberry jam.',
  },
  no: {
    title: 'Brød - Espen.Codes',
    heading: 'Brødbaking',
    intro:
      'Brød er digg. Men de man finner i USA pleier å være veldig… luftige? Bare tomme kalorier? Jeg foretrekker brød som er mer kompakt, sprøere, hvor teksturen ikke bare er luft og mel, men faktisk frø og korn.',
    figcaption1: 'Et hjemmebakt brød. Du bør prøve det!',
    paragraph1:
      'Da jeg flyttet hit begynte jeg å bake brødet som er avbildet over. Det er ikke super fancy. Det er ingen surdeig å holde i live. Ingen elting. Det er faktisk veldig lite arbeid involvert.',
    paragraph2:
      'Du må kanskje handle en masse frø den første gangen du baker det, men når du først har kjøpt det kan du lage ganske mange av disse. På et eller annet tidspunkt skal jeg regne ut hvor mye totalen blir!',
    statsHeading: 'Statistikk',
    activeTime: 'Aktiv tid brukt: ~15 minutter',
    totalTime: 'Tid fra start til slutt: ~3 timer',
    ingredientsHeading: 'Ingredienser',
    servings: '(1 lite brød)',
    ingredients: [
      '175g sammalt hvetemel',
      '125g siktet hvetemel',
      '20g havregryn',
      '20g solsikkekjerner',
      '35g linfrø',
      '25g gresskarkjerner',
      '20g chiafrø',
      '0.5 ss salt',
      '1 ss honning (kan droppes)',
      '1 pakke tørrgjær (~7g)',
      '333 ml vann (omtrent kroppstemperatur)',
      'Valgfritt: noen tørkede bær eller andre ting du måtte ønske for ekstra smak',
    ],
    instructionsHeading: 'Instruksjoner',
    instructions: [
      'Mål opp og kast alt i en bolle.',
      'Bland alt sammen. Jeg liker å bruke en silikonslikepott til dette. Deigen skal ikke være tørr, men den skal heller ikke være våt.',
      'Dekk bollen lett og la den stå i minst 1 time.',
      'Olje sidene og bunnen av en brødform (jeg bruker silikon-former, som gjør det superenkelt å få brødet ut når det er ferdig).',
      'Hell/dytt deigen over i den oljede formen. Det vil se ut som det er langt fra nok deig - men gjæren vil gjøre jobben sin.',
      'La stå i 1 time, lett innpakket.',
      'Forvarm ovnen til 225°C.',
      'Sett formen i ovnen og stek i 40 minutter.',
      'Ta ut brødet, slipp det ut av formen.',
      'Hvis du liker sprø skorpe, vend det opp ned i formen og stek i ytterligere ~10 minutter.',
    ],
    figcaption2: 'To skiver hjemmebakt brød med ekte geitost, rømme og blåbærsyltetøy.',
  },
}

const LanguageToggle = ({language, onLanguageChange}) => {
  return (
    <div style={{marginBottom: '2rem', textAlign: 'center'}}>
      <button
        onClick={() => onLanguageChange('en')}
        style={{
          background: language === 'en' ? '#007acc' : 'transparent',
          color: language === 'en' ? '#fff' : '#000',
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '8px 12px',
          margin: '0 4px',
          cursor: 'pointer',
          fontSize: '18px',
        }}
      >
        🇺🇸 EN
      </button>
      <button
        onClick={() => onLanguageChange('no')}
        style={{
          background: language === 'no' ? '#007acc' : 'transparent',
          color: language === 'no' ? '#fff' : '#000',
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '8px 12px',
          margin: '0 4px',
          cursor: 'pointer',
          fontSize: '18px',
        }}
      >
        🇳🇴 NO
      </button>
    </div>
  )
}

export default function BreadPage() {
  const router = useRouter()
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    const langFromUrl = router.query.lang as string
    if (langFromUrl && (langFromUrl === 'en' || langFromUrl === 'no')) {
      setLanguage(langFromUrl)
    }
  }, [router.query.lang])

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang)
    router.push(`/bread?lang=${newLang}`, undefined, {shallow: true})
  }

  const t = translations[language]

  return (
    <Layout>
      <Head>
        <title key="title">{t.title}</title>
      </Head>
      <article className={styles.article}>
        <LanguageToggle language={language} onLanguageChange={handleLanguageChange} />

        <h1>{t.heading}</h1>

        <section className={styles.intro}>
          <p>{t.intro}</p>
        </section>

        <figure className={styles.figure}>
          <img src={`${urlForImage(image)}?fit=crop&h=700&w=1024&dpi=2`} className={styles.image} />
          <figcaption>{t.figcaption1}</figcaption>
        </figure>

        <p>{t.paragraph1}</p>

        <p>{t.paragraph2}</p>

        <section className={styles.stats}>
          <h2>{t.statsHeading}</h2>
          <ul className={styles.bullets}>
            <li>{t.activeTime}</li>
            <li>{t.totalTime}</li>
          </ul>
        </section>

        <section className={styles.ingredients}>
          <h2>{t.ingredientsHeading}</h2>
          <p>{t.servings}</p>
          <ul>
            {t.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </section>

        <section className={styles.instructions}>
          <h2>{t.instructionsHeading}</h2>
          <ol>
            {t.instructions.map((instruction, index) => (
              <li key={index} dangerouslySetInnerHTML={{__html: instruction}} />
            ))}
          </ol>
        </section>

        <figure className={styles.figure}>
          <img
            src={`${urlForImage(sliceImage)}?fit=crop&h=700&w=1024&dpi=2&crop=focalpoint&fp-y=0.53`}
            className={styles.image}
          />
          <figcaption>{t.figcaption2}</figcaption>
        </figure>
      </article>
    </Layout>
  )
}

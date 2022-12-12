import * as React from 'react'
import Head from 'next/head'
import type {Image} from '@sanity/types'
import type {PortableTextBlock} from '@portabletext/types'
import {Layout} from '../components/Layout'
import styles from '../components/Article.module.css'
import {SanityImage} from '../components/SanityImage'
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

export default function BreadPage() {
  return (
    <Layout>
      <Head>
        <title key="title">Bread - Espen.Codes</title>
      </Head>
      <article className={styles.article}>
        <h1>Baking Bread</h1>

        <section className={styles.intro}>
          <p>
            Bread is really nice. But the ones you find in the United States tend to be very loafy.
            I prefer ones that are denser, crispier, where the texture isn't just air and flour, but
            rather actual seeds and grains.
          </p>
        </section>

        <figure className={styles.figure}>
          <img src={`${urlForImage(image)}?fit=crop&h=700&w=1024&dpi=2`} className={styles.image} />
          <figcaption>A home baked loaf of bread. You should try it!</figcaption>
        </figure>

        <p>
          I started baking this bread pictured above. It's not super fancy. There is no sourdough to
          keep alive. There is no kneading. There is really very little work involved.
        </p>

        <p>
          You might have to go shopping for a bunch of seeds for the first batch here, but once
          purchased you can make quite a lot of these. I'll calculate the price per bread at some
          point!
        </p>

        <section className={styles.stats}>
          <h2>Stats</h2>
          <ul className={styles.bullets}>
            <li>Active time spent: ~15 minutes</li>
            <li>Time from start to finish: ~2.5 hours</li>
          </ul>
        </section>

        <section className={styles.ingredients}>
          <h2>Ingredients</h2>
          <p>(makes 1 smallish loaf)</p>
          <ul>
            <li>175g whole wheat flour</li>
            <li>125g all purpose flour</li>
            <li>20g sunflower kernels</li>
            <li>20g oats</li>
            <li>35g flax seed</li>
            <li>25g pumpkin seeds</li>
            <li>20g chia seeds</li>
            <li>0.5 tbsp salt</li>
            <li>1 tbsp honey (can be dropped)</li>
            <li>2 packets of dry yeast</li>
            <li>333 ml water (approx body temperature)</li>
            <li>Optional: some dry berries or whatever you might want for extra flavor</li>
          </ul>
        </section>

        <section className={styles.instructions}>
          <h2>Instructions</h2>
          <ol>
            <li>Measure out and throw everything in a bowl.</li>
            <li>
              Mix everything together. I like to use a silicone spatula for this. The dough
              shouldn't be dry, but it shouldn't be wet either.
            </li>
            <li>Cover the bowl lightly and leave it for 30 minutes.</li>
            <li>
              Oil the sides and bottom of a loaf pan (I use{' '}
              <a href="https://www.amazon.com/gp/product/B07PJG9WZY/" rel="noopener noreferer">
                these silicone ones
              </a>
              , which are perfectly sized for this recipe).
            </li>
            <li>
              Pour/scoop the dough into the oiled pan. It'll look like it's far from enough - but
              the yeast will do its thing, don't worry.
            </li>
            <li>Leave for 45 minutes, lightly wrapped.</li>
            <li>Preheat the oven to 225°C / 437°F.</li>
            <li>Put the pan into the oven and bake for 40 minutes.</li>
            <li>Remove the bread, drop it out of the pan.</li>
            <li>
              If you like a crisp crust, flip it upside down into the pan and bake for another ~10
              minutes.
            </li>
          </ol>
        </section>

        <figure className={styles.figure}>
          <img
            src={`${urlForImage(sliceImage)}?fit=crop&h=700&w=1024&dpi=2&crop=focalpoint&fp-y=0.53`}
            className={styles.image}
          />
          <figcaption>
            Two slices of home baked bread with brown goat cheese, sour cream and blueberry jam.
          </figcaption>
        </figure>
      </article>
    </Layout>
  )
}

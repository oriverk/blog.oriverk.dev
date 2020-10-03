import Head from 'next/head'

export default function AmpIncludeCustomElement({name, version}) {
  return (
    <Head>
      <script
        async custom-element={name}
        src={
          'https://cdn.ampproject.org/v0/' + name + '-' + version + '.js'
        }
        key={name}
      />
    </Head>
  )
}
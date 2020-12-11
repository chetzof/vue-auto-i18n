import { TranslationApi } from '@/translation-api'

test('Live', async () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const api = new TranslationApi(process.env.GOOGLE_API_KEY!)
  const result = await api.translate('ru', {
    // test: (context) => 'hi',
    title: 'Latest information on travelling from {origin} to {destination}',
    return: 'Returning from <b>{origin}</b> to <b>{destination}</b>',
    // allowed:
    //   'is <b class=notranslate>@.lower:restriction.travel.value.allowed</b> without any restrictions. ',
  })
})

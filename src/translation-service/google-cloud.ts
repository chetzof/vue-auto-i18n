import { GoogleFree } from './google-free'

import fetch from 'node-fetch'

import { InformativeError } from '../error'

type TranslationAPIResponse = {
  data: { translations: { translatedText: string }[] }
}

export class GoogleCloud extends GoogleFree {
  constructor(private readonly apiKey: string) {
    super()
  }

  protected async sendRequestAndGetResponse(
    encodedPayload: string,
    targetLanguage: string,
  ): Promise<string> {
    const params = new URLSearchParams({
      q: encodedPayload,
      target: targetLanguage,
      format: 'html',
      key: this.apiKey,
    })

    const response = await fetch(
      'https://translation.googleapis.com/language/translate/v2',
      { method: 'POST', body: params as never },
    )
    const jsonReponse = await response.json()

    if (!response.ok) {
      if (jsonReponse.error) {
        throw new Error(
          `${jsonReponse.error.message} [${jsonReponse.error.code} ${jsonReponse.error.status}]`,
        )
      }

      throw new InformativeError('The API return an error response', {
        data: jsonReponse,
      })
    }

    const translatedText = (jsonReponse as TranslationAPIResponse)?.data
      ?.translations[0]?.translatedText
    if (!translatedText) {
      throw new InformativeError('Unexpected response structure', {
        response,
      })
    }
    return translatedText
  }
}
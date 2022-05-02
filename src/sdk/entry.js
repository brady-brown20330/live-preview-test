import * as contentstack from 'contentstack';

import ContentstackLivePreview from '@contentstack/live-preview-utils';

const Stack = contentstack.Stack({
  api_key: process.env.REACT_APP_APIKEY,
  delivery_token: process.env.REACT_APP_DELIVERY_TOKEN,
  environment: process.env.REACT_APP_ENVIRONMENT,
  region: process.env.REACT_APP_REGION ? process.env.REACT_APP_REGION : "us",
  live_preview: {
    management_token: process.env.REACT_APP_MANAGEMENT_TOKEN,
    enable: true,
    host: 'api.contentstack.io'
  },
});

Stack.setHost("api.contentstack.io")

// initialize LP
ContentstackLivePreview.init({
  enable: true,
  stackSdk: Stack,
  ssr: false,
});

export const onEntryChange = ContentstackLivePreview.onEntryChange;


export default {
  getEntry(ctUid, locale) {
    return new Promise((resolve, reject) => {
      Stack.ContentType(ctUid)
        .Query()
        .language(locale)
        .includeOwner()
        .toJSON()
        .find()
        .then(
          (result) => {
            resolve(result)
          },
          (error) => {
            reject(error)
          }
        )
    })
  }
}
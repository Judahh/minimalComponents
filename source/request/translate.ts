// const { Translate } = require('@google-cloud/translate').v2;
// const translate = new Translate();
import { request } from '.';

const escapeRegExp = (text: string) => {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
};

const encodeText = (text: string) => {
  return text
    .replace(new RegExp(escapeRegExp(' '), 'g'), '%20')
    .replace(new RegExp(escapeRegExp('\n'), 'g'), '$UR$');
};

const decodeText = (text: string) => {
  return text
    .replace(new RegExp(escapeRegExp('%20'), 'g'), ' ')
    .replace(new RegExp(escapeRegExp('$ UR $'), 'g'), '\n')
    .replace(new RegExp(escapeRegExp('$UR$'), 'g'), '\n');
};

const translateText = async (
  key: string,
  text: string,
  targetLanguage?: string
) => {
  if (
    targetLanguage === undefined ||
    targetLanguage === null ||
    targetLanguage?.toLowerCase()?.includes('en')
  )
    return text;
  if (key)
    try {
      const data = await request(
        `https://translation.googleapis.com/language/translate/v2?key=${key}`,
        'get',
        `&q=${encodeText(text)}&target=${targetLanguage}&source=en`
      );

      text =
        decodeText(data?.data?.data?.translations[0]?.translatedText) || text;
      return text;
    } catch (error) {
      console.error(error);
    }
  return text;
};

export { translateText };

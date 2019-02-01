import keys from 'lodash/keys';

type Message = string | NestedDictionary;
interface NestedDictionary {
  [x: string]: Message;
}
interface FlattenedDictionary {
  [x: string]: string;
}

export const flattenMessages = (
  nestedMessages: NestedDictionary,
  prefix = '',
): FlattenedDictionary =>
  keys(nestedMessages).reduce((messages: FlattenedDictionary, key) => {
    const value = nestedMessages[key];
    const prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'string') {
      messages[prefixedKey] = value;
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }

    return messages;
  }, {});

export default flattenMessages;

import { fromJS, List, Map } from 'immutable';

export const isImmutable = value => Map.isMap(value) || List.isList(value);

export const setStoreValue = (state, key, value) => state.set(key, isImmutable(value) ? value : fromJS(value));
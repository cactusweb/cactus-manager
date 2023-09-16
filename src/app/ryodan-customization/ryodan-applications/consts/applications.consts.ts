import { SortParams } from 'src/app/tools/interfaces/sort-params';

export const APPLICATIONS_SEARCH_PARAMS: string[][] = [
  ['user', 'full_name'],
  ['state'],
  ['number'],
  ['wallet'],
  ['target'],
];

export const APPLICATIONS_UPDATED_SORT_PARAMS: SortParams = {
  keys: ['updated_at'],
  type: 'number',
};

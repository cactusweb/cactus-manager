import { SortParams } from 'src/app/tools/interfaces/sort-params';

export const REPORTS_SEARCH_PARAMS: string[][] = [
  ['user', 'full_name'],
  ['state'],
  ['number'],
  ['wallet'],
  ['target'],
];

export const REPORTS_UPDATED_SORT_PARAMS: SortParams = {
  keys: ['updated_at'],
  type: 'number',
};

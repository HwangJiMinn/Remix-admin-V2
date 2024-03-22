import { atom } from 'recoil';

export const userState = atom<AdminUser | null>({
  key: 'userState',
  default: null,
});

export const selectedMenuState = atom<string>({
  key: 'selectedMenuState',
  default: '',
});

export const expandedSectionsState = atom<string[]>({
  key: 'expandedSectionsState',
  default: [],
});

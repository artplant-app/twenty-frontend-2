import { selectorFamily } from 'recoil';

import { recordStoreFamilyState } from '@/object-record/record-store/states/recordStoreFamilyState';

export const recordStoreFamilySelector = selectorFamily({
  key: 'recordStoreFamilySelector',
  get:
    <T>({ fieldName, recordId }: { fieldName: string; recordId: string }) =>
    ({ get }) =>
      get(recordStoreFamilyState(recordId))?.[fieldName] as T,
  set:
    <T>({ fieldName, recordId }: { fieldName: string; recordId: string }) =>
    ({ set }, newValue: T) =>
      set(recordStoreFamilyState(recordId), (prevState) =>
        prevState ? { ...prevState, [fieldName]: newValue } : null,
      ),
});

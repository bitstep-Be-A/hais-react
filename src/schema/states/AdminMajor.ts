import { atom, selector } from "recoil";

import type {
  FullNameKeyword,
  SearchMode,
  UnivSearchResult,
  SelectedMajorId,
  SubjectData,
  MajorKeyword,
  UnivKeyword,
} from "../types/AdminMajor";
import { Department } from "../../domain/univ/univ.interface";

export const searchModeState = atom<SearchMode>({
  key: "schema/states/AdminMajor/SearchMode",
  default: "UNIV",
});

export const univKeywordState = atom<UnivKeyword>({
  key: "schema/states/AdminMajor/UnivKeyword",
  default: "",
});

export const majorKeywordState = atom<MajorKeyword>({
  key: "schema/states/AdminMajor/MajorKeyword",
  default: "",
});

export const fullNameKeywordState = atom<FullNameKeyword>({
  key: "schema/states/AdminMajor/FullNameKeyword",
  default: "",
});

export const univSearchResultListState = atom<UnivSearchResult[]>({
  key: "schema/states/AdminMajor/UnivSearchResultList",
  default: [],
});

export const majorResultListState = atom<Partial<Department>[]>({
  key: "schema/states/AdminMajor/MajorResultList",
  default: [],
});

export const majorResultLoadingState = atom<boolean>({
  key: "schema/states/AdminMajor/MajorResultLoading",
  default: false,
});

export const isMatchUnivState = selector<boolean>({
  key: "schema/states/AdminMajor/isMatchUniv",
  get: ({ get }) => {
    const mode = get(searchModeState);
    if (mode !== "UNIV") return false;

    const univResults = get(univSearchResultListState);
    const keyword = get(univKeywordState);

    if (univResults.filter((v) => v.name === keyword).length === 1) {
      return true;
    }
    return false;
  },
});

export const selectedMajorIdState = atom<SelectedMajorId>({
  key: "schema/states/AdminMajor/SelectedMajorId",
  default: null,
});

export const selectedMajorState = selector<Partial<Department> | undefined>({
  key: "schema/states/AdminMajor/selectedMajor",
  get: ({ get }) => {
    const selectedId = get(selectedMajorIdState);
    if (!selectedId) return undefined;
    return get(majorResultListState)?.find((v) => v.id === selectedId);
  },
});

export const subjectDataListState = atom<SubjectData[]>({
  key: "schema/states/AdminMajor/SubjectDataList",
  default: [],
});

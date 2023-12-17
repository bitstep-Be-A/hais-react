export interface Univ {
  id: number;
  name: string;
  sidoCode: string;
}

export interface Major {
  id: number | string;
  name: string;
  univ: string;
  department: string;
  investigationYear: string;
  sidoCode: string;
  status: "ACTIVE" | "DELETE";
  stdLclsfName: string;
  stdMclsfName: string;
  stdSclsfName: string;
  updatedAt?: number;
  gnrMjrCode?: string;
  requiredGroups: string[];
  difficulty: number;
}

export type MajorRecruit = {
  requiredGroups: string[];
  difficulty: number;
}

// 일반학과 : 교과 N:N
export interface GeneralMajor {
  code: string;
  clsfName: string;
  name: string;
  description: string;
}

export interface TargetMajor {
  id: number;
  studentId: string;
  majorId: number;
  isActive: boolean;
}

// Repositories
export interface MajorRepository {
  findByNameLikeWithUniv: (keyword: string, univ: string) => Promise<Major[]>;
  findByUnivOrMajorName: (keyword: string) => Promise<Major[]>;
  // findByUniv: (univ: string, isActive?: boolean) => Major[];
  // save: (data: Major) => void;
  updateRecruit: (recruit: MajorRecruit, id: string | number) => Promise<void>;
}

export interface TargetMajorRepository {
  findByStudent: (
    studentId: string,
    isActive?: boolean
  ) => Promise<TargetMajor[]>;
}

export interface UnivRepository {
  findByNameLike: (keyword: string) => Promise<Univ[]>;
}

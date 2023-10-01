export interface Univ {
  id: number;
  name: string;
  sidoCode: string;
}

export interface Major {
  id: number;
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
  // findByUniv: (univ: string, isActive?: boolean) => Major[];
  // save: (data: Major) => void;
}

export interface TargetMajorRepository {
  findByStudent: (studentId: string, isActive?: boolean) => Promise<TargetMajor[]>;
}

export interface UnivRepository {
  findByNameLike: (keyword: string) => Promise<Univ[]>;
}

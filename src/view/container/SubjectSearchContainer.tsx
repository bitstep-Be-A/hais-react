import {
  MajorRepository,
  UnivRepository,
} from "../../domain/subject/univ.interface";
import { OptionalSubjectRepository } from "../../domain/subject/school.interface";
import { SubjectSearchContext } from "../../service/subject-search";
import type { SubjectData } from "../../schema/types/SubjectSearch";
import { sortByDifficulty } from "../../policy/univs";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { DepartmentRepository } from "../../domain/univ/univ.interface";

const SubjectSearchContainer = ({
  children,
  repositories,
}: {
  children?: React.ReactNode;
  repositories: {
    majorRepository: MajorRepository;
    univRepository: UnivRepository;
    departmentRepository: DepartmentRepository;
    optionalSubjectRepository: OptionalSubjectRepository;
  };
}) => {
  const {
    departmentRepository,
    majorRepository,
    univRepository,
    optionalSubjectRepository,
  } = repositories;

  return (
    <SubjectSearchContext.Provider
      value={{
        async suggestUniv(univKeyword) {
          const univs = await univRepository.findByNameLike(univKeyword);
          return univs.map((univ) => {
            return {
              id: univ.id,
              name: univ.name,
            };
          });
        },
        async searchByUnivOrMajor(fullNameKeyword) {
          const majors = await majorRepository.findByUnivOrMajorName(
            fullNameKeyword
          );
          return majors.map((major) => {
            return {
              id: major.id,
              name: major.name,
              univ: major.univ,
              department: major.department,
              requiredGroups: major.requiredGroups,
              difficulty: major.difficulty.toString(),
            };
          });
        },
        async getDepartmentOnUniv(name, univId) {
          const departments = await departmentRepository.findByUnivId(
            name,
            univId
          );
          return departments.map((department) => ({
            id: department.id,
            name: department.name,
            guidelines: department.guidelines,
            precedences: department.precedences,
            universityId: department.universityId,
            keyword: department.keyword,
          }));
        },
        async readSubjectList(recruit) {
          const subjects = await optionalSubjectRepository.findBy({
            nameKeyword: "",
          });
          const subjectsByGroup = sortByDifficulty(
            parseInt(recruit.difficulty),
            subjects.filter((subject) =>
              recruit.requiredGroups.includes(subject.group)
            )
          );

          // let categoryCreditBuffer: {[key: string]: number} = {};
          // let categoryCreditMap: {[key: string]: number} = {};
          let categorySubjectMap: { [key: string]: SubjectData[] } = {};

          subjectsByGroup.forEach((subject) => {
            const category = subject.subjectCategory;
            // const creditAmount = subject.creditAmount;

            // const totalAmount = categoryCreditMap[category];
            // const currAmount = categoryCreditBuffer[category];

            // if (currAmount + creditAmount > totalAmount) {
            //   return;
            // }

            // categoryCreditBuffer[category] += creditAmount;
            categorySubjectMap[category] = (
              categorySubjectMap[category] ?? []
            ).concat({ ...subject });
          });

          return ([] as SubjectData[]).concat(
            ...Object.values(categorySubjectMap)
          );
        },
      }}
    >
      <Container maxWidth={"md"} component={Paper}>
        {children}
      </Container>
    </SubjectSearchContext.Provider>
  );
};

export default SubjectSearchContainer;

import { MajorRepository, UnivRepository } from "../../domain/subject/univ.interface";
import { OptionalSubjectRepository } from "../../domain/subject/school.interface";
import { SubjectSearchContext } from "../../service/subject-search";
import type { SubjectData } from "../../schema/types/SubjectSearch";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";

const SubjectSearchContainer = ({
  children,
  repositories
}: {
  children?: React.ReactNode;
  repositories: {
    majorRepository: MajorRepository;
    univRepository: UnivRepository;
    optionalSubjectRepository: OptionalSubjectRepository;
  };
}) => {
  const {
    majorRepository,
    univRepository,
    optionalSubjectRepository
  } = repositories;

  return (
    <SubjectSearchContext.Provider value={{
      async suggestUniv(univKeyword) {
        const univs = await univRepository.findByNameLike(univKeyword);
        return univs.map((univ) => {
          return {
            id: univ.id,
            name: univ.name
          }
        });
      },
      async searchByUnivOrMajor(fullNameKeyword) {
        const majors = await majorRepository.findByUnivOrMajorName(fullNameKeyword);
        return majors.map((major) => {
          return {
            id: major.id,
            name: major.name,
            univ: major.univ,
            department: major.department,
            requiredCredits: major.requiredCredits.map((v) => ({
              subjectCategory: v.subjectCategory,
              amount: v.amount.toString()
            })),
            requiredGroups: major.requiredGroups,
            difficulty: major.difficulty.toString()
          }
        })
      },
      async searchByMajorKeywordOnUnivName(majorKeyword, univName) {
        const majors = await majorRepository.findByNameLikeWithUniv(majorKeyword, univName);
        return majors.map((major) => {
          return {
            id: major.id,
            name: major.name,
            univ: major.univ,
            department: major.department,
            requiredCredits: major.requiredCredits.map((v) => ({
              subjectCategory: v.subjectCategory,
              amount: v.amount.toString()
            })),
            requiredGroups: major.requiredGroups,
            difficulty: major.difficulty.toString()
          }
        });
      },
      async readSubjectList(recruit) {
        const subjects = await optionalSubjectRepository.findBy({nameKeyword: ''});
        const subjectsByGroup = subjects.filter((subject) => recruit.requiredGroups.includes(subject.group));

        let categoryCreditBuffer: {[key: string]: number} = {};
        let categoryCreditMap: {[key: string]: number} = {};
        let categorySubjectMap: {[key: string]: SubjectData[]} = {};

        recruit.requiredCredits.forEach((item) => {
          categoryCreditBuffer[item.subjectCategory] = 0;
          categoryCreditMap[item.subjectCategory] = parseInt(item.amount);
        });

        subjectsByGroup.sort(() => Math.random() - 0.5);  // shuffle array
        subjectsByGroup.forEach((subject) => {
          const category = subject.subjectCategory;
          const creditAmount = subject.creditAmount;

          const totalAmount = categoryCreditMap[category];
          const currAmount = categoryCreditBuffer[category];

          if (currAmount + creditAmount > totalAmount) {
            return;
          }

          categoryCreditBuffer[category] += creditAmount;
          categorySubjectMap[category] = (categorySubjectMap[category] ?? []).concat({...subject});
        });

        return ([] as SubjectData[]).concat(...Object.values(categorySubjectMap));
      },
    }}>
      <Container maxWidth={"md"} component={Paper}>
        {children}
      </Container>
    </SubjectSearchContext.Provider>
  );
}

export default SubjectSearchContainer;

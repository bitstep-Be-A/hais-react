import { useRecoilState } from "recoil";

import { SignupContext } from "../../context/signup";
import { UserRepository } from "../../domain/account/user.interface";
import { hasCheckedEssentialAgreement } from "../../policy/account";
import { useSignupStep } from "../../recoil-hooks/useSignupStep";
import { defaultUser, userErrorMap, userState } from "../../domain/account/user.impl";
import { NAME_REGEX } from "../../policy/account";
import { studentState } from "../../domain/subject/school.impl";

export default function SignupContainer({
  children,
  repositories
}: {
  children: React.ReactNode,
  repositories: {
    userRepository: UserRepository
  }
}) {
  const { userRepository } = repositories;

  const [userSnapshot, setUserSnapshot] = useRecoilState(userState);
  const [studentSnapshot, setStudentSnapshot] = useRecoilState(studentState);

  const {step, setStep} = useSignupStep();

  return (
    <SignupContext.Provider value={{
      /**
      @startuml acceptAgreement
      User -> Client: [Action] 다음 버튼 클릭
      Client -> Service: [Dispatch] 약관 동의 형식 제출

      activate Service
      Service -> Service: 필수 항목 체크 검토
      alt 실패
        Service --> User: [Alert] 필수 항목을 체크해주세요
      else Pass
      end
      Service -> Model: Agreement form 저장
      Service -> Service: step++
      deactivate Service
      @enduml
      */
      acceptAgreement(form) {
        const isValid = hasCheckedEssentialAgreement(form);
        if (!isValid) {
          setUserSnapshot({
            data: defaultUser,
            error: userErrorMap.UNCHECKED_ESSENCIAL_AGREEMENT,
            loading: false
          });
          return;
        }
        setUserSnapshot({
          data: {
            ...userSnapshot.data,
            serviceAgreement: form.isAgreeService ? "Y" : "N",
            marketingAgreement: form.isAgreeMarketing ? "Y" : "N",
            privacyAgreement: form.isAgreePrivacy ? "Y" : "N"
          },
          loading: false
        });
        setStep(2);
      },
      /**
      @startuml submitStudentInfo
      User -> Client: [Action] 다음 버튼 클릭
      Client -> Service: [Dispatch] 기본 학생 정보 제출

      activate Service
      Service -> Service: 필수 입력 사항 검토
      alt 실패
        Service --> User: [Alert] 필수 항목을 입력해주세요
      else Pass
      end

      Service -> Model: StudentProfile form 저장
      Service -> Service: step++
      deactivate Service
      @enduml
      */
      submitStudentInfo(form) {
        if (!NAME_REGEX.test(form.name)) {
          setUserSnapshot({
            data: defaultUser,
            error: userErrorMap.NO_NAME,
            loading: false
          });
          return;
        }
        if (!form.schoolYear) {
          setUserSnapshot({
            data: defaultUser,
            error: userErrorMap.NO_SCHOOL_YEAR,
            loading: false
          });
          return;
        }
        if (!form.subjectCategory) {
          setUserSnapshot({
            data: defaultUser,
            error: userErrorMap.NO_SUBJECT_CATEGORY,
            loading: false
          });
          return;
        }
        setStudentSnapshot({
          data: {
            ...studentSnapshot.data,
            name: ""
          },
          loading: false
        });
        setStep(3);
      },
      /**
      @startuml selectVerification

      alt 일반 회원가입 선택
      User -> Client: [Action] 일반 회원가입 선택 버튼 클릭
      Client -> Service: [Dispatch] 인증 유형 선택
      Service -> Model: 인증 유형 저장
      else 카카오 회원가입 선택
      User -> Client: [Action] 카카오 회원가입 선택 버튼 클릭
      Client -> Service: [Dispatch] 인증 유형 선택
      Service -> Model: 인증 유형 저장
      else 네이버 회원가입 선택
      User -> Client: [Action] 네이버 회원가입 선택 버튼 클릭
      Client -> Service: [Dispatch] 인증 유형 선택
      Service -> Model: 인증 유형 저장
      end

      Service -> Service: step++

      @enduml
      */
      selectVerification(authType) {
        setUserSnapshot({
          data: {
            ...userSnapshot.data,
            authType: authType
          },
          loading: false
        });
        setStep(4);
      },
      /**
      @startuml submitCredential

      User -> Client: [Action] 제출 버튼 클릭
      Client -> Service: [Dispatch] 권한 정보 제출 (아이디/비밀번호)
      Service -> Model: 권한 정보 저장
      @enduml
      */
      submitCredential(form) {
        
      },
      /**
      @startuml signupComplete
      activate Service
      Service -> Service: loading = true
      Model -> DB: 유저 생성

      alt 실패
      Model --> Service: Error
      Service -> Service: loading = false
      Service -> Service: initialize
      Service --> User: [Alert] "회원가입에 실패하였습니다."
      else 성공
      Model --> Service: Success
      Service -> Service: loading = false
      Service -> Service: initialize
      end
      deactivate Service
      Service --> User: 홈 화면으로 이동
      @enduml
      */
      signupComplete() {
        setUserSnapshot({
          ...userSnapshot,
          loading: true
        });
        userRepository.save(userSnapshot.data)
          .then(() => setUserSnapshot({
            data: defaultUser,
            loading: false
          }))
          .catch((e) => {
            setUserSnapshot({
              data: defaultUser,
              loading: false,
              error: userErrorMap.SIGNUP_FAILED
            });
            console.error(e);
          });
      }
    }}>
      {children}
    </SignupContext.Provider>
  );
}

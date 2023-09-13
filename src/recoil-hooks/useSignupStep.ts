import { atom, useRecoilState } from "recoil";

const signupStepState = atom<number>({
  key: "recoil-hooks/useSignupStep",
  default: 1
});

export const useSignupStep = () => {
  const [step, setStep] = useRecoilState(signupStepState);

  return {step, setStep}
};

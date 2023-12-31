import { SocialType } from "../../../policy/auth";
import type { ExceptionDetail } from "../../../types";

export interface SignupMainUx {
  clickMarketingAgreementToggle: () => void;
  inputEmail: (value: string) => ExceptionDetail | null;
  inputPassword: (value: string) => ExceptionDetail | null;
  inputPasswordConfirm: (value: string) => ExceptionDetail | null;
  clickSignup: () => void;
  clickSocialSignup: (type: SocialType) => void;
}

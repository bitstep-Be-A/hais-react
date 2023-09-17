import { useRecoilValue } from "recoil";
import { useState } from "react";

import { SignupMainUx } from "../signup.ux/SignupMain";
import { signupRequestState } from "../../../schema/atom/Signup";
import type { ExceptionDetail } from "../../../types";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';

export const SignupMain: React.FC<SignupMainUx> = (ux) => {
  const signupRequest = useRecoilValue(signupRequestState);

  const [emailException, setEmailException] = useState<ExceptionDetail | null>(null);
  const [passwordException, setPasswordException] = useState<ExceptionDetail | null>(null);
  const [passwordConfirmException, setPasswordConfirmException] = useState<ExceptionDetail | null>(null);

  return (
    <div className="flex flex-col items-center w-[350px] h-full">
      <Typography variant={"h5"} component={"h1"}>회원가입</Typography>
      <Box
        component={"form"}
        autoComplete="off"
        className="flex flex-col"
      >
        <Stack spacing={1}>
          <div className="flex flex-col">
            <Typography variant={"overline"} component={"h2"}>
              이메일
            </Typography>
            <TextField
              value={signupRequest.email}
              error={!!emailException}
              helperText={emailException?.message}
              onChange={(e) => {
                const exception = ux.inputEmail(e.target.value);
                setEmailException(exception);
              }}
              size={"small"}
              fullWidth
              placeholder="example@hais.com"
            />
          </div>
          <div className="flex flex-col">
            <Typography variant={"overline"} component={"h2"}>
              비밀번호
            </Typography>
            <TextField id="password"
              value={signupRequest.password}
              error={!!passwordException}
              helperText={passwordException?.message}
              onChange={(e) => {
                const exception = ux.inputPassword(e.target.value);
                setPasswordException(exception);
              }}
              type={"password"}
              size={"small"}
              fullWidth
              placeholder="********"
            />
          </div>
          <div className="flex flex-col">
            <Typography variant={"overline"} component={"h2"}>
              비밀번호 확인
            </Typography>
            <TextField id="passwordConfirm"
              value={signupRequest.passwordConfirm}
              error={!!passwordConfirmException}
              helperText={passwordConfirmException?.message}
              onChange={(e) => {
                const exception = ux.inputPasswordConfirm(e.target.value);
                setPasswordConfirmException(exception);
              }}
              type={"password"}
              size={"small"}
              fullWidth
              placeholder="********"
            />
          </div>
        </Stack>
        <Button variant="contained" sx={{mt: 4}} onClick={() => ux.clickSignup("NORMAL")}>
          <Typography variant={"button"}>
            가입하기
          </Typography>
        </Button>
        <div className="flex flex-col items-center w-full">
          <Typography variant={"caption"} sx={{
            mt: 2,
          }}>
            <p>가입 시, HAIS가 제공하는 서비스를 모두 이용하실 수 있습니다.</p>
            <p>서비스 이용약관, 개인정보처리방침에 동의합니다.</p>
          </Typography>
          <FormControlLabel control={<Checkbox size={"small"} onClick={ux.clickMarketingAgreementToggle}/>}
            label={<p className="relative right-2">가입한 이메일로 유용한 소식을 받아볼래요.</p>}
            componentsProps={{
              typography: {variant: "caption"}
            }}
          />
        </div>
      </Box>
      <Divider sx={{width: "100%", mt: 3}}>
        <Typography variant={"caption"}>
          간편 회원가입
        </Typography>
      </Divider>
      <Stack direction={"row"} spacing={2} sx={{mt: 2}}>
        <button onClick={() => ux.clickSignup("KAKAO")}>
          <img alt="kakao" src={process.env.PUBLIC_URL + "/kakao-logo.svg"} className="w-[40px] h-[40px]"/>
        </button>
      </Stack>
    </div>
  );
}

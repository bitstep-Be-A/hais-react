import { useContext, useMemo, useState, useEffect } from "react";
import { useRecoilValue } from "recoil";

import { SubjectDetailDialogUx } from "../subject.ux/SubjectDetailDialogUx";
import { TableContext } from "./TableContext";
import {
  commonSubjectDetailState,
  optionalSubjectDetailState,
  subjectDistinctState,
} from "../../../../schema/states/AdminSubject";
import {
  StudentCategoryCode,
  studentCategoryMap,
} from "../../../../policy/school";
import { formatNumber } from "../../../../policy/utils";
import type {
  EditRequest,
  OptionalSubjectDetail,
} from "../../../../schema/types/AdminSubject";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const SubjectDetailDialog: React.FC<SubjectDetailDialogUx> = (ux) => {
  const context = useContext(TableContext);
  const distinct = useRecoilValue(subjectDistinctState);
  const commonSubjectDetail = useRecoilValue(commonSubjectDetailState);
  const optionalSubjectDetail = useRecoilValue(optionalSubjectDetailState);

  const [form, setForm] = useState<EditRequest | undefined>(undefined);
  useEffect(() => {
    if (context.modal.state !== "UPDATE") return undefined;
    let profile;
    switch (distinct) {
      case "COMMON":
        profile = commonSubjectDetail!;
        setForm({
          distinct: distinct,
          subjectCode: profile.code,
          data: profile,
        });
        break;
      case "OPTION":
        profile = optionalSubjectDetail!;
        setForm({
          distinct: distinct,
          subjectCode: profile.code,
          data: profile,
        });
        break;
    }
  }, [
    distinct,
    commonSubjectDetail,
    optionalSubjectDetail,
    context.modal.state,
  ]);

  const detailFields = useMemo(() => {
    if (context.modal.state !== "UPDATE") return undefined;
    if (!form) return undefined;

    if (distinct === "COMMON")
      return (
        <DialogContent dividers>
          <TextField
            label="과목코드"
            fullWidth
            variant="standard"
            value={form.data.code}
            disabled
            sx={{ mt: 2 }}
          />
          <TextField
            label="그룹명 (국어, 수학, 사회, 과학...)"
            fullWidth
            variant="standard"
            value={form.data.group}
            sx={{ mt: 2 }}
            onChange={(e) =>
              setForm({
                ...form,
                data: {
                  ...form.data,
                  group: e.target.value,
                },
              })
            }
          />
          <TextField
            label="과목명"
            fullWidth
            variant="standard"
            value={form.data.name}
            sx={{ mt: 2 }}
            onChange={(e) =>
              setForm({
                ...form,
                data: {
                  ...form.data,
                  name: e.target.value,
                },
              })
            }
          />
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="계열">계열</InputLabel>
            <Select
              labelId="계열"
              label={"계열"}
              value={form.data.studentCategory ?? "NONE"}
              onChange={(e) =>
                setForm({
                  ...form,
                  data: {
                    ...form.data,
                    studentCategory: e.target.value as StudentCategoryCode,
                  },
                })
              }
            >
              {Object.entries(studentCategoryMap).map((e) => (
                <MenuItem value={e[0]}>{e[1]}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="설명"
            fullWidth
            variant="standard"
            value={form.data.description}
            multiline
            sx={{ mt: 2 }}
            onChange={(e) =>
              setForm({
                ...form,
                data: {
                  ...form.data,
                  description: e.target.value,
                },
              })
            }
          />
          <TextField
            label="부가설명"
            fullWidth
            variant="standard"
            value={form.data.etcInfo}
            multiline
            sx={{ mt: 2 }}
            onChange={(e) =>
              setForm({
                ...form,
                data: {
                  ...form.data,
                  etcInfo: e.target.value,
                },
              })
            }
          />
        </DialogContent>
      );
    if (distinct === "OPTION")
      return (
        <DialogContent dividers>
          <TextField
            label="과목코드"
            fullWidth
            variant="standard"
            value={form.data.code}
            disabled
            sx={{ mt: 2 }}
          />
          <TextField
            label="선택과목분류"
            fullWidth
            variant="standard"
            value={(form.data as OptionalSubjectDetail).subjectCategory}
            sx={{ mt: 2 }}
            onChange={(e) =>
              setForm({
                ...form,
                data: {
                  ...form.data,
                  subjectCategory: e.target.value,
                },
              })
            }
          />
          <TextField
            label="그룹명 (국어, 수학, 사회, 과학...)"
            fullWidth
            variant="standard"
            value={form.data.group}
            sx={{ mt: 2 }}
            onChange={(e) =>
              setForm({
                ...form,
                data: {
                  ...form.data,
                  group: e.target.value,
                },
              })
            }
          />
          <TextField
            label="과목명"
            fullWidth
            variant="standard"
            value={form.data.name}
            sx={{ mt: 2 }}
            onChange={(e) =>
              setForm({
                ...form,
                data: {
                  ...form.data,
                  name: e.target.value,
                },
              })
            }
          />
          <TextField
            label="이수학점"
            fullWidth
            variant="standard"
            value={(form.data as OptionalSubjectDetail).creditAmount}
            sx={{ mt: 2 }}
            onChange={(e) =>
              setForm({
                ...form,
                data: {
                  ...form.data,
                  creditAmount: formatNumber(
                    e.target.value,
                    (form.data as OptionalSubjectDetail).creditAmount
                  ),
                },
              })
            }
          />
          <TextField
            label="난이도"
            fullWidth
            variant="standard"
            value={(form.data as OptionalSubjectDetail).difficulty}
            sx={{ mt: 2 }}
            onChange={(e) =>
              setForm({
                ...form,
                data: {
                  ...form.data,
                  difficulty: formatNumber(
                    e.target.value,
                    (form.data as OptionalSubjectDetail).difficulty
                  ),
                },
              })
            }
          />
          <TextField
            label="설명"
            fullWidth
            variant="standard"
            value={form.data.description}
            multiline
            sx={{ mt: 2 }}
            onChange={(e) =>
              setForm({
                ...form,
                data: {
                  ...form.data,
                  description: e.target.value,
                },
              })
            }
          />
          <TextField
            label="수능과목정보"
            fullWidth
            variant="standard"
            value={(form.data as OptionalSubjectDetail).suneungInfo}
            multiline
            sx={{ mt: 2 }}
            onChange={(e) =>
              setForm({
                ...form,
                data: {
                  ...form.data,
                  suneungInfo: e.target.value,
                },
              })
            }
          />
          <TextField
            label="부가설명"
            fullWidth
            variant="standard"
            value={form.data.etcInfo}
            multiline
            sx={{ mt: 2 }}
            onChange={(e) =>
              setForm({
                ...form,
                data: {
                  ...form.data,
                  etcInfo: e.target.value,
                },
              })
            }
          />
        </DialogContent>
      );
  }, [distinct, context.modal.state, form]);

  return (
    <Dialog
      open={context.modal.state === "UPDATE"}
      onClose={() => context.modal.set(null)}
      scroll={"paper"}
    >
      <DialogTitle>교과상세</DialogTitle>
      {detailFields}
      <DialogActions>
        <Button onClick={() => context.modal.set(null)}>취소</Button>
        <Button
          onClick={() => {
            ux.modify(form!);
            context.modal.set(null);
          }}
        >
          수정
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SubjectDetailDialog;

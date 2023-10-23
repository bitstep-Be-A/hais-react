import { useContext, useMemo, useState, useEffect } from "react";
import { useRecoilValue } from "recoil";

import { ModalContext } from "./ModalContext";
import { subjectDistinctState } from "../../../../schema/states/SubjectTable";
import { OptionalSubjectCategory, StudentCategoryCode, studentCategoryMap } from "../../../../policy/school";
import type { CreateRequest, OptionalSubjectDetail } from "../../../../schema/types/SubjectTable";
import { SubjectCreateDialogUx } from "../subject.ux/SubjectCreateDialogUx";

import Dialog from "@mui/material/Dialog";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const SubjectCreateDialog: React.FC<SubjectCreateDialogUx> = (ux) => {
  const { modalState, setModalState } = useContext(ModalContext);
  const distinct = useRecoilValue(subjectDistinctState);

  const [form, setForm] = useState<CreateRequest | undefined>(undefined);
  useEffect(() => {
    if (modalState !== "CREATE") return undefined;
    switch (distinct) {
      case "COMMON":
        setForm({
          distinct: distinct,
          data: {
            group: "",
            studentCategory: "NONE",
            name: "",
            description: "",
            etcInfo: ""
          }
        });
        break;
      case "OPTION":
        setForm({
          distinct: distinct,
          data: {
            group: "",
            studentCategory: "NONE",
            name: "",
            description: "",
            etcInfo: "",
            subjectCategory: "일반선택",
            suneungInfo: ""
          }
        });
        break;
    }
  }, [
    distinct,
    modalState
  ]);

  const detailFields = useMemo(() => {
    if (modalState !== "CREATE") return undefined;
    if (!form) return undefined;

    if (distinct === "COMMON") return (
      <DialogContent dividers>
        <TextField
          label="그룹명 (국어, 수학, 사회, 과학...)"
          fullWidth
          variant="standard"
          value={form.data.group}
          sx={{ mt: 2 }}
          onChange={(e) => setForm({
            ...form,
            data: {
              ...form.data,
              group: e.target.value
            }
          })}
        />
        <TextField
          label="과목명"
          fullWidth
          variant="standard"
          value={form.data.name}
          sx={{ mt: 2 }}
          onChange={(e) => setForm({
            ...form,
            data: {
              ...form.data,
              name: e.target.value
            }
          })}
        />
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="계열">계열</InputLabel>
          <Select
            labelId="계열"
            label={"계열"}
            value={form.data.studentCategory ?? "NONE"}
            onChange={(e) => {
              setForm({
                ...form,
                data: {
                  ...form.data,
                  studentCategory: e.target.value as StudentCategoryCode
                }
              })
            }}
          >
            {
              Object.entries(studentCategoryMap).map((e) => (
                <MenuItem value={e[0]}>
                  {e[1]}
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>
        <TextField
          label="설명"
          fullWidth
          variant="standard"
          value={form.data.description}
          multiline
          sx={{ mt: 2 }}
          onChange={(e) => setForm({
            ...form,
            data: {
              ...form.data,
              description: e.target.value
            }
          })}
        />
        <TextField
          label="부가설명"
          fullWidth
          variant="standard"
          value={form.data.etcInfo}
          multiline
          sx={{ mt: 2 }}
          onChange={(e) => setForm({
            ...form,
            data: {
              ...form.data,
              etcInfo: e.target.value
            }
          })}
        />
      </DialogContent>
    )
    if (distinct === "OPTION") return (
      <DialogContent dividers>
        <TextField
          label="선택과목분류"
          fullWidth
          variant="standard"
          value={(form.data as OptionalSubjectDetail).subjectCategory}
          sx={{ mt: 2 }}
          onChange={(e) => setForm({
            ...form,
            data: {
              ...form.data,
              subjectCategory: e.target.value as OptionalSubjectCategory
            }
          })}
        />
        <TextField
          label="그룹명 (국어, 수학, 사회, 과학...)"
          fullWidth
          variant="standard"
          value={form.data.group}
          sx={{ mt: 2 }}
          onChange={(e) => setForm({
            ...form,
            data: {
              ...form.data,
              group: e.target.value
            }
          })}
        />
        <TextField
          label="과목명"
          fullWidth
          variant="standard"
          value={form.data.name}
          sx={{ mt: 2 }}
          onChange={(e) => setForm({
            ...form,
            data: {
              ...form.data,
              name: e.target.value
            }
          })}
        />
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="계열">계열</InputLabel>
          <Select
            labelId="계열"
            label={"계열"}
            value={form.data.studentCategory ?? "NONE"}
            onChange={(e) => {
              setForm({
                ...form,
                data: {
                  ...form.data,
                  studentCategory: e.target.value as StudentCategoryCode
                }
              })
            }}
          >
            {
              Object.entries(studentCategoryMap).map((e) => (
                <MenuItem value={e[0]}>
                  {e[1]}
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>
        <TextField
          label="설명"
          fullWidth
          variant="standard"
          value={form.data.description}
          multiline
          sx={{ mt: 2 }}
          onChange={(e) => setForm({
            ...form,
            data: {
              ...form.data,
              name: e.target.value
            }
          })}
        />
        <TextField
          label="수능과목정보"
          fullWidth
          variant="standard"
          value={(form.data as OptionalSubjectDetail).suneungInfo}
          multiline
          sx={{ mt: 2 }}
          onChange={(e) => setForm({
            ...form,
            data: {
              ...form.data,
              suneungInfo: e.target.value
            }
          })}
        />
        <TextField
          label="부가설명"
          fullWidth
          variant="standard"
          value={form.data.etcInfo}
          multiline
          sx={{ mt: 2 }}
          onChange={(e) => setForm({
            ...form,
            data: {
              ...form.data,
              etcInfo: e.target.value
            }
          })}
        />
      </DialogContent>
    )
  }, [distinct, modalState, form]);

  return (
    <Dialog
      open={modalState === "CREATE"} onClose={() => setModalState(null)}
      scroll={"paper"}
    >
      <DialogTitle>교과추가</DialogTitle>
        {detailFields}
      <DialogActions>
        <Button onClick={() => setModalState(null)}>취소</Button>
        <Button onClick={() => {
          ux.create(form!);
          setModalState(null);
        }}>추가</Button>
      </DialogActions>
    </Dialog>
  );
}

export default SubjectCreateDialog;

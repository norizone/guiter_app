import { useRecoilValue, useRecoilState } from "recoil"

import { codeNameSets } from "@/stores/CodeNameSets"
import { noteKeySets } from "@/stores/NoteKeySets"
import { PrimarySelect } from "@/components/selects/PrimarySelect"
import { PrimaryInputsWrap } from "@/components/wraps/PrimaryInputsWrap"
import { codeSelectedCode, codeSelectedKey } from "@/stores/CodeValues";


export const InputArea = () => {
  const noteKeys = useRecoilValue(noteKeySets);
  const codeNames = useRecoilValue(codeNameSets);
  const [selectedNoteKeyIndex, setSelectedNoteKeyIndex] = useRecoilState<number>(codeSelectedKey);
  const [selectedCodeNameIndex, setSelectedCodeNameIndex] = useRecoilState<number>(codeSelectedCode);

  return (
    <PrimaryInputsWrap areaType="input">
      <PrimarySelect title="Key" values={noteKeys} changeEvent={setSelectedNoteKeyIndex} selectedIndex={selectedNoteKeyIndex} />
      <PrimarySelect title="Code" values={codeNames} changeEvent={setSelectedCodeNameIndex} selectedIndex={selectedCodeNameIndex} />
    </PrimaryInputsWrap>)
}
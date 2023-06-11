import { useRecoilValue, useRecoilState } from "recoil"

import { tuningSets } from "@/stores/TuningSets"
import { scaleSets } from "@/stores/ScaleSets"
import { noteKeySets } from "@/stores/NoteKeySets"
import { PrimaryInputsWrap } from "@/components/wraps/PrimaryInputsWrap"
import { PrimarySelect } from "@/components/selects/PrimarySelect"
import { scaleSelectedKey, scaleSelectedScale, scaleSelectedTuning } from "@/stores/ScaleValues"

export const InputArea = () =>{
  const tunings = useRecoilValue(tuningSets);
  const noteKeys = useRecoilValue(noteKeySets);
  const scales = useRecoilValue(scaleSets);
  const [selectedTuningIndex, setSelectedTuningIndex] = useRecoilState<number>(scaleSelectedTuning);
  const [selectedNoteKeyIndex, setSelectedNoteKeyIndex] = useRecoilState<number>(scaleSelectedKey);
  const [selectedScaleIndex, setSelectedScaleIndex] = useRecoilState<number>(scaleSelectedScale);

  return(
    <PrimaryInputsWrap areaType="input">
    <PrimarySelect title="Tuning" values={tunings} changeEvent={setSelectedTuningIndex} selectedIndex={selectedTuningIndex} />
    <PrimarySelect title="Key" values={noteKeys} changeEvent={setSelectedNoteKeyIndex} selectedIndex={selectedNoteKeyIndex}/>
    <PrimarySelect title="Scale" values={scales} changeEvent={setSelectedScaleIndex} selectedIndex={selectedScaleIndex}/>
    </PrimaryInputsWrap>
  )
}
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

type DramsState = {
  midiKey:string,
  name:string,
  pattern:Array<0|1>,
  attack:number,
  volume:number,
}

const { persistAtom } = recoilPersist({
  key: "dramsPersist",
  storage: localStorage, 
}); 

export const dramsState = atom<Array<DramsState>>({
  key : 'dramsState',
  default:[
    { 
      midiKey:'C1',
      name:'Bass',
      pattern:[
        1,0,0,0,
        1,0,0,0,
        1,0,0,0,
        0,0,1,1,
      ],
      attack:0,
      volume:0,
    },
    {
      midiKey:'C2',
      name:'Tam',
      pattern:[
        0,0,0,0,
        0,0,0,0,
        0,0,0,0,
        0,1,0,1,
      ],
      attack:0,
      volume:0,
    },
    {
      midiKey:'C3',
      name:'Snr',
      pattern:[
        0,0,1,0,
        0,0,1,0,
        0,0,1,0,
        1,0,0,0,
      ],
      attack:0,
      volume:0,
    },
    {
      midiKey:'C4',
      name:'HHAT',
      pattern:[
        1,1,1,1,
        1,1,1,1,
        1,1,1,1,
        0,0,0,0,
      ],
      attack:0,
      volume:0,
    },
    {
      midiKey:'C5',
      name:'Sin',
      pattern:[
        0,0,0,0,
        0,0,0,0,
        0,0,0,0,
        1,0,0,1,
      ],
      attack:0,
      volume:0,
    },
  ],
  // effects_UNSTABLE:[persistAtom]
});
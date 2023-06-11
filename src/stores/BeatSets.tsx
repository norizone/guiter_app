import {atom} from "recoil";

export const metronomeBeatSets = atom({
  key:'metronomeBeatSets',
  default:[
    {
      name: '4/4',
      value: [2, 1, 1, 1]
    },
    {
      name: '3/4',
      value: [2, 1, 1]
    },
    {
      name: '2/4',
      value: [2, 1]
    }
  ]
})

export const dramsBeatSets = atom({
  key:'dramsBeatSets',
  default:[
    {
      name: '4/4',
      value: 16,
      numbers: []
    },
    {
      name: '8/8',
      value: 16,
      numbers: []
    },
    {
      name: '16/16',
      value: 16,
      numbers: []
    },
  ]
})
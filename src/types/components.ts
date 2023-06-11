export type PageList = 'tuning' | 'rhythm' | 'code' | 'scale';


export type typeCodeJson ={
  name: string;
  rootString: number;
  desc?: "5指";
  composition: {
    "1": number | boolean,
    "2": number | boolean,
    "3": number | boolean,
    "4": number | boolean,
    "5": number | boolean,
    "6": number | boolean
  };
}
type Choice =
  | number
  | string
  | boolean
  | Choice[]
  | {
      [key: string]: Choice;
    };

export default Choice;

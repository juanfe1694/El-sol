//Create a function to converter the state id to string
  export const priorityIdToString = (number: number) => {
    if (number === 0) return "None";
    if (number === 1) return "Low";
    if (number === 2) return "Medium";
    if (number === 3) return "High";
  };



  export const converterPriorityToId = (state: string) => {
    if (state === "None") return 0;
    if (state === "Low") return 1;
    if (state === "Medium") return 2;
    if (state === "High") return 3;
  };
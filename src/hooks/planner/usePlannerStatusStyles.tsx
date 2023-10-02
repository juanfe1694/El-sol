import React from 'react'
import { Chip } from 'react-native-paper';

export const usePlannerStatusStyles = () => {

  

    const getSeverity = (status: string) => {
        switch (status) {
          case "Backlog":
            return "gray";
          case "None":
              return "gray";
          case "To Do":
            return "#a855f7";
          case "In Progress":
            return "#17a5e6";
          case "On Validation":
            return "#9333ea";
          case "Done":
            return "#16a34a";
          case "Rejected":
            return "#d81d47";
          case "Approved":
            return "#16a34a"
          default:
            return "white";
        }
      };

      const statusItemTemplate = (option: string) => {
      return <Chip 
                textStyle={{color:'white'}}
                style={{backgroundColor: getSeverity(option)}}>
                { option }
             </Chip>
    };
  
  return{
    statusItemTemplate
  }
}

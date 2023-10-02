import { useEffect, useState } from "react"

export const useGetPasswordExtrenght = (pass : string) => {
    const [strength, setStrength] = useState(0);

    const min = /^(?=.*[a-z]).+$/;
    const mayus = /^(?=.*[A-Z]).+$/;
    const num = /^(?=.*\d).+$/;
    
    useEffect(() => {

        let newStrength = 0;

        if (min.test(pass)) {
            newStrength++
        }
        if (mayus.test(pass)) { 
            newStrength++
        };
        if (num.test(pass))  {
            newStrength++
        };
        if (pass.length >= 8)  {
            newStrength++
        }   

        setStrength(newStrength);
        
    },[pass])
    

    return { strength }
}
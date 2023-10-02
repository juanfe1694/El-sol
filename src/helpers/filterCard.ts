import { dataCard } from "../data/dataCard";



/* filter the card using the value that comes from the search */
export const filterCard = (search:string)=>{
    if (search.length <= 1) {
        
        return dataCard
    }
    const lower = search.toLowerCase();
    return dataCard.filter(({title,description})=>(
        title.toLowerCase().includes(lower) || 
        title.toLowerCase().includes(lower.slice(0,-1)) ||
        title.toLowerCase().includes(lower.slice(1)) ||
        description.toLowerCase().includes(lower) ||
        description.toLowerCase().includes(lower.slice(0,-1))||
        description.toLowerCase().includes(lower.slice(1)) 
    ));
}

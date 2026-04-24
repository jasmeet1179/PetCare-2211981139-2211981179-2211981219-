import { useEffect, useState } from "react";
import Nav from "../components/navbar";
import Searchbar from "../components/searchbar";
import Cards from "../components/cards";
import { useLocation } from 'react-router-dom';



function Search(){
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [value, setValue] = useState(queryParams.get('location') || "");



useEffect(() => {
    const newLocation = queryParams.get('location');
    setValue(newLocation || "");
}, [location.search]); 



let previousUrl = window.location.href;




return(
    <>
    <Nav className="bg-gray-800 p-4"/>
    
    <div className="p-4">

    <Searchbar gotlocation={value} />

    <Cards location={value} />

    </div>

    </>
)
}
export default Search;
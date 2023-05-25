"use client"
import { useState  ,createContext, useContext } from "react";
import { getAllDependencies } from "@/api/DependenciesApi";

const contextDependencies = createContext();
// esto es un hook
export const useDependencies = () => {
    const context = useContext(contextDependencies);
    if (context === undefined) {
        throw new Error("useDepencies must be used within a Provider")
    }
    return context;

}


export const DependenciesProvider = ({children}) => { // es el componente 

    const [dependencies, setDependencies] = useState([]);
    
    async function loadDependencies() {
        const response = await getAllDependencies();
        setDependencies(response.data);
        
    }
    
    //retorna su contexto a traves el Provider
    return (<contextDependencies.Provider value={{dependencies, setDependencies, loadDependencies}}> 
        {children}
    </contextDependencies.Provider>
    )
}
export default DependenciesProvider;
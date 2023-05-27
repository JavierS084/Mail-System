"use client"
import { useState, createContext, useContext } from "react";
import { getAllDependencies, getDependency, createDependency, updateDependency, deleteDependency } from "@/api/DependenciesApi";

const contextDependencies = createContext();
// esto es un hook
export const useDependencies = () => {
    const context = useContext(contextDependencies);
    if (context === undefined) {
        throw new Error("useDepencies must be used within a Provider")
    }
    return context;

}


export const DependenciesProvider = ({ children }) => { // es el componente 

    const [dependencies, setDependencies] = useState([]);
    const [msg, setMsg] = useState("");

    async function loadDependencies() {
        const response = await getAllDependencies();
        setDependencies(response.data);

    }
    const getDp = async (id) => {
        try {
            const response = await getDependency(id);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    const crDp = async (depart) => {
        try {
            const response = await createDependency(depart);
            setMsg(response.data.msg)
            console.log(response);
        } catch (error) {
            setMsg(error.response.data.msg);
        }
    }
    const upDp = async (id, newFields) => {
        try {
            const response = await updateDependency(id, newFields);
            console.log(response);
        } catch (error) {
            console.error(error);

        }
    }
    const delDp = async (id) => {
        try {
            console.log(id);
            const response = await deleteDependency(id);
            setDependencies(dependencies.filter(dependency => dependency.id !== id));
            console.log(response);
        } catch (error) {
            console.error(error);
        }

    }


    //retorna su contexto a traves el Provider
    return (<contextDependencies.Provider value={{ dependencies, setDependencies, loadDependencies, getDp, crDp, upDp, delDp, msg }}>
        {children}
    </contextDependencies.Provider>
    )
}
export default DependenciesProvider;
"use client"

import { useState, createContext, useContext } from "react";
import { getAllUsers, getUser, createUser, updateUser, deleteUser } from "@/api/UsersApi";

const contextAdministration = createContext();
// esto es un hook
export const useAdministrations = () => {
    const context = useContext(contextAdministration);
    if (context === undefined) {
        throw new Error("useAdministration must be used within a Provider")
    }
    return context;

}

export const AdministrationProvider = ({ children }) => {
    const [administrations, setAdministrations] = useState([]);
    const [msg, setMsg] = useState("");
    async function loadUsers() {
        const response = await getAllUsers();
        setAdministrations(response.data);

    }

    const gtUser = async (id) => {
        try {
            const response = await getUser(id);
            return response.data;
        } catch (error) {
            console.error(error);

        }
    }

    const crUser = async (user) => {
        try {
            const response = await createUser(user);
            console.log(response)
            if (response.status !== 201) {

                setMsg(response.data.msg)
            }
        } catch (error) {
            console.error(error);

        }
    }
    const upUser = async (id, newFields) => {
        try {
            const response = await updateUser(id, newFields);
            console.log(response)
        } catch (error) {
            console.error(error);
        }
    }

    const delUser = async (id) => {
        try {
            const response = await deleteUser(id);
            setAdministrations(administrations.filter(user => user.id !== id));
            console.log(response);
        } catch (error) {

            console.error(error);
        }
    }
    return (
        <contextAdministration.Provider value={{ administrations, loadUsers, gtUser, crUser, upUser, delUser, msg }}>
            {children}
        </contextAdministration.Provider>
    )


}
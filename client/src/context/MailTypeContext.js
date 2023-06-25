"use client"
import{ createContext, useContext, useState } from 'react';
import { getAllTypes, deleteType, createType, getmailType, updateType } from '@/api/typesApi';


const MailTypeContext = createContext();

export const useMailTypes = () => {
    const context = useContext(MailTypeContext);
    if (context === undefined) {
        throw new Error("useType must be used within a TypeContextProvider")
    }
    return context;
};

export const MailTypeProvider = ({ children }) => {
    const [MailTypes, setMailTypes] = useState([]);
    //View List
    async function loadTypes() {
        const response = await getAllTypes();
        setMailTypes(response.data);
    }

    const getType = async (id) => {
        try {
            const response = await getmailType(id);
            return response.data 
        } catch (error) {
            console.error(error);
        }
        
    }
    
    const crType = async (type) => {
        try {
            const response = await createType(type);
            console.log(response);
            
        } catch (error) {
            console.error(error);
        }
    }
    
    const upType = async (id, newFields) => {
        try {
            const response = await updateType(id, newFields);
            console.log(response);
        } catch (error) {
            console.error(error);
            
        }
        
    }
    const delType = async (id) => {
        try {
            const response = await deleteType(id);
            setMailTypes(MailTypes.filter(type => type.id !== id));
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };




    return (
        <MailTypeContext.Provider value={{ MailTypes, loadTypes, delType, crType, getType, upType }} >
            {children}
        </MailTypeContext.Provider>
    )


}
export default MailTypeProvider;
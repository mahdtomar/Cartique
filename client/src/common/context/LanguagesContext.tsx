import { useQuery } from '@tanstack/react-query'
import { createContext, type ReactNode } from 'react'
import Request from '../api/axios'
type languageType = {
    code: string;
    name: string;
    nativeName: string;
    isDefault: boolean;
}
interface LanguagesContextType {
    languages: languageType[]
}
export const LanguagesContext = createContext<LanguagesContextType>({ languages: [] })

export const LanguagesProvider = ({ children }: { children: ReactNode }) => {
    const getLanguages = async () => {
        const response = await Request<languageType[]>("/languages", "GET", true)
        return response.data
    }
    const { data: languages = [] } = useQuery({
        queryKey: ['languages'],
        queryFn: getLanguages,
        staleTime: 60 * 60 * 1000,
        gcTime: 3 * 60 * 60 * 1000
    })
    return <LanguagesContext.Provider value={{ languages }}>{children}</LanguagesContext.Provider>
}
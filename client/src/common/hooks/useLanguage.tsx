import { useContext } from "react"
import { LanguagesContext } from "../context/LanguagesContext"

const useLanguages = () => {
    const context = useContext(LanguagesContext)
    if (!context) {
        throw new Error('useLanguages must be used within a LanguagesProvider')
    }
    return context
}

export default useLanguages
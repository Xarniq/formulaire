import axios from 'axios'
import { createContext, useState, useEffect } from 'react'

export const UserContext = createContext({})

export function UserContextProvider({ children }) {
    const [user, setUser] = useState('')
    const [isLoading, setIsLoading] = useState(true) // État pour indiquer le chargement
    useEffect(() => {
        if (!user) {
            axios.get('/profile')
                .then(({ data }) => {
                    setUser(data)
                    setIsLoading(false) // Définir l'état sur false lorsque les données sont chargées
                })
                .catch(error => {
                    console.error("Une erreur s'est produite lors de la récupération des données :", error)
                    setIsLoading(false) // Gérer les erreurs en définissant également l'état sur false
                })
        }
    }, [user]) // Mettre à jour uniquement si user change

    // Rendre un message de chargement tant que les données ne sont pas chargées
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
            <div className="bg-gray-800 opacity-75 text-white py-2 px-4 rounded-lg shadow-lg">
              <div className="flex items-center">
                <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.373A8 8 0 0112 4v4c-2.265 0-4.348.778-6 2.073l2 3.46zM20 12c0-1.063-.23-2.078-.64-3h-3.717l-2 3.46 3.636 6.303c1.386-.804 2.558-1.846 3.477-3.064A7.963 7.963 0 0120 12zM8 20.627c1.68.37 3.476.373 5.172 0l-2-3.46H8v3.46z"
                  ></path>
                </svg>
                <span>Chargement en cours...</span>
              </div>
            </div>
          </div>
        )
    }

    // Une fois les données chargées, rendre le contenu avec le contexte
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

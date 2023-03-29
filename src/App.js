import { Router } from './routes'
import { ChakraProvider } from '@chakra-ui/react'
import { GlobalContext } from './contexts/GlobalContext';
import { useEffect } from 'react';

function App() {
  const [ isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    const token = window.localStorage.getItem("token-labeddit")

    if (token){
      setIsAuth(true)
    }
  }, [])

  const context = {
    isAuth: isAuth, 
    setIsAuth: setIsAuth
  }

  return (
    <GlobalContext.Provider value={context}>
      <ChakraProvider>
        <Router />
      </ChakraProvider>
    </GlobalContext.Provider>
  );
}

export default App;

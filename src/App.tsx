import CustomLayout from 'components/common/CustomLayout'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { publicRoutes } from 'routes'
import { constants } from 'utils/constants'

interface AppRouteProps {
  isProtected: Boolean
  [x: string]: any
}

const AppRoute = ({ isProtected, children, ...rest }: AppRouteProps) => {
  console.log('rest', rest)
  if (isProtected && !localStorage.getItem(constants.AUTH_TOKEN)) {
    return (
      <Navigate
        to='/login'
        // state={{ from: props.location }}
        replace
      />
    )
  } else {
    return <CustomLayout>{children}</CustomLayout>
  }
}

function App() {
  console.log(publicRoutes)
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map(({ Component, path, ...rest }, i) => (
          <Route
            path={path}
            element={
              <AppRoute isProtected={false}>
                <Component />
              </AppRoute>
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  )
}

export default App

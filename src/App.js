import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './components/Login';
import { NotFoundPage } from './components/NotFoundPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ProtectedRoutesLR } from './components/ProtectedRoutesLR';
import { Register } from './components/Register';
import { AuthProvider } from './context/authContext';
import { WorkerProvider } from './context/workerContext';
import NavBar from './components/NavBar/NavBar.jsx'
import Show from './components/Show';
import { Home } from './components/Home';
import Links from './components/Tools/Links';
import Providers from './components/Providers/Providers';
import Epps from './components/Epps/Epps';
import Machinaries from './components/Machinary/Machinaries';
import OrBuys from './components/OrBuy/OrBuys';
import OrbuyDetals from './components/OrBuy/OrbuyDetals';
import DocPDF from './components/OrBuy/DocPDF';


function App() {
  return (
    <div>

      <BrowserRouter>
        <AuthProvider>
          <ProtectedRoute>
            <NavBar></NavBar>
          </ProtectedRoute>

          <div className="h-screen py-20">
            <Routes>

              <Route path="/pdf"
                element={
                  <ProtectedRoute>
                    <DocPDF />
                  </ProtectedRoute>} />
              <Route path="/orbuydetals"
                element={
                  <ProtectedRoute>
                    <OrbuyDetals />
                  </ProtectedRoute>} />
              <Route path="/orbuys"
                element={
                  <ProtectedRoute>
                    <OrBuys />
                  </ProtectedRoute>} />
              <Route path="/machinaries"
                element={
                  <ProtectedRoute>
                    <Machinaries />
                  </ProtectedRoute>} />
              <Route path="/epps"
                element={
                  <ProtectedRoute>
                    <Epps />
                  </ProtectedRoute>} />
              <Route path="/providers"
                element={
                  <ProtectedRoute>
                    <Providers />
                  </ProtectedRoute>} />
              <Route path="/tools"
                element={
                  <ProtectedRoute>
                    <Links />
                  </ProtectedRoute>} />
              <Route path="/workers"
                element={
                  <ProtectedRoute>
                    <WorkerProvider>
                      <Show />
                    </WorkerProvider>
                  </ProtectedRoute>} />
              <Route path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>} />

              <Route path="/login"
                element={
                  <ProtectedRoutesLR>
                    <Login />
                  </ProtectedRoutesLR>} />
              <Route path="/register"
                element={
                  <ProtectedRoutesLR>
                    <Register />
                  </ProtectedRoutesLR>} />
              <Route path="*" element={<NotFoundPage />} />

            </Routes>

          </div>
        </AuthProvider>
      </BrowserRouter>

    </div>
  )
}

export default App;


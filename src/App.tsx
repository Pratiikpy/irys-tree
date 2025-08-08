import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import LoadingSpinner from './components/shared/LoadingSpinner'

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'))
const Create = lazy(() => import('./pages/Create'))
const ProfileView = lazy(() => import('./pages/ProfileView'))
const UsernameProfile = lazy(() => import('./pages/UsernameProfile'))
const Discover = lazy(() => import('./pages/Discover'))
const Verify = lazy(() => import('./pages/Verify'))
const Analytics = lazy(() => import('./pages/Analytics'))
const Settings = lazy(() => import('./pages/Settings'))
const Templates = lazy(() => import('./pages/Templates'))
const Help = lazy(() => import('./pages/Help'))

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/help" element={<Help />} />
          <Route path="/p/:transactionId" element={<ProfileView />} />
          <Route path="/p/:transactionId/edit" element={<Create />} />
          <Route path="/verify/:transactionId" element={<Verify />} />
          <Route path="/analytics/:transactionId" element={<Analytics />} />
          <Route path="/:username" element={<UsernameProfile />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App 
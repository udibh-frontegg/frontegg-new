import { useEffect } from 'react'
import './App.css'
import { useAuth, useLoginWithRedirect, ContextHolder, AdminPortal } from "@frontegg/react"

function App() {
  const { user, isAuthenticated } = useAuth()
  const loginWithRedirect = useLoginWithRedirect()

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect()
    }
  }, [isAuthenticated, loginWithRedirect])

  const logout = () => {
    const baseUrl = ContextHolder.getContext().baseUrl
    window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location.href}`
  }

  const handleSettingsClick = () => {
    AdminPortal.show()
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>Frontegg Authentication Test</h1>
      </header>
      
      {isAuthenticated ? (
        <div className="user-info">
          <div className="profile-section">
            <img src={user?.profilePictureUrl} alt={user?.name} className="profile-image" />
          </div>
          <div className="user-details">
            <span>Logged in as: <strong>{user?.name}</strong></span>
            <p>Email: {user?.email}</p>
          </div>
          <div className="action-buttons">
            <button onClick={() => alert(user.accessToken)} className="token-btn">
              Show Access Token
            </button>
            <button onClick={handleSettingsClick} className="settings-btn">
              Settings Portal
            </button>
            <button onClick={() => logout()} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="login-section">
          <button onClick={() => loginWithRedirect()} className="login-btn">
            Click to Login
          </button>
        </div>
      )}
    </div>
  )
}

export default App

import React from 'react'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      Salut
      {children}
    </div>
  )
}

export default Layout

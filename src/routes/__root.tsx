import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanstackDevtools } from '@tanstack/react-devtools'

import Header from '../components/Header'
import Footer from '@/components/Footer'

export const Route = createRootRoute({
  component: () => (
    <div className="flex flex-col h-screen min-h-0">
      <Header />
      <main className="flex-1 flex flex-col overflow-auto">
        <Outlet />
      </main>
      <Footer />
      <TanstackDevtools
        config={{
          position: 'bottom-left',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </div>
  ),
})

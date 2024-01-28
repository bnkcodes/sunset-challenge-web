import { Outlet, Link } from 'react-router-dom';

import logoIcon from '../../assets/images/logo.png';
import { UserMenu } from '../components/UserMenu';

export function PrivateLayout() {

  return (
    <div className="w-full h-full flex flex-col">
      <header className="flex items-center justify-between px-10 py-2">
        <Link to="/">
          <img 
            src={logoIcon}
            alt="Sunset"
            className='h-16 cursor-pointer'
          />
        </Link>

        <UserMenu />
      </header>

      <main className="flex-1 flex flex-col gap-4 max-h-full overflow-y-hidden">
        <Outlet />
      </main>
    </div>
  )
}
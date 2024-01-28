import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthGuard } from './AuthGuard';
import { Dashboard, Login, Register, Tasks, NotFound, Profile } from '../view/pages';
import { AuthLayout, PrivateLayout } from '../view/layouts';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>

        <Route element={<AuthGuard isPrivate={true} />}>
          <Route element={<PrivateLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/list/:id" element={<Tasks />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
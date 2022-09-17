import React, { useState } from 'react';
import { HomeIcon, MenuAlt3Icon, XIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
  const { dispatch, user } = useAuthContext();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleLogout = () => {

    localStorage.removeItem('user');

    dispatch({ type: 'LOGOUT' });
  }

  return (
    <>
        <nav className='bg-gray-900 p-6 flex items-center justify-between'>
            <Link to='/' className='flex items-center'>
                <HomeIcon className='h-8 text-white'/>
                <h1 className='text-white'>Workout App</h1>
            </Link>

            <div className='hidden space-x-4 md:flex'>
              {!user && <Link to='/signup' className='text-white'>Sign Up</Link>}
              {!user && <Link to='/login' className='text-white'>Login</Link>}
              {user && <p className='text-white'>{user.email}</p>}
              {user && <button className='text-white' onClick={handleLogout}>Logout</button>}
            </div>

    
            {!open && <MenuAlt3Icon 
                className='text-white h-6 cursor-pointer md:hidden'
                onClick={handleOpen}
            />}

            {open && <XIcon 
                className='text-white h-6 cursor-pointer md:hidden'
                onClick={handleClose}
            />} 
        </nav>

        {open && <div className='bg-gray-900 text-center pb-5 md:hidden'>
            <div className='border-b border-t border-white p-2'>
                {!user && <Link to='/signup' className='text-white'>Sign Up</Link>}
            </div>
            <div className='border-b border-white p-2'>
              {!user && <Link to='/login' className='text-white'>Login</Link>}
            </div>
            {user && <button 
            className='text-white'
            onClick={handleLogout}>
            Logout
            </button>}
        </div>}
    </>
    
  )
}

export default Navbar;
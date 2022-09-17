import React from 'react';
import { useDataHook } from '../hooks/useDataHook';
import { useAuthContext } from '../hooks/useAuthContext';

const List = ({ item }) => {
  const { user } = useAuthContext()
  const { dispatch } = useDataHook();

  const handleClick = async () => {

    if(!user){
      return;
    }

    const id = item._id;

    const response = await fetch(`http://localhost:8000/api/workouts/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      },
    });

    const json = await response.json();

    if(response.ok){
      dispatch({ type: 'DELETE_DATA', payload: json });
    }
  } 

  return (
    <div className='shadow-xl border border-gray-900 p-6 w-96 rounded-sm'>
        <h1 className='font-semibold text-gray-900 text-2xl'>{item.title.toUpperCase()}</h1>
        <p className='text-gray-700 font-semibold text-1xl'>Reps - {item.reps}</p>
        <p className='text-gray-700 font-semibold text-1xl'>Load/Kg - {item.load}</p>
        <button
            className='px-2 py-2 bg-gray-900 text-white rounded-md text-sm mt-2'
            onClick={handleClick}>
            Remove
        </button>
    </div>
  )
}

export default List;
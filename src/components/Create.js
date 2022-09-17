import React, { useState } from 'react';
import { useDataHook } from '../hooks/useDataHook';
import { useAuthContext } from '../hooks/useAuthContext'

const Create = () => {
    const { user } = useAuthContext()
    const { dispatch } = useDataHook();
    const [title, setTitle] = useState('');
    const [reps,setReps] = useState('');
    const [load, setLoad] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if(!user){
            setError('You must be logged in!');
            return;
        }

        const data = { title, reps, load };

        const response = await fetch('http://localhost:8000/api/workouts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(data)
        });

        const json = await response.json();

        if(!response.ok){
            setError(json.error);
        }

        if(response.ok){
            dispatch({ type: 'CREATE_DATA', payload: json });
            setTitle('');
            setReps('');
            setLoad('');
        }
    }

  return (
    <div className='border border-gray-900 p-6 rounded-sm shadow-xl w-96'>
        <h1 className='text-gray-900 font-bold text-3xl'>ENTER PROGRAM</h1>
        <form className='flex flex-col' onSubmit={handleSubmit}>
            <input 
                type='text' 
                placeholder=' Enter Workout Title'
                className='h-12 w-80 mt-2 rounded-sm'
                style={{ border: error ? '2px solid red' : '2px solid gray' }}
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />

            <input 
                type='text' 
                placeholder=' Enter Workout Rep'
                className='h-12 w-80 mt-2 rounded-sm'
                style={{ border: error ? '2px solid red' : '2px solid gray' }}
                onChange={(e) => setReps(e.target.value)}
                value={reps}
            />

            <input 
                type='text' 
                placeholder=' Enter Workout Load'
                className='h-12 w-80 mt-2 rounded-sm'
                style={{ border: error ? '2px solid red' : '2px solid gray' }}
                onChange={(e) => setLoad(e.target.value)}
                value={load}
            />

            <button 
                className='mt-3 rounded-md px-2 py-2 bg-gray-900 text-white w-80'>
                Add Program
            </button>
            {error && <p className='text-red-700'>{error}</p>}
        </form>
    </div>
  )
}

export default Create;
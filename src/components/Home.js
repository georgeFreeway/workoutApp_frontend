import React, { useEffect, useState } from 'react';

//components
import List from './List';
import Create from './Create';
//context
import { useDataHook } from '../hooks/useDataHook';
import { useAuthContext } from '../hooks/useAuthContext'

const Home = () => {
    const { user } = useAuthContext()
    const { data, dispatch } = useDataHook();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    // console.log(user);

    useEffect(() => {
        setLoading(true);
        setError(false);
        const fetchData = async () => {
            const response = await fetch('http://localhost:8000/api/workouts', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });

            if(!response.ok){
                setLoading(false);
                setError(response.statusText);  
            }

            const json = await response.json();
            if(response.ok){
                setLoading(false);
                dispatch({ type: 'GET_DATA', payload: json });
            }
        }

        if(user){
            fetchData();
        }
    }, [dispatch, user]);


  return (
    <div className='p-6 flex items-start justify-around'>
        <div>
            {error && <div>{error}</div>}
            {loading && <div>loading...</div>}
            {data && data.map((item) => (
                <List key={item._id} item={item} />
            ))}
        </div>
        <Create />
    </div>
  )
}

export default Home;
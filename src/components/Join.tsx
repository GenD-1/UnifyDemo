import { useHMSActions } from '@100mslive/react-sdk';
import React, { useState } from 'react';
import getToken from '../utils/getToken';

const Join = ({ tokenData }: any) => {
  const actions = useHMSActions();
  const [username, setUsername] = useState('');
  const token = window.location.href.split('/')
  const joinRoom = () => {
    console.log('tokenData', tokenData);

    actions.join({
      userName: username || 'Anonymous',
      authToken: tokenData || token[3],
      settings: {
        isAudioMuted: true,
      },
      initEndpoint: process.env.REACT_APP_HMS_INIT_PEER_ENPOINT || undefined
    });

    // getToken('speaker').then((t: any) => {
    //   actions.join({
    //     userName: username || 'Anonymous',
    //     authToken: t,
    //     settings: {
    //       isAudioMuted: true,
    //     },
    //     initEndpoint: process.env.REACT_APP_HMS_INIT_PEER_ENPOINT || undefined
    //   });
    // });
  };
  return (
    <div className='flex-col items-center justify-center h-screen bg-brand-100'>

      <input
        type='text'
        placeholder='Enter username'
        onChange={(e) => setUsername(e.target.value)}
        className='px-6 mt-5 text-center py-3 w-80 bg-brand-100 rounded  border  border-gray-600 outline-none placeholder-gray-400 focus:ring-4 ring-offset-0 focus:border-blue-600 ring-brand-200 text-lg transition'

      />
      <button
        type='button'
        onClick={joinRoom}
        className='w-80 rounded bg-brand-400 hover:opacity-80 px-6 mt-5 py-3 text-lg focus:ring-4 ring-offset-0 focus:border-blue-600 ring-brand-200 outline-none'
      >
        Join Huddle
      </button>

    </div>
  );
};

export default Join;
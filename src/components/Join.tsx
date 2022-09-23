import { useHMSActions } from '@100mslive/react-sdk';
import React, { useEffect, useState } from 'react';
import getToken from '../utils/getToken';

const Join = ({ room_id }: any) => {
  const actions = useHMSActions();

  const joinRoom = () => {
    getToken('speaker', room_id).then((t: any) => {
      actions.join({
        userName: 'Anonymous',
        authToken: t,
        settings: {
          isAudioMuted: true,
        },
      });
    });
  };

  return (
    <div>
      <button
        onClick={joinRoom}
      >
        Start Mic
      </button>
    </div>
  );
};

export default Join;
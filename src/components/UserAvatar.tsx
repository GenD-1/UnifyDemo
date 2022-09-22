import React from 'react';
import Avatar from 'boring-avatars';
interface propsType {
  dominantSpeaker: any;
  localPeer: any;
}

const UserAvatar = ({ dominantSpeaker, localPeer }: propsType) => {
  return (
    <Avatar
      name={
        dominantSpeaker && dominantSpeaker.name
          ? dominantSpeaker.name
          : localPeer.name
      }
      variant='pixel'
      size={30}
    />
  );
};

export default UserAvatar;

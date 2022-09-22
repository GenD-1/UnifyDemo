import React from 'react';
interface props { peers: any }

const Partcipants = ({ peers }: props) => {
  const [showUsers, setShowUsers] = React.useState(false);
  return (
    <>
      <button onClick={() => setShowUsers(!showUsers)} className='underline'>
        {peers.length} in the huddle
      </button>
      {showUsers ? (
        <div className='mt-2 text-gray-200 text-sm font-normal'>
          {peers.map((p: any, i: any) => (
            <div key={p.id}>
              {' '}
              {i + 1}: {p.name}
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default Partcipants;

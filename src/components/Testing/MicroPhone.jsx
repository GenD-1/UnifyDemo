import { Mic, MicOff } from 'react-feather'

const AudioButton = ({ active, onClick }) => {
  return (
    <button
      className={`p-3 rounded-full absolute top-[45%] left-[45%] z-[999]  ${active ? 'bg-brand-100' : 'bg-red-600'}`}
      onClick={onClick}
    >
      {active ? <Mic size={25} /> : <MicOff size={25} />}
    </button>
  );
};

export default AudioButton;

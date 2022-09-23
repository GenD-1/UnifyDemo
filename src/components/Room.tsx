import Layout from './Layout';
import { selectIsLocalAudioEnabled, useHMSActions, useHMSStore } from '@100mslive/react-sdk';
import MicOnIcon from '../icons/MicOnIcon';
import MicOffIcon from '../icons/MicOffIcon';

const Room = () => {
    const actions = useHMSActions();
    const isAudioOn = useHMSStore(selectIsLocalAudioEnabled);

    return (
        <Layout>
            <div className='flex'>
                <button
                    onClick={() => {
                        actions.setLocalAudioEnabled(!isAudioOn);
                    }}
                >
                    {isAudioOn ? <MicOnIcon /> : <MicOffIcon />}
                    {isAudioOn ? 'Mic ON' : 'Mic Off'}
                </button>
            </div>
        </Layout>
    );
};

export default Room;
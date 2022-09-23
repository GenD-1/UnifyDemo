import Participants from './Participants';
import LonelyPeer from './LonelyPeer';
import Layout from './Layout';
import { selectIsLocalAudioEnabled, selectPeers, useHMSActions, useHMSStore } from '@100mslive/react-sdk';
import MicOnIcon from '../icons/MicOnIcon';
import MicOffIcon from '../icons/MicOffIcon';

const Room = () => {
    const peers = useHMSStore(selectPeers);
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
                </button>
                <div className='ml-4'>
                    {peers.length > 1 ? <Participants peers={peers} /> : <LonelyPeer />}
                </div>
            </div>
        </Layout>
    );
};

export default Room;
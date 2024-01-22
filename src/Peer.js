import React, { useEffect, useState } from 'react';
import Peer from 'peerjs';

const PeerToPeer = () => {
  const [peer, setPeer] = useState(null);
  const [peerId, setPeerId] = useState('');
  const [connectedPeer, setConnectedPeer] = useState(null);
  const [inputText, setInputText] = useState('');
  const [receivedData, setReceivedData] = useState('');

  useEffect(() => {
    const newPeer = new Peer();

    newPeer.on('open', (id) => {
      setPeerId(id);
    });

    newPeer.on('connection', (newConnection) => {
      setConnectedPeer(newConnection);

      newConnection.on('data', (data) => {
        setReceivedData(data);
      });
    });

    setPeer(newPeer);

    return () => {
      newPeer.destroy();
    };
  }, []);

  const connectToPeer = (id) => {
    const newConnection = peer.connect(id);

    newConnection.on('open', () => {
      setConnectedPeer(newConnection);
    });

    newConnection.on('data', (data) => {
      setReceivedData(data);
    });
  };

  const sendData = () => {
    if (connectedPeer) {
      connectedPeer.send(inputText);
    } else {
      console.error('Not connected to any peer.');
    }
  };

  return (
    <div>
      <h1>Your Peer ID: {peerId}</h1>
      <input
        type="text"
        placeholder="Enter Peer ID"
        onChange={(e) => setInputText(e.target.value)}
      />
      <button onClick={() => connectToPeer('targetPeerId')}>
        Connect to Peer
      </button>
      <button onClick={sendData}>Send Data</button>

      <div>
        <h2>Received Data:</h2>
        <p>{receivedData}</p>
      </div>
    </div>
  );
};

export default PeerToPeer;

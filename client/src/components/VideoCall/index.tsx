import { useState, useRef, useEffect } from "react";
import SimplePeer from "simple-peer";
import useSocketStore from "@/store/socketStore";

const VideoCall = () => {

  const { socket } = useSocketStore();
  const [me, setMe] = useState("");
  const [stream, setStream] = useState<MediaStream | undefined>(undefined);
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState<any>();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const myVideo = useRef<HTMLVideoElement>(null);
  const userVideo = useRef<HTMLVideoElement>(null);
  const connectionRef = useRef<SimplePeer.Instance | null>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if (myVideo.current) {
          myVideo.current.srcObject = stream;
        }
      });

    socket.on("me", (id: any) => {
      setMe(id);
    });

    socket.on("callUser", (data: any) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
  }, []);

  const callUser = (id: any) => {
    const peer = new SimplePeer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: name,
      });
    });

    peer.on("stream", (stream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    });

    socket.on("callAccepted", (signal: any) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new SimplePeer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("answerCall", {
        signal: data,
        to: caller,
      });
    });

    peer.on("stream", (stream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    if (connectionRef.current) {
      connectionRef.current.destroy();
    }
  };

  return (
    <div>
      <h1>Video Chat App</h1>
      <div>
        <div>
          {stream && (
            <video
              playsInline
              muted
              ref={myVideo}
              autoPlay
              style={{ width: "300px" }}
            />
          )}
        </div>
        <div>
          {callAccepted && !callEnded && (
            <video
              playsInline
              ref={userVideo}
              autoPlay
              style={{ width: "300px" }}
            />
          )}
        </div>
      </div>
      my id: {me}
      <div>
        <input
          type="text"
          value={idToCall}
          onChange={(e) => setIdToCall(e.target.value)}
          placeholder="ID to call"
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
        <button onClick={() => callUser(idToCall)}>Call</button>
      </div>
      <div>
        {receivingCall && !callAccepted ? (
          <div>
            <h1>{name} is calling...</h1>
            <button onClick={answerCall}>Answer</button>
          </div>
        ) : null}
      </div>
      <div>
        {callAccepted && !callEnded ? (
          <button onClick={leaveCall}>Hang up</button>
        ) : null}
      </div>
    </div>
  );
};

export default VideoCall;
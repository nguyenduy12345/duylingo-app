import { useRef } from "react";
const CharacterCard = ({ character, example, audioUrl, handleListenAudio }) => {
  const audioRef = useRef()
  const handlegetAudioRef = () => {
    if (audioRef.current) {
      handleListenAudio(audioRef.current);
    }
  }
  return (
    <div
      onClick={handlegetAudioRef}
      className="flex cursor-pointer z-10 w-[100%] h-[4.5rem] flex-col items-center rounded-lg border-[1px] border-b-[4px] border-gray-300 border-b-[#e5e5e5]"
    >
      <div onClick={handlegetAudioRef} className="text-xl font-semibold">{character}</div>
      <div onClick={handlegetAudioRef} className="text-sm text-gray-500">{example}</div>
      <div onClick={handlegetAudioRef} className="my-[3px] h-[0.5rem] w-[40%] rounded-full bg-[#e5e5e5]"></div>
      <audio
        ref={audioRef}
        className="absolute left-32 top-[5rem]"
        controls
        preload="none"
        hidden
      >
        <source src={audioUrl} type="audio/mp3" />
      </audio>
    </div>
  );
};

export default CharacterCard;

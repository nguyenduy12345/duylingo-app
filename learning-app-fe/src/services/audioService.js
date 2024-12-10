export const fetchAudio = async(url) => {
    const response = await fetch(url);
  if (response.ok){
    return response.blob()
  }
}
export const saveAudioToCache = async (url, blob) => {
    const cache = await caches.open('audio-cache');
    const request = new Request(url);
    const response = new Response(blob);
    cache.put(request, response);
};
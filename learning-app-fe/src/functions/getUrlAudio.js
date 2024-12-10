const getUrlAudioFromArrays = (...arrays) => {
    const listUrl = arrays?.flatMap(array => array?.map(item => item?.audioUrl))
    return listUrl
}
export default getUrlAudioFromArrays
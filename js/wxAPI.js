export const playmusic = ()=>{
    let audio = wx.createInnerAudioContext();
    audio.src='./audio/bgm.mp3';
    audio.loop = true;
    audio.play();
}
export const playthrough = () => {
  let audio = wx.createInnerAudioContext();
  audio.src = './audio/boom.mp3';
  audio.autoplay = true;
}



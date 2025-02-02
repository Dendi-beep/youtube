const fs = require('fs');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');

const videoUrl = 'https://www.youtube.com/watch?v=VIDEO_ID';

ytdl(videoUrl, { quality: 'highestaudio' })
    .pipe(fs.createWriteStream('audio.mp3'))
    .on('finish', () => {
        console.log('Audio downloaded and saved to audio.mp3');
    })
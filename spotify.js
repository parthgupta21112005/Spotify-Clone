let songIndex = 0;
let audioElement = new Audio('song1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myprogressbar');
let gif=document.getElementById('gif');
let masterSongName=document.getElementById('masterSongName');
let songItems=Array.from(document.getElementsByClassName('songItem'));
let time=document.getElementsByClassName('time');
let songs = [
    {songName: "Tauba-Tauba", filePath: "song1.mp3", coverPath: "cover1.jpg"},
    {songName: "Bhool-Bhulaiya", filePath:"song2.mp3" , coverPath:"cover2.jpg"},
    {songName: "Humnava-Mere", filePath:"song3.mp3" , coverPath:"cover3.webp"},
    {songName: "Show-Me-The_Thumka", filePath:"song4.mp3" , coverPath:"cover4.jpg"},
]

songItems.forEach((element,i)=>{
    element.getElementsByTagName('img')[0].src=songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText=songs[i].songName;
})
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity=1;
        masterSongName.style.opacity=1;
        
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity=0;
        masterSongName.style.opacity=0;
    }
})

audioElement.addEventListener('timeupdate', ()=>{
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;

    // remaining time nikalna
    let remaining = Math.floor(audioElement.duration - audioElement.currentTime); 
    let minutes = Math.floor(remaining / 60);
    let seconds = remaining % 60;

    // agar seconds < 10 ho to leading zero lagao
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    // countdown time show karo
    time[0].innerText = `${minutes}:${seconds}`;
});
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value*audioElement.duration/100
})

const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause');//band ganna
        element.classList.add('fa-play');
    })
    
}


Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        if(audioElement.paused || audioElement.currentTime<=0){
            makeAllPlays();
            songIndex=parseInt(e.target.id);
            e.target.classList.remove('fa-play');
            e.target.classList.add('fa-pause');
            audioElement.src=`song${songIndex+1}.mp3`;
            masterSongName.innerText=songs[songIndex].songName;
            audioElement.currentTime=0;
            audioElement.play();
            gif.style.opacity=1;
            masterSongName.style.opacity=1;
            masterPlay.classList.remove('fa-play');
            masterPlay.classList.add('fa-pause');
        }
        else{
            audioElement.pause();
            e.target.classList.remove('fa-pause');
            e.target.classList.add('fa-play');
            masterPlay.classList.remove('fa-pause');
            masterPlay.classList.add('fa-play');
            gif.style.opacity=0;
            masterSongName.style.opacity=0;
        }
    })
})
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=9){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src=`songs/song${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex-=1;
    }
    audioElement.src=`songs/song${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})
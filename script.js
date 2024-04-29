console.log("Welcome to Spotify");

let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let myGif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let masterSongName =document.getElementById("masterSongName");


let songs = [
    {songName:"Destroyer of Worlds - OPENHEIMER", filePath:"songs/1.mp3",coverPath:"covers/1.jpg",duration:"01:17" },
    {songName:"Animal NudeWalk - ANIMAL", filePath:"songs/2.mp3",coverPath:"covers/2.jpg",duration:"01:56"},
    {songName:"Chandrachooda - GGVV", filePath:"songs/3.mp3",coverPath:"covers/3.jpg",duration:"03:12"},
    {songName:"IPL Scorecard Music - IPL2020", filePath:"songs/4.mp3",coverPath:"covers/4.jpg",duration:"02:52" },
    {songName:"Joel Sunny-Luminary - ALBUM", filePath:"songs/5.mp3",coverPath:"covers/5.jpg",duration:"03:13" },
    {songName:"Metamorphosis - SIGMA PHONK", filePath:"songs/6.mp3",coverPath:"covers/6.jpg",duration:"00:31" },
    {songName:"Truth on the wall - MANGALAVARAM", filePath:"songs/7.mp3",coverPath:"covers/7.jpg" ,duration:"01:17"},
    {songName:"Wrath of SALAR - SALAR", filePath:"songs/8.mp3",coverPath:"covers/9.jpg" ,duration:"02:24"}
];

//change background currently not working
//start

let backgrounds = [
    {backGround:"wp12552482-oppenheimer-movie-wallpapers.jpg"},
    {backGround:"Animal-HD-WAllpaper-7.jpg"},
    {backGround:"GGVVBG.jpg"},
    {backGround:"2302746.jpg"}
];
let myContainer = document.getElementsByClassName('container');

function changeBackground(myContainer){
    const body = document.querySelector('body');
    if(songName ==='Destroyer of Worlds - OPENHEIMER'){
        myContainer.style.backgroundImage="url('wp12552482-oppenheimer-movie-wallpapers.jpg')";
    }
    else if(songName ==='Animal NudeWalk - ANIMAL'){
        myContainer.style.backgroundImage="url('Animal-HD-WAllpaper-7.jpg')";
    }
    else if(songName ==='Chandrachooda - GGVV'){
        myContainer.style.backgroundImage="url('GGVVBG.jpg')";
    }
    else if(songName ==='IPL Scorecard Music - IPL2020'){
        myContainer.style.backgroundImage="url('2302746.jpg')";
    }
}

//end

songItems.forEach((element,i)=>{
    // console.log(element,i)
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
    element.getElementsByClassName("duration")[0].innerText=songs[i].duration;

})



//handle playPause click
masterPlay.addEventListener("click",()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        myGif.style.opacity= 1;

    }
    else{
        audioElement.pause();
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        myGif.style.opacity= 0;


    }
})

// Listen to events
audioElement.addEventListener("timeupdate",(e)=>{
    // update seekbar
    // console.log("Time Update");
    let progress = parseInt((audioElement.currentTime/audioElement.duration) * 100);
    myProgressBar.value=progress;
})

myProgressBar.addEventListener("change",()=>{
    audioElement.currentTime=myProgressBar.value*audioElement.duration/100;
    
})

//Refresh of slider thumb and pause of masterPlay not working 
if(audioElement.currentTime===myProgressBar.ariaValueMax){
    myProgressBar.value=myProgressBar.ariaValueMin;
    myGif.style.opacity= 0;
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
}

//Space key events playPause

document.body.addEventListener("keydown",(e)=>{
    if(e.keyCode===32){
    e.preventDefault()
        if(audioElement.paused || audioElement.currentTime<=0){
            audioElement.play();
            masterPlay.classList.remove("fa-circle-play");
            masterPlay.classList.add("fa-circle-pause");
            myGif.style.opacity= 1;
    
        }
        else{
            audioElement.pause();
            masterPlay.classList.remove("fa-circle-pause");
            masterPlay.classList.add("fa-circle-play");
            myGif.style.opacity= 0;
    
    
        }
    }
})

const makeAllPlays = () =>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        element.classList.add("fa-circle-play");
        element.classList.remove("fa-circle-pause");
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener("click",(e)=>{
        e.preventDefault();
        // console.log(e);
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-circle-pause");
        audioElement.src=`songs/${songIndex}.mp3`;
        masterSongName.innerText=songs[songIndex-1].songName;
        audioElement.play();
        audioElement.currentTime=0;
        masterPlay.classList.add("fa-circle-pause");
        masterPlay.classList.remove("fa-circle-play");
        myGif.style.opacity= 1;
    })
})

// audioElement = new Audio("songs/1.mp3");


document.getElementById("next").addEventListener("click",()=>{
    if(songIndex==9){
    songIndex = 1;
    }
    else{
        songIndex  += 1
    }
        audioElement.src=`songs/${songIndex}.mp3`;
        masterSongName.innerText=songs[songIndex-1].songName;
        audioElement.play();
        audioElement.currentTime=0;
        masterPlay.classList.add("fa-circle-pause");
        masterPlay.classList.remove("fa-circle-play");
        myGif.style.opacity= 1;
    })
document.getElementById("previous").addEventListener("click",()=>{
    if(songIndex==1){
    songIndex = 9;
    }
    else{
        songIndex  -= 1
    }
    audioElement.src=`songs/${songIndex}.mp3`;
    masterSongName.innerText=songs[songIndex-1].songName;
        audioElement.play();
        audioElement.currentTime=0;
        masterPlay.classList.add("fa-circle-pause");
        masterPlay.classList.remove("fa-circle-play");
        myGif.style.opacity= 1;
    });

    //volume controller

    let volumeSlider = document.getElementById("volumeControl");
    audioElement.volume = volumeSlider.value/100;
    volumeSlider.addEventListener('input',()=>{
    
        let volume = volumeSlider.value;
        audioElement.volume=volume/100;

    });

    // mute and Unmute

    let muteIcon = document.getElementsByClassName("fa-volume-high");

    function toggleMute(){
        if(audioElement.muted){
            audioElement.muted=false;
            muteIcon.classList.remove("fa-volume-xmark");
            muteIcon.classList.add("fa-volume-high");
        }
        else{
            audioElement.muted=true;
            muteIcon.classList.remove("fa-volume-high");
            muteIcon.classList.add("fa-volume-xmark");
        }
    }

    muteIcon.addEventListener("click",toggleMute);
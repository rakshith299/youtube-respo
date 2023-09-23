const container = document.getElementById("main-body");
const input = document.getElementById("input");
let token = "AIzaSyATtpCxpvtWcs6wYmfcxWNo4HXK_8ZWtf0";

// https://www.googleapis.com/youtube/v3/search?key={apiKey}&part=snippet&q=js&type=video

// `${BASE_URL}/videos?key=${API_KEY}&part=snippet,contentDetails,statistics&id=${videoId}`;

let dpUrl = {
    0: "https://yt3.googleusercontent.com/Hoj8V2Bwy_Vn30JszcRgEU531IVWHtPm2MCGEtvRsLKNhLi_W2RU9tmbKcNKf1bKJIc-A7_vKg=s900-c-k-c0x00ffffff-no-rj",
    1: "https://i.pinimg.com/550x/f4/9c/77/f49c772c2635503637d6df8850d87b0c.jpg",
    2: "https://cdn.logojoy.com/wp-content/uploads/20200407101634/netflix.png",
    3: "https://yt3.googleusercontent.com/qEl914T2poP3qhAR6chKM_-mYb1pvJdjtzI1RUVLcjt8n-VzLgMUCHyIcVn6lwOOC4td3yACQw=s900-c-k-c0x00ffffff-no-rj"
};


function playVideo(videoId){
    localStorage.setItem("video-id", videoId);
    window.open("./videoDetails.html");
    // console.log("triggered");
}



async function getVideoDetails(videoId, channelId){
    let url = `https://www.googleapis.com/youtube/v3/videos?key=${token}&part=snippet,contentDetails,statistics&id=${videoId}`;

    const receivedData = await fetch(url);
    const actualReceivedData = await receivedData.json();


    //console.log("actualReceivedData, ", actualReceivedData);

    let videoTitle = actualReceivedData.items[0].snippet.title;
    let thumbnailUrl = actualReceivedData.items[0].snippet.thumbnails.high.url;
    let channelName = actualReceivedData.items[0].snippet.channelTitle;

    let publishedAtArr = actualReceivedData.items[0].snippet.publishedAt.split("T");
    const publishedAt = publishedAtArr[0];
  
    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth() + 1; 
    const year = today.getFullYear();

    const pubAt =  new Date(publishedAt);
    const pubDate = pubAt.getDate();
    const pubYear = pubAt.getFullYear();
    const pubMonth = pubAt.getMonth()+1;

    const dateDiffMilli = new Date(`${year}-${month}-${date}`) - new Date(`${pubYear}-${pubMonth}-${pubDate}`);
   
    const daysDiff = Math.floor(dateDiffMilli / (1000 * 60 * 60 * 24));
  
    let finalGap = "";
    if(daysDiff > 365){
        let yearAgo = Math.floor(daysDiff / 365);
        finalGap = `${yearAgo} year ago`;
        
    }else if(daysDiff < 365 && daysDiff > 30){
        let monthsAgo = Math.floor(daysDiff / 30);
        finalGap = `${monthsAgo} months ago`;
 
    }else if(daysDiff < 30 && daysDiff > 7){
        let weekAgo = Math.floor(daysDiff / 7);
        finalGap = `${weekAgo} weeks ago`;
   
    }else{
        finalGap = `${daysDiff} days ago`;

    }




    let viewsCount = actualReceivedData.items[0].statistics.viewCount;
    let viewCountInt = parseInt(viewsCount);
    let finalViews = "";
    if(viewCountInt > 1000000){
        let milViews = Math.floor(viewCountInt / 1000000);
        finalViews = `${milViews}M views`;
    }else if(viewCountInt < 1000000 && viewCountInt > 1000){
        let kViews = Math.floor(viewCountInt / 1000);
        finalViews = `${kViews}K views`;
    }else{
        finalViews = `${viewCountInt} views`;
    }



    //console.log(videoTitle,thumbnailUrl,channelName,daysDiff,finalViews,videoId);

    // random dp

    let randomNo = Math.floor(Math.random() * 4);
    let curUrl = dpUrl[randomNo];
    // console.log(randomNo);
    // console.log(curUrl);

    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML= `
        
        <div onclick = "playVideo('${videoId}')">  
            <div style = "background-image: url(${thumbnailUrl});" class = "thumbnail-cont">
                <span class = "time-stamp">23:30</span>
            </div>
            <div class = "card-bottom">
                <div class = "card-logo-cont">
                    <img src = "${curUrl}" alt = "dp" class = "nav-right-icon-img">
                </div>

                <div class = "card-text-cont">
                    <span class = "card-title">${videoTitle}</span><br>
                    <div style = "margin-top: 10px;">
                        <div>
                            <span class = "channel-name">${channelName}</span>
                        </div>
                        <div class = "views-days-cont">
                            <span>${finalViews} </span>
                            <span>. </span>
                            <span>${finalGap}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

    container.appendChild(card);

}



async function getData(inputValue){ 
     let url = `https://www.googleapis.com/youtube/v3/search?key=${token}&part=snippet&q=${inputValue}&type=video&maxResults=21`;

    try{
        const receivedData = await fetch(url);
        const acualReceivedData = await receivedData.json();
        let arrItemObj = acualReceivedData.items;
        // console.log(arrItemObj);

        arrItemObj.forEach((each) => {
            let videoId = each.id.videoId;
            let channelId = each.snippet.channelId;
            getVideoDetails(videoId,channelId);
        });
    }catch(e){
        console.log(`error `, e);
    }

}

input.addEventListener("keypress", function(event){
    if(event.key === "Enter"){
        event.preventDefault();
        container.innerHTML = "";
        let inputValue = event.target.value.trim();
        // console.log("inputValue before calling= ", inputValue)
        getData(inputValue);
    }
    
})


getData();


/*

<div class = "card">
                    <div class = "thumbnail-cont">
                        <span class = "time-stamp">23: 30</span>
                    </div>
                    <div class = "card-bottom">
                        <div class = "card-logo-cont">
                            <img src = "https://yt3.googleusercontent.com/Hoj8V2Bwy_Vn30JszcRgEU531IVWHtPm2MCGEtvRsLKNhLi_W2RU9tmbKcNKf1bKJIc-A7_vKg=s900-c-k-c0x00ffffff-no-rj" alt = "dp" class = "nav-right-icon-img">
                        </div>

                        <div class = "card-text-cont">
                            <span class = "card-title">Title</span><br>
                            <div>
                                <div>
                                    <span class = "channel-name">Channel Name</span>
                                </div>
                                <div class = "views-days-cont">
                                    <span>views</span>
                                    <span>.</span>
                                    <span>Days</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                */
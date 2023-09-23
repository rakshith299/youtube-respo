let token = "AIzaSyATtpCxpvtWcs6wYmfcxWNo4HXK_8ZWtf0";
const leftContData = document.getElementById("v2-data");
let comCont = document.getElementById("com-cont");
let noOfComments;
const inputValue = "";
let recCont = document.getElementById("recommended-videos");

let subCount = {
    0: "1.2M",
    1: "525K",
    2: "2M",
    3: "300K"
}

let dpUrl = {
    0: "https://yt3.googleusercontent.com/Hoj8V2Bwy_Vn30JszcRgEU531IVWHtPm2MCGEtvRsLKNhLi_W2RU9tmbKcNKf1bKJIc-A7_vKg=s900-c-k-c0x00ffffff-no-rj",
    1: "https://i.pinimg.com/550x/f4/9c/77/f49c772c2635503637d6df8850d87b0c.jpg",
    2: "https://cdn.logojoy.com/wp-content/uploads/20200407101634/netflix.png",
    3: "https://yt3.googleusercontent.com/qEl914T2poP3qhAR6chKM_-mYb1pvJdjtzI1RUVLcjt8n-VzLgMUCHyIcVn6lwOOC4td3yACQw=s900-c-k-c0x00ffffff-no-rj"
};

let month = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec"
};



function removeReplies(parentId){
    console.log(parentId);

    let parEle = document.getElementById(`${parentId}`);

    let repComCont =  document.getElementsByClassName("reply-cont");

    for(let i = 0; i < repComCont.length; i++){
        repComCont[i].classList.add("remove-reply");
    }
    

    
}

function addRepliesToComment(each){
    let profileUrl = each.snippet.authorProfileImageUrl;
    let likeCount = each.snippet.likeCount;
    let publishedAt = each.snippet.publishedAt.split("T");
    let textDisplay = each.snippet.textDisplay;
    let authorDisplayName = each.snippet.authorDisplayName;
    let parentId = each.snippet.parentId;

    let onDate = publishedAt[0];
    let todaysDate = new Date();
    let date = todaysDate.getDate();
    let month = todaysDate.getMonth()+ 1;
    let year = todaysDate.getFullYear();
    let todaysFinalDate = `${year}-${month}-${date}`;
    let dateDiffMilli = new Date(todaysFinalDate) - new Date(onDate);
    let daysDiff = dateDiffMilli / (1000 * 60 * 60 * 24);
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


    let replyContainer = document.getElementById(`${parentId}`);

    // deleting replies before adding again

    let repComCont =  document.getElementsByClassName("reply-cont");

    for(let i = 0; i < repComCont.length; i++){
        repComCont[i].classList.add("remove-reply");
    }

    //adding new replies
    let newDiv = document.createElement("div");
    newDiv.classList.add("reply-cont");

    newDiv.innerHTML = `
    <div style = "width: 80px;display: flex;flex-direction: row;justify-content: center;">
            <img src = ${profileUrl} class = "c-logo-2"/>
    </div>
    <div class = "each-com-r-cont">
        <div class = "each-name-cont">
            <span style = "font-size: 15px;color: #FFFFFF;font-weight: 600; margin-right: 8px;">${authorDisplayName}</span>
            <span style = "font-size: 12px;color: #AAAAAA;">${finalGap}</span>
        </div>

        <div class = "each-text-cont">
            <span style = "color: #FFFFFF;font-size: 15px;">${textDisplay}</span>
        </div>

        <div class = "com-opt-cont" id = "com-opt-cont">
            <div style="display: flex;flex-direction: row;align-items: center;">  
                <span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class = "c-like">
                        <path d="M12.5133 7.33335H9.69333L10.7067 4.04002C10.92 3.35335 10.36 2.66669 9.58667 2.66669C9.2 2.66669 8.82667 2.82669 8.57333 3.10002L4.66667 7.33335H2V14H4.66667H5.33333H11.62C12.3267 14 12.94 13.5534 13.08 12.9267L13.9733 8.92669C14.1533 8.10002 13.4533 7.33335 12.5133 7.33335ZM4.66667 13.3334H2.66667V8.00002H4.66667V13.3334ZM13.32 8.78002L12.4267 12.78C12.36 13.1 12.02 13.3334 11.62 13.3334H5.33333V7.59335L9.06667 3.55335C9.19333 3.41335 9.38667 3.33335 9.58667 3.33335C9.76 3.33335 9.92 3.40669 10.0067 3.53335C10.0533 3.60002 10.1067 3.70669 10.0667 3.84669L9.05333 7.14002L8.78667 8.00002H9.68667H12.5067C12.78 8.00002 13.04 8.11335 13.1933 8.30669C13.28 8.40669 13.3667 8.57335 13.32 8.78002Z" fill="white"/>
                    </svg>
                        
                </span>
                <span style = "color: #FFFFFF;font-size: 13px;margin-right: 8px">
                    ${likeCount}
                </span>
            </div>

            <div>
                <span> 
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class = "c-like" style = "margin-left: 10px;">
                        <path d="M11.3335 2.66669H10.6669H4.38021C3.66687 2.66669 3.06021 3.11335 2.92021 3.74002L2.02687 7.74002C1.84687 8.56669 2.54687 9.33335 3.48687 9.33335H6.30688L5.29354 12.6267C5.08021 13.3134 5.64021 14 6.41354 14C6.80021 14 7.17354 13.84 7.42688 13.5667L11.3335 9.33335H14.0002V2.66669H11.3335ZM6.93354 13.1134C6.80687 13.2534 6.61354 13.3334 6.41354 13.3334C6.24021 13.3334 6.08021 13.26 5.99354 13.1334C5.94687 13.0667 5.89354 12.96 5.93354 12.82L6.94688 9.52669L7.21354 8.66669H6.30688H3.48687C3.21354 8.66669 2.95354 8.55335 2.80021 8.36002C2.72021 8.26002 2.63354 8.09335 2.68021 7.88002L3.57354 3.88002C3.64021 3.56669 3.98021 3.33335 4.38021 3.33335H10.6669V9.07335L6.93354 13.1134ZM13.3335 8.66669H11.3335V3.33335H13.3335V8.66669Z" fill="white"/>
                    </svg> 
                </span>                                       
            </div>

            <div>
                <span style = "color: #AAAAAA; font-size: 15px;margin-left: 10px;" >REPLY</span>
            </div>
        </div>                   
    </div>`;

    replyContainer.appendChild(newDiv);

}

async function getEachRecommendation(videoId){

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


    // random dp

    let randomNo = Math.floor(Math.random() * 4);
    let curUrl = dpUrl[randomNo];

    const card = document.createElement("div");
    card.classList.add("each-recommendation");
    card.innerHTML= `
        
    <div style = "background-image: url(${thumbnailUrl})" class = "rec-thumbnail">
        <span class = "time-stamp">23:30</span>
    </div>

    <div class = "rec-text-cont">
        <h3 class = "rec-text-heading">${videoTitle}</h3>
        <span class = "rec-text-channel-name">${channelName}</span>
        <div class = "rec-views-cont">
            <span>${finalViews} .</span>
            <span>${finalGap}</span>
        </div>
    </div>`;

    recCont.appendChild(card);
}


async function getRecommendations(){


    const url = `https://www.googleapis.com/youtube/v3/search?key=${token}&part=snippet&q=${inputValue}&type=video&maxResults=20`
    const response = await fetch(url);
    const convertedResponse = await response.json();

    const convertedResponseArr = convertedResponse.items;

    convertedResponseArr.forEach((each) => {
        let videoId = each.id.videoId;
        getEachRecommendation(videoId);
    });

}

async function showReply(commentId, flag){

    //open and close

        let url = `https://www.googleapis.com/youtube/v3/comments?&part=snippet&parentId=${commentId}&key=${token}&maxResults=10`;


        let receivedCom = await fetch(url)
        let receivedComConv = await receivedCom.json();

        let receivedComArr = receivedComConv.items;

        receivedComArr.forEach((each) => addRepliesToComment(each))
      
   
        console.log("triggered");
    
}

function addEachComment(each){
    let commentId = each.id;
    let commentDpUrl = each.snippet.topLevelComment.snippet.authorProfileImageUrl;
    let commentName =  each.snippet.topLevelComment.snippet.authorDisplayName;
    let commentLikeCount = each.snippet.topLevelComment.snippet.likeCount;
    let commentText = each.snippet.topLevelComment.snippet.textDisplay;
    let commentRepliesCount = each.snippet.totalReplyCount;

    
    let commentPub = each.snippet.topLevelComment.snippet.publishedAt.split("T");
    let comDate = commentPub[0];
    let todaysDate = new Date();
    let date = todaysDate.getDate();
    let month = String(todaysDate.getMonth()+ 1).padStart(2, '0');
    let year = String(todaysDate.getFullYear());
    let todaysFinalDate = `${year}-${month}-${date}`;
    let dateDiffMilli = new Date(todaysFinalDate) - new Date(comDate);
    let daysDiff = dateDiffMilli / (1000 * 60 * 60 * 24);
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

   // console.log(commentId);

    let cCard = document.createElement("div");
    cCard.classList.add("each-com-box");
    cCard.setAttribute("id",`${commentId}`);

        if(commentRepliesCount > 0){
            cCard.innerHTML = `

            <div class = "each-com-box-cont">
                <div style = "width: 80px;display: flex;flex-direction: row;justify-content: center;">
                    <img src = ${commentDpUrl} class = "c-logo-2"/>
                </div>
                <div class = "each-com-r-cont">
                    <div class = "each-name-cont">
                        <span style = "font-size: 15px;color: #FFFFFF;font-weight: 600; margin-right: 8px;">${commentName}</span>
                        <span style = "font-size: 12px;color: #AAAAAA;">${finalGap}</span>
                    </div>

                    <div class = "each-text-cont">
                        <span style = "color: #FFFFFF;font-size: 15px;">${commentText}</span>
                    </div>

                    <div class = "com-opt-cont" id = "com-opt-cont">
                        <div style="display: flex;flex-direction: row;align-items: center;">  
                            <span>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class = "c-like">
                                    <path d="M12.5133 7.33335H9.69333L10.7067 4.04002C10.92 3.35335 10.36 2.66669 9.58667 2.66669C9.2 2.66669 8.82667 2.82669 8.57333 3.10002L4.66667 7.33335H2V14H4.66667H5.33333H11.62C12.3267 14 12.94 13.5534 13.08 12.9267L13.9733 8.92669C14.1533 8.10002 13.4533 7.33335 12.5133 7.33335ZM4.66667 13.3334H2.66667V8.00002H4.66667V13.3334ZM13.32 8.78002L12.4267 12.78C12.36 13.1 12.02 13.3334 11.62 13.3334H5.33333V7.59335L9.06667 3.55335C9.19333 3.41335 9.38667 3.33335 9.58667 3.33335C9.76 3.33335 9.92 3.40669 10.0067 3.53335C10.0533 3.60002 10.1067 3.70669 10.0667 3.84669L9.05333 7.14002L8.78667 8.00002H9.68667H12.5067C12.78 8.00002 13.04 8.11335 13.1933 8.30669C13.28 8.40669 13.3667 8.57335 13.32 8.78002Z" fill="white"/>
                                </svg>
                                    
                            </span>
                            <span style = "color: #FFFFFF;font-size: 13px;margin-right: 8px">
                                ${commentLikeCount}
                            </span>
                        </div>

                        <div>
                            <span> 
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class = "c-like" style = "margin-left: 10px;">
                                    <path d="M11.3335 2.66669H10.6669H4.38021C3.66687 2.66669 3.06021 3.11335 2.92021 3.74002L2.02687 7.74002C1.84687 8.56669 2.54687 9.33335 3.48687 9.33335H6.30688L5.29354 12.6267C5.08021 13.3134 5.64021 14 6.41354 14C6.80021 14 7.17354 13.84 7.42688 13.5667L11.3335 9.33335H14.0002V2.66669H11.3335ZM6.93354 13.1134C6.80687 13.2534 6.61354 13.3334 6.41354 13.3334C6.24021 13.3334 6.08021 13.26 5.99354 13.1334C5.94687 13.0667 5.89354 12.96 5.93354 12.82L6.94688 9.52669L7.21354 8.66669H6.30688H3.48687C3.21354 8.66669 2.95354 8.55335 2.80021 8.36002C2.72021 8.26002 2.63354 8.09335 2.68021 7.88002L3.57354 3.88002C3.64021 3.56669 3.98021 3.33335 4.38021 3.33335H10.6669V9.07335L6.93354 13.1134ZM13.3335 8.66669H11.3335V3.33335H13.3335V8.66669Z" fill="white"/>
                                </svg> 
                            </span>                                       
                        </div>

                        <div>
                            <span style = "color: #AAAAAA; font-size: 15px;margin-left: 10px;" >REPLY</span>
                        </div>


                        <div>
                            <span style = "font-size: 15px; color: #3EA6FF;font-weight: 600; margin-left: 10px; cursor: pointer;" onclick="showReply('${commentId}')">Show Replies</span>
                        </div>

                        <div>
                            <span style = "font-size: 15px; color: #3EA6FF;font-weight: 600; margin-left: 10px; cursor: pointer;" onclick="removeReplies('${commentId}')">Close</span>
                        </div>

                    </div>
                    
                </div>
            </div>`;
        }else if(commentRepliesCount === 0){
            cCard.innerHTML = `

            <div class = "each-com-box-cont">
                <div style =  "width: 80px;display: flex;flex-direction: row;justify-content: center;">
                    <img src = ${commentDpUrl} class = "c-logo-2"/>
                </div>
                <div class = "each-com-r-cont" style = "margin-left: 10px;">
                    <div class = "each-name-cont">
                        <span style = "font-size: 15px;color: #FFFFFF;font-weight: 600; margin-right: 8px;">${commentName}</span>
                        <span style = "font-size: 12px;color: #AAAAAA;">${finalGap}</span>
                    </div>

                    <div class = "each-text-cont">
                        <span style = "color: #FFFFFF;font-size: 15px;">${commentText}</span>
                    </div>

                    <div class = "com-opt-cont" id = "com-opt-cont">
                        <div style="display: flex;flex-direction: row;align-items: center;">  
                            <span>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class = "c-like">
                                    <path d="M12.5133 7.33335H9.69333L10.7067 4.04002C10.92 3.35335 10.36 2.66669 9.58667 2.66669C9.2 2.66669 8.82667 2.82669 8.57333 3.10002L4.66667 7.33335H2V14H4.66667H5.33333H11.62C12.3267 14 12.94 13.5534 13.08 12.9267L13.9733 8.92669C14.1533 8.10002 13.4533 7.33335 12.5133 7.33335ZM4.66667 13.3334H2.66667V8.00002H4.66667V13.3334ZM13.32 8.78002L12.4267 12.78C12.36 13.1 12.02 13.3334 11.62 13.3334H5.33333V7.59335L9.06667 3.55335C9.19333 3.41335 9.38667 3.33335 9.58667 3.33335C9.76 3.33335 9.92 3.40669 10.0067 3.53335C10.0533 3.60002 10.1067 3.70669 10.0667 3.84669L9.05333 7.14002L8.78667 8.00002H9.68667H12.5067C12.78 8.00002 13.04 8.11335 13.1933 8.30669C13.28 8.40669 13.3667 8.57335 13.32 8.78002Z" fill="white"/>
                                </svg>
                                    
                            </span>
                            <span style = "color: #FFFFFF;font-size: 13px;margin-right: 8px">
                                ${commentLikeCount}
                            </span>
                        </div>

                        <div>
                            <span> 
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class = "c-like" style = "margin-left: 10px;">
                                    <path d="M11.3335 2.66669H10.6669H4.38021C3.66687 2.66669 3.06021 3.11335 2.92021 3.74002L2.02687 7.74002C1.84687 8.56669 2.54687 9.33335 3.48687 9.33335H6.30688L5.29354 12.6267C5.08021 13.3134 5.64021 14 6.41354 14C6.80021 14 7.17354 13.84 7.42688 13.5667L11.3335 9.33335H14.0002V2.66669H11.3335ZM6.93354 13.1134C6.80687 13.2534 6.61354 13.3334 6.41354 13.3334C6.24021 13.3334 6.08021 13.26 5.99354 13.1334C5.94687 13.0667 5.89354 12.96 5.93354 12.82L6.94688 9.52669L7.21354 8.66669H6.30688H3.48687C3.21354 8.66669 2.95354 8.55335 2.80021 8.36002C2.72021 8.26002 2.63354 8.09335 2.68021 7.88002L3.57354 3.88002C3.64021 3.56669 3.98021 3.33335 4.38021 3.33335H10.6669V9.07335L6.93354 13.1134ZM13.3335 8.66669H11.3335V3.33335H13.3335V8.66669Z" fill="white"/>
                                </svg> 
                            </span>                                       
                        </div>

                        <div>
                            <span style = "color: #AAAAAA; font-size: 15px;margin-left: 10px;" >REPLY</span>
                        </div>

                    </div>
                </div>
            </div>`;
        }

    comCont.appendChild(cCard);

}


async function getComments(videoId){
    let comUrl = `https://www.googleapis.com/youtube/v3/commentThreads?key=${token}&videoId=${videoId}&maxResults=80&order=time&part=snippet`;

     let receivedData = await fetch(comUrl);
     let actualReceivedData = await receivedData.json();

     //console.log(actualReceivedData);

     let commentsArr = actualReceivedData.items;
     noOfComments = commentsArr.length;

     let randomNo = Math.floor(Math.random() * 4);
    let randomChannelLogoUrl = dpUrl[randomNo];

     let div = document.createElement("div");
     div.classList.add("comments-heading");
     div.innerHTML =   `
     <div class = "com-info">
            <div class = "no-c-cont">
                <span>${noOfComments}</span>
                <span>Comments</span>
            </div>

            <div class = "sort-cont">
                <span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class = "svg">
                        <path d="M21 6H3V5H21V6ZM15 11H3V12H15V11ZM9 17H3V18H9V17Z" fill="white"/>
                    </svg>
                        
                </span>
                <span style = "font-weight: bold; color: #FFFFFF;">
                    SORT BY
                </span>
            </div>
        </div>

        <div class = "to-type-cont">
            <div>
                <img src = ${randomChannelLogoUrl} alt = "logo" class = "com-logo">
            </div>

            <div class = "to-type-right">
                <div>
                    <span>Add a public comment...</span>
                </div>
                <div style = "width: 100%;">
                    <hr class = "hr">
                </div>
            </div>
        </div>`;
     leftContData.appendChild(div);
     
     commentsArr.forEach((each) => addEachComment(each))
}

async function getVideoDetails(videoId){
    let url = `https://www.googleapis.com/youtube/v3/videos?key=${token}&part=snippet,contentDetails,statistics&id=${videoId}`;

    const receivedData = await fetch(url);
    const actualReceivedData = await receivedData.json();

    let iFrameEle = document.getElementById("iframe");
    iFrameEle.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

    //console.log(actualReceivedData);

    let randomNo = Math.floor(Math.random() * 4);
    let randomChannelLogoUrl = dpUrl[randomNo];

    let randomSubNo = Math.floor(Math.random() * 4);
    let randomSubCount = subCount[randomSubNo];

    let channelTitle = actualReceivedData.items[0].snippet.channelTitle;

    let description = actualReceivedData.items[0].snippet.description;

    let viewsCount = actualReceivedData.items[0].statistics.viewCount;
    let viewCountInt = parseInt(viewsCount); 

    let likeCount = actualReceivedData.items[0].statistics.likeCount;
    let likeCountInt = parseInt(likeCount);
    
    let commentCount = actualReceivedData.items[0].statistics.commentCount;
    let commentCountInt = parseInt(commentCount);

    let publishedAtArr = actualReceivedData.items[0].snippet.publishedAt.split("T");
    let publishedAt = publishedAtArr[0];
    let pDate = new Date(publishedAt);
    let gotMonth = pDate.getMonth()+1;
    let monthName = month[`${gotMonth}`];
    let gotYear = pDate.getFullYear();
    let gotDate = pDate.getDate();

    let finalPub = `${monthName} ${gotDate}, ${gotYear}`;

    let videoTitle = actualReceivedData.items[0].snippet.title;


    leftContData.innerHTML = `
    <div class = "video-text">
    <div style = "margin-top: 10px; margin-bottom: 10px">
        <span class = "title">${videoTitle}</span>
    </div>


    <div class = "views-like-cont">
        <div class = "views-pub-cont">
            <span>${viewCountInt} views . </span>
            <span>${finalPub}</span>
        </div>
        <div class = "like-dislike-cont">
            <div>
                <span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class = "svg">
                        <path d="M18.77 11H14.54L16.06 6.06C16.38 5.03 15.54 4 14.38 4C13.8 4 13.24 4.24 12.86 4.65L7 11H3V21H7H8H17.43C18.49 21 19.41 20.33 19.62 19.39L20.96 13.39C21.23 12.15 20.18 11 18.77 11ZM7 20H4V12H7V20ZM19.98 13.17L18.64 19.17C18.54 19.65 18.03 20 17.43 20H8V11.39L13.6 5.33C13.79 5.12 14.08 5 14.38 5C14.64 5 14.88 5.11 15.01 5.3C15.08 5.4 15.16 5.56 15.1 5.77L13.58 10.71L13.18 12H14.53H18.76C19.17 12 19.56 12.17 19.79 12.46C19.92 12.61 20.05 12.86 19.98 13.17Z" fill="white"/>
                    </svg>                                     
                </span>
                <span>Like</span>
            </div>

            <div>
                <span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"  class = "svg">
                        <path d="M17.0001 4H16.0001H6.57007C5.50007 4 4.59007 4.67 4.38007 5.61L3.04007 11.61C2.77007 12.85 3.82007 14 5.23007 14H9.46007L7.94007 18.94C7.62007 19.97 8.46007 21 9.62007 21C10.2001 21 10.7601 20.76 11.1401 20.35L17.0001 14H21.0001V4H17.0001ZM10.4001 19.67C10.2101 19.88 9.92007 20 9.62007 20C9.36007 20 9.12007 19.89 8.99007 19.7C8.92007 19.6 8.84007 19.44 8.90007 19.23L10.4201 14.29L10.8201 13H9.46007H5.23007C4.82007 13 4.43007 12.83 4.20007 12.54C4.08007 12.39 3.95007 12.14 4.02007 11.82L5.36007 5.82C5.46007 5.35 5.97007 5 6.57007 5H16.0001V13.61L10.4001 19.67ZM20.0001 13H17.0001V5H20.0001V13Z" fill="white"/>
                    </svg>                                       
                </span>
                <span>650</span>
            </div>

            <div>
                <span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"  class = "svg">
                        <path d="M15 5.63L20.66 12L15 18.37V15V14H14C10.04 14 6.86 15 4.25 17.09C6.09 13.02 9.36 10.69 14.14 9.99L15 9.86V9V5.63ZM14 3V9C6.22 10.13 3.11 15.33 2 21C4.78 17.03 8.44 15 14 15V21L22 12L14 3Z" fill="white"/>
                    </svg>                                
                </span>
                <span>Share</span>
            </div>

            <div>
                <span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"  class = "svg">
                        <path d="M22 13H18V17H16V13H12V11H16V7H18V11H22V13ZM14 7H2V8H14V7ZM2 12H10V11H2V12ZM2 16H10V15H2V16Z" fill="white"/>
                    </svg>
                        
                </span>
                <span>Save</span>
            </div>

            <div>
                <span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"  class = "svg">
                        <path d="M7.5 12C7.5 12.83 6.83 13.5 6 13.5C5.17 13.5 4.5 12.83 4.5 12C4.5 11.17 5.17 10.5 6 10.5C6.83 10.5 7.5 11.17 7.5 12ZM12 10.5C11.17 10.5 10.5 11.17 10.5 12C10.5 12.83 11.17 13.5 12 13.5C12.83 13.5 13.5 12.83 13.5 12C13.5 11.17 12.83 10.5 12 10.5ZM18 10.5C17.17 10.5 16.5 11.17 16.5 12C16.5 12.83 17.17 13.5 18 13.5C18.83 13.5 19.5 12.83 19.5 12C19.5 11.17 18.83 10.5 18 10.5Z" fill="white"/>
                    </svg>
                        
                </span>
            </div>

        </div>
    </div>
</div>

<hr class = "hr">

<!--Sub cont-->
<div class = "subs-cont">
    <div style ="width: 10%; height: 100%;display: flex;flex-direction: row;justify-content: center;align-items: flex-start;">
        <span>
            <img src = ${randomChannelLogoUrl} alt = "logo" class = "c-logo">
        </span>
    </div>

    <div class = "subs-right-cont">
        <div class = "subs-top-cont">
            <div class = "subs-top-left-cont">
                <span>${channelTitle}</span><br>
                <span style = "color: #AAAAAA;font-size: 11px;">${randomSubCount} Subscribers</span>
            </div>
            <div class = "subs-top-right-cont">
                <span class = "join">
                    Join
                </span>
                <span class = "subscribe">
                    Subscribe
                </span>
            </div>
        </div>

        <div class = "subs-bottom">
            ${description}
        </div>

    </div>
</div>

<hr class = "hr">
`;


    getComments(videoId);

}




let videoId = localStorage.getItem("video-id");
getVideoDetails(videoId);


getRecommendations();



/*
<div class = "video-text">
    <div style = "border: 1px solid white; margin-top: 10px; height: 30px;">
        <span class = "title">Title</span>
    </div>


    <div class = "views-like-cont">
        <div class = "views-pub-cont">
            <span>views</span>
            <span>Published at</span>
        </div>
        <div class = "like-dislike-cont">
            <div>
                <span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class = "svg">
                        <path d="M18.77 11H14.54L16.06 6.06C16.38 5.03 15.54 4 14.38 4C13.8 4 13.24 4.24 12.86 4.65L7 11H3V21H7H8H17.43C18.49 21 19.41 20.33 19.62 19.39L20.96 13.39C21.23 12.15 20.18 11 18.77 11ZM7 20H4V12H7V20ZM19.98 13.17L18.64 19.17C18.54 19.65 18.03 20 17.43 20H8V11.39L13.6 5.33C13.79 5.12 14.08 5 14.38 5C14.64 5 14.88 5.11 15.01 5.3C15.08 5.4 15.16 5.56 15.1 5.77L13.58 10.71L13.18 12H14.53H18.76C19.17 12 19.56 12.17 19.79 12.46C19.92 12.61 20.05 12.86 19.98 13.17Z" fill="white"/>
                    </svg>                                     
                </span>
                <span>Like</span>
            </div>

            <div>
                <span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"  class = "svg">
                        <path d="M17.0001 4H16.0001H6.57007C5.50007 4 4.59007 4.67 4.38007 5.61L3.04007 11.61C2.77007 12.85 3.82007 14 5.23007 14H9.46007L7.94007 18.94C7.62007 19.97 8.46007 21 9.62007 21C10.2001 21 10.7601 20.76 11.1401 20.35L17.0001 14H21.0001V4H17.0001ZM10.4001 19.67C10.2101 19.88 9.92007 20 9.62007 20C9.36007 20 9.12007 19.89 8.99007 19.7C8.92007 19.6 8.84007 19.44 8.90007 19.23L10.4201 14.29L10.8201 13H9.46007H5.23007C4.82007 13 4.43007 12.83 4.20007 12.54C4.08007 12.39 3.95007 12.14 4.02007 11.82L5.36007 5.82C5.46007 5.35 5.97007 5 6.57007 5H16.0001V13.61L10.4001 19.67ZM20.0001 13H17.0001V5H20.0001V13Z" fill="white"/>
                    </svg>                                       
                </span>
                <span>650</span>
            </div>

            <div>
                <span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"  class = "svg">
                        <path d="M15 5.63L20.66 12L15 18.37V15V14H14C10.04 14 6.86 15 4.25 17.09C6.09 13.02 9.36 10.69 14.14 9.99L15 9.86V9V5.63ZM14 3V9C6.22 10.13 3.11 15.33 2 21C4.78 17.03 8.44 15 14 15V21L22 12L14 3Z" fill="white"/>
                    </svg>                                
                </span>
                <span>Share</span>
            </div>

            <div>
                <span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"  class = "svg">
                        <path d="M22 13H18V17H16V13H12V11H16V7H18V11H22V13ZM14 7H2V8H14V7ZM2 12H10V11H2V12ZM2 16H10V15H2V16Z" fill="white"/>
                    </svg>
                        
                </span>
                <span>Save</span>
            </div>

            <div>
                <span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"  class = "svg">
                        <path d="M7.5 12C7.5 12.83 6.83 13.5 6 13.5C5.17 13.5 4.5 12.83 4.5 12C4.5 11.17 5.17 10.5 6 10.5C6.83 10.5 7.5 11.17 7.5 12ZM12 10.5C11.17 10.5 10.5 11.17 10.5 12C10.5 12.83 11.17 13.5 12 13.5C12.83 13.5 13.5 12.83 13.5 12C13.5 11.17 12.83 10.5 12 10.5ZM18 10.5C17.17 10.5 16.5 11.17 16.5 12C16.5 12.83 17.17 13.5 18 13.5C18.83 13.5 19.5 12.83 19.5 12C19.5 11.17 18.83 10.5 18 10.5Z" fill="white"/>
                    </svg>
                        
                </span>
            </div>

        </div>
    </div>
</div>

<hr class = "hr">

<!--Sub cont-->
<div class = "subs-cont">
    <div style = "border: 1px solid red;width: 10%; height: 100%;display: flex;flex-direction: row;justify-content: center;align-items: flex-start;">
        <span>
            <img src = "https://yt3.googleusercontent.com/qEl914T2poP3qhAR6chKM_-mYb1pvJdjtzI1RUVLcjt8n-VzLgMUCHyIcVn6lwOOC4td3yACQw=s900-c-k-c0x00ffffff-no-rj" alt = "logo" class = "c-logo">
        </span>
    </div>

    <div class = "subs-right-cont">
        <div class = "subs-top-cont">
            <div class = "subs-top-left-cont">
                <span>Channel name</span><br>
                <span style = "color: #AAAAAA;font-size: 15px;">1.2M Subscribers</span>
            </div>
            <div class = "subs-top-right-cont">
                <span class = "subscribe">
                    Subscribe
                </span>
            </div>
        </div>

        <div class = "subs-bottom">
            description
        </div>

    </div>
</div>

<hr class = "hr">

<!--Before comments-->
<div class = "comments-heading">
    <div class = "com-info">
        <div class = "no-c-cont">
            <span>288</span>
            <span>Comments</span>
        </div>

        <div class = "sort-cont">
            <span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class = "svg">
                    <path d="M21 6H3V5H21V6ZM15 11H3V12H15V11ZM9 17H3V18H9V17Z" fill="white"/>
                </svg>
                    
            </span>
            <span style = "font-weight: bold; color: #FFFFFF;">
                SORT BY
            </span>
        </div>
    </div>

    <div class = "to-type-cont">
        <div>
            <img src = "https://yt3.googleusercontent.com/qEl914T2poP3qhAR6chKM_-mYb1pvJdjtzI1RUVLcjt8n-VzLgMUCHyIcVn6lwOOC4td3yACQw=s900-c-k-c0x00ffffff-no-rj" alt = "logo" class = "com-logo">
        </div>

        <div class = "to-type-right">
            <div>
                <span>Add a public comment...</span>
            </div>
            <div style = "width: 100%;">
                <hr class = "hr">
            </div>
        </div>
    </div>
</div>








<div class = "each-com-box">
        <div style = "border: 2px solid yellow; width: 80px;display: flex;flex-direction: row;justify-content: center;height: 150px;">
            <img src = "https://yt3.googleusercontent.com/qEl914T2poP3qhAR6chKM_-mYb1pvJdjtzI1RUVLcjt8n-VzLgMUCHyIcVn6lwOOC4td3yACQw=s900-c-k-c0x00ffffff-no-rj" class = "c-logo-2"/>
        </div>
        <div class = "each-com-r-cont">
            <div class = "each-name-cont">
                <span style = "font-size: 18px;color: #FFFFFF;font-weight: 600; margin-right: 8px;">Name</span>
                <span style = "font-size: 15px;color: #AAAAAA;">8 hours ago</span>
            </div>

            <div class = "each-text-cont">
                <span style = "color: #FFFFFF;font-size: 15px;">Text</span>
            </div>

            <div class = "com-opt-cont">
                <div style="display: flex;flex-direction: row;align-items: center;">  
                    <span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class = "c-like">
                            <path d="M12.5133 7.33335H9.69333L10.7067 4.04002C10.92 3.35335 10.36 2.66669 9.58667 2.66669C9.2 2.66669 8.82667 2.82669 8.57333 3.10002L4.66667 7.33335H2V14H4.66667H5.33333H11.62C12.3267 14 12.94 13.5534 13.08 12.9267L13.9733 8.92669C14.1533 8.10002 13.4533 7.33335 12.5133 7.33335ZM4.66667 13.3334H2.66667V8.00002H4.66667V13.3334ZM13.32 8.78002L12.4267 12.78C12.36 13.1 12.02 13.3334 11.62 13.3334H5.33333V7.59335L9.06667 3.55335C9.19333 3.41335 9.38667 3.33335 9.58667 3.33335C9.76 3.33335 9.92 3.40669 10.0067 3.53335C10.0533 3.60002 10.1067 3.70669 10.0667 3.84669L9.05333 7.14002L8.78667 8.00002H9.68667H12.5067C12.78 8.00002 13.04 8.11335 13.1933 8.30669C13.28 8.40669 13.3667 8.57335 13.32 8.78002Z" fill="white"/>
                        </svg>
                            
                    </span>
                    <span style = "color: #FFFFFF;font-size: 13px;margin-right: 8px">
                        3
                    </span>
                </div>

                <div>
                    <span> 
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class = "c-like" style = "margin-left: 10px;">
                            <path d="M11.3335 2.66669H10.6669H4.38021C3.66687 2.66669 3.06021 3.11335 2.92021 3.74002L2.02687 7.74002C1.84687 8.56669 2.54687 9.33335 3.48687 9.33335H6.30688L5.29354 12.6267C5.08021 13.3134 5.64021 14 6.41354 14C6.80021 14 7.17354 13.84 7.42688 13.5667L11.3335 9.33335H14.0002V2.66669H11.3335ZM6.93354 13.1134C6.80687 13.2534 6.61354 13.3334 6.41354 13.3334C6.24021 13.3334 6.08021 13.26 5.99354 13.1334C5.94687 13.0667 5.89354 12.96 5.93354 12.82L6.94688 9.52669L7.21354 8.66669H6.30688H3.48687C3.21354 8.66669 2.95354 8.55335 2.80021 8.36002C2.72021 8.26002 2.63354 8.09335 2.68021 7.88002L3.57354 3.88002C3.64021 3.56669 3.98021 3.33335 4.38021 3.33335H10.6669V9.07335L6.93354 13.1134ZM13.3335 8.66669H11.3335V3.33335H13.3335V8.66669Z" fill="white"/>
                        </svg> 
                    </span>                                       
                </div>

                <div>
                    <span style = "color: #AAAAAA; font-size: 15px;margin-left: 10px;" >REPLY</span>
                </div>

                <div>
                    <span onclick="showReply()">Show Replies</span>
                </div>
            </div>
        </div>
    </div>
                    */
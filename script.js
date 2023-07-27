const ipadd = "avisahney.online"
const videoPlayer = document.getElementById('videoPlayer');
const videoSource = document.getElementById("videoSource");
const queryParams = getQueryStringParams();
const name = queryParams.get('name');

function downloadVideo() {
    let path = "https://" + ipadd +"/download-video/"+ name;
    console.log(name + "Video is Downloading");
    window.location.href = path;
}
function getQueryStringParams() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams;
}

function streamVideo(){
        const videoPath = "https://" + ipadd+"/getVideoLink/" + name;
        console.log("videoPath :", videoPath )
        fetch(videoPath)
            .then(response => {
                console.log("response = ", response)
                if(!response.ok){
                    handleVideoError()
                }
                else{
                    return response.json();
                }
            }).then(data => {
                    const vPath = "https://"+ipadd+ data.url;
                    videoSource.setAttribute('src', vPath);
                    videoPlayer.load();
                    console.log(name + " Video is streaming successfully");
            })
            .catch(error => {
                console.error('Error fetching video:', error);
                handleVideoError();
            })
}

function handleVideoError() {
    videoPlayer.removeAttribute('controls');
    videoPlayer.src = '';
    videoPlayer.poster = 'notfoundvideo.jpeg'; 
    console.error('Video is not available.');
    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'This video is currently unavailable.';
    videoPlayer.parentNode.appendChild(errorMessage);
}


function updateViews() {
    const apiUrl = "https://"+ipadd+"/getViewCount/" + name;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Assuming the API response contains a 'views' property
            const viewsCountElement = document.getElementById('view');
            viewsCountElement.textContent = `Views: ${data.views}`;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}


streamVideo();
updateViews();
setInterval(updateViews, 10000);

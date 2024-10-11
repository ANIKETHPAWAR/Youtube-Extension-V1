const API_KEY = 'AIzaSyAi5A4J0ZuBRW2UkS9TT71c334-om85jCY'; 

document.getElementById('searchButton').addEventListener('click', function() {
  const videoUrl = document.getElementById('videoUrl').value;
  const query = document.getElementById('query').value;
  const videoId = getVideoId(videoUrl);

  if (!videoId || !query) {
    alert('Please provide a valid video URL and search query.');
    return;
  }

  searchComments(videoId, query);
});

// Function to extract the video ID from a YouTube URL
function getVideoId(url) {
  const urlObj = new URL(url);
  return urlObj.searchParams.get('v');
}

// Function to search YouTube comments
function searchComments(videoId, query) {
  const commentsDiv = document.getElementById('comments');
  commentsDiv.innerHTML = 'Searching...';

  fetch(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${API_KEY}&maxResults=100`)
    .then(response => response.json())
    .then(data => {
      const comments = data.items.map(item => item.snippet.topLevelComment.snippet.textDisplay);
      const filteredComments = comments.filter(comment => comment.toLowerCase().includes(query.toLowerCase()));

      commentsDiv.innerHTML = '';

      if (filteredComments.length === 0) {
        commentsDiv.innerHTML = 'No comments found.';
      } else {
        filteredComments.forEach(comment => {
          const p = document.createElement('p');
          p.textContent = comment;
          commentsDiv.appendChild(p);
        });
      }
    })
    .catch(err => {
      commentsDiv.innerHTML = 'Error fetching comments.';
      console.error(err);
    });
}

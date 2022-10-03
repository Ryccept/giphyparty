console.log("Let's get this party started!");
const $btn = $("#submitbtn");
const $div = $("#gifCollection");
const $deleteBtn = $("#deleteBtn");

//Gets the gif URL from the Giphy API
async function recieveGif(input) {
  const gifIndex = getGifIndex();
  const res = await axios.get("https://api.giphy.com/v1/gifs/search", {
    params: {
      api_key: "sDtr1x1381CAiiakq70SQiGGnsaww1X8",
      q: input,
      limit: 10,
      rating: "g",
    },
  });
  return res.data.data[gifIndex].images.original.url;
}

//This is what allows for a random gif to be selected if you use the same search term
function getGifIndex() {
  const gifIndex = Math.floor(Math.random() * 10);
  return gifIndex;
}

//Gets the search term
function getUserInput() {
  const $userInput = $("#userInput");
  const input = $userInput.val();
  $userInput.val("");
  return input;
}

//this is what adds it to the div
function addGif(giphyURL) {
  let $newGif = $("<img>", {
    src: giphyURL,
    width: `${300}px`,
    height: `${300}px`,
  });
  $div.append($newGif);
}

//this sets up both buttons
$btn.on("click", async function (e) {
  e.preventDefault();
  const term = getUserInput();
  const gifUrl = await recieveGif(term);
  addGif(gifUrl);
});

$deleteBtn.on("click", function (e) {
  $div.empty();
});

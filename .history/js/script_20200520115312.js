let newsList = [];
const apiKey = "2dc86bcdc7184b17b45b74b30858f75a"
const loadNews = async() => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
    let data = await fetch(url);
    let result = await data.json();
}
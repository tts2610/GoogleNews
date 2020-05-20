let newsList = [];
const apiKey = "2dc86bcdc7184b17b45b74b30858f75a"
const loadNews = async() => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
    let data = await fetch(url);
    let result = await data.json();

    let html = result.articles.map((x, i) => {
        let innerHtml = '';
        if (i % 3 == 0) {
            innerHtml += `<div class="row"><div class="col-4 d-flex">
            <div class="blog-entry-left">
                <div>
                    <img src="${x.urlToImage}" width="200" height="200">
                </div>
                <div class="text p-4" style="text-align: center;">
                    <h3 class="mb-2"><a href="single.html">${x.title}</a></h3>
                    <div class="meta-wrap">
                        <p class="meta">
                            <span><i class="icon-calendar mr-2"></i>Sept. 10, 2019</span>
                            <span><a href="single.html"><i class="icon-folder-o mr-2"></i>${x.source.name}</a></span>
                            <span><i class="icon-comment2 mr-2"></i>5 Comment</span>
                        </p>
                    </div>
                    <p class="mb-4">${x.title}</p>
                    <p><a href="#" class="btn-custom">Read More <span class="ion-ios-arrow-forward"></span></a></p>
                </div>
            </div>
        </div>`
        }
        if (i % 2 == 1) {
            innerHtml += `<div class="col-8 d-flex">
            <div class="row">`
        }
        return innerHtml;


    }).join('');
    $("#myContent").append(html);
}

loadNews();
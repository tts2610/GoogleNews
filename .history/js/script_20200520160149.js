let newsList = [];
const apiKey = "2dc86bcdc7184b17b45b74b30858f75a"
let page = 1;
let pageSize = 6;
const loadNews = async() => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${apiKey}&page=${page}&pageSize=${}`;
    let data = await fetch(url);
    let result = await data.json();

    $("#myContent").append(render(result));
    $('#myContent').append(`<button type="button" class="btn btn-success">Success</button>`);
}

function render(result) {
    let innerHtml = '';
    let firstNum = 0;
    let midNum;
    let lastNum;
    result.articles.forEach((x, i) => {
        if (i == firstNum) {
            innerHtml += `<div class="row">
            <div class="col-4 d-flex">
                <div class="blog-entry-left">
                    <div>
                        <img src="${x.urlToImage}" width="200" height="200">
                    </div>
                    <div class="text p-4">
                        <h3 class="mb-2"><a href="single.html">${x.title}</a></h3>
                        <div class="meta-wrap">
                            <p class="meta">
                                <span><i class="icon-calendar mr-2"></i>${x.publishedAt}</span>
                                <span><a href="single.html"><i class="icon-folder-o mr-2"></i>${x.source.name}</a></span>
                                <span><i class="icon-comment2 mr-2"></i>5 Comment</span>
                            </p>
                        </div>
                        <p class="mb-4">${x.description}</p>
                        <p><a href="#" class="btn-custom">Read More <span class="ion-ios-arrow-forward"></span></a></p>
                    </div>
                </div>
            </div>`
            midNum = i + 1;
            firstNum = firstNum + 3;
        }
        if (i == midNum) {
            innerHtml += `<div class="col-8 d-flex">
            <div class="row">
                <div class="col-md-12">
                    <div class="blog-entry ftco-animate d-md-flex align-items-center">
                        <div class="text text-2 text-md-right pr-4">
                            <h3 class="mb-2"><a href="single.html">${x.title}</a></h3>
                            <div class="meta-wrap">
                                <p class="meta">
                                    <span><i class="icon-calendar mr-2"></i>${x.publishedAt}</span>
                                    <span><a href="single.html"><i class="icon-folder-o mr-2"></i>${x.source.name}</a></span>
                                    <span><i class="icon-comment2 mr-2"></i>5 Comment</span>
                                </p>
                            </div>
                            <p class="mb-4">${x.description}</p>
                            <p><a href="#" class="btn-custom">Read More <span class="ion-ios-arrow-forward"></span></a></p>
                        </div>
                        <div class="news-img"><img src="${x.urlToImage}" width="200" height="200"></div>
                    </div>
                </div>`
            lastNum = i + 1;
        }
        if (i == lastNum) {
            innerHtml += `<div class="col-md-12">
            <div class="blog-entry ftco-animate d-md-flex align-items-center">
                <div class="text text-2 text-md-right pr-4">
                    <h3 class="mb-2"><a href="single.html">${x.title}</a></h3>
                    <div class="meta-wrap">
                        <p class="meta">
                            <span><i class="icon-calendar mr-2"></i>${x.publishedAt}</span>
                            <span><a href="single.html"><i class="icon-folder-o mr-2"></i>${x.source.name}</a></span>
                            <span><i class="icon-comment2 mr-2"></i>5 Comment</span>
                        </p>
                    </div>
                    <p class="mb-4">${x.description}</p>
                    <p><a href="#" class="btn-custom">Read More <span class="ion-ios-arrow-forward"></span></a></p>
                </div>
                <div class="news-img"><img src="${x.urlToImage}" width="200" height="200"></div>
            </div>
        </div>
    </div>
</div>
</div>
`
        }


    });
    return innerHtml;
}

loadNews();
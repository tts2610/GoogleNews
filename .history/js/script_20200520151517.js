let newsList = [];
const apiKey = "2dc86bcdc7184b17b45b74b30858f75a"
const loadNews = async() => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
    let data = await fetch(url);
    let result = await data.json();
    let innerHtml = '';
    let midNum;
    let lastNum;
    let html = result.articles.map((x, i) => {
        if (i % 3 == 0) {
            innerHtml += `<div class="row">
            <div class="col-4 d-flex">
                <div class="blog-entry-left">
                    <div>
                        <img src="img/image_8.jpg" width="200" height="200">
                    </div>
                    <div class="text p-4" style="text-align: center;">
                        <h3 class="mb-2"><a href="single.html">A Loving Heart is the Truest Wisdom</a></h3>
                        <div class="meta-wrap">
                            <p class="meta">
                                <span><i class="icon-calendar mr-2"></i>Sept. 10, 2019</span>
                                <span><a href="single.html"><i class="icon-folder-o mr-2"></i>Travel</a></span>
                                <span><i class="icon-comment2 mr-2"></i>5 Comment</span>
                            </p>
                        </div>
                        <p class="mb-4">A small river named Duden flows by their place and supplies</p>
                        <p><a href="#" class="btn-custom">Read More <span class="ion-ios-arrow-forward"></span></a></p>
                    </div>
                </div>
            </div>`
            midNum = i + 1;
        }
        if (i == midNum) {
            innerHtml += `<div class="col-8 d-flex">
            <div class="row">
            <div class="col-md-12">
                            <div class="blog-entry ftco-animate d-md-flex align-items-center">
                                <div class="text text-2 text-md-right p-4">
                                    <h3 class="mb-2"><a href="single.html" style="text-overflow: ellipsis;white-space: nowrap;overflow: hidden;">${x.title}</a></h3>
                                    <div class="meta-wrap">
                                        <p class="meta">
                                            <span><i class="icon-calendar mr-2"></i>Sept. 10, 2019</span>
                                            <span><a href="single.html"><i class="icon-folder-o mr-2"></i>${x.source.name}</a></span>
                                            <span><i class="icon-comment2 mr-2"></i>5 Comment</span>
                                        </p>
                                    </div>
                                    <p class="mb-4" style="text-overflow: ellipsis;white-space: nowrap;overflow: hidden;">${x.title}</p>
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
                <div class="text text-2 text-md-right p-4">
                    <h3 class="mb-2"><a href="single.html" style="text-overflow: ellipsis;white-space: nowrap;overflow: hidden;">${x.title}</a></h3>
                    <div class="meta-wrap">
                        <p class="meta">
                            <span><i class="icon-calendar mr-2"></i>Sept. 10, 2019</span>
                            <span><a href="single.html"><i class="icon-folder-o mr-2"></i>${x.source.name}</a></span>
                            <span><i class="icon-comment2 mr-2"></i>5 Comment</span>
                        </p>
                    </div>
                    <p class="mb-4" style="text-overflow: ellipsis;white-space: nowrap;overflow: hidden;">${x.title}</p>
                    <p><a href="#" class="btn-custom">Read More <span class="ion-ios-arrow-forward"></span></a></p>
                </div>
                <div class="news-img"><img src="${x.urlToImage}" width="200" height="200"></div>
            </div>
        </div>
        </div>`
        }
        return innerHtml;


    }).join('');
    $("#myContent").append(html);
}

loadNews();
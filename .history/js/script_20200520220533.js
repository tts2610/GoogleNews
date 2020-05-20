let newsList = [];
const apiKey = "2dc86bcdc7184b17b45b74b30858f75a"
let page = 1;
let pageSize = 6;
let categoryList = [];
let q = "apple";


let magicGrid = new MagicGrid({
    container: '.container',
    animate: true,
    gutter: 30,
    static: true,
    useMin: true
});

magicGrid.listen();

const loadNews = async(page) => {
    let sources = [];
    $("input:checkbox:checked").each(function() {
        sources.push($(this).val());
    });
    let url;
    if (!sources.length)
        url = `https://newsapi.org/v2/top-headlines?q=${q}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
    else {
        let sourceStr = sources.join(",");
        url = `https://newsapi.org/v2/top-headlines?q=${q}&page=${page}&pageSize=${pageSize}&sources=${sourceStr}&apiKey=${apiKey}`
    }



    let data = await fetch(url);
    let result = await data.json();
    $("#myContent").empty();
    $("#myContent").append(render(result));
    $('#myContent').append(`<button onclick="loadMoreFunction()" id="loadMoreBtn" type="button" class="btn btn-success my-4">Load more</button>`);
    $('#myContent').append(`<div id="currentNews" style="text-align:right;">Shown : ${result.articles.length} news</div>`);
}

$(document).ready(function() {
    countCategory();
    loadNews(page);

});

async function countCategory() {
    let filterUrl = `https://newsapi.org/v2/top-headlines?q=${q}&apiKey=${apiKey}`;
    let filterData = await fetch(filterUrl);
    let result = await filterData.json();
    result.articles.forEach((x, i) => {
        addToDictionary(x.source);
    });
    reloadFilter();
}


function loadMoreFunction() {
    page++;
    $("#loadMoreBtn").remove();
    $("#currentNews").remove();
    loadNews(page);
}

function reloadFilter() {
    $("#sideNav").empty();
    categoryList.forEach(element => {
        let html = `<div class="form-check">
                        <input class="form-check-input" onchange="loadNews(1);" type="checkbox" id="${element.id}" value="${element.id}">
                        <label class="form-check-label">${element.category}(${element.count})</label>
                    </div>`;
        $("#sideNav").append(html);
    });
}

function addToDictionary(x) {
    let flag;
    for (let i = 0; i < categoryList.length; i++) {
        if (categoryList[i].id == x.id) {
            categoryList[i].count++;
            flag = true;
        }
    }
    if (!flag)
        categoryList.push({ id: x.id, category: x.name, count: 1 })
}

function render(result) {
    let innerHtml = '';
    let firstNum = 0;
    let midNum;
    let lastNum;
    result.articles.forEach((x, i) => {
        if (i == firstNum) {
            innerHtml += `<div class="row animate__animated animate__fadeInUp">
            <div class="col-4 d-flex">
                <div class="blog-entry-left">
                    <div>
                        <img src="${x.urlToImage}" width="200" height="200">
                    </div>
                    <div class="text p-4">
                        <h3 class="mb-2"><a href="single.html">${x.title}</a></h3>
                        <div class="meta-wrap">
                            <p class="meta">
                                <span><i class="icon-calendar mr-2"></i>${moment(x.publishedAt).fromNow()}</span>
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
                                    <span><i class="icon-calendar mr-2"></i>${moment(x.publishedAt).fromNow()}</span>
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
                            <span><i class="icon-calendar mr-2"></i>${moment(x.publishedAt).fromNow()}</span>
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
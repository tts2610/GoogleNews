let newsList = [];
const apiKey = "2dc86bcdc7184b17b45b74b30858f75a"
let page = 1;
let pageSize = 6;
let sourceList = [];
let sourcePage = 0;
let categoryList = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology']
let q = "corona";
let filteredNews = []

const loadNews = async(page, category) => {
    let url;
    if (category && categoryList.includes(category)) {
        $("#myContent").empty();
        url = `https://newsapi.org/v2/top-headlines?q=${q}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}&category=${category}`;
    } else {
        $("#currentNews").remove();
        url = `https://newsapi.org/v2/top-headlines?q=${q}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
    }

    let data = await fetch(url);
    let result = await data.json();
    $("#myContent").append(render(result));

    $('#myContent').append(`<button onclick="loadMoreFunction('${category}')" id="loadMoreBtn" type="button" class="btn btn-success my-4">Load more</button>`);
    $('#myContent').append(`<div id="currentNews" style="text-align:right;">Shown : ${$("#myContent .row").length} news</div>`);
}

function showAll() {
    $("input:checkbox:checked").each(function() {
        $(this).prop("checked", false);
    });
    loadNews(1, null);
}

$(document).ready(function() {
    renderDropDown();
    loadNews(page, null);
});


function loadMoreFunction(category) {
    page++;
    $("#loadMoreBtn").remove();
    $("#currentNews").remove();
    loadNews(page, category);
}

function reloadFilter() {
    $("#sideNav").empty();
    sourceList.forEach(element => {
        let html = `<label class="form-check">
        <input onchange="filterBySource('${element.id}')" class="form-check-input" type="checkbox" id="${element.id}" value="${element.id}">
        <span class="form-check-label">
            ${element.category}(${element.count})
        </span>`;
        $("#sideNav").append(html);
    });
}

function filterBySource(elem) {
    let newFilters = filteredNews.filter(x => x.source.id == elem);
    let innerHtml = newFilters.map(x => {
        return `<div class="row">
        <div class="news-img"><img class="rounded" src="${x.urlToImage}" width="200" height="200"></div>
        <div class="blog-entry-left">
            <div class="text">
                <h3 class="mb-2"><a href="${x.url}">${x.title}</a></h3>
                <div class="meta-wrap">
                    <p class="meta">
                        <span><i class="icon-calendar mr-2"></i>${moment(x.publishedAt).fromNow()}</span>
                        <span><a href="single.html" id="${x.source.id}"><i class="icon-folder-o mr-2"></i>${x.source.name}</a></span>
                        <span><i class="icon-comment2 mr-2"></i>5 Comment</span>
                    </p>
                </div>
                <p class="mb-4">${x.description}</p>
                <p><a href="${x.url}" class="btn-custom">Read More <span class="ion-ios-arrow-forward"></span></a></p>
            </div>
        </div>

    </div>`
    }).join('');
    if (isAnyChecked()) {
        $("#myContent").empty();
        $("#myContent").append(innerHtml);
    }

}

function isAnyChecked() {
    let flag = false;
    $("input:checkbox:checked").each(function() {
        flag = true;
    });
    if (!flag) {
        $("#myContent").empty();
        sourceList = [];
        loadNews(1, null);
    }

    return flag;

}

function renderDropDown() {
    categoryList.forEach(element => {
        let html = `<a class="dropdown-item" href="#" onclick="return loadNews(1,'${element}');">${element}</a>`
        $('.dropdown-menu').append(html);
    });
}

function addToDictionary(x) {
    let flag;
    for (let i = 0; i < sourceList.length; i++) {
        if (sourceList[i].id == x.id) {
            sourceList[i].count++;
            flag = true;
        }
    }
    if (!flag)
        sourceList.push({ id: x.id, category: x.name, count: 1 })
}

function render(result) {
    let innerHtml = result.articles.map(x => {
        addToDictionary(x.source);
        filteredNews.push({ urlToImage: x.urlToImage, title: x.title, publishedAt: x.publishedAt, source: x.source, description: x.description })
        return `<div class="row">
        <div class="news-img"><img class="rounded" src="${x.urlToImage}" width="200" height="200"></div>
        <div class="blog-entry-left">
            <div class="text">
                <h3 class="mb-2"><a href="${x.url}">${x.title}</a></h3>
                <div class="meta-wrap">
                    <p class="meta">
                        <span><i class="icon-calendar mr-2"></i>${moment(x.publishedAt).fromNow()}</span>
                        <span><a href="single.html" id="${x.source.id}"><i class="icon-folder-o mr-2"></i>${x.source.name}</a></span>
                        <span><i class="icon-comment2 mr-2"></i>5 Comment</span>
                    </p>
                </div>
                <p class="mb-4">${x.description}</p>
                <p><a href="${x.url}" class="btn-custom">Read More <span class="ion-ios-arrow-forward"></span></a></p>
            </div>
        </div>

    </div>`
    }).join('');
    reloadFilter();
    return innerHtml;
}
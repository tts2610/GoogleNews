let newsList = [];
const apiKey = "2dc86bcdc7184b17b45b74b30858f75a"
let page = 1;
let pageSize = 6;
let sourceList = [];
let categoryList = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology']
let q = "apple";

const loadNews = async(page) => {
    let sources = [];
    $("input:checkbox:checked").each(function() {
        sources.push($(this).val());
    });
    let url;
    if (!sources.length) {
        $("#currentNews").remove();
        url = `https://newsapi.org/v2/top-headlines?q=${q}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;

    } else {
        $("#myContent").empty();
        let sourceStr = sources.join(",");
        url = `https://newsapi.org/v2/top-headlines?q=${q}&page=${page}&pageSize=${pageSize}&sources=${sourceStr}&apiKey=${apiKey}`
    }



    let data = await fetch(url);
    let result = await data.json();
    $("#myContent").append(render(result));
    if (!sources.length)
        $('#myContent').append(`<button onclick="loadMoreFunction()" id="loadMoreBtn" type="button" class="btn btn-success my-4">Load more</button>`);
    $('#myContent').append(`<div id="currentNews" style="text-align:right;">Shown : ${result.articles.length} news</div>`);
}

function showAll() {
    $("input:checkbox:checked").each(function() {
        $(this).prop("checked", false);
    });
    loadNews(1);
}

$(document).ready(function() {
    countCategory();
    loadDropDown();
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
    sourceList.forEach(element => {

        let html = `<label class="form-check">
        <input onchange="loadNews(1);" class="form-check-input" type="checkbox" id="${element.id}" value="${element.id}">
        <span class="form-check-label">
            ${element.category}(${element.count})
        </span>`;
        $("#sideNav").append(html);
    });
}

function loadDropDown() {
    categoryList.forEach(element => {
        let html = `<a class="dropdown-item" href="#">${element}</a>`
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
        return `<div class="row">
        <div class="news-img"><img class="rounded" src="${x.urlToImage}" width="200" height="200"></div>
        <div class="blog-entry-left">
            <div class="text">
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
    }).join('');
    return innerHtml;
}
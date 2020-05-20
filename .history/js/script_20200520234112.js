let newsList = [];
const apiKey = "2dc86bcdc7184b17b45b74b30858f75a"
let page = 1;
let pageSize = 6;
let categoryList = [];
let q = "apple";

const loadNews = async(page) => {
    let sources = [];
    $("input:checkbox:checked").each(function() {
        sources.push($(this).val());
    });
    let url;
    if (!sources.length)
        url = `https://newsapi.org/v2/top-headlines?q=${q}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
    else {
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

$(document).ready(function() {
    countCategory();
    // loadNews(page);

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
    let firstNum = 0;
    let midNum;
    let midNum2;
    let lastNum;
    let innerHtml = result.map(element => {

    })
    return innerHtml;
}
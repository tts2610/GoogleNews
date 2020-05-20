$(document).ready(function() {
    alert("aaa");
    $("#myRow").on('scroll', function() {
        alert("aaaa");
        AOS.refreshHard
    });
})
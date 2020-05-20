$(document).ready(function() {
    $("#myContent").on('scroll', function() {
        alert("aaaa");
        AOS.refreshHard
    });
})
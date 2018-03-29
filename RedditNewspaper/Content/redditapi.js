
$(document).ready(function () {

    var urlString = "https://www.reddit.com/r/usnews.json";

    $.ajax({
        url: urlString,
        dataType: "json"
    }).done(function (response) {

        for (i = 0; i < 5; i++) {
            var headline = response.data.children[i].data.title;
            var imgUrl = response.data.children[i].data.preview.images[0].source.url;
            $("#headlines").append("<div>");
            $("#headlines").append('<img class="thumbnail" src="' + imgUrl + '"/>');
            $("#headlines").append("<p>" + headline + "</p>");
            $("#headlines").append("</div>");

        }
    });


});
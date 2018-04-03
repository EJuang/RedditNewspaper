
$(document).ready(function () {

    var subreddit = $("#srquery").html();
    var urlString = "https://www.reddit.com/r/" + subreddit + ".json";

    $.ajax({
        url: urlString,
        dataType: "json"
    }).done(function (response) {
        //Construct Newspaper Title
        var prefixedSubreddit = response.data.children[0].data.subreddit_name_prefixed;
        $("#newspaperTitle").html("The " + prefixedSubreddit + " Times");

        //Construct Headline
        var headline = response.data.children[0].data.title;
        var imgURL = response.data.children[0].data.preview.images[0].source.url;
        $("#headline").html(headline);
        $("#frontPhoto").html('<img src="' + imgURL + '"/>');

        //Call for headline story comment
        var permalink = response.data.children[0].data.permalink;
        $.ajax({
            url: "https://www.reddit.com" + permalink + ".json",
            dataType: "json"
        }).done(function (permalinkResponse) {
            var firstComment = permalinkResponse[1].data.children[0].data.body;
            var firstCommentAuthor = permalinkResponse[1].data.children[0].data.author;
            if (firstComment !== null) {
                $("#frontQuote").html('<i>"' + firstComment + ' - ' + firstCommentAuthor + '"</i>');
            }
        });

        //Left Panel Story
        var leftPanelTitle = response.data.children[1].data.title;
        var leftPanelImgURL = response.data.children[1].data.preview.images[0].source.url;
        $("#leftPanelTitle").html(leftPanelTitle);
        $("#leftPanelPhoto").html('<img src="' + leftPanelImgURL + '"/>');

    });


    $("#Subreddit").keyup(function (event) {
        if (event.keyCode === 13) {
            $("#submitButton").click();
        }

    });

});
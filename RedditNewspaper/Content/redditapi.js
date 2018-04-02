
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

        //TODO: Figure out CORS on other domains (jsonp?)
        ////Procure Main Content
        ////SMMRY API Key: AAC7171ECF

        //var sourceURL = response.data.children[0].data.url;
        //console.log(sourceURL);
        //$.ajax({
        //    url: "http://api.smmry.com/&SM_API_KEY=AAC7171ECF&SM_URL=" + sourceURL ,
        //    dataType: "json"
        //}).done(function (content) {
        //    console.log(content);
        //});

        //TODO: Use HTML Agility Pack to try to scrape content from web pages, create API, call from client

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
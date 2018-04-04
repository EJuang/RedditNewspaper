
$(document).ready(function () {

    var subreddit = $("#srquery").html();
    var urlString = "https://www.reddit.com/r/" + subreddit + ".json";

    $.ajax({
        url: urlString,
        dataType: "json"
    }).done(function (response) {

        console.log(response);

        //Construct Newspaper Title
        var prefixedSubreddit = response.data.children[0].data.subreddit_name_prefixed;
        $("#newspaperTitle").html("The " + prefixedSubreddit + " Times");

        //Construct frontpage headline, frontpage photo
        var headline = response.data.children[0].data.title;
        var imgURL = response.data.children[0].data.preview.images[0].source.url;
        $("#headline").html(headline);
        $("#frontPhoto").html('<img id="frontPhotoImg" class="card-img-top" src="' + imgURL + '"/>');

        //Call for headline story comment
        var permalink = response.data.children[0].data.permalink;
        $.ajax({
            url: "https://www.reddit.com" + permalink + ".json",
            dataType: "json"
        }).done(function (permalinkResponse) {
            var firstComment = permalinkResponse[1].data.children[0].data.body;
            var firstCommentAuthor = permalinkResponse[1].data.children[0].data.author;
            if (firstComment !== null) {
                $("#frontQuote").html(firstComment + " - " + firstCommentAuthor);
            }
        });

        //Call for headline story content
        var frontpagetargetURL = response.data.children[0].data.url;
        var apiURL = "/api?targetURL=" + frontpagetargetURL;
        $.ajax({
            url: apiURL,
            dataType: "json"
        }).done(function (articleContent) {
            $("#frontContent").html(articleContent.substring(0, 2500) + "<br /><i>...continued on page 2</i>");
        });

        //Left Panel title, image
        var leftPanelTitle = response.data.children[1].data.title;
        var leftPanelImgURL = response.data.children[1].data.preview.images[0].source.url;
        $("#leftPanelTitle").html(leftPanelTitle);
        $("#leftPanelPhoto").html('<img src="' + leftPanelImgURL + '"/>');

        //Left Panel story content
        var leftpaneltargetURL = response.data.children[1].data.url;
        var leftpanelapiURL = "/api?targetURL=" + leftpaneltargetURL;
        $.ajax({
            url: apiURL,
            dataType: "json"
        }).done(function (articleContent) {
            $("#leftPanelContent").html(articleContent.substring(0,500) + "<br /><i>...continued on page 3</i>");
        });
    });


    $("#Subreddit").keyup(function (event) {
        if (event.keyCode === 13) {
            $("#submitButton").click();
        }

    });

});
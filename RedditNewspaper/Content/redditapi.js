
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
        var frontAuthor = response.data.children[0].data.author;
        $("#headline").html(headline);
        $("#frontPhoto").html('<img id="frontPhotoImg" class="card-img-top" src="' + imgURL + '"/>');
        $("#frontAuthor").html("Posted by " + frontAuthor);

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
            $("#frontContent").html(articleContent.substr(0, 2000) + "<br /><i>...continued on page 2</i>");
        });

        //Right Panel title, image
        var rightPanelTitle = response.data.children[1].data.title;
        var rightPanelImgURL = response.data.children[1].data.preview.images[0].source.url;
        var rightPanelAuthor = response.data.children[1].data.author;
        $("#rightPanelTitle").html(rightPanelTitle);
        $("#rightPanelPhoto").html('<img src="' + rightPanelImgURL + '"/>');
        $("#rightPanelAuthor").html("Posted by " + rightPanelAuthor);

        //right Panel story content
        var rightpaneltargetURL = response.data.children[1].data.url;
        var rightpanelapiURL = "/api?targetURL=" + rightpaneltargetURL;
        $.ajax({
            url: rightpanelapiURL,
            dataType: "json"
        }).done(function (rightpanelarticleContent) {
            $("#rightPanelContent").html(rightpanelarticleContent.substr(0, 600) + "<br /><i>...continued on page 3</i>");
        });
    });


    $("#Subreddit").keyup(function (event) {
        if (event.keyCode === 13) {
            $("#submitButton").click();
        }

    });

    $("#subredditTextBox").focus();

});
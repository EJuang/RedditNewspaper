
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
        $("#newspaperTitle").html("THE " + prefixedSubreddit + " TIMES");

        //Construct Headline
    });


    $("#Subreddit").keyup(function (event) {
        if (event.keyCode === 13) {
            $("#submitButton").click();
        }

    });

});
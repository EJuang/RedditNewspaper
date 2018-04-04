using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using HtmlAgilityPack;

namespace RedditNewspaper.Models.DataAccess
{
    public class HTMLScraper
    {
        public static string GetArticleContent(string targetURL)
        {
            string articleContent = "";

            HtmlWeb web = new HtmlWeb();
            var htmlDoc = web.Load(targetURL);
            IList<HtmlNode> nodes = htmlDoc.QuerySelectorAll("body p");

            foreach (HtmlNode node in nodes)
            {
                articleContent += node.InnerText + "\n";
            }

            return articleContent;
        }
    }
}
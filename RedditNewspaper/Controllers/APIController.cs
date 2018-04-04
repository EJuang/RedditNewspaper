using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using RedditNewspaper.Models.DataAccess;
namespace RedditNewspaper.Controllers
{
    public class APIController : Controller
    {
        // GET: API
        [HttpGet]
        public ActionResult Index(string targetURL)
        {
            string articleContent = HTMLScraper.GetArticleContent(targetURL);

            return Json(articleContent, JsonRequestBehavior.AllowGet);
        }
    }
}
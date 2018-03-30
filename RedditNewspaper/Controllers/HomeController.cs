using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using RedditNewspaper.Models;

namespace RedditNewspaper.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Newspaper(SubredditWrapper model)
        {
            return View(model);
        }

    }
}
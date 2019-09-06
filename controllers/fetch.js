var db = require("../models");
var scrape = require("../scripts/scrape");

module.exports = {
    scrapeHeadlines: function (req, res) {
        return scrape()
            .then(function (articles) {
                return db.Headline.create(articles);
            })
            .then(function (dbHeadline) {
                if (dbHeadline.length === 0) {
                    res.json({
                        message: "No more articles, try again later"
                    });
                }
                else {
                    res.json({
                        message: "You have " + dbHeadline.length + " new articles"
                    });
                }
            })
            .catch(function (err) {
                res.json({
                    message: "Fetch complete"
                });
            });
    }
};

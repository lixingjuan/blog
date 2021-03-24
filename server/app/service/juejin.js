const Service = require("egg").Service;

class NewsService extends Service {
  async list(page = 1) {
    // read config
    const { searchUrl, myLikeUrl } = this.config.juejinSearch;

    // use build-in http client to GET hacker-news api
    const { data } = await this.ctx.curl(`${myLikeUrl}`, {
      method: "POST",
      contentType: "json",
      data: {
        cursor: "100",
        user_id: "4195392102871566",
        item_type: 2,
        sort_type: 2
      },
      dataType: "json"
    });
    console.log(data);

    const articleList = data.data
      .map(it => {
        const { article_info } = it;
        if (article_info) {
          const { title, link_url } = article_info;
          return { title, url: link_url };
        }
      })
      .filter(it => it);

    return articleList;
  }
}

module.exports = NewsService;

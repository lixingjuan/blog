const Service = require("egg").Service;

class NewsService extends Service {
  async list(page = 1) {
    // read config
    const { serverUrl, pageSize } = this.config.news;

    // use build-in http client to GET hacker-news api
    const { data } = await this.ctx.curl(`${serverUrl}`, {
      dataType: "json"
    });
    const { first: newsList } = data.data.LocalNews.data.rows || [];

    return newsList;
  }
}

module.exports = NewsService;

const Controller = require("egg").Controller;

class NewController extends Controller {
  async list() {
    const ctx = this.ctx;
    const page = ctx.query.page || 1;
    const newsList = await ctx.service.news.list(page);
    await this.ctx.render("news/list.tpl", { list: newsList });
  }
}

module.exports = NewController;

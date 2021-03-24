const Controller = require("egg").Controller;

class JuejinController extends Controller {
  async list() {
    const ctx = this.ctx;
    const articleList = await ctx.service.juejin.list();
    const res = await this.ctx.render("juejin/list.tpl", {
      articleList
    });
    console.log(res);
  }
}

module.exports = JuejinController;

module.exports = app => {
  class MenuRightController extends app.Controller {

    async rights() {
      const page = this.ctx.request.body.page;
      const items = await this.service.functionRight.rights({
        menu: 1,
        roleId: this.ctx.request.body.roleId,
        page,
      });
      this.ctx.successMore(items, page.index, page.size);
    }

    async add() {
      const res = await this.service.functionRight.add({
        roleId: this.ctx.request.body.roleId,
        module: this.ctx.request.body.module,
        name: this.ctx.request.body.name,
      });
      this.ctx.success(res);
    }

    async delete() {
      const res = await this.service.functionRight.delete({
        id: this.ctx.request.body.id,
      });
      this.ctx.success(res);
    }

    async spreads() {
      const page = this.ctx.request.body.page;
      const items = await this.service.functionRight.spreads({
        menu: 1,
        roleId: this.ctx.request.body.roleId,
        page,
      });
      this.ctx.successMore(items, page.index, page.size);
    }

  }
  return MenuRightController;
};

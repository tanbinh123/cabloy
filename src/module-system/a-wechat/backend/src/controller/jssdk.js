module.exports = app => {
  class JSSDKController extends app.Controller {
    async jsconfig() {
      const res = await this.service.jssdk.jsconfig({
        url: this.ctx.request.body.url,
      });
      this.ctx.success(res);
    }
  }
  return JSSDKController;
};

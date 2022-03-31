export default {
  methods: {
    async _onActionDelete() {
      const { ctx, action, item } = this.$props;
      // delete
      await ctx.$view.dialog.confirm();
      const key = { atomId: item.atomId, itemId: item.itemId };
      const data = await ctx.$api.post('/a/baseadmin/role/delete', { key });
      // progress
      const progressId = data.progressId;
      await ctx.$view.dialog.progressbar({ progressId, title: this.$text('Build') });
      ctx.$meta.eventHub.$emit('atom:action', { key, action });
      this.$meta.eventHub.$emit('role:delete', { roleId: item.itemId, roleIdParent: item.roleIdParent });
      // back
      if (ctx.$pageRoute.path === '/a/basefront/atom/item') {
        ctx.$f7router.back();
      }
    },
  },
};
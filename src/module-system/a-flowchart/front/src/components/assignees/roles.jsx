export default {
  props: {
    readOnly: {
      type: Boolean,
    },
    assignees: {
      type: Object,
    },
    host: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  methods: {
    onPerformAdd() {
      this.$view.navigate('/a/baseadmin/role/select', {
        target: '_self',
        context: {
          params: {
            roleIdStart: null,
            multiple: true,
            onFetchChildren: ({ roleId }) => {
              return this.$api.post('/a/flowchart/flowDef/roleChildren', {
                host: this.host,
                params: {
                  roleId,
                  page: { size: 0 },
                },
              });
            },
          },
          callback: (code, data) => {
            if (code === 200) {
              if (data) {
                const roles = data.map(item => item.data);
                for (const role of roles) {
                  const _role = this.assignees.roles.find(item => item.id === role.id);
                  if (!_role) {
                    this.assignees.roles.push(role);
                  }
                }
              }
            }
          },
        },
      });
    },
    onPerformRemove(event, item, index) {
      this.assignees.roles.splice(index, 1);
      this.$meta.util.swipeoutClose(event.target);
    },
    _renderAssignee(item, index) {
      // domTitle
      const domTitle = (
        <div slot="title" class="title">
          <div>{item.roleName}</div>
        </div>
      );
      // ok
      //   key: not use item.name
      return (
        <eb-list-item class="item" key={index} swipeout={!this.readOnly}>
          {domTitle}
          {this._renderAssigneeContextMenu(item, index)}
        </eb-list-item>
      );
    },
    _renderAssigneeContextMenu(item, index) {
      if (this.readOnly) return null;
      // domRight
      const domActions = [];
      domActions.push(
        <div key="remove" color="red" propsOnPerform={event => this.onPerformRemove(event, item, index)}>
          <f7-icon slot="media" material="delete"></f7-icon>
          {this.$device.desktop && <div slot="title">{this.$text('Remove')}</div>}
        </div>
      );
      const domRight = <div slot="right">{domActions}</div>;

      return <eb-context-menu>{domRight}</eb-context-menu>;
    },
    renderAssignees() {
      const children = [];
      const items = this.assignees.roles;
      for (let index = 0; index < items.length; index++) {
        children.push(this._renderAssignee(items[index], index));
      }
      return children;
    },
  },
  render() {
    let domAdd;
    if (!this.readOnly) {
      domAdd = <eb-link iconMaterial="add" propsOnPerform={this.onPerformAdd}></eb-link>;
    }
    return (
      <f7-list-group>
        <f7-list-item group-title>
          <div class="display-flex justify-content-space-between">
            <div>{this.$text('Roles')}</div>
            {domAdd}
          </div>
        </f7-list-item>
        {this.renderAssignees()}
      </f7-list-group>
    );
  },
};

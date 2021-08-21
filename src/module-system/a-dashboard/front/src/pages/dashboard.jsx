import Vue from 'vue';
import widgetGroup from '../components/widgetGroup.vue';
const ebPageContext = Vue.prototype.$meta.module.get('a-components').options.mixins.ebPageContext;

export default {
  meta: {
    size: 'large',
  },
  mixins: [ebPageContext],
  components: {
    widgetGroup,
  },
  render() {
    let domNavbar;
    if (this.scene === 'manager' || this.$meta.vueApp.layout === 'mobile' || this.$view.size === 'small') {
      const domActionsManager = this.renderActionsManager();
      domNavbar = (
        <eb-navbar title={this.pageTitle} ebBackLink="Back">
          {domActionsManager}
        </eb-navbar>
      );
    }
    let domGroup;
    if (this.ready) {
      domGroup = <widget-group ref="group" root dashboard={this} widgets={this.profile.root.widgets}></widget-group>;
    }
    const domActions = this.renderActions();
    return (
      <eb-page ref="page" staticClass={`dashboard dashboard-profile-${this.dashboardAtomId} ${this.lock ? '' : 'dashboard-unlock'}`}>
        {domNavbar}
        {domGroup}
        {domActions}
      </eb-page>
    );
  },
  data() {
    const query = this.$f7route.query;
    const atomStaticKey = query.key;
    const dashboardAtomId = parseInt(query.atomId) || 0;
    const scene = query.scene;
    return {
      scene, // manager/others
      ready: false,
      widgetsAll: null,
      atomStaticKey,
      profile: null,
      dashboardAtomId,
      dashboardUserId: 0,
      dashboardSystem: null,
      dashboardUser: null,
      widgetsReal: [],
      title: null,
      dirty: false,
      lock: true,
    };
  },
  computed: {
    pageTitle() {
      return this.dirty ? `* ${this.title}` : this.title;
    },
    user() {
      return this.$store.state.auth.user;
    },
    // for edit/view
    readOnly() {
      return this.contextParams && this.contextParams.readOnly;
    },
    item() {
      return this.contextParams && this.contextParams.item;
    },
  },
  mounted() {
    this.__init()
      .then(() => {})
      .catch(err => {
        this.$view.toast.show({ text: err.message });
      });
  },
  beforeDestroy() {
    this.$emit('dashboard:destroy');
  },
  methods: {
    renderActionsManager() {
      if (!this.ready) return null;
      if (this.user.op.anonymous === 1) return null;
      if (this.scene !== 'manager') return null;
      const children = [];
      if (!this.lock) {
        children.push(<eb-link key="dashboard-action-save" class="dashboard-action-save" iconMaterial="save" propsOnPerform={event => this.onPerformSaveManager(event)}></eb-link>);
        children.push(<eb-link key="dashboard-action-settings" class="dashboard-action-settings" iconMaterial="settings" propsOnPerform={event => this.onPerformSettings(event)}></eb-link>);
      }
      return <f7-nav-right>{children}</f7-nav-right>;
    },
    renderActions() {
      if (!this.ready) return null;
      if (this.user.op.anonymous === 1) return null;
      if (this.scene === 'manager') return null;
      const children = [];
      if (this.lock) {
        children.push(<eb-link key="dashboard-action-lock" class="dashboard-action-lock" iconMaterial="lock" propsOnPerform={event => this.onPerformLock(event)}></eb-link>);
      }
      if (!this.lock) {
        children.push(<eb-link key="dashboard-action-unlock" class="dashboard-action-unlock" iconMaterial="lock_open" propsOnPerform={event => this.onPerformUnlock(event)}></eb-link>);
      }
      //
      if (!this.lock) {
        children.push(<eb-link key="dashboard-action-settings" class="dashboard-action-settings" iconMaterial="settings" propsOnPerform={event => this.onPerformSettings(event)}></eb-link>);
      }
      return <div class="dashboard-actions">{children}</div>;
    },
    async __init() {
      // check scene
      if (this.scene === 'manager') {
        this.lock = this.readOnly;
      }
      // widgetsAll
      this.widgetsAll = await this.$store.dispatch('a/base/getResources', { resourceType: 'a-dashboard:widget' });
      await this.__switchProfile({ dashboardUserId: this.dashboardUserId });
      // ready
      this.ready = true;
    },
    __saveLayoutConfig() {
      this.__setDirty(true);
      if (this.scene === 'manager' && !this.readOnly) {
        this.contextCallback(200, { content: JSON.stringify(this.profile) });
      }
    },
    __setTitle(title) {
      const titleBase = this.$text('Dashboard');
      if (!title) {
        title = titleBase;
      } else {
        // need not $text
        // title = this.$text(title);
        if (title === this.$text('Default')) {
          title = titleBase;
        }
      }
      this.title = title;
      this.__onTitleChange();
    },
    __setDirty(dirty) {
      this.dirty = dirty;
      this.__onTitleChange();
    },
    __onTitleChange() {
      this.$refs.page.setPageTitle(this.pageTitle);
    },
    __adjustDashboardKey(atomStaticKey) {
      const presets = this.$config.dashboard.presets;
      const dashboardConfig = this.user.op.anonymous ? presets.anonymous : presets.authenticated;
      if (!atomStaticKey || atomStaticKey === 'default') {
        return dashboardConfig.default;
      } else if (atomStaticKey === 'home') {
        return dashboardConfig.home;
      }
      return atomStaticKey;
    },
    async __switchProfile({ dashboardUserId }) {
      if (dashboardUserId === 0) {
        let title;
        if (this.scene === 'manager') {
          this.profile = JSON.parse(this.item.content);
          title = this.item.atomName;
        } else {
          const res = await this.$api.post('/a/dashboard/dashboard/itemByKey', {
            atomStaticKey: this.__adjustDashboardKey(this.atomStaticKey),
          });
          if (res.dashboardUser) {
            this.dashboardUser = res.dashboardUser;
            this.dashboardAtomId = this.dashboardUser.dashboardAtomId;
            this.dashboardUserId = this.dashboardUser.id;
            this.profile = JSON.parse(this.dashboardUser.content);
            title = this.dashboardUser.dashboardName;
          }
          if (res.dashboardSystem) {
            this.dashboardSystem = res.dashboardSystem;
            this.dashboardAtomId = this.dashboardSystem.atomId;
            this.dashboardUserId = 0;
            this.profile = JSON.parse(this.dashboardSystem.content);
            title = this.dashboardSystem.atomNameLocale;
          }
        }
        this.__checkProfile(this.profile);
        this.__setTitle(title);
        return;
      }
      // profile of user
      const dashboardUser = await this.$api.post('/a/dashboard/dashboard/loadItemUser', {
        dashboardUserId,
      });
      if (!dashboardUser) throw new Error('Dashboard not found!');
      // data
      this.dashboardUser = dashboardUser;
      this.dashboardAtomId = this.dashboardUser.dashboardAtomId;
      this.dashboardUserId = this.dashboardUser.id;
      this.profile = JSON.parse(this.dashboardUser.content);
      const title = this.dashboardUser.dashboardName;
      this.__checkProfile(this.profile);
      this.__setTitle(title);
    },
    __checkProfile(profile) {
      // root id
      if (!profile.root.id) profile.root.id = this.$meta.util.uuidv4();
      // widget id
      for (const widget of profile.root.widgets) {
        this.__initWidget(widget, 'widget');
      }
      return profile;
    },
    __getProfileEmpty() {
      return {
        root: {
          id: this.$meta.util.uuidv4(),
          widgets: [],
        },
      };
    },
    __initWidget(widget, type) {
      // uuid
      if (!widget.id) {
        widget.id = this.$meta.util.uuidv4();
      }
      // properties
      if (!widget.properties) {
        widget.properties = this.$meta.util.extend({}, this.$config.profile.meta[type].properties);
      }
    },
    __findResourceStock(resourcesAll, resource) {
      if (!resourcesAll) return null;
      const _resource = resourcesAll[this.__resourceFullName(resource)];
      if (!_resource) return null;
      return {
        ...resource,
        title: _resource.atomName,
        titleLocale: _resource.atomNameLocale,
        resourceAtomId: _resource.atomId,
        resourceConfig: JSON.parse(_resource.resourceConfig),
      };
    },
    __findWidgetStock(widget) {
      if (widget.group) return null;
      return this.__findResourceStock(this.widgetsAll, widget);
    },
    async __saveDashboardUser() {
      // check if dirty
      if (this.dirty) {
        // save dashboardUser
        await this.$api.post('/a/dashboard/dashboard/saveItemUser', {
          dashboardUserId: this.dashboardUserId,
          content: JSON.stringify(this.profile),
        });
        this.__setDirty(false);
      }
    },
    async __createDashboardUser() {
      // create dashboardUser
      const res = await this.$api.post('/a/dashboard/dashboard/createItemUser', {
        key: { atomId: this.dashboardAtomId },
      });
      return res.dashboardUserId;
    },
    async onPerformLock() {
      // check if user
      if (this.dashboardUserId === 0) {
        // create dashboardUser
        const dashboardUserId = await this.__createDashboardUser();
        await this.__switchProfile({ dashboardUserId });
      }
      // open lock
      this.lock = false;
      // toast
      this.$view.toast.show({ text: this.$text('DashboardUnlockWarningSave') });
    },
    async onPerformUnlock() {
      // save
      await this.__saveDashboardUser();
      // lock
      this.lock = true;
    },
    onPerformSettings() {
      this.$view.navigate(`/a/dashboard/dashboard/settings?dashboardUserId=${this.dashboardUserId}`, {
        scene: 'sidebar',
        sceneOptions: { side: 'right', name: 'profile', title: 'Profile2' },
        context: {
          params: {
            dashboard: this,
          },
        },
      });
    },
    async onPerformSaveManager() {
      // for manager
      await this.contextParams.onSave();
      this.__setDirty(false);
      return this.$text('Saved');
    },
    onWidgetsAdd({ widgets }) {
      for (const widget of widgets) {
        this.$refs.group.onWidgetAdd(widget);
      }
    },
    onGroupAdd() {
      const widgetGroup = {
        group: true,
        widgets: [],
      };
      this.__initWidget(widgetGroup, 'widget');
      this.profile.root.widgets.push(widgetGroup);
      // save
      this.__saveLayoutConfig();
    },
    __onWidgetRealReady(widgetId, widgetReal) {
      this.__onWidgetRealDestroy();
      this.widgetsReal.push({ widgetId, widgetReal });
    },
    __onWidgetRealDestroy(widgetId /* , widgetReal*/) {
      const [, index] = this.__findWidgetRealById(widgetId);
      if (index > -1) {
        this.widgetsReal.splice(index, 1);
      }
    },
    __findWidgetRealById(widgetId) {
      const index = this.widgetsReal.findIndex(item => item.widgetId === widgetId);
      if (index === -1) return [null, -1];
      return [this.widgetsReal[index], index];
    },
    __getWidgetRealById(widgetId) {
      const [widget] = this.__findWidgetRealById(widgetId);
      if (!widget) return null;
      return widget.widgetReal;
    },
    __resourceFullName(resource) {
      if (resource.atomStaticKey) return resource.atomStaticKey;
      return `${resource.module}:${resource.name}`;
    },
    onPerformAddWidget(ctx, widgetGroup) {
      ctx.$view.navigate('/a/basefront/resource/select?resourceType=a-dashboard:widget', {
        target: '_self',
        context: {
          params: {
            multiple: true,
          },
          callback: (code, nodes) => {
            if (code === 200) {
              if (nodes) {
                const widgets = nodes.map(item => {
                  return {
                    atomStaticKey: item.data.atomStaticKey,
                  };
                });
                widgetGroup.onWidgetsAdd({ widgets });
              }
            }
          },
        },
      });
    },
  },
};

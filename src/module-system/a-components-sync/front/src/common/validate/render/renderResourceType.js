export default {
  methods: {
    renderResourceType(c, context) {
      let { property } = context;
      if (!property.ebRender) {
        property = {
          ...property,
          ebRender: {
            module: 'a-basefront',
            name: 'renderResourceType',
          },
        };
        context = {
          ...context,
          property,
        };
      }
      return this.renderComponent(c, context);
    },
  },
};

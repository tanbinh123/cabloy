module.exports = app => {
  const schemas = {};
  schemas.signup = {
    type: 'object',
    properties: {
      userName: {
        type: 'string',
        ebType: 'text',
        ebTitle: 'Username',
        notEmpty: true,
        'x-exists': true,
      },
      realName: {
        type: 'string',
        ebType: 'text',
        ebTitle: 'Realname',
        notEmpty: true,
      },
      email: {
        type: 'string',
        ebType: 'text',
        ebTitle: 'Email',
        notEmpty: true,
        format: 'email',
        'x-exists': true,
      },
      // mobile: {
      //   type: 'string',
      //   ebType: 'text',
      //   ebTitle: 'Mobile',
      //   notEmpty: true,
      //   'x-exists': true,
      // },
      password: {
        type: 'string',
        ebType: 'text',
        ebTitle: 'Password',
        ebParams: {
          secure: true,
        },
        notEmpty: true,
        minLength: 6,
      },
      passwordAgain: {
        type: 'string',
        ebType: 'text',
        ebTitle: 'Password Again',
        ebParams: {
          secure: true,
        },
        notEmpty: true,
        const: { $data: '1/password' },
      },
    },
  };
  schemas.signin = {
    type: 'object',
    properties: {
      auth: {
        type: 'string',
        ebType: 'text',
        ebTitle: 'Your Username/Mobile/Email',
        notEmpty: true,
      },
      password: {
        type: 'string',
        ebType: 'text',
        ebTitle: 'Your Password',
        ebParams: {
          secure: true,
        },
        notEmpty: true,
        minLength: 6,
      },
      rememberMe: {
        type: 'boolean',
        ebType: 'toggle',
        ebTitle: 'Remember Me',
      },
    },
  };
  schemas.passwordChange = {
    type: 'object',
    properties: {
      passwordOld: {
        type: 'string',
        ebType: 'text',
        ebTitle: 'Old Password',
        ebParams: {
          secure: true,
        },
        notEmpty: true,
        minLength: 6,
      },
      passwordNew: {
        type: 'string',
        ebType: 'text',
        ebTitle: 'New Password',
        ebParams: {
          secure: true,
        },
        notEmpty: true,
        minLength: 6,
      },
      passwordNewAgain: {
        type: 'string',
        ebType: 'text',
        ebTitle: 'New Password Again',
        ebParams: {
          secure: true,
        },
        notEmpty: true,
        const: { $data: '1/passwordNew' },
      },
    },
  };
  schemas.emailConfirm = {
    type: 'object',
    properties: {
      userName: {
        type: 'string',
        ebType: 'text',
        ebTitle: 'Username',
        ebReadOnly: true,
      },
      email: {
        type: 'string',
        ebType: 'text',
        ebTitle: 'Email',
        notEmpty: true,
        format: 'email',
        'x-exists': true,
      },
    },
  };
  schemas.passwordForgot = {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        ebType: 'text',
        ebTitle: 'Email',
        notEmpty: true,
        format: 'email',
        'x-passwordForgotEmail': true,
      },
    },
  };
  schemas.passwordReset = {
    type: 'object',
    properties: {
      passwordNew: {
        type: 'string',
        ebType: 'text',
        ebTitle: 'New Password',
        ebParams: {
          secure: true,
        },
        notEmpty: true,
        minLength: 6,
      },
      passwordNewAgain: {
        type: 'string',
        ebType: 'text',
        ebTitle: 'New Password Again',
        ebParams: {
          secure: true,
        },
        notEmpty: true,
        const: { $data: '1/passwordNew' },
      },
    },
  };
  return schemas;
};

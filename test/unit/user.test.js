'use strict';

var expect = require('expect.js');

describe('models/user', function () {
  before(function () {
      return require('../../models').sequelize.sync();
  });

  beforeEach(function () {
    this.User = require('../../models').User;
  });

  describe('create', function () {
    it('creates a user', function () {
      return this.User.create({
        email: 'ajaxkamau@gmail.com',
        username: 'augusito',
        password: '123456'
      }).bind(this).then(function (user) {
        expect(user.email).to.equal('ajaxkamau@gmail.com');
        expect(user.username).to.equal('augusito');
        expect(user.password).to.equal('123456');
      });
    });
  });
});

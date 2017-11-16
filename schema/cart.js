'use strict';

var { GraphQLObjectType, GraphQLInt, GraphQLList } = require('graphql/type');

var lineItem = require('./lineItem');

var cart = new GraphQLObjectType({
    name: 'cart',
    fields: () => ({
        id: {
            type: (GraphQLInt),
            resolve: (cart) => cart.id
        },
        lineItems: {
            type: (GraphQLList(lineItem)),
            resolve: (cart) => cart.lineItems
        }
    })
});

module.exports = cart;
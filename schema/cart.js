'use strict';

let { GraphQLObjectType, GraphQLInt, GraphQLList } = require('graphql/type');

let lineItem = require('./lineItem');

let cart = new GraphQLObjectType({
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
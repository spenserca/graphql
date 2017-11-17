'use strict';

const { GraphQLObjectType, GraphQLInt, GraphQLList, GraphQLNonNull } = require('graphql/type');
const lineItem = require('./lineItem');

const cart = new GraphQLObjectType({
    name: 'Cart',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        lineItems: { type: new GraphQLList(lineItem) }
    })
});

module.exports = cart;
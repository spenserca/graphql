'use strict';

const { GraphQLObjectType, GraphQLInt, GraphQLNonNull } = require('graphql/type');

const lineItem = new GraphQLObjectType({
    name: 'LineItem',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        productId: { type: new GraphQLNonNull(GraphQLInt) },
        quantity: { type: new GraphQLNonNull(GraphQLInt) }
    })
});

module.exports = lineItem;
'use strict';

let { GraphQLObjectType, GraphQLInt } = require('graphql/type');

let lineItem = new GraphQLObjectType({
    name: 'lineItem',
    fields: () => ({
        id: {
            type: (GraphQLInt),
            resolve: (lineItem) => lineItem.id
        },
        productId: {
            type: (GraphQLInt),
            resolve: (lineItem) => lineItem.productId
        },
        quantity: {
            type: (GraphQLInt),
            resolve: (lineItem) => lineItem.quantity
        }
    })
});

module.exports = lineItem;
'use strict';

var { GraphQLObjectType, GraphQLInt } = require('graphql/type');

var lineItem = new GraphQLObjectType({
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
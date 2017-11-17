'use strict';

const request = require('request-promise');
const { GraphQLObjectType, GraphQLInt, GraphQLNonNull } = require('graphql/type');
const product = require('./product');

const lineItem = new GraphQLObjectType({
    name: 'LineItem',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        productId: { type: new GraphQLNonNull(GraphQLInt) },
        product: { type: new GraphQLObjectType(product),
            resolve: function(lineItem) {
                // TODO: convert to arrow function
                return request.get(`http://localhost:3030/products/${lineItem.productId}`)
            } },
        quantity: { type: new GraphQLNonNull(GraphQLInt) }
    })
});

module.exports = lineItem;
'use strict';

var { GraphQLSchema } = require('graphql');
var { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString } = require('graphql/type');

var product = require('./schema/product');
var cart = require('./schema/cart');

// cart fields must be an object with field names as keys or a function which returns such an object
// CartQueryType.id field config must be an object
var schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'cart',
        fields: () => {
            return {
                id: 1,
                lineItems: [{
                    id: 1,
                    productId: 2,
                    quantity: 5
                }]
            };
        }
    })
});

module.exports = schema;
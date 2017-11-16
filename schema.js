'use strict';

var { GraphQLSchema } = require('graphql');
var { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString } = require('graphql/type');

var product = require('./schema/product');
var cart = require('./schema/cart');

var schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'CartQueryType',
        fields: {
            cart: {
                type: new GraphQLObjectType(cart),
                args: {
                    id: {
                        name: 'id',
                        type: new GraphQLNonNull(GraphQLInt)
                    }
                },
                resolve: (cart, { id }, source) => {
                    return { 
                        id: 1,
                        lineItems: [{
                            id: 1,
                            productId: 2,
                            quantity: 5
                        }]
                    };
                }
            }
        }
    })
});

module.exports = schema;
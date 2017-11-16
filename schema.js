'use strict';

var { GraphQLSchema } = require('graphql');
var { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString } = require('graphql/type');

var product = new GraphQLObjectType({
    name: 'product',
    fields: () => ({
        id: {
            type: (GraphQLInt),
            description: 'Id of the product'
        },
        name: {
            type: (GraphQLString),
            description: 'Name of the product'
        },
        imageUrl: {
            type: (GraphQLString),
            description: 'URL of product image'
        },
        price: {
            type: (GraphQLFloat),
            description: 'Price of the product'
        }
    })
});

var lineItem = new GraphQLObjectType({
    name: 'lineItem',
    fields: () => ({
        id: {
            type: (GraphQLInt)
        },
        productId: {
            type: (GraphQLInt)
        },
        quantity: {
            type: (GraphQLInt)
        }
    })
});

var cart = new GraphQLObjectType({
    name: 'cart',
    fields: () => ({
        id: {
            type: (GraphQLInt)
        },
        lineItems: {
            type: (GraphQLList(lineItem))
        }
    })
});

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
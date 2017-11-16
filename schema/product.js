'use strict';

var { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLFloat } = require('graphql/type');

var product = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        id: {
            type: (GraphQLInt),
            resolve: (product) => product.id
        },
        name: {
            type: (GraphQLString),
            resolve: (product) => product.name
        },
        imageUrl: {
            type: (GraphQLString),
            resolve: (product) => product.imageUrl
        },
        price: {
            type: (GraphQLFloat),
            resolve: (product) => product.price
        }
    })
});

module.exports = product;
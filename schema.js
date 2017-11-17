'use strict';

const request = require('request-promise');
const { GraphQLSchema } = require('graphql');
const { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString, GraphQLList } = require('graphql/type');

const productType = require('./schema/product');
const cart = require('./schema/cart');

const ProductRootType = new GraphQLObjectType({
    name: 'ProductTypeSchema',
    fields: () => ({
        products: {
            type: new GraphQLList(productType),
            resolve: function() {
                // this should be where we make the web service call to get products
                // http://localhost:8080/products
                return request({
                    method: 'GET',
                    uri: 'http://localhost:8080/products',
                    json: true,
                    strictSSL: false
                });
            }
        }
    })
});

const ProductSchema = new GraphQLSchema({
    query: ProductRootType
});

module.exports = ProductSchema;


// cart fields must be an object with field names as keys or a function which returns such an object
// CartQueryType.id field config must be an object
// let schema = new GraphQLSchema({
//     query: new GraphQLObjectType({
//         name: 'cart',
//         fields: () => {
//             return {
//                 id: 1,
//                 lineItems: [{
//                     id: 1,
//                     productId: 2,
//                     quantity: 5
//                 }]
//             };
//         }
//     })
// });

// module.exports = schema;
'use strict';

const request = require('request-promise');
const { GraphQLSchema } = require('graphql');
const { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString, GraphQLList, GraphQLFloat } = require('graphql/type');

const cart = new GraphQLObjectType({
    name: 'Cart',
    fields: () => ({
        id: { type: GraphQLInt },
        lineItems: { type: new GraphQLList(lineItem) }
    })
});

const lineItem = new GraphQLObjectType({
    name: 'LineItem',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        productId: { type: new GraphQLNonNull(GraphQLInt) },
        product: {
            type: productType,
            resolve: function (lineItem) {
                // TODO: convert to arrow function
                return request({
                    uri: `http://localhost:8080/products/${lineItem.productId}`,
                    json: true
                });
            }
        },
        quantity: { type: new GraphQLNonNull(GraphQLInt) }
    })
});

const productType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        imageURL: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLFloat) }
    })
});

const RootType = new GraphQLObjectType({
    name: 'Root',
    fields: () => ({
        shoppingCart: {
            type: cart,
            resolve: function (a, { id }, c) {
                return request({
                    uri: `http://localhost:5000/shopping-carts/${id}`,
                    json: true
                });
            },
            args: {
                id: {
                    name: 'Id',
                    type: new GraphQLNonNull(GraphQLInt)
                }
            }
        }
    })
})


// const ProductRootType = new GraphQLObjectType({
//     name: 'ProductTypeSchema',
//     fields: () => ({
//         products: {
//             type: new GraphQLList(productType),
//             resolve: function() {
//                 // this should be where we make the web service call to get products
//                 // http://localhost:8080/products
//                 return request({
//                     method: 'GET',
//                     uri: 'http://localhost:8080/products',
//                     json: true,
//                     strictSSL: false
//                 });
//             }
//         }
//     })
// });

const RootSchema = new GraphQLSchema({
    query: RootType
});

module.exports = RootSchema;


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
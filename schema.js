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
            resolve: (lineItem) => {
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
});

module.exports = new GraphQLSchema({ query: RootType });
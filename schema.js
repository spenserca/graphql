'use strict';

const request = require('request-promise');
const { GraphQLSchema } = require('graphql');
const { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString, GraphQLList, GraphQLFloat } = require('graphql/type');

const cartType = new GraphQLObjectType({
    name: 'Cart',
    fields: () => ({
        id: { type: GraphQLInt },
        lineItems: { type: new GraphQLList(lineItemType) }
    })
});

const lineItemType = new GraphQLObjectType({
    name: 'LineItem',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        productId: { type: new GraphQLNonNull(GraphQLInt) },
        product: {
            type: productType,
            resolve: (lineItem) => {
                return request({
                    uri: (lineItem && lineItem.productId) ? `http://localhost:8080/products/${lineItem.productId}` : 'http://localhost:8080/products',
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
            type: cartType,
            resolve: function (a, { id }, c) {
                return request({
                    uri: id ? `http://localhost:5000/shopping-carts/${id}` : 'http://localhost:5000/shopping-carts/',
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
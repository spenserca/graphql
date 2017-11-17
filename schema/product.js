'use strict';

let { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLFloat, GraphQLNonNull } = require('graphql/type');

let product = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        imageUrl: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLFloat) }
    })
});

module.exports = product;
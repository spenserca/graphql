'use strict';

const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLFloat, GraphQLNonNull } = require('graphql/type');

const product = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        imageURL: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLFloat) }
    })
});

module.exports = product;
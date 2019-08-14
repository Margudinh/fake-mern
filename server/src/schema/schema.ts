import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLSchema } from "graphql";
import { User } from '../entity/User';

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        age: { type: GraphQLInt },
        email: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: { 
            type: UserType ,
            args: { id: { type: GraphQLInt} },
            resolve: async (root, args) => {
                const user = await User.findOne(args.id,{select: ['id','firstName','lastName','email', 'age']});
                return user;
            }
            
        }
    }
});

export default new GraphQLSchema({
    query: RootQuery
});


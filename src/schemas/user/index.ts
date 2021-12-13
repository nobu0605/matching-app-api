import { UserTC,UserModel } from "../../models/user";
import { PostModel } from "../../models/post";
import { SchemaComposer } from 'graphql-compose'

const UserQuery = {
  userById: UserTC.getResolver("findById"),
  userByIds: UserTC.getResolver("findByIds"),
  userOne: UserTC.getResolver("findOne"),
  userMany: UserTC.getResolver("findMany"),
  userCount: UserTC.getResolver("count"),
  userConnection: UserTC.getResolver("connection"),
  userPagination: UserTC.getResolver("pagination"),
};

const UserMutation = {
  userCreateOne: UserTC.getResolver("createOne"),
  userCreateMany: UserTC.getResolver("createMany"),
  userUpdateById: UserTC.getResolver("updateById"),
  userUpdateOne: UserTC.getResolver("updateOne"),
  userUpdateMany: UserTC.getResolver("updateMany"),
  userRemoveById: UserTC.getResolver("removeById"),
  userRemoveOne: UserTC.getResolver("removeOne"),
  userRemoveMany: UserTC.getResolver("removeMany"),
};
const schemaComposer = new SchemaComposer<any>()
const resultTC = schemaComposer.createObjectTC({
  name: 'resultTC',
  fields: {
    result: 'Boolean',
  },
})
 const createUserPost = schemaComposer.createResolver<any, any>({
  name: 'createUserPost',
  type: resultTC,
  resolve: async ({ args }) => {
    const session = await UserModel.startSession()

    await session.startTransaction()
    try {
      const result = await UserModel.create(
        [
          {
            username:"aa",
            email: "nobublack555@gmail.com",
            password: "s",
          },
        ],
        { session: session }
      )

      const result2 = await PostModel.create(
        [
          {
            user_id: 1,
            content:"s"
          },
        ],
        { session: session }
      )
 
      await session.commitTransaction()
    } catch (error) {
      console.error(error)
      await session.abortTransaction()
    } finally {
      await session.endSession()
    }

    return { result: true }
  },
})

export { UserQuery, UserMutation,createUserPost };

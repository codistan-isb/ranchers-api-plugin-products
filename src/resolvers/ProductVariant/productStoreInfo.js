export default async function productStoreInfo(context, args, parent, info) {
  // console.log("args", args);
  // console.log("parent", parent);
  const { collections } = context;
  const { Accounts } = collections;
  // console.log("Accounts", Accounts);
  // console.log("parent", args);
  let accountDetails = await Accounts.find({
    _id: args?.uploadedBy?.userId,
  }).toArray();
  console.log("accountDetails product plugin", accountDetails);
  return {
    storeName: accountDetails[0]?.storeName,
    name: accountDetails[0]?.name,
    userId: accountDetails[0]?._id,
  };
}

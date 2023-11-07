export default async function generateRandomReferenceId(context) {
  const { collections } = context;
  const { ProductSequence } = collections;
  let lastGeneratedReferenceId = await ProductSequence.find().toArray();
  console.log(
    "lastGeneratedReferenceId",
    lastGeneratedReferenceId[0]?.lastReferenceId
  );
  let newId = (
    parseInt(lastGeneratedReferenceId[0]?.lastReferenceId) + 1
  ).toString();
  console.log("newId", newId);
  ProductSequence.updateOne(
    { _id: lastGeneratedReferenceId[0]?._id },
    {
      $set: {
        lastReferenceId: newId,
        updatedAt: new Date(),
      },
    }
  );
  return newId;
}

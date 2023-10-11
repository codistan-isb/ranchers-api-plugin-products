import generateRandomReferenceId from "../../utils/generateRandomReferenceId.js";
export default async function assignReferenceIdsToProducts(
  _,
  { input },
  context
) {
  const { collections } = context;
  const { Products } = collections;
  let filter = {
    // referenceId: { $exists: false },
    ancestors: { $exists: true, $size: 0 },
  };
  console.log("filter", filter);
  // Find all products that don't have a referenceId
  let products = await Products.find(filter).toArray();
  // This will hold our update operations

  console.log("products", products);
  // We use a for...of loop so we can use await inside it
  // This will hold our update operations
  let bulkOps = [];

  // We use a for...of loop so we can use await inside it
  for (const product of products) {
    // Check if the product has a metafields array
    if (product?.metafields) {
      // Find the 'oldId' field in the product's metafields array
      const oldIdField = product.metafields.find(
        (field) => field.key === "oldId"
      );
      // console.log("product", product);
      // If the 'oldId' field exists, use its value as the referenceId
      // Otherwise, generate a random ID and use that as the referenceId
      let referenceId = oldIdField
        ? oldIdField.value
        : await generateRandomReferenceId(context);
      console.log("bulkOps", bulkOps);
      // Push the update operation into our array
      bulkOps.push({
        updateOne: {
          filter: { _id: product._id },
          update: { $set: { referenceId: referenceId, updatedAt: new Date() } },
        },
      });
    }
  }
  console.log("bulkOps", bulkOps);
  let data = await Products.bulkWrite(bulkOps);
  console.log("data: ", data);
  return true;
}

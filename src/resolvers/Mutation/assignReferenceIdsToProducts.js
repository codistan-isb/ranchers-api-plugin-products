export default async function assignReferenceIdsToProducts(_, { input }, context) {
  const { collections } = context;
  const { Products } = collections;

  // Define a filter for products that don't have a referenceId
  const filter = { referenceId: { $exists: false } };

  // Find all products that don't have a referenceId
  const productsWithoutReferenceId = await Products.find(filter).toArray();

  // Loop over the products and assign a unique referenceId to each one
  for (const product of productsWithoutReferenceId) {
    // Generate a random referenceId
    const randomReferenceId = Math.floor(Math.random() * 1000000).toString();

    // Update the product with the new referenceId
    await Products.updateOne({ _id: product._id }, { $set: { referenceId: randomReferenceId } });
  }
}

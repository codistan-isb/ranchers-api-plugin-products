export default async function assignReferenceIdsToProducts(_, { input }, context) {
  const { collections } = context;
const { Products } = collections;

// Define a filter for products that don't have a referenceId
const filter = { referenceId: { $exists: false } };

// Generate a random referenceId
const randomReferenceId = Math.floor(Math.random() * 1000000).toString();

// Update all products that don't have a referenceId
await Products.updateMany(filter, { $set: { referenceId: randomReferenceId } });

  
  }
  
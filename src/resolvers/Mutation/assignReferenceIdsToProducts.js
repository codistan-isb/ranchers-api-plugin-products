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
  // let previousReferenceId;
  // Find all products that don't have a referenceId
  let products = await Products.find(filter).toArray();
  // This will hold our update operations

  console.log("products", products);
  // await generateRandomId(context);
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

  //Extra code
  // console.log("productsWithoutReferenceId", productsWithoutReferenceId);
  // const bulkOps = products.map((product) => {
  //   // Find the 'oldId' field in the product's metafields array
  //   const oldIdField = product.metafields.find(
  //     (field) => field.key === "oldId"
  //   );

  //   // If the 'oldId' field exists, use its value as the referenceId
  //   // Otherwise, generate a random ID and use that as the referenceId
  //   const referenceId = oldIdField ? oldIdField.value : generateRandomId();

  //   return {
  //     updateOne: {
  //       filter: { _id: product._id },
  //       update: { $set: { referenceId: referenceId } },
  //     },
  //   };
  // });
  // let update = await Products.bulkWrite(bulkOps);
  // console.log("update", update);
  // // Define a filter for products that don't have a referenceId
  // const filter = {
  //   // referenceId: { $exists: false },
  //   ancestors: { $exists: true, $size: 0 },
  // };
  // console.log("filter", filter);
  // // let previousReferenceId;
  // // Find all products that don't have a referenceId
  // const productsWithoutReferenceId = await Products.find(filter).toArray();
  // // console.log("productsWithoutReferenceId", productsWithoutReferenceId);
  // // let dataUpdated = await Products.updateMany(
  // //   {},
  // //   { $unset: { referenceId: "" } }
  // // );
  // // console.log("dataUpdated", dataUpdated);
  // // Loop over the products and assign a unique referenceId to each one
  // if (productsWithoutReferenceId) {
  //   for (const product of productsWithoutReferenceId) {
  //     // console.log("product.metafields", product);
  //     let metaFieldData = product?.metafields;
  //     console.log("product.metafields.length", metaFieldData);
  //     if (metaFieldData) {
  //       if (metaFieldData.length > 0) {
  //         for (const productData of metaFieldData) {
  //           if (productData.key === "oldId") {
  //             console.log("productData", productData);
  //             console.log("productData.key", productData.key);
  //             let updateData = await Products.updateOne(
  //               { _id: product._id },
  //               {
  //                 $set: {
  //                   referenceId: productData.value,
  //                   updatedAt: new Date(),
  //                 },
  //               }
  //             );
  //             console.log("updateData", updateData);
  //           } else {
  //             let id = await generateRandomId();
  //             console.log("id here", id);
  //             let updateData = await Products.updateOne(
  //               { _id: product._id },
  //               {
  //                 $set: {
  //                   referenceId: id,
  //                   updatedAt: new Date(),
  //                 },
  //               }
  //             );
  //             console.log("updateData", updateData);
  //           }
  //         }
  //       }
  //     }

  //     // let metaFieldData = product?.metafields;
  //     // if (metaFieldData) {
  //     //   if (metaFieldData.length > 0) {
  //     //     for (const productData of metaFieldData) {
  //     //       if (productData.key === "oldId") {
  //     //         console.log("productData.key:- ", productData);
  //     //         let updateData = await Products.updateOne(
  //     //           { _id: product._id },
  //     //           {
  //     //             $set: {
  //     //               referenceId: productData.value,
  //     //               updatedAt: new Date(),
  //     //             },
  //     //           }
  //     //         );
  //     //         console.log("updateData", updateData);
  //     //       } else {
  //     //         const randomReferenceId = Math.floor(
  //     //           Math.random() * 1000000
  //     //         ).toString();
  //     //         console.log("randomReferenceId", randomReferenceId);
  //     //         // // Update the product with the new referenceId
  //     //         // let newReferenceId = previousReferenceId + 1;

  //     //         let id = await generateRandomId();
  //     //         console.log("id here", id);
  //     //         let UpdatedProduct = await Products.updateOne(
  //     //           { _id: product._id },
  //     //           {
  //     //             $set: {
  //     //               referenceId: id,
  //     //               updatedAt: new Date(),
  //     //             },
  //     //           }
  //     //         );
  //     //         console.log("UpdatedProduct", UpdatedProduct);
  //     //       }
  //     //       //  else {
  //     //       // const randomReferenceId = Math.floor(
  //     //       //   Math.random() * 1000000
  //     //       // ).toString();
  //     //       // console.log("randomReferenceId", randomReferenceId);
  //     //       // // // Update the product with the new referenceId
  //     //       // let UpdatedProduct = await Products.updateOne(
  //     //       //   { _id: product._id },
  //     //       //   { $set: { referenceId: randomReferenceId, updatedAt: new Date() } }
  //     //       // );
  //     //       // console.log("UpdatedProduct", UpdatedProduct);
  //     //       // return true;
  //     //       // // }
  //     //     }
  //     //   }
  //     // }

  //     // Generate a random referenceId
  //     // const randomReferenceId = Math.floor(Math.random() * 1000000).toString();
  //     // // Update the product with the new referenceId
  //     // await Products.updateOne({ _id: product._id }, { $set: { referenceId: randomReferenceId } });
  //   }
  //   return true;
  // }

  // else {
  //   // Generate a random referenceId

  //   const randomReferenceId = Math.floor(Math.random() * 1000000).toString();
  //   console.log("randomReferenceId", randomReferenceId);
  //   // // Update the product with the new referenceId
  //   let UpdatedProduct = await Products.updateOne(
  //     { _id: product._id },
  //     { $set: { referenceId: randomReferenceId, updatedAt: new Date() } }
  //   );
  //   console.log("UpdatedProduct", UpdatedProduct);
  // }
}

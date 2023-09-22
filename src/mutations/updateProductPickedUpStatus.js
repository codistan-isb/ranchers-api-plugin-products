import { decodeProductOpaqueId, decodeShopOpaqueId } from "../xforms/id.js";

export default async function updateProductPickedUpStatus(context, input) {
  const { product: inventoryStatus, productId } = input;

  const { Products } = context.collections;
  const updateDocument = {
    productId,
    inventoryStatus,
  };
  updateDocument.updatedAt = new Date();
  const modifier = { $set: updateDocument };
    const valueResp = await Products.findOneAndUpdate(
      {
        _id: productId,
      },
      modifier,
      {
        returnOriginal: false,
      }
    );
      console.log("updatedProduct ", valueResp.value);
    return valueResp.value;
  
 
}

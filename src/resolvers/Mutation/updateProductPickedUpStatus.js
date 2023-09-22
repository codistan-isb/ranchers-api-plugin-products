import { decodeProductOpaqueId } from "../../xforms/id.js";

export default async function updateProductPickedUpStatus(
  _,
  { input },
  context
) {
  //   console.log(input, "dddd");
  const { productId, inventoryStatus } = input;

  const updateResp = await context.mutations.updateProductPickedUpStatus(
    context,
    {
      product: inventoryStatus,
      productId: decodeProductOpaqueId(productId),
    }
  );
return updateResp;
}

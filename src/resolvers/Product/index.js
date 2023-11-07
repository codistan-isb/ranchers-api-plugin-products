import resolveShopFromShopId from "@reactioncommerce/api-utils/graphql/resolveShopFromShopId.js";
import { encodeProductOpaqueId } from "../../xforms/id.js";
import getVariants from "../../utils/getVariants.js";
import getProductMedia from "../../utils/getProductMedia.js";
import socialMetadata from "./socialMetadata.js";
import tagIds from "./tagIds.js";
import tags from "./tags.js";
import sameDayDelivery from '../../utils/sameDayDelivery.js'

export default {
  _id: (node) => encodeProductOpaqueId(node._id),
  media: (node, args, context) => getProductMedia(node, args, context),
  sameDayDelivery: (node, args, context) => sameDayDelivery(node, args, context),
  metafields: (node) => node.metafields || [],
  shop: resolveShopFromShopId,
  slug: (node) => node.handle,
  socialMetadata,
  inventoryStatus: (node) => node.inventoryStatus,
  tagIds,
  tags,
  variants: (node, args, context) => getVariants(context, node._id, true, args),
};

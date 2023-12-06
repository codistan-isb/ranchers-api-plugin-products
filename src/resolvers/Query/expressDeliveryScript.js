export default async function expressDeliveryScript(product, connectionArgs, context, info) {
    const { collections } = context;
    const { Tags, Catalog } = collections;

    try {
        // Find the "Express Delivery" tag ID
        const expressDeliveryTag = await Tags.findOne({ displayTitle:"EXPRESS DELIVERY" });
        const expressDeliveryId = expressDeliveryTag._id;
        console.log(`Express Delivery tag ID: ${expressDeliveryId}`)

        // Find the "Live Sessions" tag ID
        const liveSessionTag = await Tags.findOne({ displayTitle:"Live Sessions" });
        const liveSessionId = liveSessionTag._id;
        console.log(`Live Sessions tag ID: ${liveSessionId}`)

        // Find products with the "Live Sessions" tag "EXPRESS DELIVERY"
        const query = { 'product.tagIds': liveSessionId };
        const productsWithLiveSession = await Catalog.find(query).toArray();
        console.log(`Found ${productsWithLiveSession.length} products with "Live Sessions" tag`);

        // Add the "Express Delivery" tag to each product
        for (const product of productsWithLiveSession) {
            const productId = product._id;

            // Check if the product already has the "Express Delivery" tag
            if (!product.product.tagIds.includes(expressDeliveryId)) {
                // Add the "Express Delivery" tag to the product
                await Catalog.updateOne(
                    { _id: productId },
                    { $addToSet: { 'product.tagIds': expressDeliveryId } }
                );

                console.log(`Added "Express Delivery" tag to product: ${productId}`);
            } else {
                console.log(`Product ${productId} already has "Express Delivery" tag`);
            }
        }

        console.log('Process completed successfully.');
        return true;
    } catch (error) {
        console.error('Error processing products:', error.message);
        return false;
    }
}

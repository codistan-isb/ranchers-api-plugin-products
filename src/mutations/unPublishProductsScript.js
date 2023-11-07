export default async function unPublishProductsScript(parent, args, context, info) {
    const { collections } = context;
    const { Products } = collections;
    const currentProduct = await Products.updateMany(
        { media: { $size: 0 }, ancestors: { $size: 0 } },
        { $set: { isVisible: false, updatedAt: new Date() } }
    );
    console.log("currentProduct", currentProduct);
    if (currentProduct.modifiedCount > 1) {
        let products = await Products.find(
            { media: { $size: 0 }, ancestors: { $size: 0 } },
            { _id: 1 } // This projection means only the _id field will be returned
        ).toArray();

        let productIds = products.map(product => product._id);
        console.log("productIds", productIds);
    }


}
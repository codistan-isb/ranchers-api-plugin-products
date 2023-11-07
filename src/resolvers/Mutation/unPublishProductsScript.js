export default async function unPublishProductsScript(parent, args, context, info) {

    console.log("args", args);
    const updatedProduct = await context.mutations.unPublishProductsScript(parent, args, context, info);

}
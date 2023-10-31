export default async function updateOptionTitle(_, { input }, context) {
    const { collections } = context;
    const { Products, Catalog } = collections;
    try {
        let catalogData = await Catalog.find({}).toArray()
        console.log("catalogData", catalogData);
    } catch (error) {
        console.log("error", error);
    }
    // try { 
    //     await Products.find({}).forEach(function(doc) {
    //         console.log('doc._id: ' , doc._id);
    //         if (doc.optionTitle && typeof doc.optionTitle === 'string') {
    //             try {
    //                 var optionTitle = JSON.parse(doc.optionTitle.replace(/\\\\\\"/g, '"'));
    //                 console.log('optionTitle: ' , optionTitle);
    //                 if (optionTitle.size) {
    //                     var size = optionTitle.size.replace(/['"]+/g, ''); // remove extra quotes
    //                     if (size.startsWith('"') && size.endsWith('"')) {
    //                         size = size.substring(1, size.length - 1); // remove the double quotes
    //                     }
    //                     Products.updateOne(
    //                         { _id: doc._id },
    //                         { $set: { "size" : size } }
    //                     );
    //                     console.log('size: ' , size);
    //                 }
    //             } catch (e) {
    //                 console.log('Error parsing optionTitle in document id: ' + doc._id);
    //             }
    //         }
    //     });
    //     return true;
    // } catch (error) {
    //     console.log("error", error);
    //     return false;
    // }
}

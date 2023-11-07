export default async function updateOptionTitle(_, { input }, context) {
    const { collections } = context;
    const { Products, Catalog } = collections;
    let count = 1;
    const filter = {
        'optionTitle': {
            '$ne': null
        },
        'ancestors': {
            '$ne': []
        }
    };

    let bulkOps = [];
    let dataInComing = await Products.find(filter).toArray();
    console.log("dataInComing", dataInComing.length);

    dataInComing.forEach(async function (doc) {
        // console.log("doc", doc.optionTitle);
        var optionTitle;
        try {
            optionTitle = JSON.parse(doc.optionTitle.replace(/\\\\\\"/g, '"').replace(/"/g, '"'));
        } catch (error) {
            try {
                optionTitle = JSON.parse(doc.optionTitle.replace(/'/g, '"'))
            } catch (error) {
                console.error('Error parsing optionTitle:', error);
            }
        }
        console.log("optionTitle", optionTitle);
        try {
            if (optionTitle?.size) {
                var size = optionTitle.size.replace(/['"]+/g, ''); // remove extra quotes
                if (size.startsWith('"') && size.endsWith('"')) {
                    size = size.substring(1, size.length - 1); // remove the double quotes
                }
                console.log("size", size);
                // Add an update operation to the array
               let updateData = await Products.updateOne(
                    { "product.variants._id": doc._id },
                    { $set: { "size": size, "updatedAt": new Date() } }
                );
                console.log("updateData:- ", updateData.modifiedCount + count);
                count++;
                console.log("count ", count);
            }
        } catch (error) {
            console.log("error ", error);
        }

        //     try {
        //         let updateData;
        //         console.log("optionTitle", optionTitle);
        //         if (optionTitle?.size) {
        //             var size = optionTitle.size.replace(/['"]+/g, ''); // remove extra quotes
        //             if (size.startsWith('"') && size.endsWith('"')) {
        //                 size = size.substring(1, size.length - 1); // remove the double quotes
        //             }
        //             console.log("size", size);
        //             updateData = await Catalog.updateOne(
        //                 { "product.variants._id": innerElement._id },
        //                 { $set: { "product.size": size, "product.updatedAt": new Date(), updatedAt: new Date() } }
        //             );
        //             console.log("updateData:- ", updateData.modifiedCount + count);
        //             count++;
        //             console.log("count ", count);
        //         }

        //     } catch (error) {
        //         console.log("error ", error);
        //     }
        // });
    });





    // try {
    //     let catalogData = await Catalog.find({}).toArray()
    //     catalogData.forEach(function (doc) {
    //         doc.product.variants.forEach(async innerElement => {
    //             var optionTitle;
    //             try {
    //                 optionTitle = JSON.parse(innerElement.optionTitle.replace(/\\\\\\"/g, '"').replace(/"/g, '"'));
    //             } catch (error) {
    //                 try {
    //                     optionTitle = JSON.parse(innerElement.optionTitle.replace(/'/g, '"'))
    //                 } catch (error) {
    //                     console.error('Error parsing optionTitle:', error);
    //                 }
    //             }
    //             try {
    //                 let updateData;
    //                 console.log("optionTitle", optionTitle);
    //                 if (optionTitle?.size) {
    //                     var size = optionTitle.size.replace(/['"]+/g, ''); // remove extra quotes
    //                     if (size.startsWith('"') && size.endsWith('"')) {
    //                         size = size.substring(1, size.length - 1); // remove the double quotes
    //                     }
    //                     console.log("size", size);
    //                     updateData = await Catalog.updateOne(
    //                         { "product.variants._id": innerElement._id },
    //                         { $set: { "product.size": size, "product.updatedAt": new Date(), updatedAt: new Date() } }
    //                     );
    //                     console.log("updateData:- ", updateData.modifiedCount + count);
    //                     count++;
    //                     console.log("count ", count);
    //                 }

    //             } catch (error) {
    //                 console.log("error ", error);
    //             }
    //         });
    //     });
    //     console.log("here on finish line ");
    //     return true;
    // } catch (error) {
    //     console.log("error", error);
    //     return false;
    // }

}

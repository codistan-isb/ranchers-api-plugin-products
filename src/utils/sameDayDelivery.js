export default async function sameDayDelivery(node, args, context) {
    const { collections, authToken } = context;
    const { Accounts } = collections;
    console.log("context  here sameDayDelivery node seller", context);
    console.log("user same Day Delivery ", context?.account?.city);
    let userCity = context?.account?.city
    let sellerCityDoc = await Accounts.findOne({ "_id": node.sellerId }, { city: 1 });
    let sellerCity = sellerCityDoc?.city;
    console.log("sellerCity", sellerCity);
    if (sellerCity === userCity) {
        return true;
    } else {
        return false;
    }
}
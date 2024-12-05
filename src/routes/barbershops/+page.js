import { getBarbers } from "$lib/comunications/endpoints/barbersRoutes.js";
import { getBarberShops } from "$lib/comunications/endpoints/barberShopRoutes.js";
export async function load({url}) {
    const barbers = await getBarbers();
    const barberShopsResponse = await getBarberShops();
    const barberShops = barberShopsResponse.success ? barberShopsResponse.data : [];
    const codigoPostal = url.searchParams.get("codigoPostal") || "";
    const error = !barberShopsResponse.success
        ? { type: "barberShops", message: barberShopsResponse.error }
        : null;
    return { barbers,barberShops,codigoPostal,error }; 
}

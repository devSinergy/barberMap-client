import { getBarbers } from "$lib/comunications/endpoints/barbersRoutes.js";
import { getBarberShops } from "$lib/comunications/endpoints/barberShopRoutes.js";
export async function load({url}) {
    const barbers = await getBarbers();
    const barberShops = await getBarberShops();
    const codigoPostal = url.searchParams.get("codigoPostal") || "";
    return { barbers,barberShops,codigoPostal }; 
}

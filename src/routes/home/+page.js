import { getBarbers } from "$lib/comunications/endpoints/barbersRoutes.js";
import { getBarberShops } from "$lib/comunications/endpoints/barberShopRoutes.js";
export async function load() {
    const barbers = await getBarbers();
    const barberShops = await getBarberShops();
    return { barbers,barberShops }; 
}

import { getStoreOne } from "$lib/comunications/endpoints/barberShopRoutes";
import { getServices } from "$lib/comunications/endpoints/servicesRoutes";
import { getCalendar } from "$lib/comunications/endpoints/calendarRoutes.js";
export async function load({ params }) {
    const id = params.barbershopId;
    try {
        const [detailStore, services,calendar] = await Promise.all([
            getStoreOne(id),
            getServices(id),
            getCalendar(id),
        ]);
        return { detailStore, services,calendar };
    } catch (error) {
        console.error("Error al cargar los datos:", error);
        return { status: 500, error: "No se pudieron cargar los datos" };
    }
}
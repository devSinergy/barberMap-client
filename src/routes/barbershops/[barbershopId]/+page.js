import { getStoreOne } from "$lib/comunications/endpoints/barberShopRoutes";
import { getServices } from "$lib/comunications/endpoints/servicesRoutes";
import { getCalendar } from "$lib/comunications/endpoints/calendarRoutes.js";
import { getStoreReview } from "$lib/comunications/endpoints/reviewsRoutes.js";
export async function load({ params }) {
    const id = params.barbershopId;
    try {
        const [detailStore, services,calendar,reviews] = await Promise.all([
            getStoreOne(id),
            getServices(id),
            getCalendar(id),
            getStoreReview(id),
        ]);
        return { detailStore, services,calendar,reviews };
    } catch (error) {
        console.error("Error al cargar los datos:", error);
        return { status: 500, error: "No se pudieron cargar los datos" };
    }
}
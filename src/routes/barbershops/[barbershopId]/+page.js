import { getStoreOne } from "$lib/comunications/endpoints/barberShopRoutes";
import { getServices } from "$lib/comunications/endpoints/servicesRoutes";
import { getCalendar } from "$lib/comunications/endpoints/calendarRoutes.js";
import { getStoreReview } from "$lib/comunications/endpoints/reviewsRoutes.js";
import { showReviews } from "$lib/comunications/endpoints/reviewsRoutes.js";
import { showAppoitmens } from "$lib/comunications/endpoints/appoitmensRoutes.js";
import { getStoreHaircut } from "$lib/comunications/endpoints/haircutRoutes.js";
import { totalClients } from "$lib/comunications/endpoints/userRoutes.js";
import { getBarber } from "$lib/comunications/endpoints/barbersRoutes.js";
export async function load({ params }) {
    const id = params.barbershopId;
    try {
        const [detailStore, services,calendar,reviews,detailreviews,appoitmens,haircuts,clients,barbers] = await Promise.all([
            getStoreOne(id),
            getServices(id),
            getCalendar(id),
            getStoreReview(id),
            showReviews(id),
            showAppoitmens(id),
            getStoreHaircut(id),
            totalClients(id),
            getBarber(id),
            
        ]);
        return { detailStore, services,calendar,reviews,detailreviews,appoitmens,haircuts,clients,barbers };
    } catch (error) {
        console.error("Error al cargar los datos:", error);
        return { status: 500, error: "No se pudieron cargar los datos" };
    }
}
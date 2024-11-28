import { getStoreOne } from "$lib/comunications/endpoints/barberShopRoutes";
import { getServices } from "$lib/comunications/endpoints/servicesRoutes";

export async function load({ params }) {
    const id = params.barbershopId;
    try {
        const [detailStore, services] = await Promise.all([
            getStoreOne(id),
            getServices(id),
        ]);
        return { detailStore, services };
    } catch (error) {
        console.error("Error al cargar los datos:", error);
        return { status: 500, error: "No se pudieron cargar los datos" };
    }
}
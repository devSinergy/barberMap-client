import { getHaircut } from "$lib/comunications/endpoints/haircutRoutes";

export async function load(){
    const haircuts = await getHaircut();
    return {haircuts};
}
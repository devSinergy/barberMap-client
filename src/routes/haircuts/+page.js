import { getHaircut } from "$lib/comunications/endpoints/haircutMethods";

export async function load(){
    const haircuts = await getHaircut();
    return {haircuts};
}
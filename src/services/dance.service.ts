import type { DanceInfo } from "@/interfaces/dance.interface";

const files = import.meta.glob("../assets/data/*.json");

export default class DanceService {

    async load(fileName: string): Promise<DanceInfo> {

        const file = files[`../assets/data/${fileName}`];

        if (!file) {

            throw new Error(`No existe ${fileName}`);

        }

        const module = await file();

        return (module as { default: DanceInfo }).default;

    }

}

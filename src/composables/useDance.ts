import { ref } from "vue";

import DanceService from "@/services/dance.service";

const service = new DanceService();

export function useDance() {

    const loading = ref(false);

    const dance = ref();

    async function load(name: string) {

        loading.value = true;

        dance.value = await service.load(name);

        loading.value = false;

    }

    return {

        dance,

        loading,

        load

    };

}

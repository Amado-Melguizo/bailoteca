import type { DanceInfo } from "@/interfaces/dance.interface";

export const DANCES: Record<string, DanceInfo> = {

    bachata: {

        id: "bachata",

        title: "Bachata",

        subtitle: "Del básico al avanzado con ejemplos en vídeo.",

        heroClass: "hero-bachata",

        data: "bachata.json"

    },

    "salsa-cubana": {

        id: "salsa-cubana",

        title: "Salsa Cubana",

        subtitle: "Aprende casino paso a paso.",

        heroClass: "hero-salsa-cubana",

        data: "salsa-cubana.json"

    },

    "salsa-linea": {

        id: "salsa-linea",

        title: "Salsa en Línea",

        subtitle: "Construye una base sólida y evoluciona.",

        heroClass: "hero-salsa-linea",

        data: "salsa-linea.json"

    }

}

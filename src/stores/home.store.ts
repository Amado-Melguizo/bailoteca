export interface HomeDance {

  slug: string

  name: string

  description: string

  image: string

  route: string

}

export const HOME_DANCES: HomeDance[] = [

  {
    slug: 'bachata',
    name: 'Bachata',
    description: 'Aprende pasos, figuras y técnica.',
    image: 'https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?auto=format&fit=crop&w=1200&q=80',
    route: '/dance/bachata'
  },

  {
    slug: 'salsa',
    name: 'Salsa',
    description: 'Descubre Salsa Cubana y Salsa en Línea.',
    image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1200&q=80',
    route: '/dance/salsa-cubana'
  }

]

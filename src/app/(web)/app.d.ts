
export interface MediaSize {
  ext: string;
  url: string;
  mime: string;
  name: string;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}


export interface Media {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  ext: string;
  url: string;
  publishedAt: string;
  formats: {
    large: MediaSize;
    small: MediaSize;
    medium: MediaSize;
    thumbnail: MediaSize;
  }
}


export interface HomeSinglePage {
  data: {
    id: number;
    documentId: string;
    FormularioType: string;
    NosotrosDescripcion: string;
    publishedAt: string;
    ConquiKid: Media;
    NosotrosImagen: Media;
    openGraphImage: Media;
  }
}


export interface Testimonio {
  readonly documentId: string;
  beneficiarioNombre: string;
  mensaje: string;
  publishedAt: string;
  fotografia: Media;
}


export interface PreguntaFrecuente {
  readonly documentId: string;
  pregunta: string;
  respuesta: string;
  publishedAt: string;
}


export interface NosotrosPage {
  id: number;
  documentId: string;
  descripcion: string;
  filosofia: string;
  mision: string;
  vision: string;
  valores: string;
}


export interface ImpactoApoyo {
  id: number;
  documentId: string;
  anio: number;
  monto: number;
  apoyo: Apoyo;
}

export interface Apoyo {
  id: number;
  documentId: string;
  nombre: string;
  descripcion: string;
  icono: string;
  publishedAt: string;
}


export interface ImpactoGeneral {
  id: number;
  documentId: string;
  anio: number;
  apoyosOtorgados: number;
  beneficiados: number;
  informeAnualURL: string;
  publishedAt: string;
}

export interface Autor {
  id: number;
  documentId: string;
  firstname: string,
  lastname: string;

}

export interface Novedad {
  id: number;
  documentId: string;
  titulo: string;
  cover: Media;
  publishedAt: string;
  tipo: string;
  contenido: string;
  createdBy: Autor;
  updatedBy: Autor;
  resumen: string;
  autor: string;
}


export interface Equipo {
  id: number;
  documentId: string;
  nombre: string;
  descripcion: string;
  logo: Media;
  publishedAt: string;
}


export interface Actividad {
  id: number;
  documentId: string;
  actividad: string;
  publishedAt: string;
  foto: Media;
}


export type WithDocumentIdPathParam = {
  params: Promise<{ documentId: string }>
}


export type WithSearchParams = {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined
  }>
}

export type Frequency = 'monthly' | 'oneTime'

export type StrapiPagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}


export interface Contacto {
  documentId: string;
  telefono: string;
  correo: string;
  direccion: string;
  coordenadas: {
    latitud: number;
    longitud: number;
  },
  horarios: Horario[]
}

export type Horario = {
  dia: string;
  inicio: string | null;
  termino: string | null;
  abierto: boolean;
}



export interface Evento {
  documentId: string;
  nombre: string;
  fechaInicio: string | null;
  ubicacion: string | null;
  descripcion: string;
  horaInicio: string | null;
  contenido: string;
  publishedAt: string;
  cover: Media;
  album: Album | null;
}



export interface Album {
  documentId: string;
  nombre: string;
  fotos: Media[]
}


export interface StrapiPaginatedResponse<T> {
  data: T[];
  meta: {
    pagination: StrapiPagination;
  }
}


export interface StrapiSingleResponse<T> {
  data: T,
  meta: {}
}


export interface AvisoPrivacidad {
  documentId: string;
  contenido: string;
  publishedAt: string;
}

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
    NosotrosImagen: Media
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
  informeAnual: Media | null;
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


export type WithSearchParams = {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined
  }>
}

export type Frequency = 'monthly' | 'one-time'
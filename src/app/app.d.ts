
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
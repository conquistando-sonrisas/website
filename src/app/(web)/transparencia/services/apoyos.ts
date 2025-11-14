import { cmsApi } from "@/app/utlis/swr";
import { ImpactoApoyo, ImpactoGeneral } from "../../app";
import qs from 'qs'


export async function getImpactoOfYearsWithApoyos() {
  const apoyos = await getApoyosByYears();
  const anuales = await getImpactoGeneralByYears();
  const anualesWithApoyos = anuales.map(an => ({
    ...an,
    apoyos: apoyos.filter(apoyo => apoyo.anio === an.anio)
  }))

  return anualesWithApoyos;
}


const getImpactoGeneralByYears = async () => {
  const params = qs.stringify({
    populate: '*',
    pagination: {
      page: 1,
      pageSize: 10,
    },
    sort: ['anio:desc']
  })
  const res = await cmsApi.get(`/impactos-generales?${params}`)
  return res.data.data as Array<ImpactoGeneral>;
}

// get last ten years
const getApoyosByYears = async () => {
  const params = qs.stringify({
    filters: {
      anio: {
        $gte: new Date().getFullYear() - 10
      }
    },
    populate: {
      apoyo: {
        fields: ['documentId', 'nombre']
      }
    },
    sort: ['anio:desc', 'monto:desc'],
    pagination: {
      page: 1,
      pageSize: 100,
    },
  }, {
    encodeValuesOnly: true
  })
  const res = await cmsApi.get(`/impacto-apoyos?${params}`)
  return res.data.data as Array<ImpactoApoyo>
}
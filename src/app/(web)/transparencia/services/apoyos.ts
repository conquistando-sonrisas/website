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
    populate: '*'
  })
  const res = await cmsApi.get(`/impactos-generales?${params}`)
  return res.data.data as Array<ImpactoGeneral>;
}

const getApoyosByYears = async () => {
  const params = qs.stringify({
    populate: {
      apoyo: {
        fields: ['documentId', 'nombre']
      }
    },
    sort: ['anio:desc', 'monto:desc']
  })
  const res = await cmsApi.get(`/impacto-apoyos?${params}`)
  return res.data.data as Array<ImpactoApoyo>
}
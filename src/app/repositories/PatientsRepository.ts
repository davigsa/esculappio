import { getRepository } from 'typeorm'

import HttpException from '../../common/http-exception'
import { Patient } from '../entities/Patient'
import { User } from '../entities/User'
import { ICreatePatientDTO, IUpdatePatientDTO } from '../interfaces/IPatients'

class PatientsRepository {
  private connectPatientRepository () {
    return getRepository(Patient)
  }

  private connectUserRepository () {
    return getRepository(User)
  }

  async create ({ userId }: ICreatePatientDTO): Promise<Patient> {
    const user = await this.connectUserRepository().findOne({ where: { id: userId } })

    if (!user) throw new HttpException(401, 'User not found')

    const patient = new Patient()
    patient.user = user

    await this.connectPatientRepository().save(patient)

    return patient
  }

  async update ({ id, observation }: IUpdatePatientDTO): Promise<Patient> {
    const patient = await this.connectPatientRepository().findOne({ where: { id } })

    if (!patient) throw new HttpException(401, 'Patient not found')

    // Intenção de apenas o médico fazer o update do perfil do paciente, teria que adicionar um campo HOLE no user, e fazer um middleware que checasse isso

    patient.observation = observation

    await this.connectPatientRepository().save(patient)

    return patient
  }

  async find (): Promise<Patient[]> {
    const patients = await this.connectPatientRepository().find()

    return patients
  }

  async findOne (id : string): Promise<any> {
    const patient = await this.connectPatientRepository().findOne({
      where: { id }
    })

    if (!patient) throw new HttpException(401, 'Patient not found')

    return patient
  }
}

export { PatientsRepository }

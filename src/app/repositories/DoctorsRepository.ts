import { getRepository } from 'typeorm'

import HttpException from '../../common/http-exception'
import { Doctor } from '../entities/Doctor'
import { User } from '../entities/User'
import { ICreateDoctorDTO } from 'app/interfaces/IDoctors'

class DoctorsRepository {
  private connectDoctorRepository () {
    return getRepository(Doctor)
  }

  private connectUserRepository () {
    return getRepository(User)
  }

  async create ({ crm, specialization, userId }: ICreateDoctorDTO): Promise<Doctor> {
    const userHasRole = await this.connectDoctorRepository().findOne({ where: { crm } })

    if (userHasRole) {
      throw new HttpException(409, 'User already has an role')
    }

    const user = await this.connectUserRepository().findOne({ where: { id: userId } })

    if (!user) throw new HttpException(401, 'User not found')

    const doctor = new Doctor()
    doctor.crm = crm
    doctor.specialization = specialization
    doctor.user = user

    await this.connectDoctorRepository().save(doctor)

    return doctor
  }

  async findOne (id : string): Promise<Doctor> {
    const doctors = await this.connectDoctorRepository().query('select * from users as u inner join doctors as d on d.id = $1 and d.user_id = u.id limit 1', [id])

    if (doctors.length === 0) throw new HttpException(401, 'Doctor not found')

    const doctor = doctors[0]
    delete doctor.password

    return doctor
  }

  async find (): Promise<Doctor[]> {
    const doctors = await this.connectDoctorRepository().query('select * from users as u inner join doctors as d on d.user_id = u.id')

    return doctors
  }
}

export { DoctorsRepository }

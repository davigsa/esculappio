interface ICreatePatientDTO {
    userId: string;
}

interface IUpdatePatientDTO {
    id: string
    observation: string;
}

export { ICreatePatientDTO, IUpdatePatientDTO }

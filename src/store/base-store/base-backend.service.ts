import axios from 'axios';

export class BaseBackendService<F, T, S> {

    constructor(public serviceBase: string, public entityName: string, public entityPluralName: string) {
        if (!entityPluralName) {
            this.entityPluralName = `${entityName}s`;
        }
    }

    find(filter: F): Promise<S[]> {
        return axios.post(`${this.serviceBase}/${this.entityPluralName}`, filter)
            .then(result => result.data);
    }

    findById(id: string): Promise<S> {
        return axios.get(`${this.serviceBase}/${this.entityName}/${id}`)
            .then(result => result.data);
    }
}

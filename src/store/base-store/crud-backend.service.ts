import axios from 'axios';
import {BaseBackendService} from './base-backend.service';

export class CrudBackendService<F, T, S>  extends BaseBackendService<F, T, S> {

    constructor(serviceBase: string, entityName: string, entityPluralName: string) {
        super(serviceBase, entityName, entityPluralName)
    }

    create(entity: T): Promise<S> {
        return axios.post(`${this.serviceBase}/${this.entityName}`, entity)
            .then(result => result.data);
    }

    update(entity: T): Promise<S> {
        return axios.put(`${this.serviceBase}/${this.entityName}`, entity)
            .then(result => result.data);
    }

    remove(id: string) {
        return axios.delete(`${this.serviceBase}/${this.entityName}/${id}`)
            .then(result => result.data);
    }

}

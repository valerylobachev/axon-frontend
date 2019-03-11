import {DataSchema, DataSchemaFilter, DataSchemaSummary} from './model';
import axios from 'axios';
import {CrudBackendService} from '../base-store/crud-backend.service'

const BUILD_MULTI_LEVEL = 'buildMultiLevel';
const BUILD_SINGLE_LEVEL = 'buildSingleLevel';

class DataSchemaBackendService extends CrudBackendService<DataSchemaFilter, DataSchema, DataSchemaSummary> {

    constructor() {
        super('/web-api/knowledge/repository', 'dataSchema', 'dataSchemas');
    }

    findByKeys(keys: string[]): Promise<DataSchemaSummary[]> {
        return axios.put(`${this.serviceBase}/${this.entityPluralName}`, keys)
            .then(result => result.data);
    }

    buildMultiLevel(key: string): Promise<DataSchema> {
        return axios.get(`${this.serviceBase}/${BUILD_MULTI_LEVEL}/${key}`)
            .then(result => result.data);
    }

    buildSingleLevel(key: string): Promise<DataSchema> {
        return axios.get(`${this.serviceBase}/${BUILD_SINGLE_LEVEL}/${key}`)
            .then(result => result.data);
    }
}

const dataSchemaBackendService = new DataSchemaBackendService();

export default dataSchemaBackendService;

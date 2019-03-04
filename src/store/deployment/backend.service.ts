import axios from 'axios';
import {BaseBackendService} from '../base-store/base-backend.service'
import {DeploymentWithDefs, emptyProcessDefFilter, FindProcessDefOptions, ProcessDef} from './model'

class BpmDeploymentBackendService extends BaseBackendService<FindProcessDefOptions, ProcessDef, ProcessDef> {

    constructor() {
        super('/web-api/bpm/deployment',  'processDef', 'processDefs')
    }

    findAll(): Promise<ProcessDef[]> {
        return this.find(emptyProcessDefFilter());
    }

    deploy(id: string): Promise<DeploymentWithDefs> {
        return axios.post(`${this.serviceBase}/deploy/${id}`)
            .then(result => result.data);
    }
}

const bpmDeploymentBackendService = new BpmDeploymentBackendService()

export default bpmDeploymentBackendService;

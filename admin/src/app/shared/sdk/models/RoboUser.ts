/* tslint:disable */
import {
  Role
} from '../index';

declare var Object: any;
export interface RoboUserInterface {
  "firstName"?: string;
  "familyName"?: string;
  "realm"?: string;
  "username"?: string;
  "email": string;
  "emailVerified"?: boolean;
  "id"?: number;
  "password"?: string;
  accessTokens?: any[];
  roles?: Role[];
}

export class RoboUser implements RoboUserInterface {
  "firstName": string;
  "familyName": string;
  "realm": string;
  "username": string;
  "email": string;
  "emailVerified": boolean;
  "id": number;
  "password": string;
  accessTokens: any[];
  roles: Role[];
  constructor(data?: RoboUserInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `RoboUser`.
   */
  public static getModelName() {
    return "RoboUser";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of RoboUser for dynamic purposes.
  **/
  public static factory(data: RoboUserInterface): RoboUser{
    return new RoboUser(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'RoboUser',
      plural: 'RoboUsers',
      path: 'RoboUsers',
      properties: {
        "firstName": {
          name: 'firstName',
          type: 'string'
        },
        "familyName": {
          name: 'familyName',
          type: 'string'
        },
        "realm": {
          name: 'realm',
          type: 'string'
        },
        "username": {
          name: 'username',
          type: 'string'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "emailVerified": {
          name: 'emailVerified',
          type: 'boolean'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "password": {
          name: 'password',
          type: 'string'
        },
      },
      relations: {
        accessTokens: {
          name: 'accessTokens',
          type: 'any[]',
          model: ''
        },
        roles: {
          name: 'roles',
          type: 'Role[]',
          model: 'Role'
        },
      }
    }
  }
}

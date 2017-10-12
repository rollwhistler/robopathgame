/* tslint:disable */
import { Injectable } from '@angular/core';
import { Role } from '../../models/Role';
import { RoboUser } from '../../models/RoboUser';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    Role: Role,
    RoboUser: RoboUser,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}

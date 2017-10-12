import { Pipe, PipeTransform } from "@angular/core";
import { RoboUser } from "../../shared/sdk/models/RoboUser";

@Pipe({ name: "fullName" })
export class FullNamePipe implements PipeTransform {
  transform(value: RoboUser): string {
    let name = value.firstName;
    if (value.familyName) name = name + " " + value.familyName;
    return name;
  }
}
